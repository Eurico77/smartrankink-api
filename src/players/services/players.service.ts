import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../interfaces/player.interface';
import { CreatePlayerDTO } from '../dtos/create-player.dto';
import { UpdatePlayerDTO } from '../dtos/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(player: CreatePlayerDTO) {
    const userAlreadyExists = await this.playerModel
      .findOne({
        email: player.email,
      })
      .exec();

    if (userAlreadyExists)
      throw new HttpException('User Already exits', HttpStatus.CONFLICT);

    const playerCreated = new this.playerModel(player);
    await playerCreated.save();
  }

  async update(_id: string, playerUpdate: UpdatePlayerDTO) {
    const userAlreadyExists = await this.playerModel
      .findOne({
        _id,
      })
      .exec();

    if (userAlreadyExists)
      throw new HttpException('User not exits', HttpStatus.NOT_FOUND);

    return await this.playerModel.findOneAndUpdate({ _id }, playerUpdate);
  }

  async findAll() {
    return await this.playerModel.find().exec();
  }

  async findById(_id: string) {
    const userExists = await this.playerModel
      .findOne({
        _id,
      })
      .exec();

    if (!userExists)
      throw new HttpException('User not exits', HttpStatus.NOT_FOUND);
    return await this.playerModel.findById({ _id });
  }

  async delete(email: string) {
    return await this.playerModel.deleteOne({ email });
  }
}
