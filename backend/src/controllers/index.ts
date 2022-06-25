import { Request, Response, Router } from "express";
import auth from "../middlewares/auth.middleware";
import { AppService } from "../services";
import { loginValidation, registerValidation, updateValidation, showValidationError } from '../middlewares/validate.middleware'

const routes = Router();

const service = new AppService();


routes.post('/user/login', loginValidation, async (req: Request, res: Response) => {
    showValidationError(req, res);
    const user = await service.loginUser(req.body);
    return res.json(user);
});


routes.post('/user/register', registerValidation, async (req: Request, res: Response) => {
    showValidationError(req, res);
    const user = await service.registerUser(req.body);
    return res.json(user);
});

routes.put('/profile/:id', async (req: Request, res: Response) => {
    const user = await service.editUser(req.params.id, req.body);
    return res.json(user);
});


routes.get('/profile/:id', auth, async (req: Request, res: Response) => {
    const user = await service.getUser(req.params.id);
    return res.json(user);
});

routes.get('/profile', async (req: Request, res: Response) => {
    const users = await service.getUserWithQuery(req.query);
    res.json(users);

});

export default routes;