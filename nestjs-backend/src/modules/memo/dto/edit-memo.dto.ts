import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength
} from 'class-validator';
import { CreateMemoDto } from './create-memo.dto';

export class EditMemoDto extends CreateMemoDto {
  @IsNotEmpty()
  @IsString()
  public id: string;
}
