import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { Category } from '../interfaces/categories.interface';
import { CategoriesService } from '../services/categories.service';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { RequestCategory } from '../interfaces/category-request.interface';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() data: CreateCategoryDTO): Promise<Category> {
    console.log(data);
    return await this.categoryService.save(data);
  }

  @Get()
  async showDetails(): Promise<Array<Category>> {
    return await this.categoryService.show();
  }

  @Put('/:category')
  async update(
    @Body() data: UpdateCategoryDTO,
    @Param('category') category: string,
  ): Promise<void> {
    await this.categoryService.updateCategory(category, data);
  }

  @Post('/:category/players/:playerId')
  async addCategoryOnPlayer(@Param() params: RequestCategory): Promise<void> {
    await this.categoryService.setCategoryOnPlayer(params);
  }
}
