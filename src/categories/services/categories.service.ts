import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../interfaces/categories.interface';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { RequestCategory } from '../interfaces/category-request.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async save(data: CreateCategoryDTO): Promise<Category> {
    const category = new this.categoryModel(data);
    return await category.save();
  }

  async show(): Promise<Array<Category>> {
    return await this.categoryModel.find().populate('players', 'name').exec();
  }

  async updateCategory(
    category: string,
    categoryData: UpdateCategoryDTO,
  ): Promise<void> {
    const categoryExists = await this.categoryModel
      .findOne({ category })
      .exec();

    if (!categoryExists) throw new NotFoundException('Category not exists');

    await this.categoryModel.findOneAndUpdate({ category }, categoryData);
  }

  async setCategoryOnPlayer({
    category,
    playerId,
  }: RequestCategory): Promise<void> {
    const categoryExists = await this.categoryModel
      .findOne({ category })
      .exec();

    if (!categoryExists) throw new BadRequestException('Category not exists');

    await this.categoryModel
      .findOneAndUpdate(
        { category },
        {
          $set: {
            players: playerId,
          },
        },
        { upsert: true },
      )
      .exec();
  }
}
