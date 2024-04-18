import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validateHash, generateHash } from '../../common/utils';
import { type UserLoginDto } from './dtos/user-login.dto';
import { TokenType } from 'src/common/token-type';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ){}
  getAuth(): boolean {
    return true;
  }

  async createAccessToken(data: {
    username: string;
  }): Promise<any> {
    return {
      expiresIn: 1000 * 60 * 10,
      accessToken: await this.jwtService.signAsync({
        username: data.username,
        type: TokenType.ACCESS_TOKEN
      }),
    };
  }

  async validateUser(req: UserLoginDto): Promise<any> {
    const user = await this.userService.findOne({
      username: req.username,
    });

    if (!user) {
      throw new Error('unknown user')
    }
    const isPasswordValid = await validateHash(
      req.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new Error('Wrong password')
    }

    return user;
  }
}
