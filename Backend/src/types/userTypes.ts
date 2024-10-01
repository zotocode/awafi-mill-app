export interface UserInteractorResp {
    success: boolean;
    message: string;
    otp?: string;
    data?:any;
  }

  
export interface InewUserData {
  id: string;
  name: string; 
  email: string;
  password: string;
 
}