"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractor = void 0;
// Declare a global variable to store user data, including OTP
let globalUserData = null;
const nullifyGlobalUserData = () => {
    globalUserData = null;
    console.log("Global User Data has been nullified.");
};
const otpService_1 = require("../services/otpService");
// userInteractor.ts
class UserInteractor {
    userRepository;
    bcrypt;
    constructor(userRepository, bcrypt) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
    }
    //=-========================================login===============
    async login(email, password) {
        try {
            const userData = await this.userRepository.findUser(email);
            if (userData && userData.password === password) {
                globalUserData = { email, password };
                setTimeout(nullifyGlobalUserData, 300000);
                return { success: true, message: "Login successful" };
            }
            else {
                return { success: false, message: "Invalid credentials" };
            }
        }
        catch (error) {
            throw new Error("Login failed");
        }
    }
    //=-========================================registration========================
    async registerUser(data) {
        try {
            const otp = (0, otpService_1.generateOTP)();
            globalUserData = { email: data.email, password: data.password, otp };
            console.log("data", globalUserData);
            setTimeout(nullifyGlobalUserData, 300000);
            return { success: true, otp, message: "User registration  initiated.." };
        }
        catch (error) {
            throw new Error("Registration failed");
        }
    }
    //=-========================================otpverify========================
    // userInteractor.ts
    async verifyOtp(data) {
        try {
            console.log("hi email", globalUserData?.email);
            // Check if the OTP matches the one stored in globalUserData
            if (globalUserData && data.otp === globalUserData.otp) {
                // Hash the password
                const hashedPassword = await this.bcrypt.encryptPassword(globalUserData.password);
                console.log("hi email", globalUserData.email);
                // Create a new user using the global data
                // const newUser = new User({
                //    name:"hihello",
                //   email: globalUserData.email as string,
                //   password: hashedPassword,
                // });
                // Save the new user in the repository
                // const register = await this.userRepository.registerUser(newUser);
                // Nullify global user data after registration
                nullifyGlobalUserData();
                return { success: true, message: "User registered successfully." };
            }
            else {
                // OTP does not match
                return { success: false, message: "Invalid OTP." };
            }
        }
        catch (error) {
            throw new Error("OTP verification failed.");
        }
    }
}
exports.UserInteractor = UserInteractor;
//# sourceMappingURL=userInteractor.js.map