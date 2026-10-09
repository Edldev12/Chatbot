# 🤖 AI Chatbot

A full-stack AI chatbot built with **React, Vite, Node.js, Express, and the Groq API**. The application provides an interactive chat interface with AI-generated responses, conversation context, user authentication, and a responsive design.

**Live Demo:** [Open AI Chatbot](https://chatbot-git-main-edlawit-tsegaye.vercel.app)

**Backend API:** [Chatbot API](https://edlawit-chatbot-api.onrender.com)

## ✨ Features

- 💬 Interactive AI-powered conversations
- 🧠 Conversation context using recent messages
- 🔐 User registration and login
- 👤 Session-based authentication
- 📝 Markdown-formatted AI responses
- ⌨️ Enter to send messages and Shift + Enter for new lines
- ⏳ Loading states while waiting for AI responses
- ⚠️ Error handling for failed requests
- 📱 Responsive interface for different screen sizes
- 🌐 Deployed frontend and backend

## 🛠️ Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| AI responses | Groq API |
| Backend | Node.js, Express.js |
| Authentication | Express Session, bcryptjs |
| Database | SQLite |
| HTTP and security | Fetch API, CORS, HTTP-only session cookies |
| Deployment | Vercel, Render |
| Version control | Git, GitHub |

## 🏗️ Architecture

```text
User
  |
  v
React + Vite Frontend
  |
  | HTTP requests
  v
Express Backend
  |
  +---- Authentication and sessions
  |
  +---- SQLite database
  |
  v
Groq API
  |
  v
AI-generated response
  |
  v
React Chat Interface
```

## 🚀 Live Application

Try the deployed application:

**[Launch AI Chatbot](https://chatbot-git-main-edlawit-tsegaye.vercel.app)**

The frontend is hosted on Vercel, and the backend API is hosted on Render.

## 💻 Run Locally

### Prerequisites

- Node.js and npm
- Git
- A Groq API key for AI responses

### 1. Clone the repository

```bash
git clone https://github.com/Edldev12/Chatbot.git
cd Chatbot
```

### 2. Install frontend dependencies

From the project root, run:

```bash
npm install
```

### 3. Configure the frontend

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Configure the backend

Open a second terminal and navigate to the server directory:

```bash
cd server
npm install
```

Create a `server/.env` file with the following variables:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=replace_with_a_long_random_secret
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

Replace the example secret and API key with your own values. Keep both private and never commit `.env` files to GitHub.

### 5. Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:3000
```

### 6. Start the frontend

In another terminal, return to the project root and run:

```bash
npm run dev
```

Open the local address printed by Vite, usually:

```text
http://localhost:5173
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check backend availability |
| POST | `/chat` | Generate an AI response |
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Log in |
| GET | `/auth/me` | Check the current session |
| POST | `/auth/logout` | Log out |

Authentication requests use session cookies. The frontend must send credentials when making requests that depend on the user's session.

## 🔒 Security

- Passwords are hashed using bcryptjs.
- Session cookies are configured as HTTP-only.
- Production session cookies use secure settings.
- CORS is configured to allow the intended frontend origin.
- API keys and session secrets are supplied through environment variables.

**Important:** Keep your API keys, session secrets, passwords, and other credentials out of source code and public repositories.

## 📂 Project Structure

```text
Chatbot/
├── public/
├── src/
│   ├── assets/
│   ├── component/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── server/
│   ├── routes/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🧪 Testing Checklist

- [ ] Open the deployed application.
- [ ] Register a new account.
- [ ] Log in and verify the session.
- [ ] Send a message and receive an AI response.
- [ ] Test conversation context.
- [ ] Test Markdown formatting.
- [ ] Check loading and error states.
- [ ] Log out and verify the session ends.
- [ ] Test the interface on mobile and desktop.
- [ ] Verify that no API keys or secrets are committed.

## 🎯 Learning Outcomes

This project provides practical experience with:

- React components, hooks, and state management
- Building frontend interfaces with Vite
- Creating REST API endpoints with Express
- Connecting an application to an AI API
- Managing authentication and sessions
- Working with environment variables and CORS
- Deploying a frontend and backend separately
- Using Git and GitHub for version control

## 👩‍💻 Author

**Edlawit Tsegaye**

Software Engineering Student | Full-Stack Developer

- GitHub: [@Edldev12](https://github.com/Edldev12)
- Portfolio: [Personal Portfolio](https://github.com/Edldev12/portfolio-React)

---

*Built as a full-stack learning project to explore AI integration, web development, and authentication.*
