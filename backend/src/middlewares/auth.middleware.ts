import { NextFunction, Response, Request } from "express";
import { TypeReqExpWithUser } from "src/interfaces/req.withUser.type";
import { verify } from 'jsonwebtoken';
import { secret } from "../jwt_secret";
import { MyAppSourceData } from "../../main";
import { UserEntity } from "../entity/user.entity";
import { IUserResWithTokenOrWithout } from "../interfaces/user.response.token.interface";

async function auth(req: TypeReqExpWithUser, res: Response, next: NextFunction) {

    try {

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json("Unauthorized");
        }

        const tokenData = verify(token, secret) as IUserResWithTokenOrWithout;
        const user = await MyAppSourceData.manager.findOneBy(UserEntity, { id: tokenData.id });
        req.user = user;
        next();

    } catch (e) {

        console.log(e);
        return res.status(403).json("Unauthorized");

    }

}


export default auth