// DTO for existing user data
export interface userDTO {
  id: string;
  name: string;
  email: string;
  phone:number
}

// DTO for creating a new user
export interface userCreationDTO {
  name: string;
  password: string;
  email: string;
  phone: number;
  isVerified: boolean;
}

// src/domain/dtos/UserDTO.ts
export interface userProfileDTO {
  name: string;
  email: string;
  phone: number;
}

export interface userPasswordChangeDTO {
  status: boolean;
  message: string;
}
