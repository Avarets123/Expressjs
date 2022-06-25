declare const typeormConfig: {
    type: string;
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    entities: string[];
    synchronize: boolean;
    logging: boolean;
};
export default typeormConfig;
