import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from '../dtos/create-player.dto';

import { PlayersService } from '../services/players.service';
import { Player } from '../interfaces/player.interface';
import { ValidationParamsPipe } from '../pipes/validation-params.pipe';
import { UpdatePlayerDTO } from '../dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayer: CreatePlayerDTO) {
    return await this.playersService.create(createPlayer);
  }

  @Put(':_id')
  async update(
    @Param('_id', ValidationParamsPipe) _id: string,
    @Body() player: UpdatePlayerDTO,
  ) {
    await this.playersService.update(_id, player);
  }

  @Get()
  async get(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':_id')
  async getByEmail(
    @Param('_id', ValidationParamsPipe) _id: string,
  ): Promise<Player> {
    return await this.playersService.findById(_id);
  }

  @Delete(':email')
  async deletePlayer(
    @Param('email', ValidationParamsPipe) email: string,
  ): Promise<void> {
    await this.playersService.delete(email);
  }
}
