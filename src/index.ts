import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import * as joda from '@js-joda/core';

const buildScalarType = <T extends { toString(): string }>(
  name: string,
  description: string,
  jodaClass: any,
  parseMethod: (value: string) => T
) =>
  new GraphQLScalarType({
    name,
    description,

    serialize: (value: unknown): string => {
      if (value instanceof jodaClass) {
        return (value as T).toString();
      }
      if (typeof value === 'string') {
        try {
          parseMethod(value); // will throw if it's invalid
          return value;
        } catch {
          throw new GraphQLError(
            `${name} can not represent invalid type ${JSON.stringify(value)}`
          );
        }
      }
      throw new GraphQLError(
        `${name} can not represent invalid type ${JSON.stringify(value)}`
      );
    },
    parseValue: (value: unknown): T => {
      if (typeof value === 'string') {
        return parseMethod(value);
      }
      throw new GraphQLError(
        `${name} can not represent non-string type ${JSON.stringify(value)}`
      );
    },
    parseLiteral: (ast): T => {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          `${name} can not represent non-string type ${JSON.stringify(ast)}`
        );
      }
      return parseMethod(ast.value);
    },
  });

export const LocalDate = buildScalarType(
  'LocalDate',
  'A date string, such as 2018-07-01, serialized in ISO8601 format',
  joda.LocalDate,
  joda.LocalDate.parse
);

export const LocalDateTime = buildScalarType(
  'LocalDateTime',
  'A date and time, such as 2018-07-01T12:00:00, without a timezone, serialized in ISO8601 format',
  joda.LocalDateTime,
  joda.LocalDateTime.parse
);

export const LocalTime = buildScalarType(
  'LocalTime',
  'A time string, such as 12:00:00, serialized in ISO8601 format',
  joda.LocalTime,
  joda.LocalTime.parse
);

export const ZonedDateTime = buildScalarType(
  'ZonedDateTime',
  'A specific moment in time, such as 2018-07-01T12:00:00-04:00, serialized in ISO8601 format',
  joda.ZonedDateTime,
  joda.ZonedDateTime.parse
);

export const ZoneId = buildScalarType(
  'ZoneId',
  'A timezone ID from the IANA timezone database, such as America/New_York or UTC',
  joda.ZoneId,
  joda.ZoneId.of
);

export const Duration = buildScalarType(
  'Duration',
  'A time-based amount of time, such as "34.5 seconds"',
  joda.Duration,
  joda.Duration.parse
);
