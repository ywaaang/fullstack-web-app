import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { MemoEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemoEntity
    ]),
    FileModule
  ],
  controllers: [MemoController],
  providers: [MemoService],
  exports: [MemoService]
})
export class MemoModule { }
