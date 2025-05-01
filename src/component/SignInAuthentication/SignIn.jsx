import React from "react";
import bgImage from "./Image1.jpg"; 

const SignIn = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm bg-opacity-90 backdrop-blur border border-gray-300">
        <h2 className="text-2xl font-bold mb-1 text-center">Welcome Back!</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter your details
        </p>

        <form>
          <label className="block text-sm font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <label className="block text-sm font-semibold mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <div className="flex items-center justify-between text-sm mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember
            </label>
            <a href="#" className="text-red-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-red-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
