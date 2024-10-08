export interface categoryCreationDTo {
  name: string;
  description: string;
  isListed?:boolean
}
export interface categoryDTo {
  id:string,
  name: string;
  description: string;
  isListed: string;
  isDeleted: string;
  createdAt: Date;
  updatedAt: Date;
}
