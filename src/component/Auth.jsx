import { useState } from "react";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "login" : "register";

      const body = isLogin
        ? { email, password }
        : { name, email, password };


      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      if (isLogin) {
        onLogin(data.user);
      } else {
        setIsLogin(true);
        setName("");
        setPassword("");
        setError("Account created! Please log in.");
      }
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p>
          {isLogin
            ? "Log in to continue chatting."
            : "Register to start chatting."}
        </p>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            maxLength={80}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          maxLength={72}
          required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : isLogin
              ? "Log In"
              : "Create Account"}
        </button>

        <p>
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Register" : "Log In"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Auth;
