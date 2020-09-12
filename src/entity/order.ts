import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { OrderToProduct } from './orderToProduct';
import { Product } from './product';
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

  @ManyToMany(type => Product)
  @JoinTable()
  products!: Product[];

  @OneToMany(type => OrderToProduct, orderToProduct => orderToProduct.order)
  public orderToProduct!: OrderToProduct[];

}
