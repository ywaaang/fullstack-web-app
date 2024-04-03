import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // 捕获所有异常，并返回一个带有错误信息的 JSON 响应
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: exception.message,
    });
  }
}