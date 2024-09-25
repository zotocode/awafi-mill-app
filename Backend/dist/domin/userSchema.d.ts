export declare class User {
    readonly name: string;
    readonly email: string;
    readonly password: string | null;
    constructor(name: string, email: string, password: string | null);
    static newUser(name: string, email: string, password: string | null): User;
}
