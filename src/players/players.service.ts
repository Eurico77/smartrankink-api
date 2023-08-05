import { Injectable } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { randomUUID } from 'node:crypto';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  create(createPlayer: CreatePlayerDTO): Player {
    const player = {
      ...createPlayer,
      _id: randomUUID(),
      playerAvatarUrl: 'www.cdn.user/1',
      position: 2,
      ranking: 'A',
    };
    this.players.push(player);

    return player;
  }

  async getAll(): Promise<Player[]> {
    return this.players;
  }
}
