import { Kind } from 'graphql';
import * as joda from '@js-joda/core';
import { LocalTime } from '..';

describe('LocalTime', () => {
  it('has a description', () => {
    expect(LocalTime.description).toBe(
      'A time string, such as 12:00:00, serialized in ISO8601 format'
    );
  });

  it('parses valid times', () => {
    expect(LocalTime.parseValue('20:21:22')).toEqual(
      joda.LocalTime.of(20, 21, 22)
    );

    expect(
      LocalTime.parseLiteral({ kind: Kind.STRING, value: '20:21:22' }, null)
    ).toEqual(joda.LocalTime.of(20, 21, 22));
  });

  it('rejects invalid times', () => {
    expect(() => LocalTime.parseValue('some garbage')).toThrow(
      "Text 'some garbage' could not be parsed at index 0: some garbage, at index: 0"
    );
  });

  it('rejects non-string types', () => {
    expect(() => LocalTime.parseValue(2018)).toThrow(
      'LocalTime can not represent non-string type 2018'
    );
    expect(() =>
      LocalTime.parseLiteral({ kind: Kind.INT, value: '20180701' }, null)
    ).toThrow(
      'LocalTime can not represent non-string type {"kind":"IntValue","value":"20180701"}'
    );
    expect(() => LocalTime.serialize(2018)).toThrow(
      'LocalTime can not represent invalid type 2018'
    );
  });

  it('rejects undefined and throws', () => {
    expect(() => LocalTime.parseValue(undefined)).toThrow(
      'LocalTime can not represent non-string type undefined'
    );
  });

  it('serializes times', () => {
    expect(LocalTime.serialize(joda.LocalTime.of(20, 21, 22))).toEqual(
      '20:21:22'
    );
  });

  it('serializes strings (by passing them through)', () => {
    expect(LocalTime.serialize('20:00:00')).toEqual('20:00:00');
  });

  it('refuses to serialize strings that are not valid times', () => {
    expect(() => LocalTime.serialize('some garbage')).toThrow(
      'LocalTime can not represent invalid type "some garbage"'
    );
  });
});
