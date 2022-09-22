import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const AuthForm = ({signal, ...rest }) => {
  const navigate = useNavigate()
  const data = { ...rest };
  const {login} = data

  const [userInput, setUserInput] = useState({ username: "", password: "" });

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authResponse = await signal(userInput)
      console.log(authResponse)
      navigate('/', {replace: true})
    }catch(err){
      console.log(err)
      navigate('/auth/login', {replace: true})
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Username</span>
        <input
          type="text"
          required
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
          value={userInput.username}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          required
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={userInput.password}
        />
      </label>
      <input type="submit" value={login ? "Login" : "Signup"} />
    </form>
  );
}

export default AuthForm