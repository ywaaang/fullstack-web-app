import {
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import {
    MemoNotFoundException,
    UnknownMemoException
} from 'src/common/exceptions';
import {
    MongoRepository,
    ObjectLiteral
} from 'typeorm';
import { MemoEntity } from './entities';
import { CreateMemoDto, UserMemosDto, DeleteMemoDto, EditMemoDto } from './dto';

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(MemoEntity)
        private readonly memoRepo: MongoRepository<MemoEntity>,
    ) {
    }

    /**
     * fine memo data
     * @param {string} id - id
     */
    public async findMemoListByUser(userId: string): Promise<Array<MemoEntity> | undefined> {
        return await this.memoRepo.find({
            where: {
                userId: { $eq: userId }
            }
        });
    }

    /**
     * find memo data by id
     * @param {string} id - id
     */
    public async createMemoByUser(id: string, createMemoDto: CreateMemoDto): Promise<MemoEntity> {
        const newMemo = new MemoEntity();
        newMemo.content = createMemoDto.content;
        newMemo.userId = id;
        await this.memoRepo.save(newMemo);
        return newMemo
    }

    /**
     * delete memo data by id
     * @param {string} userId - userId
     * @param {string} id - id
     */
    public async deleteMemoByUser(userId: string, params: DeleteMemoDto): Promise<void> {
        if (!params || !params.id) {
            throw new UnknownMemoException();
        }
        const memo = await this.memoRepo.findOne({
            where: {
                _id: { $eq: ObjectID(params.id) }
            }
        });
        if (!memo || memo.userId !== userId) {
            throw new MemoNotFoundException();
        }
        await this.memoRepo.deleteOne({
            _id: ObjectID(params.id)
        });
    }

    /**
     * edit memo data by id
     * @param {string} userId - userId
     * @param {string} data - Memo
     */
    public async editMemoByUser(userId: string, editMemoDto: EditMemoDto): Promise<void> {
        if (!editMemoDto || !editMemoDto.id) {
            throw new UnknownMemoException();
        }
        const memo = await this.memoRepo.findOne({
            where: {
                _id: { $eq: ObjectID(editMemoDto.id) }
            }
        });
        if (!memo || memo.userId !== userId) {
            throw new MemoNotFoundException();
        }
        await this.memoRepo.updateOne({
            _id: ObjectID(editMemoDto.id)
        }, {
            $set: { content: editMemoDto.content }
        });
    }
}
