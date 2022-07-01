import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";
import { registerValidation, loginValidation } from "../middlewares/validate.middleware";
import { upload } from '../middlewares/upload.middleware';

const routes = Router();
const userController = new UserController()

routes.post('/user/register', upload.single('photo'), userController.regUser);
routes.post('/user/login', loginValidation, userController.loginUser);
routes.put('/profile/:id', upload.single('photo'), userController.editUser);
routes.get('/profile/:id', auth, userController.getUser);
routes.get('/profile', userController.getUserWithQuery);



export default routes;