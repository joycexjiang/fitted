import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Account from "./pages/Account";
import CreateOutfit from "./pages/createOutfit.js";
import "./App.css";
import { Routes, Route } from "react-router-dom";
//baseui
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StatefulInput } from "baseui/input";
//
//cursor
import { bubbleCursor } from "cursor-effects";

new bubbleCursor({ text: "❀" });

function App() {
  const engine = new Styletron();
  const Centered = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  });

  const isUserSignedIn = !!localStorage.getItem("token");

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <NavBar />
        <Centered>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {isUserSignedIn && <Route path="/account" element={<Account />} />}

            <Route path="/" element={<Dashboard />} />
            <Route path="/create-post" element={<CreateOutfit />} />
          </Routes>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
