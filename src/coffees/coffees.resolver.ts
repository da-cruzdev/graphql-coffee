import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';

@Resolver()
export class CoffeesResolver {
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return [];
  }

  @Query(() => Coffee, { name: 'coffee', nullable: true })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: string) {
    return null;
  }

  @Mutation(() => Coffee, { name: 'CreateCoffee', nullable: true })
  async create(
    @Args('CreateCoffeeInput') CreateCoffeeInput: CreateCoffeeInput,
  ) {
    return null;
  }
}
