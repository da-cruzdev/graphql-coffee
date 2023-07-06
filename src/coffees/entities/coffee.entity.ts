import { Field, ID, ObjectType } from '@nestjs/graphql';
import { json } from 'stream/consumers';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Coffee model' })
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ type: 'json' })
  flavors: string[];
}
