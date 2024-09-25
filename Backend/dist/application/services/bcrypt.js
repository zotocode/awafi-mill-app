"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class HashPassword {
    constructor() { }
    async encryptPassword(password) {
        try {
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(password, salt);
            console.log(hashedPassword);
            return hashedPassword;
        }
        catch (error) {
            throw error;
        }
    }
    async comparePassword(password, hashedPassword) {
        try {
            console.log("compairig... here");
            return await bcryptjs_1.default.compare(password, hashedPassword);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.HashPassword = HashPassword;
//# sourceMappingURL=bcrypt.js.map