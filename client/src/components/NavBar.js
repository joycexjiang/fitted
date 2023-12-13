import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { GlobeIcon } from "@radix-ui/react-icons";
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
          className="h-16 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20
        lg:w-20"
        />
      </Link>

      <ul className="flex gap-6">
        {isUserSignedIn ? (
          <>
            <Button variant="outline" highContrast>
              <Link to="/create-post"> add an outfit</Link>
            </Button>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button
                  className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-pink11 bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline"
                  aria-label="Account"
                >
                  <GlobeIcon />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item shortcut="">
                  <Link to="/account">account</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut="" onClick={handleSignOut}>
                  log out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </>
        ) : (
          <>
            <Button color="indigo" radius="large" variant="soft">
              <Link to="/login"> login</Link>
            </Button>

            <Button
              variant="outline"
              radius="large"
              highContrast
              color="indigo"
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
