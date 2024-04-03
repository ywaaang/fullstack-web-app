import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AppModule } from './modules/app/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1111',
      username: 'postgres',
      entities: [User],
      database: 'fullstack-app',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    AppModule,
  ],
  providers: [],
})
export class MainModule {}