import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Photography from '../pages/Photography'
import Show from '../pages/Show'
import AuthForm from './AuthForm'

const Main = ({currentUser, getUser, handleLogin, HandleSignup, isAuthenticated }) => {
  const URL = "http://localhost:4000/";
  return (
    <main>
      
        <Routes>
            <Route path='/' element={<Photography URL={URL} isAuthenticated={isAuthenticated}/>} />
            <Route path='/photography/:id' element={<Show URL={URL} getUser={getUser} user={currentUser} isAuthenticated={isAuthenticated} />} />
            <Route path='/auth/login' element={<AuthForm signal={handleLogin} login/> } />
            <Route path='/auth/register' element={<AuthForm signal={HandleSignup} />} />
            <Route path="/auth/logout" element={<Navigate to="/auth/login" />}/>
        </Routes>
    </main>
  )
}

export default Main