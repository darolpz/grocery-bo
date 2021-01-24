import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/model';
import { Order } from '../order/model';

@Entity()
export class OrderToProduct {
  @PrimaryGeneratedColumn()
  public OrderToCategoryId!: number;

  @Column()
  public orderId!: number;

  @Column()
  public productId!: number;

  @Column()
  public product_quantity!: number;

  @ManyToOne(() => Order, (order) => order.orderToProducts)
  public order!: Order;

  @ManyToOne(() => Product, (product) => product.orderToProducts)
  public product!: Product;
}
