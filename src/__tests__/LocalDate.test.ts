import { Kind } from 'graphql';
import * as joda from '@js-joda/core';
import { LocalDate } from '..';

describe('LocalDate', () => {
  it('has a description', () => {
    expect(LocalDate.description).toBe(
      'A date string, such as 2018-07-01, serialized in ISO8601 format'
    );
  });

  it('parses valid dates', () => {
    expect(LocalDate.parseValue('2018-07-01')).toEqual(
      joda.LocalDate.of(2018, 7, 1)
    );

    expect(
      LocalDate.parseLiteral({ kind: Kind.STRING, value: '2018-07-01' }, null)
    ).toEqual(joda.LocalDate.of(2018, 7, 1));
  });

  it('rejects invalid dates', () => {
    expect(() => LocalDate.parseValue('some garbage')).toThrow(
      "Text 'some garbage' could not be parsed at index 0: some garbage, at index: 0"
    );
  });

  it('rejects non-string types', () => {
    expect(() => LocalDate.parseValue(2018)).toThrow(
      'LocalDate can not represent non-string type 2018'
    );
    expect(() =>
      LocalDate.parseLiteral({ kind: Kind.INT, value: '20180701' }, null)
    ).toThrow(
      'LocalDate can not represent non-string type {"kind":"IntValue","value":"20180701"}'
    );
    expect(() => LocalDate.serialize(2018)).toThrow(
      'LocalDate can not represent invalid type 2018'
    );
  });

  it('rejects undefined and throws', () => {
    expect(() => LocalDate.parseValue(undefined)).toThrow(
      'LocalDate can not represent non-string type undefined'
    );
  });

  it('rejects null values', () => {
    expect(() => LocalDate.parseValue(null)).toThrow(
      'LocalDate can not represent non-string type null'
    );
    expect(() => LocalDate.serialize(null)).toThrow(
      'LocalDate can not represent invalid type null'
    );
  });

  it('serializes dates', () => {
    expect(LocalDate.serialize(joda.LocalDate.of(2018, 7, 1))).toEqual(
      '2018-07-01'
    );
  });

  it('serializes strings (by passing them through)', () => {
    expect(LocalDate.serialize('2018-07-01')).toEqual('2018-07-01');
  });

  it('refuses to serialize strings that are not valid dates', () => {
    expect(() => LocalDate.serialize('some garbage')).toThrow(
      'LocalDate can not represent invalid type "some garbage"'
    );
  });
});
