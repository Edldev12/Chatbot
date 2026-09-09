import { useState } from "react";
import ChatInput from "./component/ChatInput.jsx";
import ChatMessages from "./component/ChatMessage.jsx";
import "./index.css";
function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello! How can I help you today?",
      sender: "robot",
    },
    {
      message: "Hi! I have a question about my account.",
      sender: "user",
    },
    {
      message: "Of course! What would you like to know?",
      sender: "robot",
    },
    {
      message: "I forgot my password. How can I reset it?",
      sender: "user",
    },
    {
      message: "You can reset your password from the Settings page.",
      sender: "robot",
    },
    {
      message: "Thank you! I'll try that now.",
      sender: "user",
    },
    {
      message: "You're welcome! Let me know if you need anything else.",
      sender: "robot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} isLoading={isLoading} />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App;