import { Router } from "express";

import * as UserController from '../Controller'

const router = Router();

const routes = () => {
    router.get("/list-requested-item",UserController.listRequestedItem)
    router.post('/user/requests',UserController.requestItem)
    router.post('/admin/add-item',UserController.addItem)
    router.get('/admin/list-item',UserController.listItems)
    router.delete('/user/requests',UserController.deleteItem)

    return router;
}

export default routes;