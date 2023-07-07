import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateCoffeeInput } from './dto/update-coffee.input/update-coffee.input';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly pubSub: PubSub,
  ) {}
  async findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new UserInputError(`Coffee with id ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeInput,
      flavors,
    });
    const newCoffee = this.coffeeRepository.save(coffee);
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffee });
    return newCoffee;
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee with id ${id} does not exixts`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);

    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string) {
    const flavor = await this.flavorRepository.findOne({ where: { name } });
    if (flavor) {
      return flavor;
    }
    return this.flavorRepository.create({ name });
  }
}
