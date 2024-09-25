export interface IUserInteractor {
    login(email: string, password: string): Promise<any>;
    registerUser(data: any): Promise<any>;
    verifyOtp(data: any): Promise<any>;
}
