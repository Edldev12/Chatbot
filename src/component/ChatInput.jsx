import { useState } from "react";

function ChatInput({ setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessages() {
    setChatMessages((messages) => [
      ...messages,
      {
        message: inputText,
        sender: "user",
      },
    ]);

    setInputText("");
  }

  return (
    <div className="chat-input">
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