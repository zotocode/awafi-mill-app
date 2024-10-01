
export interface IUserRepo {
    findUser(email: string): Promise<any>;
    registerUser(data: any): Promise<any>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
    updateProfile(id: string, email: string, name: string, phone: number): Promise<void>; 
}