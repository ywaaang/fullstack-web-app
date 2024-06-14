import {
  Entity,
  Column
} from 'typeorm';
import { BaseEntity } from 'src/common/entities';

@Entity('t_memo')
export class MemoEntity extends BaseEntity {
  @Column()
  public userId: string;

  @Column()
  public content: string;

  /**
   * memo create time
   */
  @Column()
  public createTime = new Date().getTime();
}
