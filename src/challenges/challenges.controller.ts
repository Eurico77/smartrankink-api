import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { ValidationStatusPipe } from './pipes/validation-status.pipe';
import { UpdateChallengerDTO } from './dtos/update-challenge.dto';

@Controller('api/v1/challenges')
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);

  constructor(private readonly challengeService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() data: CreateChallengeDto): Promise<Challenge> {
    this.logger.log(`Create challengeDto: ${JSON.stringify(data)}`);
    return await this.challengeService.create(data);
  }

  @Get('/all')
  async showAll(): Promise<Array<Challenge>> {
    return await this.challengeService.showAllChallenges();
  }

  @Get(':_id')
  async showChallengerByUserId(
    @Param('_id') _id: string,
  ): Promise<Array<Challenge>> {
    return await this.challengeService.showChallengeByPlayerId(_id);
  }

  @Put(':challenge')
  async updateChallenge(
    @Body(ValidationStatusPipe) data: UpdateChallengerDTO,
    @Param('challenge') _id: string,
  ) {
    return await this.challengeService.acceptChallenge(_id, data);
  }
}
