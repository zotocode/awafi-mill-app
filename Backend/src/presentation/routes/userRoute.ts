// src/routes/userRoute.ts
import express from "express";
import { UserController } from "../controllers/userController";
import { UserInteractor } from "../../application/interactor/userInteractor";
import { UserRepo } from "../../infrastructure/repositories/userRepo";
import { HashPassword } from "../../application/services/bcryptService";
import { validateUserInput } from "../middleware/userValidation";
import { verifyToken } from "../middleware/userAuthMiddleware";
import { JWT } from "../../application/services/jwtService";
import EmailService from "../../application/services/emailService";
import { AddressRepo } from "../../infrastructure/repositories/addressRepository";
import { ProductRepository } from "../../infrastructure/repositories/productRepository";
import { ProductModel } from "../../infrastructure/model/producModel";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository";
import { SubCategoryRepository } from "../../infrastructure/repositories/subCategoryRepository";
import CloudinaryService from "../../application/services/cloudinaryService";
import { ExcelService } from "../../application/services/excelService";
import { ProductInteractor } from "../../application/interactor/productInteractor";
import { ProductController } from "../controllers/productController";
import CategoryModel from "../../infrastructure/model/categoryModel"; 
import SubCategoryModel from "../../infrastructure/model/subCategoryModel"; 

const userRoute = express.Router()
// Create instances of services and repositories
const hashedPassword = new HashPassword();
const userRepo = new UserRepo();
const jwt = new JWT()
const email=new EmailService()
const addressRepo = new AddressRepo()
const userInteractor = new UserInteractor(userRepo, hashedPassword,jwt,email,addressRepo); 
const userController = new UserController(userInteractor);






// Routes
userRoute.post('/',userController.userLogin.bind(userController));
userRoute.post('/register', validateUserInput, userController.userRegister.bind(userController));
userRoute.post('/otpVerify', userController.otpVerify.bind(userController));
userRoute.get('/profile',verifyToken,userController.userProfile.bind(userController))
userRoute.patch('/edit',verifyToken, userController.editProfile.bind(userController));
userRoute.patch('/change-password',verifyToken, userController.changePassword.bind(userController));

userRoute.post('/add-address',verifyToken,userController.addUserAddress.bind(userController))
userRoute.post('/edit-address',verifyToken,userController.updateUserAddress.bind(userController))




export default userRoute;