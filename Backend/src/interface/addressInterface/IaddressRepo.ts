import { IAddressDocument } from "../../infrastructure/model/addressModel";

export interface IaddressRepo{
    addAddress(id:string,address:any):Promise<any>
    editAddress(id:string ,newAddress:string):Promise<any>
}