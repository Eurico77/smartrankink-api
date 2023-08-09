import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
const DB_CONNECTION =
  'mongodb://root:root@localhost:27017/smartranking?authSource=admin';

@Module({
  imports: [MongooseModule.forRoot(DB_CONNECTION), PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
