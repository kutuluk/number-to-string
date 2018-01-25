const init = (alphabet, alt) => {
  const minus = alphabet.charAt(0);
  // binary to string lookup table
  const b2s = [];
  // string to binary lookup table
  const s2b = [];

  for (let i = 0; i < alphabet.length - 1; i++) {
    b2s[i] = alphabet.charAt(i + 1);
    const code = alphabet.charCodeAt(i + 1);
    if (s2b[code]) throw new Error('Bed alphabet');
    s2b[code] = i;
  }

  if (alt) {
    for (let i = 0; i < alt.length - 1; i++) {
      s2b[alt.charCodeAt(i + 1)] = i;
    }
  }

  return { minus, b2s, s2b };
};

/*
function sequence(start, end) {
  let s = '';
  for (let i = start; i <= end; i++) {
    s += String.fromCharCode(i);
  }
  return s;
}

const digits = sequence(48, 57); // 0123456789
const AZ = sequence(65, 90); // ABCDEFGHIJKLMNOPQRSTUVWXYZ
const az = sequence(97, 122); // abcdefghijklmnopqrstuvwxyz
*/

const digits = '0123456789';
const az = 'abcdefghijklmnopqrstuvwxyz';
const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const defaultAlphabet = `-${digits}${az}${AZ}.~:+=^!/*?&<>()[]{}@%$#`;
const extECMAS = init(defaultAlphabet);
const legacyECMAS = init(defaultAlphabet, `-${digits}${AZ}`);

const converters = [];

function Converter(radix, alphabet, name) {
  radix = radix || 10;
  if (!alphabet && converters[radix]) return converters[radix];

  if (typeof radix !== 'number') throw new Error(`Converter '${radix}' not found`);

  // eslint-disable-next-line no-nested-ternary
  const { minus, b2s, s2b } = alphabet ? init(alphabet) : radix > 36 ? extECMAS : legacyECMAS;

  if (alphabet && b2s.length !== radix) throw new Error('Bed alphabet');

  const api = {
    ston: (ascii) => {
      let number = 0;
      const sign = ascii.charAt(0) === minus ? 1 : 0;

      for (let i = sign; i < ascii.length; i++) {
        number = number * radix + s2b[ascii.charCodeAt(i)];
      }

      return sign ? -number : number;
    },
  };

  if (radix === 10) {
    // native converter
    api.ntos = (number) => {
      if (typeof number !== 'number') throw new Error(`${number} not a number`);

      return String(Math.sign(number) * Math.floor(Math.abs(number)));
    };
  } else if ((radix & -radix) === radix) {
    const mask = radix - 1;
    const rshift = Math.log(radix) / Math.LN2;
    const lshift = 32 - rshift;

    const ntos = (number) => {
      if (typeof number !== 'number') throw new Error(`${number} not a number`);

      if (number < 0) return `${minus}${ntos(-number)}`;
      /*
      let sign = '';
      if (number < 0) {
        sign = minus;
        number = -number;
      }
      */

      let lo = number >>> 0;
      let hi = (number / 4294967296) >>> 0;

      let right = '';
      while (hi > 0) {
        right = b2s[mask & lo] + right;
        lo >>>= rshift;
        lo |= (mask & hi) << lshift;
        hi >>>= rshift;
      }

      let left = '';
      do {
        left = b2s[mask & lo] + left;
        lo >>>= rshift;
      } while (lo > 0);

      return left + right;
      // return sign + left + right;
    };

    api.ntos = ntos;
  } else {
    const ntos = (number) => {
      if (typeof number !== 'number') throw new Error(`${number} not a number`);

      if (number < 0) return `${minus}${ntos(-number)}`;
      /*
      let sign = '';
      if (number < 0) {
        sign = minus;
        number = -number;
      }
      */

      let ascii = '';
      number = Math.floor(number);

      do {
        ascii = b2s[number % radix] + ascii;
        number = Math.floor(number / radix);
      } while (number > 0);

      return ascii;
      // return sign + ascii;
    };

    api.ntos = ntos;
  }

  if (!alphabet) converters[radix] = api;
  else if (name) converters[name] = api;

  return api;
}

Converter.ntos = (number, radix) => {
  radix = radix || 10;
  return (converters[radix] || Converter(radix)).ntos(number);
};

Converter.ston = (ascii, radix) => {
  radix = radix || 10;
  return (converters[radix] || Converter(radix)).ston(ascii);
};

Converter.stos = (from, to) => {
  const ston = Converter(from).ston;
  const ntos = Converter(to).ntos;
  return ascii => ntos(ston(ascii));
};

/*
// https://tools.ietf.org/html/rfc3548#section-6
Converter.base16 = `-${digits}${AZ}`;

// https://tools.ietf.org/html/rfc3548#section-5
Converter.base32 = `-${AZ}234567`;

Converter.base62 = `-${digits}${az}${AZ}`;

// https://tools.ietf.org/html/rfc3548#section-3
Converter.base64 = `-${AZ}${az}${digits}+/`;
// https://tools.ietf.org/html/rfc3548#section-4
Converter.base64safe = `~${AZ}${az}${digits}-_`;

// https://en.wikipedia.org/wiki/Ascii85
Converter.base85 = `~${sequence(33, 117)}`;
*/

export default Converter;
