import '../styles/App.css';
import Header from './Header';
import Main from './Main';
import { useState } from 'react'
import { setUserToken, clearUserToken, getUserToken } from '../utils/authToken'
import { useEffect } from 'react'
import decode from 'jwt-decode'


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const registerUser = async (data) => { 
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const newUser = await fetch(
        "http://localhost:4000/auth/register",
        configs
      );

      const parsedUser = await newUser.json();
      console.log(parsedUser);
      // sets local storage
      setUserToken(parsedUser.token);
      // put the returned user object in state
      setCurrentUser(parsedUser.currentUser);
      // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.isLoggedIn);
      return parsedUser;
    } catch (err) {
      console.log(err);
      clearUserToken();
      setIsAuthenticated(false);
      return false;
    }
  };

  const loginUser = async (data) => {
    
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:4000/auth/login", configs);
      const user = await response.json();
      // console.log(user);

      // sets local storage
      setUserToken(user.token);
      // put the returned user object in state
      setCurrentUser(user.user);
      // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(user.isLoggedIn);

      return user;
    } catch (err) {
      clearUserToken();
      setCurrentUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  const getUser = async () => {
    const token = getUserToken();
    try {
      if (token) {
        console.log(token)
        const user = decode(token);
        console.log(user)
        const response = await fetch(
          `http://localhost:4000/auth/user/${user.id}`, {headers: {"Authorization":`bearer ${token}`}}
        );
        console.log(response)
        const foundUser = await response.json();
        // console.log(foundUser)
        setCurrentUser(foundUser);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("updating user info in App")
    getUser();
  }, [currentUser?._id]);

  const logoutUser = () => {
    clearUserToken();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Header user={currentUser} handleLogout={logoutUser} />
      <Main
        getUser={getUser}
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
        handleLogin={loginUser}
        handleSignup={registerUser}
        handleLogout={logoutUser}
      />
    </div>
  );
}

export default App;
