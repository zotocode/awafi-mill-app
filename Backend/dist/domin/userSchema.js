"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    name;
    email;
    password;
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static newUser(name, email, password) {
        return new User(name, email, password);
    }
}
exports.User = User;
//# sourceMappingURL=userSchema.js.map