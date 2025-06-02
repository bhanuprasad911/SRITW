import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import dbConnection from './configs/dbConnection.js'
const app=express()
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials:true
        }
))
app.use(express.json())
app.use(cookieparser())

app.listen(5000,function(){
    console.log("server")
    dbConnection()
})