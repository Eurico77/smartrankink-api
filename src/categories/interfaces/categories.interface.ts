import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';

export class Category extends Document {
  readonly category: string;
  description: string;
  events: Array<Event>;
  players: Array<Player>;
}

export interface Event {
  nome: string;
  operation: string;
  value: number;
}
