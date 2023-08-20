import { IsNotEmpty } from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';
import { Challenge } from '../interfaces/challenge.interface';

export class ChallengeMatchDto {
  @IsNotEmpty()
  def: Player;

  @IsNotEmpty()
  resultado: Array<Challenge>;
}
