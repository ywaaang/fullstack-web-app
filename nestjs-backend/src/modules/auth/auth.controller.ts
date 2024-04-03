import { Controller, Get, Post, Body, Response, HttpStatus, HttpCode, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type userLoginDto } from './dtos/loginDto';
import { Public } from 'src/common/public-decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth(@Request() request: any): boolean {
    return this.authService.getAuth();
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Response() res: any, @Body() request: userLoginDto): Promise<any> {
    const userEntity = await this.authService.validateUser(request);

    const token = await this.authService.createAccessToken({
      username: userEntity.username
    });
    res.cookie('access_token', token.accessToken, {
      maxAge: 1000 * 60,
      httpOnly: true,
    }).send({});
  }
}
