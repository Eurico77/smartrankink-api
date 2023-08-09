import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly phoneNumber: number;

  @IsEmail()
  readonly email: string;
}
