
export class User {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly password: string | null,
    ) {}

    public static newUser(
        name: string,
        email: string,
        password: string | null,
    ) {
        return new User(
            name,
            email,
            password,
        );
    }
}
