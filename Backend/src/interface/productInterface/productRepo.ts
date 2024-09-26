import { product } from "../../types/commonTypes";

export default interface IProductRepository{
    addProduct(data:product):Promise<any>
    

}
