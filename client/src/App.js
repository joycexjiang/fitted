import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Account from "./pages/Account";
import CreateOutfit from "./pages/CreateOutfit.js";

import "./App.css";
// import "./styles/index.css";
// import "./styles/tailwind.css";
import { Routes, Route } from "react-router-dom";
//cursor
import { bubbleCursor } from "cursor-effects";
new bubbleCursor({ text: "❀" });

function App() {
  const isUserSignedIn = !!localStorage.getItem("token");

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isUserSignedIn && <Route path="/account" element={<Account />} />}

        <Route path="/" element={<Dashboard />} />
        <Route path="/create-post" element={<CreateOutfit />} />
      </Routes>
    </div>
  );
}

export default App;
