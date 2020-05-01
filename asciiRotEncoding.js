var chars = 20;
var min = 32;
var max = 126;

var asciiRotEncoding = {

  encode: function (message) {
    var compressed = message;
    var result = '';
    var randomNum = 0;
    for (var i = 0; i < compressed.length; i++) {
      if (i % chars === 0) {
        randomNum = Math.min(max - min - chars, Math.max(min, Math.floor(Math.random() * (max - min - chars)) + chars));
        result += String.fromCharCode(randomNum);
      }

      var charCode = compressed.charCodeAt(i);
      var newCharCode = charCode + randomNum;
      if (newCharCode > max) {
        newCharCode = (newCharCode - max) + min;
      }
      var encoded = String.fromCharCode(newCharCode);

      result += encoded || compressed[i];
    }
    return result;
  },

  decode: function (message) {
    var result = '';
    var randomNum = 0;
    var rounds = 0;
    var nextRound = 0;
    for (var i = 0; i < message.length; i++) {
      if (i === nextRound) {
        randomNum = message.charCodeAt(i);
        rounds++;
        nextRound = (chars * rounds) + (rounds);
        continue;
      }

      var charCode = message.charCodeAt(i);
      var newCharCode = charCode - randomNum;
      if (newCharCode < min) {
        newCharCode = max - min + newCharCode;
      }
      var encoded = String.fromCharCode(newCharCode);

      result += encoded || message[i];
    }
    return result;
  }
}
