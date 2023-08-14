import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';

export class ValidationStatusPipe implements PipeTransform {
  readonly statusPermitidos = [
    ChallengeStatus.ACCEPTED,
    ChallengeStatus.DENIED,
    ChallengeStatus.CANCELED,
    ChallengeStatus.COMPLETED,
  ];

  transform(value: any) {
    const status = value?.status.toUpperCase();

    if (!this.isValidStatus(status))
      throw new BadRequestException(`${status} is invalid status `);

    return value;
  }

  private isValidStatus(status: any) {
    const idx = this.statusPermitidos.indexOf(status);
    return idx !== -1;
  }
}
