import { Router } from "express";
const jwt = require("jsonwebtoken")

import * as UserController from './Controller'
import {verifyJwt} from "./Middleware";

const router = Router();

const routes = () => {
    router.post("/user/register",UserController.registerUser)
    router.post("/user/login",UserController.loginUser)
    router.post("/user/auth",verifyJwt,UserController.authUser)
    router.post('/user/resetpassword',UserController.resetPassword)
    router.post('/user/auth/resetpassword',verifyJwt,UserController.authReset)
    router.get('/admin/list-user',UserController.listUser)
    router.get('/admin/list-message',UserController.listNotification)
    router.put('/admin/update-message/:id',UserController.updateNotification)
    return router;
}

export default routes;