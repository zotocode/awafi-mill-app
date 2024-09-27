// src/domain/entities/userSchema.ts
export class User {
    constructor(
      readonly id: string,
      readonly name: string,
      readonly email: string,
      readonly password: string | null,
      readonly createdAt: Date,
      readonly updatedAt: Date,
      readonly phone: number,
    ) {}
  
    // Factory method to create a new user
    public static newUser(
      id: string,
      name: string,
      email: string,
      password: string | null,
      phone:number,
    ) {
      const now = new Date();
      return new User(
        id,
        name,
        email,
        password,
        now,  // createdAt
        now  ,
        phone
      );
    }
  }
  