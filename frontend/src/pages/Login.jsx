
import styles from '../styles/Login.module.css'
import React from 'react'

import sritw from '/logo3.png'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { login } from '../services/libs.js'
import { useNavigate } from 'react-router'




function Login({setUser}) {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [formdata, setFormdata] = useState({
    id: '',
    password: ''
  })
const handleChange=(e)=>{
  setFormdata({...formdata,[e.target.name]:e.target.value})
}
    const handleSubmit= async()=>{
      const response =await login(formdata)
      console.log(response)
      if(response.status===200){
        localStorage.setItem('currentUser', JSON.stringify(response.data.data))
        setUser(response.data.data)
        navigate('/')
        return
        
      }
      setError(response.data.message)
        
    }
  return (
    
    <div className={styles.main}>
      <Navbar />
      {
        error.length>0 &&
        <p>{error}</p>
      }
           
            <div className={styles.master}>
            <img src={sritw} alt="" className={styles.logo}/>
            <p className={styles.loginCaption}>Student/Faculty Login</p>
            <input type="text" placeholder="Username" value={formdata.id} name='id' onChange={(e)=>handleChange(e)}/>
            <input type="password"  placeholder="Password" value={formdata.password} name='password' onChange={(e)=>handleChange(e)}/>
            <button className={styles.submit} onClick={handleSubmit}>Submit</button>
            </div>
       
    </div>
  )
}

export default Login