
import styles from '../styles/Login.module.css'
import React from 'react'

import sritw from '/logo3.png'
import { useState } from 'react'

function Login() {
    
    const [username,setUser]=useState('')
    const[Password,setPassword]=useState('')
    function handleSubmit(){
        
    }
  return (
    
    <div className={styles.main}>
           
            <div className={styles.master}>
            <img src={sritw} alt="" className={styles.logo}/>
            <p className={styles.loginCaption}>Student/Faculty Login</p>
            <input type="text" placeholder="Username" />
            <input type="text"  placeholder="Password"/>
            <button className={styles.submit} onClick={handleSubmit}>Submit</button>
            </div>
       
    </div>
  )
}

export default Login