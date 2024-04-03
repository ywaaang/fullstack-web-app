import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validateHash, generateHash } from '../../common/utils';
import { type userLoginDto } from './dtos/loginDto';
import { TokenType } from 'src/common/token-type';


const USER_INFO = [
  {username: 'test@test.com', password: '$2b$10$UZ.cHE/yOw22cK7pIGKV0umRee9qNjV43vpdF4V/bPI.DXgeO2JC2'}
]

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ){}
  getAuth(): boolean {
    return true;
  }

  async createAccessToken(data: {
    username: string;
  }): Promise<any> {
    return {
      expiresIn: 60,
      accessToken: await this.jwtService.signAsync({
        username: data.username,
        type: TokenType.ACCESS_TOKEN
      }),
    };
  }

  async validateUser(req: userLoginDto): Promise<any> {
    const user = USER_INFO.find((item) => item.username === req.username);

    if (!user) {
      throw new Error('unknown user')
    }
    const isPasswordValid = await validateHash(
      req.password,
      user?.password,
    );


    if (!isPasswordValid) {
      throw new Error('wrong password')
    }

    return user;
  }
}
