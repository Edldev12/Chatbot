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
      <input
        type="text"
        placeholder="Type your message ..."
        size="30"
        value={inputText}
        onChange={saveInputText}
      />

      <button onClick={sendMessages}>Send</button>
    </div>
  );
}

export default ChatInput;