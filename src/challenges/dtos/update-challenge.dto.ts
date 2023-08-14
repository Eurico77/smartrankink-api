import { IsDateString, IsOptional } from 'class-validator';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';

export class UpdateChallengerDTO {
  @IsDateString()
  @IsOptional()
  challengeDate?: Date;

  @IsOptional()
  status: ChallengeStatus;
}
