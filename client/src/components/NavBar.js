import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import fittedLogo from "../images/fitted_logo.svg";

function NavBar() {
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-3 pr-20 pl-20 items-center">
      <Link to="/">
        <img
          src={fittedLogo}
          alt="Logo"
          class="h-16 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20
        lg:w-20"
        />
      </Link>

      <ul className="flex gap-6">
        {isUserSignedIn ? (
          <>
            <Button color="crimson" variant="soft">
              <Link to="/create-post"> add an outfit</Link>
            </Button>

            <Button variant="outline" highContrast>
              <Link to="/account">account</Link>
            </Button>

            <Button
              variant="outline"
              radius="large"
              highContrast
              onClick={handleSignOut}
              cursor="pointer"
            >
              log out
            </Button>
          </>
        ) : (
          <>
            <Button color="crimson" radius="large" variant="soft">
              <Link to="/login"> login</Link>
            </Button>

            <Button
              variant="outline"
              radius="large"
              highContrast
              color="crimson"
              cursor-pointer
            >
              <Link to="/register"> sign up</Link>
            </Button>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
