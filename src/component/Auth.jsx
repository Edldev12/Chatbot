import { useState } from "react";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (isRegister && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Temporary UI-only behavior.
    // Real authentication will be connected in the next step.
    setError("Authentication is not connected yet.");
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>My AI Chatbot</h1>

        <p className="auth-subtitle">
          {isRegister
            ? "Create your account"
            : "Welcome back"}
        </p>

        {isRegister && (
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </label>
        )}

        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete={
              isRegister ? "new-password" : "current-password"
            }
            minLength={8}
            required
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-submit" type="submit">
          {isRegister ? "Create Account" : "Log In"}
        </button>

        <p className="auth-switch">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister ? "Log in" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Auth;
