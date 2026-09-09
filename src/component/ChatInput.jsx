import { useState } from "react";

function ChatInput({ setChatMessages, isLoading, setIsLoading }) {
  const [inputText, setInputText] = useState("");
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessages() {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText;

    setChatMessages((messages) => [
      ...messages,
      {
        message: userMessage,
        sender: "user",
      },
    ]);

    setInputText("");
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        placeholder="Ask me anything..."
        value={inputText}
        onChange={saveInputText}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessages();
          }
        }}
      />

      <button onClick={sendMessages} disabled={isLoading}>
        {isLoading ? "Sending..." : "Send"}</button>
    </div>
  );
}

export default ChatInput;