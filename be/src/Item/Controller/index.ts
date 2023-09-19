import { NextFunction, Request, Response } from 'express';
import * as UserService from '../Service';
//return only status

export const addItem = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.addItem(req.body))
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const listItems = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.listItems())
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const requestItem = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        res.status(201).json(await UserService.requestItem(req.body))
    }
    catch(e){
        console.log(e)
       next(e)
        //res.status(500).json(e)
    }
}

export const listRequestedItem = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        res.status(201).json(await UserService.listRequestedItem())
    }
    catch(e){
        console.log(e)
       next(e)
        //res.status(500).json(e)
    }
}

export const approveItem = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.params.id)
        res.status(201).json(await UserService.approveItem(String(req.params.id)))
    }
    catch(e){
        console.log(e)
       next(e)
        //res.status(500).json(e)
    }
}

export const listApprovedItem = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        res.status(201).json(await UserService.listApprovedItem())
    }
    catch(e){
        console.log(e)
       next(e)
        //res.status(500).json(e)
    }
}

export const countItems = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.countItems())
    }
    catch(e){
        console.log(e)
        //res.status(500).json(e)
    }
}

export const editItem = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.editItem(req.body))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const deleteItem = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.deleteItem(req.params.id))
    }
    catch(e){
        res.status(500).json(e)
    }
}