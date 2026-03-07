import React, { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import CreateGrievance from "./components/CreateGrievance";
import MyGrievance from "./components/MyGrievance";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(true);
  const [page, setPage] = useState("create");

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          {showRegister ? (
            <Register />
          ) : (
            <Login onLogin={() => setLoggedIn(true)} />
          )}
          <div className="auth-footer">
            <button
              type="button"
              className="btn-toggle-auth"
              onClick={() => setShowRegister(!showRegister)}
            >
              {showRegister ? "Already have an account? Go to Login" : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-brand-icon">G</span>
          <span className="navbar-brand-name">Grievance <span>Grid</span></span>
        </div>
        <ul className="navbar-links">
          <li>
            <button
              type="button"
              className={page === "create" ? "active" : ""}
              onClick={() => setPage("create")}
            >
              Create Grievance
            </button>
          </li>
          <li>
            <button
              type="button"
              className={page === "my" ? "active" : ""}
              onClick={() => setPage("my")}
            >
              My Grievances
            </button>
          </li>
          <li>
            <button type="button" className="btn-logout" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <main className="page-content">
        {page === "create" && <CreateGrievance />}
        {page === "my" && <MyGrievance />}
      </main>
    </div>
  );
}

export default App;
