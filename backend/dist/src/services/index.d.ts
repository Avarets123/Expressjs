import { UserEntity } from '../entity/user.entity';
import { IUserReg } from '../interfaces/user.register.interafce';
import { Repository } from 'typeorm';
import { IUserLogin } from 'src/interfaces/user.login.interface';
import { IUserResWithTokenOrWithout } from 'src/interfaces/user.response.token.interface';
import { IUserEdit } from '../interfaces/user.edit.interface';
export declare class AppService {
    userRepository(): Repository<UserEntity>;
    registerUser(registerUser: IUserReg): Promise<UserEntity>;
    loginUser(logUser: IUserLogin): Promise<IUserResWithTokenOrWithout>;
    private generateToken;
    editUser(id: string, userEdit: IUserEdit): Promise<UserEntity>;
    getUser(id: string): Promise<UserEntity>;
    getUserWithQuery(query: any): Promise<UserEntity[]>;
}
