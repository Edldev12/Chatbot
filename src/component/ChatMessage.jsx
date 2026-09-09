import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import userImage from "../assets/user.avif";
import robotImage from "../assets/robot.jpg";

function ChatMessage({ message, sender }) {
  return (
    <div className={`chat-message ${sender}`}>
      {sender === "robot" && (
        <img src={robotImage} alt="robot" width="50" height="50" />
      )}

      <div className="markdown-content">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>

      {sender === "user" && (
        <img src={userImage} alt="user" width="50" height="50" />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages, isLoading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages, isLoading]);

  return (
    <div className="chat-messages">
      {chatMessages.map((chatMessage, index) => {
        return (
          <ChatMessage
            key={index}
            message={chatMessage.message}
            sender={chatMessage.sender}
          />
        );
      })}

      {isLoading && (
        <div className="chat-message robot">
          <img src={robotImage} alt="robot" width="50" height="50" />

          <div className="markdown-content typing-skeleton">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default ChatMessages;