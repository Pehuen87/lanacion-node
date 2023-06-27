import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category_name!: string;

  @Column('text')
  description!: string;

}
