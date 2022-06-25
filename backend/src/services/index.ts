import { UserEntity } from '../entity/user.entity';
import { IUserReg } from '../interfaces/user.register.interafce';
import { Repository } from 'typeorm';
import { MyAppSourceData } from '../../main';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { IUserLogin } from 'src/interfaces/user.login.interface';
import { IUserResWithTokenOrWithout } from 'src/interfaces/user.response.token.interface';
import { secret } from '../jwt_secret';
import { IUserEdit } from '../interfaces/user.edit.interface';





export class AppService {

    userRepository(): Repository<UserEntity> {
        return MyAppSourceData.getRepository(UserEntity)
    }

    async registerUser(registerUser: IUserReg): Promise<UserEntity> {

        const { email } = registerUser;

        const hasUser = await this.userRepository().findOneBy({ email });

        if (hasUser) {
            throw (`User by ${email} excist`)
        }

        const newUser = new UserEntity();
        Object.assign(newUser, registerUser);

        return await this.userRepository().save(newUser)

    }


    async loginUser(logUser: IUserLogin): Promise<IUserResWithTokenOrWithout> {

        const { email, password } = logUser;

        const hasUser = await this.userRepository().findOneBy({ email });


        if (!hasUser) {
            throw new Error(`User by ${email} not excist`);
        }


        const validPass = await compare(password, hasUser.password);

        if (!validPass) {
            throw new Error('Password not valid');
        }


        const userReturn: Pick<UserEntity, 'id' | 'email' | 'name'> = {
            id: hasUser.id,
            email: hasUser.email,
            name: hasUser.name
        };




        return {
            ...userReturn,
            token: this.generateToken(userReturn)
        }


    }



    private generateToken(data: IUserResWithTokenOrWithout): string {
        const token = sign({ ...data }, secret, { expiresIn: '1d' });
        return token;

    }


    async editUser(id: string, userEdit: IUserEdit): Promise<UserEntity> {

        const hasUser = await this.userRepository().findOneBy({ id: +id });

        if (!hasUser) {
            throw new Error(`User by ${id} not excist`);
        }

        Object.assign(hasUser, userEdit);
        await this.userRepository().save(hasUser);

        return hasUser;

    }


    async getUser(id: string): Promise<UserEntity> {
        return await this.userRepository().findOneBy({ id: +id });
    }


    async getUserWithQuery(query: any): Promise<UserEntity[]> {
        const countPage: number = +query.page;

        const queryBuilder = MyAppSourceData.createQueryBuilder(UserEntity, "users");

        let users: UserEntity[] = [];


        if (countPage === 1) {
            users = await queryBuilder.limit(10).getMany();
        }

        if (countPage > 1) {
            users = await queryBuilder.offset((countPage - 1) * 10).limit(10).getMany();
        }



        return users;

    }










}