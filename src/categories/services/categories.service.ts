import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../interfaces/categories.interface';
import { CreateCategoryDTO } from '../dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async save(data: CreateCategoryDTO): Promise<Category> {
    return await this.categoryModel.create(data);
  }

  async show(): Promise<Array<Category>> {
    return await this.categoryModel.find().exec();
  }
}
