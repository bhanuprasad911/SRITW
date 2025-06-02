import React from 'react'
import styles from './styles/App.module.css'
import Homepage from './pages/Homepage.jsx'
import { Routes, Route } from 'react-router'
import Login from './pages/Login.jsx'

function App() {
  return (
    <div className={styles.main}>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </div>
  )
}

export default App