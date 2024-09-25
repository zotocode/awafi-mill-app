"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// userController.ts
class UserController {
    userInteractor;
    constructor(userInteractor) {
        this.userInteractor = userInteractor;
    }
    async userLogin(req, res, next) {
        const { email, password } = req.body;
        try {
            const result = await this.userInteractor.login(email, password);
            if (result.success) {
                return res.status(200).json({ message: result.message });
            }
            else {
                return res.status(401).json({ message: result.message });
            }
        }
        catch (error) {
            next(error); // Passing error to global error handler (500)
        }
    }
    async userRegister(req, res, next) {
        try {
            const result = await this.userInteractor.registerUser(req.body);
            if (result.success) {
                return res.status(200).json({ message: result.message, otp: result.otp });
            }
            else {
                return res.status(401).json({ message: result.message });
            }
        }
        catch (error) {
            next(error); // Passing error to global error handler (500)
        }
    }
    async otpVerify(req, res, next) {
        try {
            console.log('====================================');
            console.log("reached controller");
            console.log('====================================');
            const result = await this.userInteractor.verifyOtp(req.body);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map