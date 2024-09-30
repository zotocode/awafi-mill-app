import { Cart } from "../../domain/entities/userCartSchema";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { ICartInteractor } from "../../interface/cartInterface/IcartInteractor";
import { ICartRepo } from "../../interface/cartInterface/IcartRepo";
import { CartRepo } from "../../infrastructure/repositories/cartRepo";



export class CartInteractor implements ICartInteractor {
    private cartRepo : ICartRepo;

    constructor(cartRepo:ICartRepo){
        this.cartRepo = cartRepo
    }

async cartIteams(): Promise<any> {
    console.log('====================================');
    console.log("reached cart interactor");
    console.log('====================================');
}

}