
var codeKey = {
  'A': '?',
  'B': '$',
  'C': '9',
  'D': '\\',
  'E': '7',
  'F': '~',
  'G': '4',
  'H': '6',
  'I': '&',
  'J': '^',
  'K': '+',
  'L': '8',
  'M': '=',
  'N': '(',
  'O': '3',
  'P': '/',
  'Q': '1',
  'R': '%',
  'S': '*',
  'T': '}',
  'U': '@',
  'V': ')',
  'W': '!',
  'X': '5',
  'Y': '-',
  'Z': '2',
}

var vals = _.invert(codeKey);

var keyEncoding = {

  codeKey: codeKey,

  encode: function (message) {
    var result = '';
    for (var i = 0; i < message.length; i++) {
      var encoded = codeKey[message[i].toUpperCase()];

      result += encoded || message[i];
    }
    return result;
  },

  decode: function (message) {
    var result = '';
    for (var i = 0; i < message.length; i++) {

      var decoded = vals[message[i]];

      result += decoded || message[i];
    }
    return result;
  }
}