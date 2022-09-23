import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Photography from '../pages/Photography'
import Show from '../pages/Show'
import AuthForm from './AuthForm'


const Main = ({ currentUser, getUser, handleLogin, handleSignup, isAuthenticated, removeFromCart, cartCounter }) => {
  const URL = "https://thedarkroom.herokuapp.com/";
  return (
    <main>
      <Routes>
        <Route path='/' element={<Photography URL={URL} isAuthenticated={isAuthenticated} removeFromCart={removeFromCart} cartCounter={cartCounter} />} />
        <Route path='/photography/:id' element={<Show URL={URL} getUser={getUser} user={currentUser} isAuthenticated={isAuthenticated} />} />
        <Route path='/auth/login' element={<AuthForm signal={handleLogin} login />} />
        <Route path='/auth/register' element={<AuthForm signal={handleSignup} />} />
        <Route path="/auth/logout" element={<Navigate to="/auth/login" />} />
      </Routes>
    </main>
  )
};

export default Main;