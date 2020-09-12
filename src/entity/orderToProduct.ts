import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
import { Order } from './order';

@Entity()
export class OrderToProduct {
  @PrimaryGeneratedColumn()
  public OrderToCategoryId!: number;

  @Column()
  public orderId!: number;

  @Column()
  public productID!: number;

  @Column()
  public product_quantity!: number;

  @ManyToOne(type => Order, order => order.orderToProduct)
  public order!: Order;

  @ManyToOne(type => Product, product => product.orderToProduct)
  public product!: Product;
}
