import * as UserRepository from '../Repository'
import { IItem, IUser } from '../Repository/User.types'
const bcrypt = require('bcrypt');

//business logic

const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: 'kishimotosekai@gmail.com',
    pass: 'onxwqrvgwiwbebwq',
  },
});


export const loginUser = async (user:Partial<IUser>)=>{
    try{
        const data = await UserRepository.loginUser(user)
        console.log("At service",data)
        if(data && await bcrypt.compare(user.password, data.password)){
            const user = {"userName":data.userName,"role":data.role}
            const token = jwt.sign(user,process.env.SECRET_KEY)
            console.log("this is token",token,{"userName":data.userName})
            console.log(JSON.stringify(data))
            return ({token})
        }
        else{
            const error = new Error("User does not exist")
            error.name = '401'
            throw error
        }
    }
    catch(e){
        console.log('service',e)
        throw e
    }
}

export const registerUser = async (user:Partial<IUser>)=>{
    try{
        return await UserRepository.registerUser(user)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const authUser = (user:Partial<IUser>,decoded:any)=>{
    try{
        return UserRepository.authUser(user,decoded)
    }
    catch(e){
        console.log(e)
    }
}

export const resetPassword = async (user:Partial<IUser>)=>{
    try{
        const data = await UserRepository.resetPassword(user)
        console.log(data)
        if(data){
            const token = jwt.sign(data,process.env.SECRET_KEY)
            console.log("this is token",token,)

            const mailOptions = {
                from: 'kishimotosekai@gmail.com',
                to: 'amritachi58@gmail.com',
                subject: 'Password Reset',
                html: `
                  <p>You've requested a password reset for your account.</p>
                  <p>Click <a href="http://localhost:5173/resetpassword?token=${token}">here</a> to reset your password.</p>
                `,
              };
              
              await transporter.sendMail(mailOptions, (error:any, info:any) => {
                if (error) {
                  console.error('Error sending reset email:', error);
                  throw error
                } else {
                  console.log('Reset email sent:', info.response);
                }
              });
              return "Email Sent"
        }
        else{
            const err = new Error
            err.message = 'Email not found'
            err.name='401'
            throw err
        }
          
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const authReset = (user:Partial<IUser>,decoded:any)=>{
    try{
        return UserRepository.authReset(user,decoded)
    }
    catch(e){
        console.log(e)
    }
}

// export const addItem = (item:IItem)=>{
//     try{
//         return UserRepository.addItem(item)
//     }
//     catch(e){
//         console.log(e)
//     }
// }

// export const listItems = ()=>{
//     try{
//         return UserRepository.listItems()
//     }
//     catch(e){
//         console.log(e)
//     }
// }

// export const requestItem = (item:any)=>{
//     try{
//         return UserRepository.requestItem(item)
//     }
//     catch(e){
//         console.log(e)
//         throw e
//     }
// }

// export const listRequestedItem = ()=>{
//     try{
//         return UserRepository.listRequestedItem()
//     }
//     catch(e){
//         console.log(e)
//         throw e
//     }
// }