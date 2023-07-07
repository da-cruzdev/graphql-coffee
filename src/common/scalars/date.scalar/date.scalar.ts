import { CustomScalar, Scalar } from '@nestjs/graphql';
import {
  GraphQLScalarLiteralParser,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  Kind,
  ValueNode,
} from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description?: string = 'Date custom scalar type';

  parseValue: GraphQLScalarValueParser<Date> = (value: number) => {
    return new Date(value);
  };

  serialize: GraphQLScalarSerializer<number> = (value: Date) => {
    return value.getTime();
  };

  parseLiteral: GraphQLScalarLiteralParser<Date> = (ast: ValueNode) => {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return null;
  };
}
