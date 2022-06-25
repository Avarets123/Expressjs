"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const user_entity_1 = require("../entity/user.entity");
const main_1 = require("../../main");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const jwt_secret_1 = require("../jwt_secret");
class AppService {
    userRepository() {
        return main_1.MyAppSourceData.getRepository(user_entity_1.UserEntity);
    }
    async registerUser(registerUser) {
        const { email } = registerUser;
        const hasUser = await this.userRepository().findOneBy({ email });
        if (hasUser) {
            throw (`User by ${email} excist`);
        }
        const newUser = new user_entity_1.UserEntity();
        Object.assign(newUser, registerUser);
        return await this.userRepository().save(newUser);
    }
    async loginUser(logUser) {
        const { email, password } = logUser;
        const hasUser = await this.userRepository().findOneBy({ email });
        if (!hasUser) {
            throw new Error(`User by ${email} not excist`);
        }
        const validPass = await (0, bcrypt_1.compare)(password, hasUser.password);
        if (!validPass) {
            throw new Error('Password not valid');
        }
        const userReturn = {
            id: hasUser.id,
            email: hasUser.email,
            name: hasUser.name
        };
        return Object.assign(Object.assign({}, userReturn), { token: this.generateToken(userReturn) });
    }
    generateToken(data) {
        const token = (0, jsonwebtoken_1.sign)(Object.assign({}, data), jwt_secret_1.secret, { expiresIn: '1d' });
        return token;
    }
    async editUser(id, userEdit) {
        const hasUser = await this.userRepository().findOneBy({ id: +id });
        if (!hasUser) {
            throw new Error(`User by ${id} not excist`);
        }
        Object.assign(hasUser, userEdit);
        await this.userRepository().save(hasUser);
        return hasUser;
    }
    async getUser(id) {
        return await this.userRepository().findOneBy({ id: +id });
    }
    async getUserWithQuery(query) {
        const countPage = +query.page;
        const queryBuilder = main_1.MyAppSourceData.createQueryBuilder(user_entity_1.UserEntity, "users");
        let users = [];
        if (countPage === 1) {
            users = await queryBuilder.limit(10).getMany();
        }
        if (countPage > 1) {
            users = await queryBuilder.offset((countPage - 1) * 10).limit(10).getMany();
        }
        return users;
    }
}
exports.AppService = AppService;
//# sourceMappingURL=index.js.map