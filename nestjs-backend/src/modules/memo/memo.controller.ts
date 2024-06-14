import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { User } from '../auth/decorators';
  import { AuthUser } from '../auth/interfaces';
  import { MemoService } from './memo.service';
  import { MemoEntity } from './entities';
  import { CreateMemoDto, DeleteMemoDto, EditMemoDto, FindMemoDto } from './dto';
  
  @Controller('memo')
  export class MemoController {
    constructor(
      private readonly memoService: MemoService
    ) {
    }
  
    @UseGuards(AuthGuard())
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('list')
    public async getMemoList(@User() user: AuthUser): Promise<any> {
      return await this.memoService.findMemoListByUser(user.id,);
    }

    @UseGuards(AuthGuard())
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('create')
    public async createMemoByUser(@Body() createMemoDto: CreateMemoDto, @User() user: AuthUser): Promise<MemoEntity> {
      return await this.memoService.createMemoByUser(user.id, createMemoDto);
    }

    @UseGuards(AuthGuard())
    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    public async deleteMemoByUser(@Param() params: DeleteMemoDto, @User() user: AuthUser): Promise<void> {
      return await this.memoService.deleteMemoByUser(user.id, params);
    }

    @UseGuards(AuthGuard())
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('edit')
    public async editMemoByUser(@Body() editMemoDto: EditMemoDto, @User() user: AuthUser): Promise<void> {
      return await this.memoService.editMemoByUser(user.id, editMemoDto);
    }
  }
  