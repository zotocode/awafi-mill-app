// src/infrastructure/repositories/ProductRepository.ts
import { Product } from "../../domain/entities/Product";
import { ProductDTO } from "../../domain/dtos/ProductDTO"; // Import the DTO
import mongoose, { Model, Document } from "mongoose";
import { IProduct,product } from "../../types/commonTypes";

export class ProductRepository {
    private model: Model<IProduct>;

    constructor(model: Model<IProduct>) {
        this.model = model;
    }

    // async findAll(): Promise<ProductDTO[]> {
    //     const products = await this.model.find().exec();
    //     return products.map(product => ProductDTO.fromEntity(this.mapToDomain(product)));
    // }

    // async findById(id: string): Promise<ProductDTO | null> {
    //     const product = await this.model.findById(id).exec();
    //     return product ? ProductDTO.fromEntity(this.mapToDomain(product)) : null;
    // }

    async create(product: Product): Promise<ProductDTO> {
        // Convert the Product entity to a plain object that Mongoose can understand
        const productEntity = ProductDTO.toEntity(ProductDTO.fromEntity(product));
    
        // Create the product document in the database
        const productDoc = await this.model.create(productEntity);
    
        // Map the Mongoose document back to your domain Product entity
        const createdProduct = this.mapToDomain(productDoc);
    
        // Return the DTO representation of the created product
        return ProductDTO.fromEntity(createdProduct);
    }
    

    // async update(id: string, product: Product): Promise<ProductDTO | null> {
    //     const updatedProduct = await this.model.findByIdAndUpdate(id, {
    //         title: product.title,
    //         description: product.description,
    //         price: product.price,
    //         inventory: product.inventory,
    //         updatedAt: new Date()
    //     }, { new: true }).exec();

    //     return updatedProduct ? ProductDTO.fromEntity(this.mapToDomain(updatedProduct)) : null;
    // }

    // async delete(id: string): Promise<void> {
    //     await this.model.findByIdAndDelete(id).exec();
    // }

    private mapToDomain(productDoc: any): Product {
        return new Product(
            productDoc._id,
            productDoc.title,
            productDoc.description,
            productDoc.price,
            productDoc.inventory,
            productDoc.createdAt,
            productDoc.updatedAt
        );
    }
}
