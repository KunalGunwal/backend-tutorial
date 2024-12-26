import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // seaching easy ho jati h
        },
        email : {
            type : String,
            required : true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName : {
            type : String,
            required : true,
            trim: true, 
            index: true          
        },
        avatar: {
            type : String, // cloudinary url
            required :true,
        },
        coverImage : {
            type:String,
        },
        watchHistory : [{
            type : mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }],
        password: {
            type: String,
            required:[true, 'Password is required']
        },
        refreshToken:{
            type : String
        }
    }, {timestamps:true}
)

userSchema.pre("save", async function (next) {
    if(! this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
 
userSchema.method.generateAccessToken = function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)