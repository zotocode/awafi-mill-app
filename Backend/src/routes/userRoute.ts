import express from "express";


import { UserController } from "../presentation/controllers/userController";
import { UserInteractor } from "../application/interactor/userInteractor";
import { UserRepo } from "../infrastruture/repositories/userRepo";
import { HashPassword } from "../application/services/bcrypt";



const userRoute = express.Router();

// create instance of services
const hashedPassword = new HashPassword()

// create instance of repositories
const userRepo = new UserRepo()

//craete instance for interactor
const userInteractor = new UserInteractor(userRepo,hashedPassword) ;//inject the dependancies for the interactor on the class


//create instance for controller
const userController = new UserController(userInteractor)


//middlewares


//Routes
userRoute.post('/login', userController.userLogin.bind(userController));
userRoute.post('/register', userController.userRegister.bind(userController));
userRoute.post('/otpVerify', userController.otpVerify.bind(userController));

export default userRoute;
