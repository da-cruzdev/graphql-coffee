import { registerEnumType } from '@nestjs/graphql';

export enum CoffeeType {
  ARABICA = 'Araboca',
  ROBUSTA = 'Robusta',
}

registerEnumType(CoffeeType, {
  name: 'CoffeeType',
});
