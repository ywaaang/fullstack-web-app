import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength
  } from 'class-validator';
  
  export class FindMemoDto {
    @IsNotEmpty()
    @IsString()
    public id: string;
  }
  