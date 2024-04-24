import React, { useEffect, useState } from "react";
import axios from "axios";

import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

//main function
const Login = () => {

  //states and functions
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  }

  return (
    <div>

      <div className=" bg-[url('images/loginpagebgimage.jpg')] bg-cover bg-no-repeat">
        <div className="min-h-screen flex flex-col items-center justify-center lg:p-20 p-4">
          <div className="grid md:grid-cols-2 max-w-8xl w-full">
            <div className="max-md:text-center">

            </div>
            <form className="bg-gray-400 bg-opacity-50 rounded-2xl px-6 py-8 space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full"
              onSubmit={handleSubmit}>
              <h3 className="text-2xl font-bold mb-5 text-center">
                Welcome to MedFlow
              </h3>
              <h4 className="text-center">
                Please enter your login credentials
              </h4>
              <div>
                <input
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-2xl outline-[#333]"
                  placeholder="Email address"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-2xl outline-[#333]"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="!mt-10">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl opacity-80 text-white bg-[#333] hover:bg-[#222] focus:outline-none"
                >
                  {isLoading ?
                    (<svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" class="ml-2 inline animate-spin"
                      viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M7.03 2.757a1 1 0 0 1 1.213-.727l4 1a1 1 0 0 1 .59 1.525l-2 3a1 1 0 0 1-1.665-1.11l.755-1.132a7.003 7.003 0 0 0-2.735 11.77 1 1 0 0 1-1.376 1.453A8.978 8.978 0 0 1 3 12a9 9 0 0 1 4.874-8l-.117-.03a1 1 0 0 1-.727-1.213zm10.092 3.017a1 1 0 0 1 1.414.038A8.973 8.973 0 0 1 21 12a9 9 0 0 1-5.068 8.098 1 1 0 0 1-.707 1.864l-3.5-1a1 1 0 0 1-.557-1.517l2-3a1 1 0 0 1 1.664 1.11l-.755 1.132a7.003 7.003 0 0 0 3.006-11.5 1 1 0 0 1 .039-1.413z"
                        clip-rule="evenodd" data-original="#000000" />
                    </svg>) : "Log in"}

                </button>
                {error && <div className="text-red-500 text-sm mt-5 p-5 font-medium text-center animate-fade bg-red-600 bg-opacity-10 border-2 border-red-500 border-opacity-20 rounded-xl">{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div >
      <footer className="bg-gray-800 text-gray-300 py-5 sm:px-16 px-6 font-[sans-serif]">
        <div className="lg:flex lg:justify-between lg:items-cente max-lg:text-center">
          <p className="text-base">© 2024 MedFlow All Rights Reserved.</p>
          <ul className="flex space-x-6 gap-y-2 max-lg:mt-4 max-lg:justify-center flex-wrap">
            <li><Link to='' className="text-base hover:text-white">Terms of Service</Link></li>
            <li><Link to='' className="text-base hover:text-white">Privacy Policy</Link></li>
            <li><Link to='' className="text-base hover:text-white">Contact</Link></li>
          </ul>
        </div>
      </footer >
    </div >

  );
};

export default Login;
