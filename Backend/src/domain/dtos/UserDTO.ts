
     
   export interface userDTO{
    id: string,
     name: string,
     email: string,
     createdAt: Date,
     updatedAt: Date,
     phone: number
   }  
     
   export interface userCreationDTO{
     name: string,
     password:string,
     email: string,
     phone: number,
     isVerified:boolean,
   }  
     
 