import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatInput from "./component/ChatInput.jsx";
import ChatMessage from "./component/ChatMessage.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatInput />
    <ChatMessage />
  </StrictMode>,
)
