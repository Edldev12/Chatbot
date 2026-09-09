import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatInput from "./component/ChatInput.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {ChatInput()}
    <ChatInput />
  </StrictMode>,
)
