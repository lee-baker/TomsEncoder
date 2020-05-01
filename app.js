
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

function encode(message) {
  var result = '';
  for (var i = 0; i < message.length; i++) {
    var encoded = codeKey[message[i].toUpperCase()];

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
var min = 32;
var max = 126;

function encodeNew(message){
  var compressed = message; // LZString.compressToBase64(message);
  var result = '';
  var randomNum = 0;
  for (var i = 0; i < compressed.length; i++) {
    if (i%chars === 0){
      randomNum = Math.min(max-min-chars, Math.max(min, Math.floor(Math.random() * (max-min-chars)) + chars));
      result += String.fromCharCode(randomNum);
    }

    var charCode = compressed.charCodeAt(i);
    var newCharCode = charCode + randomNum;
    if (newCharCode > max){
      newCharCode = (newCharCode - max) + min;
    }
    var encoded = String.fromCharCode(newCharCode);

    result += encoded || compressed[i];
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
  return result; // LZString.decompressFromBase64(result);
}

var encoding = { messageThatWasEncoded: '',  encodedMessage: '', isNewEncoding: true};

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Stranger',
    encoded: '67883 *}%?(47%',
    useNew: false
  },
  computed:{
    messageEncoded: function() {
      if (this.message != encoding.messageThatWasEncoded || this.useNew != encoding.isNewEncoding){
        encoding.messageThatWasEncoded = this.message;
        encoding.isNewEncoding = this.useNew;
        encoding.encodedMessage = this.useNew ? encodeNew(this.message) : encode(this.message);
      }
      return encoding.encodedMessage;
    }
  }
})


var copyToClipboard = function copyToClipboard(str) {
  var el = document.createElement('textarea'); // Create a <textarea> element

  el.value = str; // Set its value to the string that you want copied

  el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof

  el.style.position = 'absolute';
  el.style.left = '-9999px'; // Move outside the screen to make it invisible

  document.body.appendChild(el); // Append the <textarea> element to the HTML document

  var selected = document.getSelection().rangeCount > 0 // Check if there is any content selected previously
  ? document.getSelection().getRangeAt(0) // Store selection if found
  : false; // Mark as false to know no selection existed before

  el.select(); // Select the <textarea> content

  document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)

  document.body.removeChild(el); // Remove the <textarea> element

  if (selected) {
    // If a selection existed before copying
    document.getSelection().removeAllRanges(); // Unselect everything on the HTML document

    document.getSelection().addRange(selected); // Restore the original selection
  }
};

feather.replace();