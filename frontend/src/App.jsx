import React from 'react'
import styles from './styles/App.module.css'
import Homepage from './pages/Homepage.jsx'
import { Routes, Route } from 'react-router'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Facultypage from './pages/Facultypage.jsx'

function App() {
  return (
    <div className={styles.main}>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/faculty' element={<Facultypage />} />
      </Routes>

    </div>
  )
}

export default App