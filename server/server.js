
import "dotenv/config";
import process from "node:process";
import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing");
}

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.use(
  session({
    name: "chatbot.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Chatbot API is running" });
});

app.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        message: "Please provide a message.",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        message: "AI service is not configured yet.",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
        .filter(
          (chat) =>
            chat &&
            ["user", "assistant"].includes(chat.sender) &&
            typeof chat.message === "string"
        )
        .slice(-10)
        .map((chat) => ({
          role: chat.sender,
          content: chat.message.slice(0, 4000),
        }))
      : [];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model:
            process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are a helpful, friendly AI assistant.",
            },
            ...safeHistory,
            {
              role: "user",
              content: message.trim().slice(0, 4000),
            },
          ],
          max_tokens: 1024,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", response.status, data.error?.message);

      return res.status(502).json({
        message:
          "The AI service could not respond. Please try again later.",
      });
    }

    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      return res.status(502).json({
        message: "The AI returned an empty response.",
      });
    }

    res.json({ message: answer });
  } catch (error) {
    console.error("AI ERROR:", error.message);

    res.status(500).json({
      message: "Sorry, I couldn't get a response from the AI.",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
