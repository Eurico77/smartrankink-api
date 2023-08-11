import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { CategorySchema } from './schemas/category.schema';
import { PlayerSchema } from 'src/players/schemas/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'Player',
        schema: PlayerSchema,
      },
    ]),
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
