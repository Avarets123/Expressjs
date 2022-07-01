import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { showValidationError } from '../middlewares/validate.middleware'


const userService = new UserService();

export class UserController {


    async loginUser(req: Request, res: Response) {

        showValidationError(req, res);
        const user = await userService.loginUser(req.body);
        return res.json(user);

    }


    async regUser(req: Request, res: Response) {
        try {
            console.log(req.body)
            showValidationError(req, res);

            const photo = req.file ? req.file.filename : null

            const user = await userService.registerUser(req.body, photo);
            return res.json(user)

        } catch (error) {
            console.log(error)
        }
    }


    async editUser(req: Request, res: Response) {

        try {

            const photo = req.file ? req.file.filename : null

            const user = await userService.editUser(req.params.id, req.body, photo);
            return res.json(user);

        } catch (error) {
            console.log(error)

        }


    }

    async getUser(req: Request, res: Response) {

        try {
            const user = await userService.getUser(req.params.id);
            return res.json(user);

        } catch (error) {
            console.log(error)

        }

    }

    async getUserWithQuery(req: Request, res: Response) {

        try {

            const users = await userService.getUserWithQuery(req.query);
            res.json(users);

        } catch (error) {
            console.log(error)

        }

    }


}


// routes.post('/user/login', loginValidation, async (req: Request, res: Response) => {
//     showValidationError(req, res);
//     const user = await this. .loginUser(req.body);
//     return res.json(user);
// });


// routes.post('/user/register', registerValidation, async (req: Request, res: Response) => {
//     showValidationError(req, res);
//     const user = await service.registerUser(req.body);
//     return res.json(user);
// });

// routes.put('/profile/:id', async (req: Request, res: Response) => {
//     const user = await service.editUser(req.params.id, req.body);
//     return res.json(user);
// });


// routes.get('/profile/:id', auth, async (req: Request, res: Response) => {
//     const user = await service.getUser(req.params.id);
//     return res.json(user);
// });

// routes.get('/profile', async (req: Request, res: Response) => {
//     const users = await service.getUserWithQuery(req.query);
//     res.json(users);

// });

// export default routes;