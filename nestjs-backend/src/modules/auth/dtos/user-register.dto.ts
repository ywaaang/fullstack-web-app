import { UserLoginDto } from "./user-login.dto";
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto extends UserLoginDto {
    @IsNotEmpty()
    @IsString()
    confirmpassword: string;
  }