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
        //res.status(500).json(e)
    }
}

export const authUser = async (req:Request,res:Response)=>{
    try{
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

// export const addItem = async (req:Request,res:Response)=>{
//     try{
//         res.status(201).json(await UserService.addItem(req.body))
//     }
//     catch(e){
//         res.status(500).json(e)
//     }
// }

// export const listItems = async (req:Request,res:Response)=>{
//     try{
//         res.status(201).json(await UserService.listItems())
//     }
//     catch(e){
//         console.log(e)
//         res.status(500).json(e)
//     }
// }

// export const requestItem = async (req:Request,res:Response,next:NextFunction)=>{
//     try{
//         res.status(201).json(await UserService.requestItem(req.body))
//     }
//     catch(e){
//         console.log(e)
//        next(e)
//         //res.status(500).json(e)
//     }
// }

// export const listRequestedItem = async (req:Request,res:Response,next:NextFunction)=>{
//     try{
//         res.status(201).json(await UserService.listRequestedItem())
//     }
//     catch(e){
//         console.log(e)
//        next(e)
//         //res.status(500).json(e)
//     }
// }
