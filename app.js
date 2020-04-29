
var key = {
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

var vals = _.invert(key);

function encode(message) {
  var result = '';
  for (var i = 0; i < message.length; i++) {
    var encoded = key[message[i].toUpperCase()];

    result += encoded || message[i];
  }
  return result;
}

function decode(message) {
  var result = '';
  for (var i = 0; i < message.length; i++) {

    var decoded = vals[message[i]];

    result += decoded || message[i];
  }
  return result;
}

var chars = 20;
var randomRot = 30;
var min = 32;
var max = 126;

function encodeNew(message){
  var result = '';
  var randomNum = 0;
  for (var i = 0; i < message.length; i++) {
    if (i%chars === 0){
      randomNum = Math.min(max-min-chars, Math.max(min, Math.floor(Math.random() * (max-min-chars)) + chars));
      result += String.fromCharCode(randomNum);
    }

    var charCode = message.charCodeAt(i);
    var newCharCode = charCode + randomNum;
    if (newCharCode > max){
      newCharCode = (newCharCode - max) + min;
    }
    var encoded = String.fromCharCode(newCharCode);

    result += encoded || message[i];
  }
  return result;
}

function decodeNew(message){
  var result = '';
  var randomNum = 0;
  var rounds = 0;
  var nextRound = 0;
  for (var i = 0; i < message.length; i++) {
    if (i === nextRound){
      randomNum = message.charCodeAt(i);
      rounds++;
      nextRound = (chars * rounds) + (rounds);
      continue;
    }

    var charCode = message.charCodeAt(i);
    var newCharCode = charCode - randomNum;
    if (newCharCode < min){
      newCharCode =  max - min + newCharCode;
    }
    var encoded = String.fromCharCode(newCharCode);

    result += encoded || message[i];
  }
  return result;
}

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Stranger',
    encoded: '67883 *}%?(47%',
    useNew: false
  }
})