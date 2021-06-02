import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import logo from "./images/messenger.png";
import { getCookie } from "./util/cookies";

function Register() {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const imageRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmationRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const csrftoken = getCookie("csrftoken");

    const request = new Request(`${process.env.REACT_APP_API_URL}/register`, {
      headers: { "X-CSRFToken": csrftoken },
    });

    fetch(request, {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        email: emailRef.current.value,
        image: imageRef.current.value,
        password: passwordRef.current.value,
        confirmation: confirmationRef.current.value,
      }),
    })
      .then((res) => {
        // If wasn't redirected to index something went wrong.
        if (res.redirected) history.push("/");
        else return res.json();
      })
      .then((response) => {
        if (response.message) setMessage(response.message);
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmationRef.current.value = "";
      });
  };

  return (
    <div>
      <div className="flex">
        <div className="hidden md:grid w-2/5 h-screen place-items-center">
          <img className="h-80 w-80" src={logo} alt="Messenger Logo" />
        </div>
        <div className="w-full md:w-1/2 h-screen flex items-center p-5 md:p-20">
          <div className="w-full">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  ref={emailRef}
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
                  htmlFor="imageUrl"
                >
                  Image Url
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="imageUrl"
                  ref={imageRef}
                  type="text"
                  placeholder="Image Url"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  ref={passwordRef}
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
                  htmlFor="confirmation"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmation"
                  type="password"
                  ref={confirmationRef}
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-between">
                <input
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  value="Sign Up"
                />
                <div>
                  Already have an account? {"   "}
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="/login"
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
