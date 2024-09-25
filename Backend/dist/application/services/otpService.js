"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    const bytes = crypto_1.default.randomBytes(4);
    for (let i = 0; i < 4; i++) {
        OTP += digits[bytes[i] % 10];
    }
    return OTP;
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=otpService.js.map