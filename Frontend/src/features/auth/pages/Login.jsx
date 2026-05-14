import React from 'react'
import { useState } from "react"

const Login = () => {

  const { login } = useAuth()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const submitHandler = (e) => {

    e.preventDefault()

    login(email, password)
  }

  return (

    <form onSubmit={submitHandler}>

      <input
        type="email"
        value={email}
        onChange={(e)=>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        value={password}
        onChange={(e)=>
          setPassword(e.target.value)
        }
      />

      <button>
        Login
      </button>

    </form>
  )
}
}

export default Login