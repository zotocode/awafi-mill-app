import express from "express";
import { UserController } from "../presentation/controllers/userController";
import { UserInteractor } from "../application/interactor/userInteractor";
import { UserRepo } from "../infrastruture/repositories/userRepo";
import { HashPassword } from "../application/services/bcrypt";
import { validateUserInput } from "../presentation/middleware/validationMiddleware";
import { JWT } from "../application/services/jwt";

const userRoute = express.Router();

// Create instances of services and repositories
const hashedPassword = new HashPassword();
const userRepo = new UserRepo();
const jwt = new JWT()



const userInteractor = new UserInteractor(userRepo, hashedPassword,jwt); 
const userController = new UserController(userInteractor);

// Routes
userRoute.post('/login', validateUserInput, userController.userLogin.bind(userController));
userRoute.post('/register', validateUserInput, userController.userRegister.bind(userController));
userRoute.post('/otpVerify', userController.otpVerify.bind(userController));

export default userRoute;
