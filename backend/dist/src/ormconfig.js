"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const host = process.env.MYSQL_HOST;
const typeormConfig = {
    type: 'mysql',
    host: host,
    port: 3306,
    database: 'main',
    username: 'admin',
    password: '123',
    entities: ["src/entity/*{.ts,.js}"],
    synchronize: true,
    logging: false
};
exports.default = typeormConfig;
//# sourceMappingURL=ormconfig.js.map