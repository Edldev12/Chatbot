import ReactMarkdown from "react-markdown";
import userImage from "../assets/user.avif";
import robotImage from "../assets/robot.jpg";
function ChatMessage(props) {
  //function ChatMessage(message, sender) more short cut way to write the function but we are using props object to pass the message and sender properties. This allows us to pass any number of properties to the component without having to change the function signature.
  //const message = props.message;
  //const sender = props.sender;
  const { message, sender } = props;
  //destructuing the props object to extract the messange and sender properties. This allows us to use messange and sender directly instead of accessing them through props.message and props.sender.
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
    </div>
  );
}

export default ChatMessages;