import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Memo {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar' })
  date: string;
}
