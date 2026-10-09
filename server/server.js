import "dotenv/config";
import process from "node:process";
import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing from server/.env");
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "chatbot.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/auth", authRoutes);

app.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    const messages = [
      ...history.map((chat) => ({
        role: chat.sender === "user" ? "user" : "assistant",
        content: chat.message,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:1b",
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status} `);
    }

    const data = await response.json();

    res.json({
      message: data.message.content,
    });
  } catch (error) {
    console.error("OLLAMA ERROR:", error);

    res.status(500).json({
      message: "Sorry, I couldn't get a response from the AI.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
