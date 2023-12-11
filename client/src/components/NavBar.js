import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-around p-3 border-b border-zinc-800 items-center">
      <Link to="/">
        <h1>fitted</h1>
      </Link>
      <ul className="flex gap-6">
        {isUserSignedIn ? (
          <>
            <Link to="/account">
              <li>Account</li>{" "}
            </Link>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/register">
              <li>Signup</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
