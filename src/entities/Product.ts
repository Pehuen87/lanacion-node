import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './Category';
import { Status } from './Status';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sku!: number;

  @ManyToOne(() => Category)
  category!: Category;

  @Column()
  product_name!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @ManyToOne(() => Status)
  status!: Status;
}
