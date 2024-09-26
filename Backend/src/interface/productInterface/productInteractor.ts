import { product } from "../../types/commonTypes";

export default interface IProductInteractor{
    addProduct(data:product):Promise<any>
    

}
