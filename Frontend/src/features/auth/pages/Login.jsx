// import React from 'react'
// import { useState } from "react"
// import { useAuth } from '../hooks/useAuth'

// const Login = () => {

//   const { handleLogin } = useAuth()

//   const [email, setEmail] =useState("")

//   const [password, setPassword] =useState("")

//   const submitHandler = async (e) => {
//     e.preventDefault()
//     await handleLogin({ email, password })
//   }

//   return (

//     <form onSubmit={submitHandler}>

//       <input
//         type="email"
//         value={email}
//         onChange={(e)=>
//           setEmail(e.target.value)
//         }
//       />

//       <input
//         type="password"
//         value={password}
//         onChange={(e)=>
//           setPassword(e.target.value)
//         }
//       />

//       <button>
//         Login
//       </button>

//     </form>
//   )
// }

// export default Login


import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { handleLogin } = useAuth();
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      
      {/* Login Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/40 animate-fadeIn">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 bg-white/80"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 bg-white/80"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.7s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Login;