import { Kind } from 'graphql';
import * as joda from '@js-joda/core';
import { ZonedDateTime } from '..';

describe('ZonedDateTime', () => {
  it('has a description', () => {
    expect(ZonedDateTime.description).toBe(
      'A specific moment in time, such as 2018-07-01T12:00:00-04:00, serialized in ISO8601 format'
    );
  });

  it('parses valid datetimes', () => {
    expect(ZonedDateTime.parseValue('2018-07-01T20:21:22-04:00')).toEqual(
      joda.ZonedDateTime.of(
        2018,
        7,
        1,
        20,
        21,
        22,
        0,
        joda.ZoneOffset.ofHours(-4)
      )
    );

    expect(
      ZonedDateTime.parseLiteral(
        {
          kind: Kind.STRING,
          value: '2018-07-01T20:21:22-04:00',
        },
        null
      )
    ).toEqual(
      joda.ZonedDateTime.of(
        2018,
        7,
        1,
        20,
        21,
        22,
        0,
        joda.ZoneOffset.ofHours(-4)
      )
    );
  });

  it('rejects invalid datetimes', () => {
    expect(() => ZonedDateTime.parseValue('2018-07-01')).toThrow(
      "Text '2018-07-01' could not be parsed at index 10: 2018-07-01, at index: 10"
    );
  });

  it('rejects non-string types', () => {
    expect(() => ZonedDateTime.parseValue(2018)).toThrow(
      'ZonedDateTime can not represent non-string type 2018'
    );
    expect(() =>
      ZonedDateTime.parseLiteral({ kind: Kind.INT, value: '20180701' }, null)
    ).toThrow(
      'ZonedDateTime can not represent non-string type {"kind":"IntValue","value":"20180701"}'
    );
    expect(() => ZonedDateTime.serialize(2018)).toThrow(
      'ZonedDateTime can not represent invalid type 2018'
    );
  });

  it('rejects undefined and throws', () => {
    expect(() => ZonedDateTime.parseValue(undefined)).toThrow(
      'ZonedDateTime can not represent non-string type undefined'
    );
  });

  it('serializes dates', () => {
    expect(
      ZonedDateTime.serialize(
        joda.ZonedDateTime.of(
          2018,
          7,
          1,
          20,
          21,
          22,
          0,
          joda.ZoneOffset.ofHours(-4)
        )
      )
    ).toEqual('2018-07-01T20:21:22-04:00');
  });

  it('serializes strings (by passing them through)', () => {
    expect(ZonedDateTime.serialize('2018-07-01T20:00:00Z')).toEqual(
      '2018-07-01T20:00:00Z'
    );
  });

  it('refuses to serialize strings that are not valid dates', () => {
    expect(() => ZonedDateTime.serialize('some garbage')).toThrow(
      'ZonedDateTime can not represent invalid type "some garbage"'
    );
  });
});
