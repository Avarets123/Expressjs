import { Express } from "express";
import * as express from 'express'
import routes from "./controllers";
import auth from './middlewares/auth.middleware';


const port = +process.env.PORT || 3000


export class App {
    private app: Express = express()


    constructor() {

        this.app.use(express.static(__dirname + "static"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(routes);
        this.app.use(auth);

    }




    public async start(): Promise<void> {
        this.app.listen(port, () => {
            console.log(`Server has ben started in ${port}`)

        });


    }



}

