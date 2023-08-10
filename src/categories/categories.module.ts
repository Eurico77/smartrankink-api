import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from 'src/players/schemas/player.schema';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: PlayerSchema,
      },
    ]),
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
