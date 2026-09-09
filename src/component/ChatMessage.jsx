import userImage from "../assets/user.avif";
import robotImage from "../assets/robot.jpg";
function ChatMessage() {
  return (
    <div className="chat-message">
      This is a sample chat message.
      <img src={userImage} alt="User"
        width="50" height="50" />
    </div>
  )
}
export default ChatMessage;