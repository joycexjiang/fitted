import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState(""); // State variable to hold error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/auth/register").then((res) => {
      console.log(res.data);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("attempting..");
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      console.log("saved as a response", response.data);
      fetchUsers();
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      // Save user details in local storage or context
      localStorage.setItem("user", JSON.stringify(user)); // Save user information in local storage
      localStorage.setItem("userID", JSON.stringify(user._id));
      setEmail("");
      setPassword("");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log("login error :(", error.response.data.message);
      setError("login error :( :(", error.response.data.message); // Set a default error message
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                type="email"
                placeholder="email"
                autoComplete="email"
                required
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                password
              </label>
              <div className="text-sm">
                <a
                  href="/forgotpassword"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                required
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              sign in
            </button>
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        <p className="mt-10 text-center text-sm text-gray-500">
          not a member?{" "}
          <a
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
