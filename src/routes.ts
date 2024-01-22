import {Router} from "express";

import {UserController} from "./controller/user/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { HaircutController } from "./controller/haircut/HaircutController";

const userController = new UserController();
const haircutController = new HaircutController();

const router = Router();

// Rotas de usuário
router.post("/users", userController.createUser);
router.post("/users/auth", userController.authUser);
router.get("/me", isAuthenticated, userController.getUser);
router.put("/me", isAuthenticated, userController.updateUser);

// Rotas de Cortes de cabelo
router.post("/haircuts", isAuthenticated, haircutController.createHaircut);
router.get("/haircuts", isAuthenticated, haircutController.listHaircuts);
router.put("/haircuts", isAuthenticated, haircutController.updateHaircut);

export {router};