import '../styles/App.css';
import Header from './Header';
import Main from './Main';
import { useState } from 'react';
import { setUserToken, clearUserToken, getUserToken } from '../utils/authToken';
import { useEffect } from 'react';
import decode from 'jwt-decode';


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
        "https://thedarkroom.herokuapp.com/auth/register",
        configs
      );
      const parsedUser = await newUser.json();

      setUserToken(parsedUser.token);

      setCurrentUser(parsedUser.currentUser);

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
      const response = await fetch("https://thedarkroom.herokuapp.com/auth/login", configs);
      const user = await response.json();

      setUserToken(user.token);
      setCurrentUser(user.user);
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
        const user = decode(token);
        const response = await fetch(
          `https://thedarkroom.herokuapp.com/auth/user/${user.id}`, { headers: { "Authorization": `bearer ${token}` } }
        );
        const foundUser = await response.json();
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
};

export default App;
