import { ObjectId } from "mongodb";
import {IUser } from "./User.types"
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

//connection to database
// const uri = "mongodb+srv://fellow:yvq1V3UUdLwvlaEz@webdevelopment.tuy8pst.mongodb.net/";
const uri ="mongodb+srv://sekai:pkQPAJ6iYRtXODVZ@cluster0.n4wsw5o.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('webdevelopment')

export const registerUser = async(user:Partial<IUser>)=>{
    try{
        const users = database.collection('users')
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
        console.log(decoded)
        return decoded
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
        return e
    }
}

export const authReset= async(user:Partial<IUser>,decoded:any)=>{
    try{
        const users = database.collection('users')
        const updateUser = await users.updateOne({"email":decoded.email},{"$set": { "password":user.password }})
        console.log("finding email from decoded value",decoded)
        return "Password updated"
    }
    catch(e){
        return e
    }
}

// export const addItem= async(item:IItem)=>{
//     try{
//         const inventory = database.collection('inventory')
//         const newItem = {...item,reserved:0}
//         const updateItem = await inventory.insertOne(newItem)
//         console.log("item inserted",updateItem.insertedId)
//         return updateItem
//     }
//     catch(e){
//         throw e
//         return e
//     }
// }

// export const listItems= async()=>{
//     try{
//         const inventory = database.collection('inventory')
//         const items = await inventory.find({}).toArray()
//         //console.log(items)
//         return items
//     }
//     catch(e){
//         console.log(e)
//         throw e
//         return e
//     }
// }

// export const requestItem= async(item:any)=>{
//     try{
//         const inventory = database.collection('requests')
//         const checkRequest = await inventory.findOne(item)
//         if(checkRequest){
//             const err = new Error
//             err.message = "Already requested"
//             err.name = '403'
//             throw err
//         }
//         else{
//             const updateUser = await inventory.insertOne(item)
//             console.log("item inserted",updateUser.insertedId)
//             return updateUser
//         } 
//     }
//     catch(e){
//         console.log(e)
//         throw e
//     }
// }

// export const listRequestedItem= async()=>{
//     try{
//         const inventory = database.collection('requests')
//         const items = await inventory.find({}).toArray()
//         console.log(items)
//         return items
//     }
//     catch(e){
//         console.log(e)
//         throw e
//     }
// }