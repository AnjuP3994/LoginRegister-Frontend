import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Dashboard from '../Pages/Dashboard'

function roots() {
  return (
    <div>
      <Routes>
        <Route path='' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default roots