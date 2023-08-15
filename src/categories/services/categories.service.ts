import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Category } from '../interfaces/categories.interface';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { RequestCategory } from '../interfaces/category-request.interface';
import { PlayersService } from 'src/players/services/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async save(data: CreateCategoryDTO): Promise<Category> {
    const category = new this.categoryModel(data);
    return await category.save();
  }

  async show(): Promise<Array<Category>> {
    return await this.categoryModel.find().populate('players').exec();
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

    const playerAlreadyExist = await this.playersService.findById(playerId);
    const playerExistsInCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in(playerId as any)
      .exec();

    if (!isValidObjectId(playerId))
      throw new BadRequestException('Invalid player ID');
    if (!categoryExists) throw new BadRequestException('Category not exists');
    if (!playerAlreadyExist) throw new BadRequestException('Player not exists');
    if (playerExistsInCategory)
      throw new BadRequestException('Player already register in category ');

    await this.categoryModel
      .updateOne(
        { category },
        {
          $push: { players: playerId },
        },
      )
      .exec();
  }

  async showCategoryPlayer(_id: any): Promise<Category> {
    const player = await this.playersService.findById(_id);
    if (!player) throw new BadRequestException('Player not exists');
    return await this.categoryModel
      .findOne()
      .where('players')
      .in(_id as any)
      .exec();
  }
}
