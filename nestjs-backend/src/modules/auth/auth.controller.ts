import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { type UserRegisterDto } from './dtos/user-register.dto';
import { type UserLoginDto } from './dtos/user-login.dto';
import { Public } from 'src/common/public-decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getAuth(@Request() request: any): boolean {
    return this.authService.getAuth();
  }

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async registerUser(@Body() request: UserRegisterDto) {
    return await this.userService.createUser(request);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Response() res: any,
    @Body() request: UserLoginDto,
  ): Promise<any> {
    const userEntity = await this.authService.validateUser(request);

    const token = await this.authService.createAccessToken({
      username: userEntity.username,
    });
    res
      .cookie('access_token', token.accessToken, {
        maxAge: token.expiresIn,
        httpOnly: true,
      })
      .send(token);
  }
}
