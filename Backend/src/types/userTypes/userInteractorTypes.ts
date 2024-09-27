export interface UserInteractorResp {
    success: boolean;
    message: string;
    data?:any;
  }

  
export interface InewUserData {
  id: string;
  name: string; 
  email: string;
  password: string;
 
}
