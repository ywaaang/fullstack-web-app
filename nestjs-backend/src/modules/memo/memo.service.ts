import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { Memo } from './entities/memo.entity';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {}
  async create(createMemoDto: CreateMemoDto) {
    const memos = await this.memoRepository.save(createMemoDto);
    return memos;
  }

  async findAll() {
    const memos = await this.memoRepository.find();
    return memos;
  }

  async findOne(id: number) {
    if (!id) {
      const memos = await this.memoRepository.find();
      return memos;
    }
    const memo = await this.memoRepository.findOneBy({
      id
    });
    return memo ? [memo] : [];
  }

  update(id: number, updateMemoDto: UpdateMemoDto) {
    return `This action updates a #${id} memo`;
  }

  async remove(id: number) {
    const memo = await this.memoRepository.delete({
      id
    });
    if (memo.affected === 1) {
      return true
    }
    throw new Error('failed')
  }
}
