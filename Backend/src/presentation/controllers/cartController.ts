import { Request, Response, NextFunction } from "express";
import { ICartInteractor } from "../../interface/cartInterface/IcartInteractor";
import { AsyncLocalStorage } from "async_hooks";




export class CartController {

    private cartInteractor :ICartInteractor;

    constructor(cartInteractor:ICartInteractor){
        this.cartInteractor = cartInteractor
    }


     async userCart(req:Request,res:Response,next:NextFunction){
         console.log('====================================');
         console.log("reached cart controller");
         console.log('====================================');
      try{
       const cartProduct = await this.cartInteractor.cartIteams()

      }catch(err){
        next(err)
      }
     }


}