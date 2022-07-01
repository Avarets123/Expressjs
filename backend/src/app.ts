import { Express } from "express";
import * as express from 'express'
import auth from './middlewares/auth.middleware';
import routes from "./routes/all.routes";
import cors from 'cors';


const port = +process.env.PORT || 3000


export class App {
    private app: Express = express()


    constructor() {

        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(routes);
        this.app.use(auth);
        this.app.use(express.static(__dirname + '/images'))
    }


    public async start(): Promise<void> {
        this.app.listen(port, () => {
            console.log(`Server has ben started in ${port}`)
        });
    }

}

