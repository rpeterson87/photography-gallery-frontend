import React from 'react'
import { Route, Routes } from 'react-router'
import Photography from '../pages/Photography'
import Show from '../pages/Show'

const Main = () => {
  const URL = "http://localhost:4000/photography/";
  return (
    <main>
        <Routes>
            <Route path='/' element={<Photography URL={URL}/>} />
            <Route  path='/photo/:id' element={<Show URL={URL}/>} />
        </Routes>
    </main>
  )
}

export default Main