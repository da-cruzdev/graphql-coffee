import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { DrinkResultUnion } from 'src/common/unions/drink-result.union';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinkResultUnion], { name: 'drinks' })
  async findAll(): Promise<(typeof DrinkResultUnion)[]> {
    const coffee = new Coffee();
    coffee.id = 10;
    coffee.name = 'Colombia';
    coffee.brand = 'Black crow';

    const tea = new Tea();
    tea.name = 'Lipton';

    return [tea, coffee];
  }
}
