// src/domain/entities/userSchema.ts
export class User {
    constructor(
      readonly id: string,
      readonly name: string,
      readonly email: string,
      readonly password: string | null,
      readonly createdAt: Date,
      readonly updatedAt: Date
    ) {}
  
    // Factory method to create a new user
    public static newUser(
      id: string,
      name: string,
      email: string,
      password: string | null
    ) {
      const now = new Date();
      return new User(
        id,
        name,
        email,
        password,
        now,  // createdAt
        now   // updatedAt
      );
    }
  }
  