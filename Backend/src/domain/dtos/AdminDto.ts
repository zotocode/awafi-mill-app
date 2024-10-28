export interface UserDTO {
    _id: string;
    email: string;
    name: string;
    phone: number;
    isBlocked: boolean;
}

// Your UserResponse interface should look like this
export interface UserResponse {
    status?: boolean;
    data: UserDTO[]; // This should be an array of UserDTO
    message?: string; // Optional message for error handling
}

export interface UserActionResponse {
    success?: boolean; 
    message?: string; 
}