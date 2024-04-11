import React, { useEffect, useState } from "react";
import axios from "axios";

//import icons here

//main function
const Login = () => {
  //states and functions

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
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-2xl outline-[#333]"
                  placeholder="Email address"
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
                />
              </div>

              <div className="!mt-10">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl opacity-80 text-white bg-[#333] hover:bg-[#222] focus:outline-none"
                >
                  Log in
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
      <footer class="bg-gray-800 text-gray-300 py-5 sm:px-16 px-6 font-[sans-serif]">
        <div class="lg:flex lg:justify-between lg:items-cente max-lg:text-center">
          <p class="text-base">© 2024 MedFlow All Rights Reserved.</p>
          <ul class="flex space-x-6 gap-y-2 max-lg:mt-4 max-lg:justify-center flex-wrap">
            <li><a href="javascript:void(0)" class="text-base hover:text-white">Terms of Service</a></li>
            <li><a href="javascript:void(0)" class="text-base hover:text-white">Privacy Policy</a></li>
            <li><a href="javascript:void(0)" class="text-base hover:text-white">Contact</a></li>
          </ul>
        </div>
      </footer>
    </div>



  );
};

export default Login;
