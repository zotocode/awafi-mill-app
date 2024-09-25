import express from "express";


import { UserController } from "../presentation/controllers/userController";
import { UserInteractor } from "../application/interactor/userInteractor";
import { UserRepo } from "../infrastruture/repositories/userRepo";


const userRoute = express.Router();

// create instance of services


// create instance of repositories
const userRepo = new UserRepo()

//craete instance for interactor
const userInteractor = new UserInteractor(userRepo) ;//inject the dependancies for the interactor on the class


//create instance for controller
const userController = new UserController(userInteractor)

//middlewares


//Routes
userRoute.post('/login', userController.userLogin.bind(userController));

export default userRoute;
