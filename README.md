# 🤖 AI Chatbot

A full-stack AI chatbot built with **React**, **Express.js**, and **Ollama**.
The application provides a simple, responsive chat interface where users can communicate with a locally running AI model.

---

## 📌 Project Overview

This project is a learning project focused on understanding how a **React frontend communicates with a backend API and an AI model**.

The application uses:

* **React** for the user interface
* **Express.js** for the backend API
* **Ollama** to run the AI model locally
* **Gemma 3 1B** as the AI model
* **React Markdown** to display formatted AI responses

### Architecture

```text
┌──────────────────┐
│   React Frontend │
│                  │
│  Chat Interface  │
└────────┬─────────┘
         │
         │ HTTP POST
         ▼
┌──────────────────┐
│ Express Backend  │
│                  │
│    /chat API     │
└────────┬─────────┘
         │
         │ HTTP Request
         ▼
┌──────────────────┐
│      Ollama      │
│                  │
│   Gemma 3 1B     │
└────────┬─────────┘
         │
         │ AI Response
         ▼
┌──────────────────┐
│   React Frontend │
└──────────────────┘
```

---

## ✨ Features

### Current Features

* 💬 Send messages to an AI assistant
* 🤖 AI-generated responses using Ollama
* 🧠 Conversation history/context
* 📝 Markdown-formatted AI responses
* ⌨️ Press **Enter** to send a message
* ↵ Press **Shift + Enter** for a new line
* ⏳ Loading/typing animation
* 🚫 Send button disabled while waiting for a response
* ⚠️ Friendly error handling
* 📜 Automatic scrolling to the newest message
* 📱 Responsive chat interface
* 👤 User and AI avatars
* 🔗 React frontend connected to Express backend
* 🔌 Express connected to Ollama

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* CSS
* React Markdown

### Backend

* Node.js
* Express.js
* CORS
* Fetch API

### AI

* Ollama
* Gemma 3 1B

---

## 📂 Project Structure

```text
AI-Chatbot/
│
├── src/
│   ├── assets/
│   │   ├── robot.jpg
│   │   └── user.avif
│   │
│   ├── component/
│   │   ├── ChatInput.jsx
│   │   └── ChatMessage.jsx
│   │
│   ├── App.jsx
│   ├── App.css
└── main.jsx
│
├── package.json
└── vite.config.js
│
├── server/
│   ├── server.js
│   └── package.json
│
└── README.md
```

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <https://github.com/Edldev12/Chatbot>
```

Move into the project:

```bash
cd AI-Chatbot
```

---

# 🎨 Frontend Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal.

Move into the backend directory:

```bash
cd src
```

Install dependencies:

```bash
npm install
```

Start the Express server:

```bash
node server.js
```

The backend will run at:

```text
http://localhost:3000
```

---

# 🧠 Ollama Setup

This project uses Ollama to run the AI model locally.

Install Ollama on your computer, then download the model:

```bash
ollama pull gemma3:1b
```

Make sure Ollama is running before using the chatbot.

You can check the model with:

```bash
ollama list
```

The project currently uses:

```text
gemma3:1b
```

The backend communicates with Ollama through:

```text
http://localhost:11434/api/chat
```

---

# 🔄 How It Works

When the user sends a message:

### 1. React receives the user's input

```text
User → "What is React?"
```

### 2. React sends a POST request

```text
POST http://localhost:3000/chat
```

The request contains:

```json
{
  "message": "What is React?",
  "history": []
}
```

### 3. Express receives the request

The backend extracts:

```js
const { message, history = [] } = req.body;
```

### 4. Conversation history is converted to Ollama format

```js
const messages = [
  ...history.map((chat) => ({
    role: chat.sender === "user" ? "user" : "assistant",
    content: chat.message,
  })),
  {
    role: "user",
    content: message,
  },
];
```

### 5. Express sends the conversation to Ollama

```text
Express → Ollama
```

### 6. Ollama generates the response

```text
Ollama → Express
```

### 7. Express sends the response back

```json
{
  "message": "React is a JavaScript library..."
}
```

### 8. React displays the response

```text
AI → Chat Interface
```

---

# 🧠 Conversation History

The chatbot keeps the conversation context while the application is running.

For example:

```text
User: My name is Edlawit.

AI: Nice to meet you, Edlawit!

User: What is my name?

AI: Your name is Edlawit.
```

The frontend sends previous messages to the backend, and the backend passes them to Ollama.

This allows the AI model to understand previous messages.

---

# ⌨️ Keyboard Controls

| Key           | Action            |
| ------------- | ----------------- |
| Enter         | Send message      |
| Shift + Enter | Create a new line |

The Enter behavior is implemented using:

```js
onKeyDown={(event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessages();
  }
}}
```

---

# ⏳ Loading State

While waiting for Ollama to respond, the application displays a typing animation.

The Send button is also disabled:

```jsx
<button disabled={isLoading}>
  {isLoading ? "Sending..." : "Send"}
</button>
```

This prevents users from accidentally sending multiple messages while the AI is responding.

---

# ⚠️ Error Handling

The frontend checks whether the backend request was successful:

```js
if (!response.ok) {
  throw new Error(`Server error: ${response.status}`);
}
```

If something goes wrong, the user receives:

```text
Sorry, something went wrong. Please try again.
```

The backend also handles Ollama errors and returns a friendly response.

---

# 📜 Automatic Scrolling

The chat automatically scrolls to the newest message.

This is implemented using React's:

* `useRef`
* `useEffect`

Example:

```js
messagesEndRef.current?.scrollIntoView({
  behavior: "smooth",
});
```

The user does not need to manually scroll down after every response.

---

# 📝 Markdown Support

AI responses are rendered using `react-markdown`.

This allows the AI to display:

* Headings
* Bold text
* Italic text
* Lists
* Links
* Code
* Code blocks
* Blockquotes
* Tables

Example:

```markdown
## React

React is a **JavaScript library**.

- Components
- Props
- State
- Hooks
```

---

# 📱 Responsive Design

The chatbot interface is designed to work across different screen sizes.

The CSS includes responsive layouts for:

* Desktop
* Tablet
* Mobile
* Small mobile screens

---

# 📋 Development Progress

| Feature                     | Status     |
| --------------------------- | ---------- |
| React chatbot UI            | ✅ Complete |
| Express backend             | ✅ Complete |
| React → Express connection  | ✅ Complete |
| Express → Ollama connection | ✅ Complete |
| AI responses                | ✅ Complete |
| Markdown formatting         | ✅ Complete |
| Enter to send               | ✅ Complete |
| Loading state               | ✅ Complete |
| Error handling              | ✅ Complete |
| Automatic scrolling         | ✅ Complete |
| Responsive UI               | ✅ Complete |
| Conversation history        | ✅ Complete |
| Clear chat                  | 📋 Planned |
| Persistent conversations    | 📋 Planned |
| Multiple conversations      | 📋 Planned |
| Streaming responses         | 📋 Planned |
| Authentication              | 📋 Planned |
| Database storage            | 📋 Planned |
| Deployment                  | 📋 Planned |

---

# 🚀 Future Improvements

The following features are planned for future development.

## 🧹 1. Clear Chat

Add a button that allows the user to clear the current conversation.

```text
Clear Chat
```

---

## 💾 2. Save Conversations

Store conversations so they are not lost when the page is refreshed.

Possible technologies:

* LocalStorage
* Database

---

## 💬 3. Multiple Conversations

Allow users to create and switch between different conversations.

Example:

```text
My Conversations

├── React Questions
├── JavaScript Help
├── Project Ideas
└── General Chat
```

---

## 🗑️ 4. Delete Messages

Allow users to delete individual messages.

---

## ✏️ 5. Edit and Resend Messages

Allow users to edit a previous message and ask the AI again.

---

## ⚡ 6. Streaming AI Responses

Instead of waiting for the complete AI response, display the response gradually as Ollama generates it.

Example:

```text
React is a JavaScript...
                    ↓
React is a JavaScript library...
                    ↓
React is a JavaScript library used...
```

This will make the chatbot feel more like modern AI applications.

---

## 🌙 7. Dark/Light Mode

Add a theme switcher:

```text
☀️ Light
🌙 Dark
```

---

## 🔐 8. User Authentication

Add:

* Registration
* Login
* Logout
* Protected conversations

---

## 🗄️ 9. Database

Store:

* Users
* Conversations
* Messages
* Timestamps

Possible database:

* MySQL
* PostgreSQL
* MongoDB

---

## 🚀 10. Deployment

Deploy the application so it can be accessed online.

Possible deployment architecture:

```text
React
  ↓
Frontend Hosting
  ↓
Express API
  ↓
AI Service
```

---

# 🔒 Security Notes

This project currently runs Ollama locally.

Do not store passwords, API keys, tokens, or other secrets directly in source code.

For future deployment, sensitive configuration should be stored using environment variables.

Example:

```env
PORT=3000
OLLAMA_URL=http://localhost:11434
MODEL=gemma3:1b
```

---

# 🧪 Testing Checklist

Before considering a version complete, test:

```text
[ ] Send a normal message
[ ] Send message using Enter
[ ] Create multiline message using Shift + Enter
[ ] Check loading animation
[ ] Check Send button disabled state
[ ] Stop backend and test error handling
[ ] Test conversation history
[ ] Test long AI responses
[ ] Test Markdown
[ ] Test automatic scrolling
[ ] Test mobile layout
[ ] Restart frontend
[ ] Restart backend
[ ] Check Ollama is running
```

---

# 🎯 Learning Goals

This project helps practice:

### React

* Components
* Props
* State
* `useState`
* `useEffect`
* `useRef`
* Event handling
* Conditional rendering
* Rendering lists
* Async operations
* API requests

### JavaScript

* Async/await
* Fetch API
* Promises
* Array methods
* Object destructuring
* Error handling
* JSON

### Backend

* Node.js
* Express
* REST APIs
* HTTP requests
* Middleware
* CORS
* Error handling

### AI Integration

* Ollama
* Local AI models
* Chat APIs
* Conversation context
* Message roles

---

# 👨‍💻 Author

**Edlawit Tsegaye**

Software Engineering Student
Interested in Full-Stack Development and Problem Solving.

---

# 📄 License

This project is created for learning and educational purposes.
