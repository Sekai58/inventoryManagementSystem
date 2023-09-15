import { ObjectId } from "mongodb";
import {IItem} from "./Item.types"
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
// import { ObjectId } from "mongodb";

//connection to database
// const uri = "mongodb+srv://fellow:yvq1V3UUdLwvlaEz@webdevelopment.tuy8pst.mongodb.net/";
const uri ="mongodb+srv://sekai:pkQPAJ6iYRtXODVZ@cluster0.n4wsw5o.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('webdevelopment')

export const addItem= async(item:IItem)=>{
    try{
        const inventory = database.collection('inventory')
        const parsedItem = {"available":Number(item.available),"reserved":0}
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
        return e
    }
}

export const requestItem= async(item:any)=>{
    try{
        const requests = database.collection('requests')
        const checkRequest = await requests.findOne({"product_id":new ObjectId(item.id),"userName":item.userName})
        console.log("checkrequest",checkRequest)
        if(checkRequest){
            console.log("checking user",item.userName)
            const err = new Error
            err.message = "Already requested"
            err.name = '403'
            throw err
        }
        else{
            // const updateUser = await requests.insertOne(item)
            // const updateItem = database.collection('inventory')
            // const updated = await updateItem.updateOne({"name":item.name},{"$inc":{"reserved":1}})
            // console.log("item inserted",updateUser.insertedId)
            // return updateUser


            const insertItem = await requests.insertOne({"product_id":new ObjectId(item.id),"userName":item.userName})
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
        // const inventory = database.collection('requests')
        // const items = await inventory.find({}).toArray()
        // console.log(items)
        // return items
        const pipeline = [
            {
              $lookup: {
                from: 'inventory', 
                localField: 'product_id', // Field in the "requests" collection that references products
                foreignField: '_id', // Field in the "products" collection that matches the reference
                as: 'productInfo', // Alias for the joined product information
              },
            },
            {
                $unwind: '$productInfo', // Unwind the productInfo array
              },
              {
                $addFields: { productInfo: '$productInfo' }, // Replace the root with the productInfo object
              },
          ];

        const result = await database.collection('requests').aggregate(pipeline).toArray();
        // console.log(result);
        return result
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const deleteItem= async(item:any)=>{
    try{
        const requests = database.collection('requests')
        const checkItem = await requests.findOne({"product_id":new ObjectId(item.product_id),"userName":item.userName})
        // const checkItem = await requests.findOne(item)
        console.log("check item to delete",checkItem,item)
        if (checkItem){
            const items = await requests.deleteOne({"product_id":new ObjectId(item.product_id),"userName":item.userName})
            console.log("checking item name",item)
            const inventory = database.collection('inventory')
            const checkavailable = await inventory.findOne({"_id":new ObjectId(item.product_id)})
            console.log("availablecheck",checkavailable)
            if(checkavailable.available>0 && checkavailable.reserved>0){
                const updateItem = await inventory.updateOne({"_id":new ObjectId(item.product_id)},{"$inc":{"available":-1,"reserved":-1}})
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


export const countItems= async()=>{
    try{
        const countRequests = await database.collection('requests').countDocuments()
        const countUsers = await database.collection('users').countDocuments()
        // console.log(countRequests)
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
        // console.log("aavailable",available)
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
        console.log("from fe",item)
        const inventory = database.collection('inventory')
        const checkItem = await inventory.findOne({"_id":new ObjectId(item._id)})
        console.log(checkItem)
        if(checkItem){
            const items = await inventory.updateOne({"_id":new ObjectId(item._id)},{"$set":{"available":item.available,"reserved":item.reserved,"name":item.name}})
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