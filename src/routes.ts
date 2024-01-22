import {Router} from "express";

import {UserController} from "./controller/user/UserController";

const userController = new UserController();

const router = Router();

// Rotas de usuário
router.post("/users", userController.createUser);


export {router};