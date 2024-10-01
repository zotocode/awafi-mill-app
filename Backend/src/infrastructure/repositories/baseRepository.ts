// src/infrastructure/repositories/baseRepository.ts
import { Model, Document, FilterQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: any): Promise<T> {
    const createdEntity = new this.model(data);
    return await createdEntity.save();
  }

  async find(filter: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filter);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async update(id: string, update: any): Promise<T | null> {

    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }
}