import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { Category } from '../interfaces/categories.interface';
import { CategoriesService } from '../services/categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  async create(@Body() data: CreateCategoryDTO): Promise<Category> {
    return await this.categoryService.save(data);
  }

  @Get()
  async showDetails(): Promise<Array<Category>> {
    return await this.categoryService.show();
  }
}
