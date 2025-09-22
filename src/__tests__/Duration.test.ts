import { Kind } from 'graphql';
import * as joda from '@js-joda/core';
import { Duration } from '..';

describe('Duration', () => {
  it('has a description', () => {
    expect(Duration.description).toBe(
      'A time-based amount of time, such as "34.5 seconds"'
    );
  });

  it('parses valid durations', () => {
    expect(Duration.parseValue('PT4H')).toEqual(
      joda.Duration.of(4, joda.ChronoUnit.HOURS)
    );

    expect(
      Duration.parseLiteral(
        {
          kind: Kind.STRING,
          value: 'PT9M',
        },
        null
      )
    ).toEqual(joda.Duration.of(9, joda.ChronoUnit.MINUTES));
  });

  it('rejects invalid durations', () => {
    expect(() => Duration.parseValue('2018-07-01')).toThrow(
      'Text cannot be parsed to a Duration: 2018-07-01, at index: 0'
    );
  });

  it('rejects non-string types', () => {
    expect(() => Duration.parseValue(2018)).toThrow(
      'Duration can not represent non-string type 2018'
    );
    expect(() =>
      Duration.parseLiteral({ kind: Kind.INT, value: '20180701' }, null)
    ).toThrow(
      'Duration can not represent non-string type {"kind":"IntValue","value":"20180701"}'
    );
    expect(() => Duration.serialize(2018)).toThrow(
      'Duration can not represent invalid type 2018'
    );
  });

  it('rejects undefined and throws', () => {
    expect(() => Duration.parseValue(undefined)).toThrow(
      'Duration can not represent non-string type undefined'
    );
  });

  it('serializes durations', () => {
    expect(
      Duration.serialize(joda.Duration.of(4, joda.ChronoUnit.HOURS))
    ).toEqual('PT4H');
  });

  it('serializes strings (by passing them through)', () => {
    expect(Duration.serialize('PT4H')).toEqual('PT4H');
  });

  it('refuses to serialize strings that are not valid durations', () => {
    expect(() => Duration.serialize('some garbage')).toThrow(
      'Duration can not represent invalid type "some garbage"'
    );
  });
});
