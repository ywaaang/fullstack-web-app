import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength
} from 'class-validator';

export class CreateMemoDto {
  @IsNotEmpty()
  @IsString()
  public content: string;
}
