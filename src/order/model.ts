import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { OrderToProduct } from '../orderToProduct/model';
import { Product } from '../product/model';
@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  obvervations!: string;

  @Column()
  final_amount!: number;

  @OneToMany(() => OrderToProduct, orderToProduct => orderToProduct.order)
  public orderToProducts!: OrderToProduct[];
}
