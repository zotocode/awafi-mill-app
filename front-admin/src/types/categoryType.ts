export interface creatingCategory{
 name:string,
 description:string
 isListed:boolean
}
export interface Category{
_id?:string,
 name:string,
 description:string
 isListed:boolean
}
export interface subCategory{
_id?:string,
 name:string,
 mainCategory:string
 description:string
 isListed:boolean
}