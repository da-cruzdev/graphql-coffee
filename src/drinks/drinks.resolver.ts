import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [Drink], { name: 'drinks' })
  async findAll(): Promise<Drink[]> {
    const coffee = new Coffee();
    coffee.id = 10;
    coffee.name = 'Colombia';
    coffee.brand = 'Black crow';

    const tea = new Tea();
    tea.name = 'Lipton';

    return [tea, coffee];
  }
}
