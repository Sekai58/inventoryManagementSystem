import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const fe_token = req.headers.authorization
  const token = authHeader?authHeader:null
    //console.log(token,authHeader,fe_token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }
  jwt.verify(token,process.env.SECRET_KEY as string,(err: any, decoded:any)=>{
    if (err) return res.status(403).json("Unauthorized")
    req.user = decoded;
    next()//can directly send user as argument to next 
  })
};
