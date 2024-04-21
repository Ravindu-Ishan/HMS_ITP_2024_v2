import React, { useEffect, useState } from "react";
import axios from "axios";

import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

//main function
const Login = () => {

  //states and functions
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(null);
  const { login, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(username, password);
    setLoading(false);
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
                  Log in
                </button>
                {error && <div className="text-red-500 text-sm mt-5 p-5 font-medium text-center animate-fade bg-red-600 bg-opacity-10 border-2 border-red-500 border-opacity-20 rounded-xl">{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
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
