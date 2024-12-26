import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

//cookie pasar ka kaam - access the cookies of user's browser and set its cookies
const app  = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "16kb"})) // limit, extended wagarah extra options h
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public")) // koi bhi public cheeze rakhne ke liye

 app.use(cookieParser())


export { app }

