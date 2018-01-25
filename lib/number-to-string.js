(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.numberToString = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var init = function init(alphabet, alt) {
    var minus = alphabet.charAt(0);
    // binary to string lookup table
    var b2s = [];
    // string to binary lookup table
    var s2b = [];

    for (var i = 0; i < alphabet.length - 1; i++) {
      b2s[i] = alphabet.charAt(i + 1);
      var code = alphabet.charCodeAt(i + 1);
      if (s2b[code]) throw new Error('Bed alphabet');
      s2b[code] = i;
    }

    if (alt) {
      for (var _i = 0; _i < alt.length - 1; _i++) {
        s2b[alt.charCodeAt(_i + 1)] = _i;
      }
    }

    return { minus: minus, b2s: b2s, s2b: s2b };
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

  var digits = '0123456789';
  var az = 'abcdefghijklmnopqrstuvwxyz';
  var AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  var defaultAlphabet = '-' + digits + az + AZ + '.~:+=^!/*?&<>()[]{}@%$#';
  var extECMAS = init(defaultAlphabet);
  var legacyECMAS = init(defaultAlphabet, '-' + digits + AZ);

  var converters = [];

  function Converter(radix, alphabet, name) {
    radix = radix || 10;
    if (!alphabet && converters[radix]) return converters[radix];

    if (typeof radix !== 'number') throw new Error('Converter \'' + radix + '\' not found');

    // eslint-disable-next-line no-nested-ternary

    var _ref = alphabet ? init(alphabet) : radix > 36 ? extECMAS : legacyECMAS,
        minus = _ref.minus,
        b2s = _ref.b2s,
        s2b = _ref.s2b;

    if (alphabet && b2s.length !== radix) throw new Error('Bed alphabet');

    var api = {
      ston: function ston(ascii) {
        var number = 0;
        var sign = ascii.charAt(0) === minus ? 1 : 0;

        for (var i = sign; i < ascii.length; i++) {
          number = number * radix + s2b[ascii.charCodeAt(i)];
        }

        return sign ? -number : number;
      }
    };

    if (radix === 10) {
      // native converter
      api.ntos = function (number) {
        if (typeof number !== 'number') throw new Error(number + ' not a number');

        return String(Math.sign(number) * Math.floor(Math.abs(number)));
      };
    } else if ((radix & -radix) === radix) {
      var mask = radix - 1;
      var rshift = Math.log(radix) / Math.LN2;
      var lshift = 32 - rshift;

      var ntos = function ntos(number) {
        if (typeof number !== 'number') throw new Error(number + ' not a number');

        if (number < 0) return '' + minus + ntos(-number);
        /*
        let sign = '';
        if (number < 0) {
          sign = minus;
          number = -number;
        }
        */

        var lo = number >>> 0;
        var hi = number / 4294967296 >>> 0;

        var right = '';
        while (hi > 0) {
          right = b2s[mask & lo] + right;
          lo >>>= rshift;
          lo |= (mask & hi) << lshift;
          hi >>>= rshift;
        }

        var left = '';
        do {
          left = b2s[mask & lo] + left;
          lo >>>= rshift;
        } while (lo > 0);

        return left + right;
        // return sign + left + right;
      };

      api.ntos = ntos;
    } else {
      var _ntos = function _ntos(number) {
        if (typeof number !== 'number') throw new Error(number + ' not a number');

        if (number < 0) return '' + minus + _ntos(-number);
        /*
        let sign = '';
        if (number < 0) {
          sign = minus;
          number = -number;
        }
        */

        var ascii = '';
        number = Math.floor(number);

        do {
          ascii = b2s[number % radix] + ascii;
          number = Math.floor(number / radix);
        } while (number > 0);

        return ascii;
        // return sign + ascii;
      };

      api.ntos = _ntos;
    }

    if (!alphabet) converters[radix] = api;else if (name) converters[name] = api;

    return api;
  }

  Converter.ntos = function (number, radix) {
    radix = radix || 10;
    return (converters[radix] || Converter(radix)).ntos(number);
  };

  Converter.ston = function (ascii, radix) {
    radix = radix || 10;
    return (converters[radix] || Converter(radix)).ston(ascii);
  };

  Converter.stos = function (from, to) {
    var ston = Converter(from).ston;
    var ntos = Converter(to).ntos;
    return function (ascii) {
      return ntos(ston(ascii));
    };
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

  exports.default = Converter;
  module.exports = exports['default'];
});
