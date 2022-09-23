import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ signal, ...rest }) => {
  const navigate = useNavigate();
  const data = { ...rest };
  const { login } = data;

  const [userInput, setUserInput] = useState({ username: "", password: "" });

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signal(userInput);
      navigate('/', { replace: true })
    } catch (err) {
      console.log(err)
      navigate('/auth/login', { replace: true });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        type="text"
        required
        name="username"
        placeholder="Enter your username"
        onChange={handleChange}
        value={userInput.username}
      />
      <label>Password</label>
      <input
        type="password"
        required
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
        value={userInput.password}
      />
      <input type="submit" value={login ? "Login" : "Signup"} />
    </form>
  );
};

export default AuthForm;