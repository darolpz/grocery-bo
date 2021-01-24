import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { OrderToProduct } from '../order/orderToProduct';

enum ProductTypes {
  Vegetable = 'vegetable',
  Fruit = 'fruit',
  Seasoning = 'seasoning',
  Legume = 'legume'
}

enum UnitType {
  Crate = 'crate',
  Kilograms = 'kilograms',
  Packets = 'packets'
}
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column({
    type: 'enum',
    enum: ProductTypes,
    default: ProductTypes.Vegetable
  })
  type!: ProductTypes;

  @Column({
    type: 'enum',
    enum: UnitType,
    default: UnitType.Kilograms
  })
  unitType!: UnitType;

  @Column()
  quantityPrice!: number;

  @OneToMany(
    (type) => OrderToProduct,
    (orderToProduct) => orderToProduct.product
  )
  public orderToProduct!: OrderToProduct[];
}
