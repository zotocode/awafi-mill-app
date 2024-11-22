export interface creatingCategory{
 name:string,
 description:string
 priority:number
 
}

export interface Category {
    _id: string;
    name: string;
    description: string;
    isListed: boolean;
    priority:number
    photo:string
  }
  
  export interface subCategory {
    _id: string;
    name: string;
    mainCategory: string;
    description: string;
    isListed: boolean;
    photo:string;
    priority:number
  }
  
export interface creatingSubCategory{
    name:string,
    description:string
    mainCategory:string
    photo:File;
    priority:number
   }