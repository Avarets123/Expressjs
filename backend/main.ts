import { App } from "./src/app";
import 'reflect-metadata';
import typeormConfig from "./src/ormconfig";
import { DataSource, DataSourceOptions } from "typeorm";

const MyAppSourceData = new DataSource(typeormConfig as DataSourceOptions);

MyAppSourceData.initialize();

const app = new App();
app.start();

export { MyAppSourceData }
