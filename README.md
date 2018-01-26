# number-to-string
Fast converting of a number to a string on any base (radix).

[![NPM version](https://img.shields.io/npm/v/@kutuluk/number-to-string.svg?style=flat-square)](https://www.npmjs.com/package/@kutuluk/number-to-string)[![Build Status](https://img.shields.io/travis/kutuluk/number-to-string/master.svg?style=flat-square)](https://travis-ci.org/kutuluk/number-to-string)

## Features

- Converts all values of javascript safe integers range (from `-9007199254740991` to `9007199254740991`)
- Where possible extremely fast due to bitwise operations
- Does not add extra padding characters for more efficient compression
- Built-in support for bases from 2 to 85
- With default alphabet up to base 64 inclusive generates url-safe strings and for all built-in bases generates json-safe (non-escaping) strings
- Possibility to create a converter to any base with custom alphabet
- ES3 compatible

## Installation

```sh
npm install @kutuluk/number-to-string
```

## API

#### `ntos(number, radix)`

Takes a number, discards the fractional part, and returns a string of radix representation. If number not a number throw error.

#### `ston(string, radix)`
Takes a string of radix representation and returns a number.

#### `stos(source, destination)`
Returns function that converts the string from source base to destination base.


## Usage

### Browser directly
```html
<script src="https://unpkg.com/@kutuluk/number-to-string/dist/number-to-string.min.js"></script>


<script>
  var decToHex = numberToString.stos(10, 16);
  console.log(decToHex('255'));
</script>
```

Output
```
ff
```

### ES6
```javascript
import stringer, { ntos, ston } from 'number-to-string';

const test = (number, base) => {
  const ascii = ntos(number, base);
  const back = ston(ascii, base);
  console.log('base%s: %s -> "%s" -> %s (%s)', base, number, ascii, back, back === number);
};

const bases = Array(...Array(84)).map((x, i) => i + 2);

bases.forEach(base => test(0xffffffff, base));

stringer(58, '-123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', '58flickr');
test(0xffffffff, '58flickr');
test(0xffffffff, 58);
```

Output
```
base2: 4294967295 -> "11111111111111111111111111111111" -> 4294967295 (true)
base3: 4294967295 -> "102002022201221111210" -> 4294967295 (true)
base4: 4294967295 -> "3333333333333333" -> 4294967295 (true)
base5: 4294967295 -> "32244002423140" -> 4294967295 (true)
base6: 4294967295 -> "1550104015503" -> 4294967295 (true)
base7: 4294967295 -> "211301422353" -> 4294967295 (true)
base8: 4294967295 -> "37777777777" -> 4294967295 (true)
base9: 4294967295 -> "12068657453" -> 4294967295 (true)
base10: 4294967295 -> "4294967295" -> 4294967295 (true)
base11: 4294967295 -> "1904440553" -> 4294967295 (true)
base12: 4294967295 -> "9ba461593" -> 4294967295 (true)
base13: 4294967295 -> "535a79888" -> 4294967295 (true)
base14: 4294967295 -> "2ca5b7463" -> 4294967295 (true)
base15: 4294967295 -> "1a20dcd80" -> 4294967295 (true)
base16: 4294967295 -> "ffffffff" -> 4294967295 (true)
base17: 4294967295 -> "a7ffda90" -> 4294967295 (true)
base18: 4294967295 -> "704he7g3" -> 4294967295 (true)
base19: 4294967295 -> "4f5aff65" -> 4294967295 (true)
base20: 4294967295 -> "3723ai4f" -> 4294967295 (true)
base21: 4294967295 -> "281d55i3" -> 4294967295 (true)
base22: 4294967295 -> "1fj8b183" -> 4294967295 (true)
base23: 4294967295 -> "1606k7ib" -> 4294967295 (true)
base24: 4294967295 -> "mb994af" -> 4294967295 (true)
base25: 4294967295 -> "hek2mgk" -> 4294967295 (true)
base26: 4294967295 -> "dnchbnl" -> 4294967295 (true)
base27: 4294967295 -> "b28jpdl" -> 4294967295 (true)
base28: 4294967295 -> "8pfgih3" -> 4294967295 (true)
base29: 4294967295 -> "76beigf" -> 4294967295 (true)
base30: 4294967295 -> "5qmcpqf" -> 4294967295 (true)
base31: 4294967295 -> "4q0jto3" -> 4294967295 (true)
base32: 4294967295 -> "3vvvvvv" -> 4294967295 (true)
base33: 4294967295 -> "3aokq93" -> 4294967295 (true)
base34: 4294967295 -> "2qhxjlh" -> 4294967295 (true)
base35: 4294967295 -> "2br45qa" -> 4294967295 (true)
base36: 4294967295 -> "1z141z3" -> 4294967295 (true)
base37: 4294967295 -> "1oyozn6" -> 4294967295 (true)
base38: 4294967295 -> "1g7ui35" -> 4294967295 (true)
base39: 4294967295 -> "18nkmol" -> 4294967295 (true)
base40: 4294967295 -> "11Bsymf" -> 4294967295 (true)
base41: 4294967295 -> "B2CacA" -> 4294967295 (true)
base42: 4294967295 -> "wAb6u3" -> 4294967295 (true)
base43: 4294967295 -> "t9bGnf" -> 4294967295 (true)
base44: 4294967295 -> "q1DCB3" -> 4294967295 (true)
base45: 4294967295 -> "nchvmu" -> 4294967295 (true)
base46: 4294967295 -> "kDb7wb" -> 4294967295 (true)
base47: 4294967295 -> "iy87FF" -> 4294967295 (true)
base48: 4294967295 -> "gF475f" -> 4294967295 (true)
base49: 4294967295 -> "fa1uhC" -> 4294967295 (true)
base50: 4294967295 -> "dB9AJJ" -> 4294967295 (true)
base51: 4294967295 -> "cmHMk0" -> 4294967295 (true)
base52: 4294967295 -> "bflzoL" -> 4294967295 (true)
base53: 4294967295 -> "aeh5cF" -> 4294967295 (true)
base54: 4294967295 -> "9j5KLl" -> 4294967295 (true)
base55: 4294967295 -> "8tjRNp" -> 4294967295 (true)
base56: 4294967295 -> "7IEwAv" -> 4294967295 (true)
base57: 4294967295 -> "77NM8o" -> 4294967295 (true)
base58: 4294967295 -> "6vuM8f" -> 4294967295 (true)
base59: 4294967295 -> "60qnqO" -> 4294967295 (true)
base60: 4294967295 -> "5vo6sf" -> 4294967295 (true)
base61: 4294967295 -> "55c8NU" -> 4294967295 (true)
base62: 4294967295 -> "4GFfc3" -> 4294967295 (true)
base63: 4294967295 -> "4kEEk3" -> 4294967295 (true)
base64: 4294967295 -> "3~~~~~" -> 4294967295 (true)
base65: 4294967295 -> "3JDpjY" -> 4294967295 (true)
base66: 4294967295 -> "3sneS3" -> 4294967295 (true)
base67: 4294967295 -> "3c9f:w" -> 4294967295 (true)
base68: 4294967295 -> "2:XurP" -> 4294967295 (true)
base69: 4294967295 -> "2Px8AV" -> 4294967295 (true)
base70: 4294967295 -> "2CZR+J" -> 4294967295 (true)
base71: 4294967295 -> "2r1708" -> 4294967295 (true)
base72: 4294967295 -> "2fX0zD" -> 4294967295 (true)
base73: 4294967295 -> "25hFfv" -> 4294967295 (true)
base74: 4294967295 -> "1/g<MH" -> 4294967295 (true)
base75: 4294967295 -> "1YTNTJ" -> 4294967295 (true)
base76: 4294967295 -> "1QU4DH" -> 4294967295 (true)
base77: 4294967295 -> "1JdY<3" -> 4294967295 (true)
base78: 4294967295 -> "1C2IPl" -> 4294967295 (true)
base79: 4294967295 -> "1vlgXN" -> 4294967295 (true)
base80: 4294967295 -> "1o!MPf" -> 4294967295 (true)
base81: 4294967295 -> "1i.X^M" -> 4294967295 (true)
base82: 4294967295 -> "1c@R^[" -> 4294967295 (true)
base83: 4294967295 -> "17FD[)" -> 4294967295 (true)
base84: 4294967295 -> "12mxf3" -> 4294967295 (true)
base85: 4294967295 -> "%nSc0" -> 4294967295 (true)
base58flickr: 4294967295 -> "7xwQ9g" -> 4294967295 (true)
base58: 4294967295 -> "6vuM8f" -> 4294967295 (true)
```

## Benchmarking

```
Windows_NT 10.0.16299
Intel(R) Core(TM) i3-4010U CPU @ 1.70GHz

Converting to radix10: -1 -> "-1" -> -1
----------------------------------------------------------------
number-to-string universal x 9,419,230 ops/sec ±0.85% (84 runs sampled)
number-to-string converter x 11,563,331 ops/sec ±1.14% (87 runs sampled)
native parseInt(.toString) x 4,135,163 ops/sec ±0.93% (88 runs sampled)

Converting to radix10: 9007199254740991 -> "9007199254740991" -> 9007199254740991
----------------------------------------------------------------
number-to-string universal x 4,550,363 ops/sec ±0.50% (91 runs sampled)
number-to-string converter x 4,749,333 ops/sec ±3.71% (84 runs sampled)
native parseInt(.toString) x 2,419,820 ops/sec ±2.54% (83 runs sampled)

Converting to radix16: -1 -> "-1" -> -1
----------------------------------------------------------------
number-to-string universal x 5,320,061 ops/sec ±0.52% (88 runs sampled)
number-to-string converter x 6,193,350 ops/sec ±0.99% (89 runs sampled)
native parseInt(.toString) x 2,160,374 ops/sec ±0.52% (88 runs sampled)

Converting to radix16: 9007199254740991 -> "1fffffffffffff" -> 9007199254740991
----------------------------------------------------------------
number-to-string universal x 1,095,176 ops/sec ±0.85% (91 runs sampled)
number-to-string converter x 1,139,885 ops/sec ±0.69% (91 runs sampled)
native parseInt(.toString) x 781,135 ops/sec ±1.12% (88 runs sampled)

Converting to radix36: -1 -> "-1" -> -1
----------------------------------------------------------------
number-to-string universal x 4,828,318 ops/sec ±0.64% (89 runs sampled)
number-to-string converter x 5,433,013 ops/sec ±1.22% (86 runs sampled)
native parseInt(.toString) x 2,169,850 ops/sec ±0.45% (90 runs sampled)

Converting to radix36: 9007199254740991 -> "2gosa7pa2gv" -> 9007199254740991
----------------------------------------------------------------
number-to-string universal x 1,091,342 ops/sec ±0.86% (91 runs sampled)
number-to-string converter x 1,125,173 ops/sec ±0.37% (88 runs sampled)
native parseInt(.toString) x 811,707 ops/sec ±0.50% (88 runs sampled)

Converting to radix62: -1 -> "-1" -> -1
----------------------------------------------------------------
number-to-string universal x 4,647,154 ops/sec ±0.99% (88 runs sampled)
number-to-string converter x 5,304,933 ops/sec ±0.49% (90 runs sampled)
native parseInt(.toString) - error
base62 - error

Converting to radix62: 9007199254740991 -> "FfGNdXsE7" -> 9007199254740991
----------------------------------------------------------------
number-to-string universal x 1,282,715 ops/sec ±0.93% (87 runs sampled)
number-to-string converter x 1,327,040 ops/sec ±0.45% (91 runs sampled)
native parseInt(.toString) - error
base62 x 1,503,386 ops/sec ±1.09% (88 runs sampled)

Converting to radix64: -1 -> "-1" -> -1
----------------------------------------------------------------
number-to-string universal x 4,855,221 ops/sec ±0.87% (89 runs sampled)
number-to-string converter x 5,584,032 ops/sec ±1.24% (88 runs sampled)
native parseInt(.toString) - error
radix-64 - error
radixer - error

Converting to radix64: 9007199254740991 -> "v~~~~~~~~" -> 9007199254740991
----------------------------------------------------------------
number-to-string universal x 2,054,817 ops/sec ±0.68% (90 runs sampled)
number-to-string converter x 2,184,381 ops/sec ±1.06% (86 runs sampled)
native parseInt(.toString) - error
radix-64 x 737,466 ops/sec ±0.69% (86 runs sampled)
radixer x 667,436 ops/sec ±0.99% (87 runs sampled)

Converting to radix85: -1 -> "-1" -> -1
----------------------------------------------------------------
number-to-string universal x 4,648,319 ops/sec ±0.88% (88 runs sampled)
number-to-string converter x 5,266,536 ops/sec ±1.26% (89 runs sampled)
native parseInt(.toString) - error

Converting to radix85: 9007199254740991 -> "3p%p!()=v" -> 9007199254740991
----------------------------------------------------------------
number-to-string universal x 1,287,781 ops/sec ±0.42% (87 runs sampled)
number-to-string converter x 1,235,206 ops/sec ±2.79% (79 runs sampled)
native parseInt(.toString) - error
```
