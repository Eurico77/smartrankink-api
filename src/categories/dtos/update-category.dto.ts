import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  description: string;

  @IsArray()
  events: Event[];
}
