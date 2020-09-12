import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Customers extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  type!: CustomerTypes;

  @Column()
  location!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;
}

enum CustomerTypes {
  gastronomic,
  grocery,
  particular
}
