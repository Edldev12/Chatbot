import { useState } from "react";

function ChatInput({ setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessages() {
    if (!inputText.trim()) return;

    const userMessage = inputText;

    setChatMessages((messages) => [
      ...messages,
      {
        message: userMessage,
        sender: "user",
      },
    ]);

    setInputText("");

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setChatMessages((messages) => [
        ...messages,
        {
          message: data.message,
          sender: "robot",
        },
      ]);
    } catch (error) {
      console.error(error);

      setChatMessages((messages) => [
        ...messages,
        {
          message: "Sorry, I couldn't connect to the server.",
          sender: "robot",
        },
      ]);
    }
  }

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        placeholder="Ask me anything..."
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessages();
          }
        }}
      />

      <button onClick={sendMessages}>Send</button>
    </div>
  );
}

export default ChatInput;