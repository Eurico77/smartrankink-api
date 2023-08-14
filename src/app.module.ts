import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { ChallengesModule } from './challenges/challenges.module';
const DB_CONNECTION =
  'mongodb://root:root@localhost:27017/smartranking?authSource=admin';

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
