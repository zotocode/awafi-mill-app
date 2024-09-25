"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../presentation/controllers/userController");
const userInteractor_1 = require("../application/interactor/userInteractor");
const userRepo_1 = require("../infrastruture/repositories/userRepo");
const bcrypt_1 = require("../application/services/bcrypt");
const userRoute = express_1.default.Router();
// create instance of services
const hashedPassword = new bcrypt_1.HashPassword();
// create instance of repositories
const userRepo = new userRepo_1.UserRepo();
//craete instance for interactor
const userInteractor = new userInteractor_1.UserInteractor(userRepo, hashedPassword); //inject the dependancies for the interactor on the class
//create instance for controller
const userController = new userController_1.UserController(userInteractor);
//middlewares
//Routes
userRoute.post('/login', userController.userLogin.bind(userController));
userRoute.post('/register', userController.userRegister.bind(userController));
userRoute.post('/otpVerify', userController.otpVerify.bind(userController));
exports.default = userRoute;
//# sourceMappingURL=userRoute.js.map