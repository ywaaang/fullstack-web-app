import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import * as bodyParser from 'body-parser';
import { CustomExceptionFilter } from 'src/common/exception';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  app.use(cookieParser());
  app.use(bodyParser.json());
  // 在应用程序中全局注册异常过滤器
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3001);
}
bootstrap();
