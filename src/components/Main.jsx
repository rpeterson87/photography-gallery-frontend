import React from 'react'
import { Route, Routes } from 'react-router'
import Photography from '../pages/Photography'
import Show from '../pages/Show'

const Main = () => {
  return (
    <main>
        <Routes>
            <Route path='/' element={<Photography />} />
            <Route  path='/photo/:id' element={<Show />} />
        </Routes>
    </main>
  )
}

export default Main