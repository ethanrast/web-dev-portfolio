import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Auth: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("Employee");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (isRegister) {
      // Registration
      const endpoint = "http://localhost:5189/api/Auth/register";
      const payload = { Name: name, Email: email, Role: role, Password: password };

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text();
          setError(`Failed registration: ${text}`);
          setLoading(false);
          return;
        }

        setIsRegister(false);
        setName("");
        setPassword("");
        setConfirmPassword("");
        setRole("Employee");
        setError("Registration successful! Please log in.");
      } catch (err) {
        console.error(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    } else {
      // Login using AuthContext
      try {
        const success = await login(email, password);
        
        if (success) {
          navigate("/home");
        } else {
          setError("Failed login attempt - invalid credentials");
        }
      } catch (err) {
        console.error(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }
  }

  function toggleMode() {
    setError("");
    setIsRegister(!isRegister);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("Employee");
  }

  return (
    <div className="login-page bg-dark text-light d-flex justify-content-center align-items-center vh-100">
      <div className="login-box bg-light text-dark p-4 rounded-4 shadow">
        <h1 className="text-center mb-4">Tricky Calendar</h1>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <label htmlFor="name" className="form-label fw-semibold">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                className="form-control mb-3"
              />

              <label htmlFor="role" className="form-label fw-semibold">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select mb-3"
              >
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>
            </>
          )}

          <label htmlFor="email" className="form-label fw-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="form-control mb-3"
          />

          <label htmlFor="password" className="form-label fw-semibold">
            Password
          </label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="form-control mb-3"
          />

          {isRegister && (
            <>
              <label htmlFor="confirmPassword" className="form-label fw-semibold">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type="password"
                className="form-control mb-3"
              />
            </>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary w-100">
            {loading ? (isRegister ? "Registering..." : "Logging in...") : isRegister ? "Register" : "Login"}
          </button>

          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </form>

        <p className="text-center mt-3">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="btn btn-link p-0" onClick={toggleMode}>
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
