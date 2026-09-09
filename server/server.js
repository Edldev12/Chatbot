import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:1b",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});