"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const services_1 = require("../services");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const routes = (0, express_1.Router)();
const service = new services_1.AppService();
routes.post('/user/login', validate_middleware_1.loginValidation, async (req, res) => {
    (0, validate_middleware_1.showValidationError)(req, res);
    const user = await service.loginUser(req.body);
    return res.json(user);
});
routes.post('/user/register', validate_middleware_1.registerValidation, async (req, res) => {
    (0, validate_middleware_1.showValidationError)(req, res);
    const user = await service.registerUser(req.body);
    return res.json(user);
});
routes.put('/profile/:id', async (req, res) => {
    const user = await service.editUser(req.params.id, req.body);
    return res.json(user);
});
routes.get('/profile/:id', auth_middleware_1.default, async (req, res) => {
    const user = await service.getUser(req.params.id);
    return res.json(user);
});
routes.get('/profile', async (req, res) => {
    const users = await service.getUserWithQuery(req.query);
    res.json(users);
});
exports.default = routes;
//# sourceMappingURL=index.js.map