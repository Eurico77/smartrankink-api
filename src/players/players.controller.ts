import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() createPlayer: CreatePlayerDTO): Promise<Player> {
    return this.playersService.create(createPlayer);
  }

  @Get()
  async get(): Promise<Player[]> {
    return this.playersService.getAll();
  }

  // @Get()
  // async getByEmail() {}
}
