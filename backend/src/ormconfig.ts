
const host = process.env.MYSQL_HOST;

const typeormConfig = {
    type: 'mysql',
    host: host,
    port: 3306,
    database: 'main',
    username: 'admin',
    password: '123',
    entities: ["src/entity/*{.ts,.js}"],
    // entities: [UserEntity],
    synchronize: true,
    logging: false

};






export default typeormConfig;