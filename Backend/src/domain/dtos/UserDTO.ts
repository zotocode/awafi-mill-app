// src/domain/dtos/UserDTO.ts
import { User } from "../entities/userSchema";

export class UserDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  // Convert an entity to DTO
  static fromEntity(user: User): UserDTO {
    return new UserDTO(
      user.id,
      user.name,
      user.email,
      user.password!,
      user.createdAt,
      user.updatedAt
    );
  }

  // Convert DTO back to entity
  static toEntity(userDTO: UserDTO): User {
    return new User(
      userDTO.id,
      userDTO.name,
      userDTO.email,
      userDTO.password,
      userDTO.createdAt,
      userDTO.updatedAt
    );
  }
}
