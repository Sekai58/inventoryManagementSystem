import { NextFunction, Request, Response } from 'express';
import * as UserService from '../Service';
//return only status

export const loginUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        res.status(201).json(await UserService.loginUser(req.body))
    }
    catch(e:any){
       console.log("controller error catch",e)
       next(e)
    }
}

export const registerUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        res.status(201).json(await UserService.registerUser(req.body))
    }
    catch(e){
        next(e)
    }
}

export const authUser = async (req:Request,res:Response)=>{
    try{
        console.log("at auth user",req.user)
        res.status(201).json(await UserService.authUser(req.body,req.user))
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const resetPassword = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.resetPassword(req.body))
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const authReset = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.authReset(req.body,req.user))
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const listUser = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.listUser())
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const listNotification = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.listNotification())
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const updateNotification = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.updateNotification(req.params.id))
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const changeRole = async(req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.changeRole(req.params.id))
    }
    catch(e){
        res.status(500).json(e)
    }
}

