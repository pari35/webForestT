import { useState } from 'react'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import './App.css'
import Registration from './Registration'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'

function App() {
 
  return (
   
     <BrowserRouter>
      <Routes>
      
        <Route path='/register' element={<Registration />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route>
        <Route path='/dashboard' element={<Users />}></Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
