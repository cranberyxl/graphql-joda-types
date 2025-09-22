import { Kind } from 'graphql';
import * as joda from '@js-joda/core';
import { ZoneId } from '..';

const UTC = joda.ZoneId.of('UTC');

describe('ZoneId', () => {
  it('has a description', () => {
    expect(ZoneId.description).toBe(
      'A timezone ID from the IANA timezone database, such as America/New_York or UTC'
    );
  });

  it('parses UTC', () => {
    expect(ZoneId.parseValue('UTC')).toEqual(UTC);

    expect(
      ZoneId.parseLiteral({ kind: Kind.STRING, value: 'UTC' }, null)
    ).toEqual(UTC);
  });

  it('parses different timezone formats', () => {
    expect(ZoneId.parseValue('+05:30')).toEqual(joda.ZoneId.of('+05:30'));
    expect(ZoneId.parseValue('-08:00')).toEqual(joda.ZoneId.of('-08:00'));
    expect(ZoneId.parseValue('Z')).toEqual(joda.ZoneId.of('Z'));
  });

  it('rejects invalid zones', () => {
    expect(() => ZoneId.parseValue('some garbage')).toThrow(
      'unsupported ZoneId:some garbage'
    );
  });

  it('rejects non-string types', () => {
    expect(() => ZoneId.parseValue(2018)).toThrow(
      'ZoneId can not represent non-string type 2018'
    );
    expect(() =>
      ZoneId.parseLiteral({ kind: Kind.INT, value: '20180701' }, null)
    ).toThrow(
      'ZoneId can not represent non-string type {"kind":"IntValue","value":"20180701"}'
    );
    expect(() => ZoneId.serialize(2018)).toThrow(
      'ZoneId can not represent invalid type 2018'
    );
  });

  it('rejects undefined and throws', () => {
    expect(() => ZoneId.parseValue(undefined)).toThrow(
      'ZoneId can not represent non-string type undefined'
    );
  });

  it('serializes zones', () => {
    expect(ZoneId.serialize(UTC)).toEqual('UTC');
  });

  it('serializes strings (by passing them through)', () => {
    expect(ZoneId.serialize('UTC')).toEqual('UTC');
  });

  it('refuses to serialize strings that are not valid zones', () => {
    expect(() => ZoneId.serialize('some garbage')).toThrow(
      'ZoneId can not represent invalid type "some garbage"'
    );
  });
});
