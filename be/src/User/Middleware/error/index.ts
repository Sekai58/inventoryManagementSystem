import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.status((err.name=="Error")?500:Number(err.name)||500).json(err.message||"Server error")
}