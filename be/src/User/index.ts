import { Router } from "express";
const jwt = require("jsonwebtoken")

import * as UserController from './Controller'
import {verifyJwt} from "./Middleware";

const router = Router();

const routes = () => {
    router.get("/list-requested-item",UserController.listRequestedItem)
    router.post("/user/register",UserController.registerUser)
    router.post("/user/login",UserController.loginUser)
    router.post("/user/auth",verifyJwt,UserController.authUser)
    router.post('/user/resetpassword',UserController.resetPassword)
    router.post('/user/auth/resetpassword',verifyJwt,UserController.authReset)
    router.post('/user/requests',UserController.requestItem)
    router.post('/admin/add-item',UserController.addItem)
    router.get('/admin/list-item',UserController.listItems)

    return router;
}

export default routes;