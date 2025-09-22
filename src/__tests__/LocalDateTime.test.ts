import { Kind } from 'graphql';
import * as joda from '@js-joda/core';
import { LocalDateTime } from '..';

describe('LocalDateTime', () => {
  it('has a description', () => {
    expect(LocalDateTime.description).toBe(
      'A date and time, such as 2018-07-01T12:00:00, without a timezone, serialized in ISO8601 format'
    );
  });

  it('parses valid datetimes', () => {
    expect(LocalDateTime.parseValue('2018-07-01T20:00:00')).toEqual(
      joda.LocalDateTime.of(2018, 7, 1, 20)
    );

    expect(
      LocalDateTime.parseLiteral(
        {
          kind: Kind.STRING,
          value: '2018-07-01T20:00:00',
        },
        null
      )
    ).toEqual(joda.LocalDateTime.of(2018, 7, 1, 20));
  });

  it('rejects invalid datetimes', () => {
    expect(() => LocalDateTime.parseValue('2018-07-01')).toThrow(
      "Text '2018-07-01' could not be parsed at index 10: 2018-07-01, at index: 10"
    );
  });

  it('rejects non-string types', () => {
    expect(() => LocalDateTime.parseValue(2018)).toThrow(
      'LocalDateTime can not represent non-string type 2018'
    );
    expect(() =>
      LocalDateTime.parseLiteral({ kind: Kind.INT, value: '20180701' }, null)
    ).toThrow(
      'LocalDateTime can not represent non-string type {"kind":"IntValue","value":"20180701"}'
    );
    expect(() => LocalDateTime.serialize(2018)).toThrow(
      'LocalDateTime can not represent invalid type 2018'
    );
  });

  it('rejects undefined and throws', () => {
    expect(() => LocalDateTime.parseValue(undefined)).toThrow(
      'LocalDateTime can not represent non-string type undefined'
    );
  });

  it('serializes dates', () => {
    expect(
      LocalDateTime.serialize(joda.LocalDateTime.of(2018, 7, 1, 20))
    ).toEqual('2018-07-01T20:00');
  });

  it('serializes strings (by passing them through)', () => {
    expect(LocalDateTime.serialize('2018-07-01T20:00:00')).toEqual(
      '2018-07-01T20:00:00'
    );
  });

  it('refuses to serialize strings that are not valid dates', () => {
    expect(() => LocalDateTime.serialize('some garbage')).toThrow(
      'LocalDateTime can not represent invalid type "some garbage"'
    );
  });
});
