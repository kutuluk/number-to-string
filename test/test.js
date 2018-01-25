/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */

const expect = require('chai').expect;
const Stringer = require('../dist/number-to-string.min.js');

const { ntos, ston } = Stringer;

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.~:+=^!/*?&<>()[]{}@%$#'.split(
  ''
);

const modulo = (number, radix) => {
  if (number < 0) return `-${modulo(-number, radix)}`;

  let ascii = '';
  number = Math.floor(number);

  do {
    ascii = alphabet[number % radix] + ascii;
    number = Math.floor(number / radix);
  } while (number > 0);

  return ascii;
};

const test = (number, radix, log) => {
  let float = number + Math.random() * Math.sign(number);
  if (Math.sign(float) * Math.floor(Math.abs(float)) !== number) float = number;

  const fast = ntos(float, radix);
  const slow = modulo(float, radix);
  const back = ston(fast, radix);
  if (log) console.log('%s to radix%s -> "%s" = "%s" -> %s', float, radix, fast, slow, back);

  if (fast !== slow) return NaN;
  return back;
};

const bases = Array(...Array(84)).map((x, i) => i + 2);
const numbers = Array(...Array(54)).map((x, i) => 2 ** i - 1);

describe('Tests', () => {
  it('Unsigned numbers', () => {
    bases.forEach(base => numbers.forEach(value => expect(test(value, base)).to.equal(value)));
  });

  it('Signed numbers', () => {
    bases.forEach(base => numbers.forEach(value => expect(test(-value, base)).to.equal(-value)));
  });

  it('ECMAS legacy uppercase support', () => {
    const converter = Stringer(36);
    expect(converter.ntos(1295)).to.equal('zz');
    expect(converter.ston('zz')).to.equal(1295);
    expect(converter.ston('ZZ')).to.equal(1295);
  });

  it('Custom converter', () => {
    const alpha = '-0123456789ABCDEF';
    const converter = Stringer(16, alpha);
    expect(converter.ntos(255)).to.equal('FF');
    expect(converter.ston(converter.ntos(255))).to.equal(255);
    expect(converter.ntos(-255)).to.equal('-FF');
    expect(converter.ston(converter.ntos(-255))).to.equal(-255);
  });

  it('Throw for bed alphabet of custom converter', () => {
    const small = '-0123456789abcde';
    const big = '-0123456789abcdefg';
    const double = '-0123456789abcdee';
    expect(() => Stringer(16, small)).to.throw('Bed alphabet');
    expect(() => Stringer(16, big)).to.throw('Bed alphabet');
    expect(() => Stringer(16, double)).to.throw('Bed alphabet');
  });

  it('Custom named converter', () => {
    const alpha = '-0123456789abcdef';
    const converter1 = Stringer(16, alpha, 'hex');
    const converter2 = Stringer('hex');
    expect(converter1.ntos(255)).to.equal('ff');
    expect(converter2.ntos(255)).to.equal('ff');
    expect(converter1).to.equal(converter2);
  });

  it('Throw for unregistered named converter', () => {
    expect(() => Stringer('bed')).to.throw;
  });

  it('Converting from one base to another', () => {
    const converter = Stringer.stos(10, 16);
    expect(converter('255')).to.equal('ff');
  });

  it('Fuzzing', () => {
    for (let i = 0; i <= 1000000; i += 1) {
      const number = Math.sign(Math.random() - 0.5) * Math.floor(Math.random() * 9007199254740991);
      const radix = Math.floor(Math.random() * 84) + 2;
      expect(test(number, radix)).to.equal(number);
    }
  }).timeout(0);

  /*
  it('Paranoid', () => {
    bases.forEach((base) => {
      console.log(base);
      for (let i = 0; i <= 9007199254740991; i += 1) {
        if (i % 1000000000000000) console.log(i);
        expect(test(i, base)).to.equal(i);
        // expect(test(-i, base)).to.equal(-i);
      }
    });
  }).timeout(0);
  */
});
