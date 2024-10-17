// src/infrastructure/repositories/baseRepository.ts
import mongoose, { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  // Create a new entity
  async create(data: any): Promise<T> {
    const createdEntity = new this.model(data);
    return await createdEntity.save();
  }

  // Find multiple entities by filter query
  async find(filter: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filter);
  }

  // Find one entity by filter query
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter);
  }

  // Find an entity by its ID
  async findById(id: mongoose.Types.ObjectId): Promise<T | null> {
    return await this.model.findById(id);
  }

  // Update an entity by its ID and return the updated entity
  async update(id: mongoose.Types.ObjectId, update: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }

  // Update one entity based on filter query and return the updated entity
  async updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findOneAndUpdate(filter, update, { new: true });
  }

  // Delete an entity by its ID
  async delete(id: mongoose.Types.ObjectId): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }
}

