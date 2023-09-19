import { Router } from "express";

import * as UserController from '../Controller'

const router = Router();

const routes = () => {
    router.get("/list-requested-item",UserController.listRequestedItem)
    router.get("/list-approved-item",UserController.listApprovedItem)
    router.post('/user/requests',UserController.requestItem)
    router.post('/admin/add-item',UserController.addItem)
    router.get('/admin/list-item',UserController.listItems)
    router.delete('/user/requests/:id',UserController.approveItem)
    router.get('/count-item',UserController.countItems)
    router.put("/admin/edit-item",UserController.editItem)
    router.delete('/admin/delete-item/:id',UserController.deleteItem)

    return router;
}

export default routes;