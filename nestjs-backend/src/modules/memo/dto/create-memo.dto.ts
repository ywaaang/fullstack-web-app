import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMemoDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  datetime: string;
}
