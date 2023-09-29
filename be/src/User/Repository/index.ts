import { ObjectId } from "mongodb";
import {IUser,IItem } from "./User.types"
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

//connection to database
const uri ="mongodb+srv://sekai:pkQPAJ6iYRtXODVZ@cluster0.n4wsw5o.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('webdevelopment')

export const registerUser = async(user:Partial<IUser>)=>{
    try{
        const users = database.collection('users')
        const checkUserName = await users.findOne({"userName":user.userName})
        const checkEmail = await users.findOne({"email":user.email})
        console.log(checkEmail,checkUserName)
        if(checkUserName){
            const error = new Error
            error.message = "Username taken"
            error.name = '401'
            throw error
        }
        if(checkEmail){
            const error = new Error
            error.message = "Email taken"
            error.name = '401'
            throw error
        }
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = {...user,role:'USER'}
        const insertedUser = await users.insertOne(newUser)
        return "User successfully inserted"
    }
    catch(e){
        throw e
    }
}

export const loginUser= async(user:Partial<IUser>)=>{
    try{
        const users = database.collection('users')
        const data = await users.findOne({"userName":user.userName})
        console.log("At repo",data)
        return data
    }
    catch(e){
        console.log('catch', e);
        throw e
    }
}

export const authUser= async(user:Partial<IUser>,decoded:any)=>{
    try{
        const {_id,userName,email,role,gender,url} = decoded
        const userInfo = {
            _id:_id,
            userName:userName,
            email:email,
            role:role,
            gender:gender,
            url:url
        }
        return userInfo
    }
    catch(e){
        return e
    }
}

export const resetPassword= async(user:Partial<IUser>)=>{
    try{
        const users = database.collection('users')
        console.log("At repo email check",user.email)
        const data = await users.findOne({"email":user.email})
        console.log("At repo",data)
        return data
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const authReset= async(user:Partial<IUser>,decoded:any)=>{
    try{
        const users = database.collection('users')
        const updateUser = await users.updateOne({"email":decoded.email},{"$set": { "password":bcrypt.hash(user.password,10) }})
        // console.log("finding email from decoded value",decoded)
        return "Password updated"
    }
    catch(e){
        return e
    }
}

export const listUser = async()=>{
    try{
        const users = database.collection('users')
        const allUsers = database.collection('users').aggregate([
            {
              $project: {
                userName: 1,
                firstname:1,
                email:1,
                gender:1,
                role:1,
                url:1
              }
            }
          ]).toArray();          
        return allUsers
    }
    catch(err){
        throw err
    }
}

export const listNotification= async()=>{
    try{
        const pipeline = [
            {
                $lookup: {
                  from: 'users', 
                  localField: 'user_id', 
                  foreignField: '_id', 
                  as: 'userInfo',
                },
              },
              {
                $addFields: { 
                    "userName":"$userInfo.userName",
                    "url":"$userInfo.url"
                },
            },
            {
                $unwind:"$userName"
            },
            {
                $project:{
                    "userName":1,
                    "url":1,
                    "message":1,
                    "status":1
                }
            },
        ]
        const notification = await database.collection('notification').aggregate(pipeline).toArray()
        return notification
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const updateNotification = async(id:any)=>{
    try{
        const notification = database.collection('notification')
        const check = await notification.findOne({"_id":new ObjectId(String(id))})
        if(check){
            const update = await notification.updateOne({"_id":new ObjectId(String(id))},{"$set": { "status":"Read"}})
            return update
        }
    }
    catch(e){
        throw e
    }
}

export const changeRole = async(id:any)=>{
    try{
        console.log("from fe",id)
        const users = database.collection('users')
        const user = await users.findOne({_id:new ObjectId(id)})
        console.log(user)
        if(user){
            const checkrole = user.role
            if(checkrole==='ADMIN'){
                const updatedUser = users.updateOne({_id:new ObjectId(id)},{$set:{role:'USER'}})
            }
            else{
                const updatedUser = users.updateOne({_id:new ObjectId(id)},{$set:{role:'ADMIN'}})
            }
        }
        else{
            throw Error("User not found")
        }
    }
    catch(e){
        throw e
    }

}