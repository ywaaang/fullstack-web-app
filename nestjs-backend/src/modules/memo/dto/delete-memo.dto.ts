import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength
} from 'class-validator';

export class DeleteMemoDto {
  @IsNotEmpty()
  @IsString()
  public id: string;
}
