import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { OrderToProduct } from './orderToProduct';

@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  type!: ProductTypes;

  @Column()
  unitType!: UnitType;

  @Column()
  quantityPrice!: number;

  @OneToMany(type => OrderToProduct, orderToProduct => orderToProduct.product)
  public orderToProduct!: OrderToProduct[];

}

enum ProductTypes {
  Fruit,
  Vegetable,
  Seasoning,
  Legume
}

enum UnitType {
  Crate,
  Kilograms,
  Packetrs
}
