import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/services/categories.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { PlayersService } from 'src/players/services/players.service';
import { Challenge, Match } from './interfaces/challenge.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { UpdateChallengerDTO } from './dtos/update-challenge.dto';
import { ChallengeMatchDto } from './dtos/add-challenge-match.dto';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    @InjectModel('Match') private readonly matchModel: Model<Match>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(data: CreateChallengeDto): Promise<Challenge> {
    const allPlayers = await this.playersService.findAll();
    data.players.map((playerDto) => {
      const playerFilter = allPlayers.filter(
        (player) => player._id == playerDto._id,
      );

      if (!playerFilter.length)
        throw new BadRequestException('The id is not of an player');
    });

    const requesterIsPlayer = data.players.filter(
      (player) => player._id === data.requester,
    );

    this.logger.log(`requesterIsPlayer: ${requesterIsPlayer}`);

    if (!requesterIsPlayer)
      throw new BadRequestException(
        `The requester should be an player of de match`,
      );

    const playerCategory = await this.categoriesService.showCategoryPlayer(
      data.requester,
    );

    if (!playerCategory) {
      throw new BadRequestException(
        `The request a must be register in an category`,
      );
    }

    const challengeCreated = new this.challengeModel(data);
    challengeCreated.category = playerCategory.category;
    challengeCreated.challengeDate = new Date();

    challengeCreated.status = ChallengeStatus.PENDING;
    this.logger.log(`challengeCreated: ${JSON.stringify(challengeCreated)}`);
    return await challengeCreated.save();
  }

  async showAllChallenges(): Promise<Array<Challenge>> {
    return await this.challengeModel
      .find()
      .populate('requester')
      .populate('players')
      .populate('match')
      .exec();
  }

  async showChallengeByPlayerId(_id: string): Promise<Array<Challenge>> {
    const players = await this.playersService.findAll();
    const player = players.filter((player) => player._id == _id);

    if (!player) throw new BadRequestException(`Player not exists`);

    return await this.challengeModel
      .find()
      .where('players')
      .in(_id as any)
      .populate('players')
      .populate('match')
      .populate('requester')
      .exec();
  }

  async acceptChallenge(_id: string, updateChallenge: UpdateChallengerDTO) {
    const findChallenge = await this.challengeModel.findById(_id);

    if (!findChallenge) throw new BadRequestException('User not found');
    if (updateChallenge.status) findChallenge.challengeDate = new Date();
    findChallenge.status = updateChallenge.status;
    findChallenge.challengeDate = updateChallenge.challengeDate;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: findChallenge })
      .exec();
  }

  async atribuirDesafioPartida(
    _id: string,
    addChallengeMatch: ChallengeMatchDto,
  ): Promise<void> {
    const findChallenge = await this.challengeModel.findById(_id).exec();

    if (!findChallenge)
      throw new BadRequestException(`Desafio ${_id} não cadastrado!`);

    const playersFilter = findChallenge.players.filter(
      (jogador) => jogador._id == addChallengeMatch.def,
    );

    this.logger.log(`findChallenge: ${findChallenge}`);
    this.logger.log(`playersFilter: ${playersFilter}`);

    if (playersFilter.length == 0)
      throw new BadRequestException(
        `O jogador vencedor não faz parte do desafio!`,
      );

    const partidaCriada = new this.matchModel(addChallengeMatch);
    partidaCriada.category = findChallenge.category;
    partidaCriada.players = findChallenge.players;
    const result = await partidaCriada.save();
    findChallenge.status = ChallengeStatus.COMPLETED;
    findChallenge.match = result._id;

    try {
      await this.challengeModel
        .findOneAndUpdate({ _id }, { $set: findChallenge })
        .exec();
    } catch (error) {
      await this.challengeModel.deleteOne({ _id: result._id }).exec();
      throw new InternalServerErrorException();
    }
  }
}
