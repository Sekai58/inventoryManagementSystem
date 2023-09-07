import { ObjectId } from "mongodb";
import {IItem} from "./Item.types"
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

//connection to database
// const uri = "mongodb+srv://fellow:yvq1V3UUdLwvlaEz@webdevelopment.tuy8pst.mongodb.net/";
const uri ="mongodb+srv://sekai:pkQPAJ6iYRtXODVZ@cluster0.n4wsw5o.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('webdevelopment')

export const addItem= async(item:IItem)=>{
    try{
        const inventory = database.collection('inventory')
        const newItem = {...item,reserved:0}
        const updateItem = await inventory.insertOne(newItem)
        console.log("item inserted",updateItem.insertedId)
        return updateItem
    }
    catch(e){
        throw e
        return e
    }
}

export const listItems= async()=>{
    try{
        const inventory = database.collection('inventory')
        const items = await inventory.find({}).toArray()
        return items
    }
    catch(e){
        console.log(e)
        throw e
        return e
    }
}

export const requestItem= async(item:any)=>{
    try{
        const inventory = database.collection('requests')
        const checkRequest = await inventory.findOne(item)
        if(checkRequest){
            const err = new Error
            err.message = "Already requested"
            err.name = '403'
            throw err
        }
        else{
            const updateUser = await inventory.insertOne(item)
            console.log("item inserted",updateUser.insertedId)
            return updateUser
        } 
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const listRequestedItem= async()=>{
    try{
        const inventory = database.collection('requests')
        const items = await inventory.find({}).toArray()
        console.log(items)
        return items
    }
    catch(e){
        console.log(e)
        throw e
    }
}