import React from 'react'
import styles from './styles/App.module.css'
import Homepage from './pages/Homepage.jsx'
import { Routes, Route } from 'react-router'

function App() {
  return (
    <div className={styles.main}>
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>

    </div>
  )
}

export default App