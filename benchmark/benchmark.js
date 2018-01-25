/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const os = require('os');
const Benchmark = require('benchmark');

const Stringer = require('../lib/number-to-string.js');

const untos = Stringer.ntos;
const uston = Stringer.ston;

const { encodeInt, decodeToInt } = require('radix-64')();
const { numberToString, stringToNumber } = require('radixer');
const { encode, decode } = require('base62');

const base58 = require('base58');

const base58encode = base58.encode;
const base58decode = base58.decode;

function test(number, radix) {
  const { ntos, ston } = Stringer(radix);

  console.log(
    '\nConverting to radix%s: %s -> "%s" -> %s',
    radix,
    number,
    Stringer.ntos(number, radix),
    number,
  );
  console.log('----------------------------------------------------------------');

  const implementations = {
    'number-to-string universal': () => uston(untos(number, radix), radix),
    'number-to-string converter': () => ston(ntos(number)),
    'native parseInt(.toString)': () => parseInt(number.toString(radix), radix),
  };

  if (radix === 58) {
    implementations.base58 = () => base58decode(base58encode(number));
  }

  if (radix === 62) {
    implementations.base62 = () => decode(encode(number));
  }

  if (radix === 64) {
    implementations['radix-64'] = () => decodeToInt(encodeInt(number));
    implementations.radixer = () => stringToNumber(numberToString(number));
  }

  const suite = new Benchmark.Suite();

  Object.keys(implementations).forEach((key) => {
    let successful = false;
    try {
      successful = number === implementations[key](number);
      // eslint-disable-next-line no-empty
    } catch (ignore) {}
    if (successful) {
      suite.add(key, implementations[key]);
    } else {
      suite.add(key, () => {
        throw new Error();
      });
    }
  });

  suite
    .on('cycle', (event) => {
      if (event.target.error) console.log(`${event.target.name} - error`);
      else console.log(String(event.target));
    })
    .run();
}

console.log(os.type(), os.release());
console.log(os.cpus()[0].model);

[10, 16, 36, 62, 64, 85].forEach(radix =>
  [-1, 9007199254740991].forEach(number => test(number, radix)),
);

/*
const suite2 = new Benchmark.Suite();

suite2.add('ston10', () => Stringer.ston('4294967295', 10));
suite2.add('parseInt10', () => parseInt('4294967295', 10));

suite2
  .on('cycle', (event) => {
    if (event.target.error) console.log(`${event.target.name} - error`);
    else console.log(String(event.target));
  })
  .run();
*/
