"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const userModel_1 = require("../model/userModel");
class UserRepo {
    async findUser(email) {
        try {
            const user = await userModel_1.userModel.findOne({ email });
            return user;
        }
        catch (error) {
            console.error("Error finding user:", error);
            throw error;
        }
    }
    async registerUser(userData) {
        console.log("user register  repo..", userData);
        const newUser = new userModel_1.userModel({
            email: userData.email,
            password: userData.password,
            userName: userData.name,
        });
        await newUser.save();
        return "registration completed";
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=userRepo.js.map