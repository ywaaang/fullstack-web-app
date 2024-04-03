import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AppModule } from './modules/app/app.module';

@Module({
  imports: [
    AuthModule,
    AppModule
  ],
  providers: [],
})
export class MainModule {}