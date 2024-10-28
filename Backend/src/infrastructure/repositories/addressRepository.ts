import { IAddressDocument, addressModel } from "../model/addressModel";
import { IaddressRepo } from "../../interface/addressInterface/IaddressRepo";
import { BaseRepository } from "./baseRepository";

export class AddressRepo
  extends BaseRepository<IAddressDocument>
  implements IaddressRepo
{
  constructor() {
    super(addressModel);
  }

  async addAddress(userId: string, address: any): Promise<any> {
    try {
      // Check if the user already has an address
      const existingAddress = await this.model.findOne({ userId });

      // If an address already exists for this user, return a message instead of adding
      if (existingAddress) {
        return {
          status: false,
          message: "Address already exists for this user",
        };
      }

      // Create and save a new address if none exists for this user
      const newAddress = new this.model({
        userId,
        fullName: address.fullName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      });

      await newAddress.save();
      return { status: true, message: "Address added successfully" };
    } catch (error) {
      // Handle any errors
      console.error("Error adding address:", error);
      return {
        status: false,
        message: "An error occurred while adding the address",
      };
    }
  }
 
  async editAddress(id: string, newAddress: any): Promise<any> {
    try{
        const updateFields: any = {};
        if (newAddress.addressLine1 !== undefined) updateFields.addressLine1 = newAddress.addressLine1; 
        if (newAddress.addressLine2 !== undefined) updateFields.addressLine2 = newAddress.addressLine2;
        if (newAddress.city !== undefined) updateFields.city = newAddress.city;
        if (newAddress.postalCode !== undefined) updateFields.postalCode = newAddress.postalCode;
        if (newAddress.country !== undefined) updateFields.country = newAddress.country;
      
        if (Object.keys(updateFields).length === 0) {
          throw new Error("No fields to update");
        }  
        const result = await this.model.updateOne(
            { userId: id },  
            { $set: updateFields }  
          );

          return {status:true, message:"address updated successfully"}

    }catch(error){
        console.error("Error adding address:", error);
        return {
          status: false,
          message: "An error occurred while adding the address",
        };
    }
  }


}
