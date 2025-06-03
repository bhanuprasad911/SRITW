
import styles from '../styles/Login.module.css'
import React from 'react'

import sritw from '/logo3.png'
import { useState } from 'react'
import Navbar from '../components/Navbar'


function Login() {

  const [formdata, setFormdata] = useState({
    id: '',
    password: ''
  })
const handleChange=(e)=>{
  setFormdata({...formdata,[e.target.name]:e.target.value})
}
    function handleSubmit(){
      console.log(formdata)
        
    }
  return (
    
    <div className={styles.main}>
      <Navbar />
           
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