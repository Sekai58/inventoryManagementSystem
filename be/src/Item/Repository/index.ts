import { ObjectId } from "mongodb";
import {IItem} from "./Item.types"
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

//connection to database
const uri ="mongodb+srv://sekai:pkQPAJ6iYRtXODVZ@cluster0.n4wsw5o.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('webdevelopment')

export const addItem= async(item:IItem)=>{
    try{
        const inventory = database.collection('inventory')
        const parsedItem = {"available":Number(item.available),"reserved":0,"url":item.url}
        const newItem = {...item,...parsedItem}
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
    }
}

export const requestItem= async(item:any)=>{
    try{
        const requests = database.collection('requests')
        const checkRequest = await requests.findOne({"product_id":new ObjectId(item.id),"userName":new ObjectId(item.userName)})
        console.log("checkrequest",checkRequest)
        if(checkRequest){
            console.log("checking user",item.userName)
            const err = new Error
            err.message = "Already requested"
            err.name = '403'
            throw err
        }
        else{
            const notification = database.collection('notification')
            const addNotification = notification.insertOne({"user_id":new ObjectId(item.userName),"message":item.message,"status":"Unread"})
            const insertItem = await requests.insertOne({"product_id":new ObjectId(item.id),"userName":new ObjectId(item.userName),"date":new Date().toLocaleDateString()})
            const updateItem = database.collection('inventory')
            const updated = await updateItem.updateOne({"_id":new ObjectId(item.id)},{"$inc":{"reserved":1}})
            return insertItem
        } 
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const listRequestedItem= async()=>{
    try{
        const pipeline = [
            {
              $lookup: {
                from: 'inventory', 
                localField: 'product_id', 
                foreignField: '_id', 
                as: 'productInfo',
              },
            },
            {
                $lookup: {
                  from: 'users', 
                  localField: 'userName', 
                  foreignField: '_id', 
                  as: 'userInfo',
                },
              },
            {
                $unwind: '$productInfo',
            },
            {
                $unwind: '$userInfo',
            },
            {
                $project: { 
                    "userInfo.userName":1,
                    "userInfo.url":1,
                    "productInfo":1,
                    "date":1
                },
            },
            {
                $addFields: { productInfo: '$productInfo' },
            },
          ];

        const result = await database.collection('requests').aggregate(pipeline).toArray();
        return result
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const approveItem= async(item:any)=>{
    try{
        const requests = database.collection('requests')
        const approved = database.collection('approved')
        console.log(item)
        const checkItem = await requests.findOne({"_id":new ObjectId(item)})
        console.log("check item to delete",checkItem,item)
        if (checkItem){
            const approvedItem = await approved.insertOne({...checkItem,"date":new Date().toLocaleDateString()})
            const items = await requests.deleteOne(checkItem)
            console.log("checking item name",item)
            const inventory = database.collection('inventory')
            const checkavailable = await inventory.findOne({"_id":new ObjectId(checkItem.product_id)})
            console.log("availablecheck",checkavailable)
            if(checkavailable.available>0 && checkavailable.reserved>0){
                const updateItem = await inventory.updateOne({"_id":new ObjectId(checkItem.product_id)},{"$inc":{"available":-1,"reserved":-1}})
            }
        }
        else{
            throw Error("Request not found")
        }
        console.log(item)
        return "success reached delete api"
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const listApprovedItem= async()=>{
    try{

        const pipeline = [
            {
              $lookup: {
                from: 'inventory', 
                localField: 'product_id', 
                foreignField: '_id', 
                as: 'productInfo',
              },
            },
            {
                $lookup: {
                  from: 'users', 
                  localField: 'userName', 
                  foreignField: '_id', 
                  as: 'userInfo',
                },
              },
            {
                $unwind: '$productInfo',
            },
            {
                $unwind: '$userInfo',
            },
            {
                $project: { 
                    "userInfo.userName":1,
                    "userInfo.url":1,
                    "productInfo":1,
                    "date":1
                },
            },
            {
                $addFields: { productInfo: '$productInfo' },
            },
          ];

        const result = await database.collection('approved').aggregate(pipeline).toArray();
        return result
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const countItems= async()=>{
    try{
        const countRequests = await database.collection('requests').countDocuments()
        const countUsers = await database.collection('users').countDocuments()
        const pipeline = [
            {
              $group: {
                _id: null,
                totalItems: { $sum: '$available' },
              },
            },
            {
                $unwind:'$totalItems',
            }
          ];
        
        const available = await database.collection('inventory').aggregate(pipeline).toArray((err:any,result:any)=>{console.log(result)})
        return {requests:countRequests,users:countUsers,available:available[0].totalItems}
    }
    catch(e){
        console.log(e)
        throw e
        return e
    }
}

export const editItem= async(item:any)=>{
    try{
        const inventory = database.collection('inventory')
        const checkItem = await inventory.findOne({"_id":new ObjectId(item._id)})
        console.log(checkItem)
        if(checkItem){
            const items = await inventory.updateOne({"_id":new ObjectId(item._id)},{"$set":{"available":Number(item.available),"reserved":Number(item.reserved),"name":item.name}})
            return items
        }
        else{
            throw Error("Unauthorized")
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const deleteItem= async(item:string)=>{
    try{
        const inventory = database.collection('inventory')
        console.log("id here at repo",item)
        const checkItem = await inventory.findOne({"_id":new ObjectId(String(item))})
        if (checkItem){
            const deleteItem = await inventory.deleteOne({"_id":new ObjectId(String(item))})
        }
        else{
            throw Error("Item not found")
        }
        console.log("item inserted",deleteItem,checkItem)
        return deleteItem
    }
    catch(e){
        throw e
    }
}