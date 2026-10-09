
import { useState, useEffect } from "react";
import ChatInput from "./component/ChatInput.jsx";
import ChatMessages from "./component/ChatMessage.jsx";
import "./index.css";
import "./App.css";

const STORAGE_KEY = "ollama-chat-history";

const welcomeMessages = [
  {
    message: "Hello! How can I help you today?",
    sender: "robot",
  },
];

function createChat() {
  return {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [...welcomeMessages],
    updatedAt: new Date().toISOString(),
  };
}

function loadChats() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Could not load chat history:", error);
  }

  return [createChat()];
}

function App() {
  const [chats, setChats] = useState(loadChats);
  const [activeChatId, setActiveChatId] = useState(
    () => chats[0]?.id
  );
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  const chatMessages = activeChat?.messages ?? welcomeMessages;

  // Save conversations whenever chat history changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch (error) {
      console.error("Could not save chat history:", error);
    }
  }, [chats]);

  // Update the active conversation after a message is added.
  function setChatMessages(update) {
    setChats((previousChats) =>
      previousChats.map((chat) => {
        if (chat.id !== activeChatId) {
          return chat;
        }

        const messages =
          typeof update === "function"
            ? update(chat.messages)
            : update;

        const firstUserMessage = messages.find(
          (item) => item.sender === "user"
        );

        const title = firstUserMessage
          ? firstUserMessage.message.slice(0, 35) +
          (firstUserMessage.message.length > 35 ? "..." : "")
          : "New Chat";

        return {
          ...chat,
          messages,
          title,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }

  function handleNewChat() {
    if (isLoading) return;

    const newChat = createChat();

    setChats((previousChats) => [
      newChat,
      ...previousChats,
    ]);

    setActiveChatId(newChat.id);
  }

  function handleSelectChat(chatId) {
    if (isLoading) return;
    setActiveChatId(chatId);
  }

  function handleDeleteChat(event, chatId) {
    event.stopPropagation();

    if (isLoading) return;

    const remainingChats = chats.filter(
      (chat) => chat.id !== chatId
    );

    if (remainingChats.length === 0) {
      const newChat = createChat();
      setChats([newChat]);
      setActiveChatId(newChat.id);
      return;
    }

    setChats(remainingChats);

    if (chatId === activeChatId) {
      setActiveChatId(remainingChats[0].id);
    }
  }

  return (
    <div className="app-container">
      <aside
        className={`chat-sidebar ${sidebarOpen ? "" : "sidebar-closed"}`}
      >
        <div className="sidebar-header">
          <h2>My AI Chats</h2>

          <button
            className="icon-button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <button
          className="new-chat-button"
          onClick={handleNewChat}
          disabled={isLoading}
        >
          + New Chat
        </button>

        <div className="chat-history">
          <p className="history-label">RECENT CONVERSATIONS</p>

          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`history-item ${chat.id === activeChatId ? "active" : ""
                }`}
            >
              <button
                className="history-select"
                onClick={() => handleSelectChat(chat.id)}
                disabled={isLoading}
                title={chat.title}
              >
                <span className="history-icon">💬</span>
                <span className="history-title">
                  {chat.title}
                </span>
              </button>

              <button
                className="delete-chat-button"
                onClick={(event) =>
                  handleDeleteChat(event, chat.id)
                }
                disabled={isLoading}
                aria-label={`Delete ${chat.title}`}
                title="Delete conversation"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          Powered by Ollama · gemma3:1b
        </div>
      </aside>

      <main className="chat-main">
        {!sidebarOpen && (
          <button
            className="open-sidebar-button"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Chat History
          </button>
        )}

        <ChatMessages
          key={activeChatId}
          chatMessages={chatMessages}
          isLoading={isLoading}
        />

        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </main>
    </div>
  );
}

export default App;
