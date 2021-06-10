import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import logo from "./images/messenger.png";
import { getCookie } from "./util/cookies";

function Login() {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const csrftoken = getCookie("csrftoken");
    console.log(process.env.REACT_APP_API_URL);

    const request = new Request(`${process.env.REACT_APP_API_URL}/login`, {
      headers: { "X-CSRFToken": csrftoken },
    });

    const res = await fetch(request, {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
    });

    const redirect = (await res).redirected;
    const response = await res;
    console.log(response, redirect);

    if (redirect) history.push("/");
    else {
      const data = (await res).json();
      setMessage((await data).message);
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <div className="flex">
      <div className="hidden md:grid w-2/5 h-screen place-items-center">
        <img className="h-80 w-80" src={logo} alt="Messenger Logo" />
      </div>
      <div className="w-full md:w-1/2 h-screen flex items-center p-5 md:p-20">
        <div className="w-full">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            method="post"
            action="/login"
            onSubmit={handleFormSubmit}
          >
            <p className="text-red-500 text-xs md:text-base italic">
              {message}
            </p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autoFocus
                id="username"
                ref={usernameRef}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                ref={passwordRef}
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="Sign In"
              />
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/register"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
