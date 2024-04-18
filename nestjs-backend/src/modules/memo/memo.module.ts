import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entities/memo.entity';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
  imports: [TypeOrmModule.forFeature([Memo])],
})
export class MemoModule {}
