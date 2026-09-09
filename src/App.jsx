import ChatInput from "./component/ChatInput.jsx";
import ChatMessage from "./component/ChatMessage.jsx";

function App() {
  return (
    <>
      <ChatInput />

      <ChatMessage
        message="Hello! How can I help you today?"
        sender="robot"
      />

      <ChatMessage
        message="Hi! I have a question about my account."
        sender="user"
      />

      <ChatMessage
        message="Of course! What would you like to know?"
        sender="robot"
      />

      <ChatMessage
        message="I forgot my password. How can I reset it?"
        sender="user"
      />

      <ChatMessage
        message="You can reset your password from the Settings page by clicking 'Forgot Password'."
        sender="robot"
      />

      <ChatMessage
        message="Thank you! I'll try that now."
        sender="user"
      />

      <ChatMessage
        message="You're welcome! Let me know if you need anything else."
        sender="robot"
      />
    </>
  );
}

export default App;