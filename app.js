
var encoding = {
  messageThatWasEncoded: '',
  encodedMessage: '',
  encodingType: "1"
};

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Stranger',
    encoded: '67883 *}%?(47%',
    encodingType: "1"
  },
  computed: {
    messageEncoded: function () {
      if (this.message != encoding.messageThatWasEncoded || this.encodingType != encoding.encodingType) {
        encoding.messageThatWasEncoded = this.message;
        encoding.encodingType = this.encodingType;
        var message;
        switch (this.encodingType) {
          case "1":
            message = keyEncoding.encode(this.message);
            break;
          case "2":
            message = asciiRotEncoding.encode(this.message);
            break;
          case "3":
            message = compressedAsciiRotEncoding.encode(this.message);
            break;
        }
        encoding.encodedMessage = message;
      }
      return encoding.encodedMessage;
    },

    decodedMessage: function () {
      var message;
      switch (this.encodingType) {
        case "1":
          message = keyEncoding.decode(this.encoded);
          break;
        case "2":
          message = asciiRotEncoding.decode(this.encoded);
          break;
        case "3":
          message = compressedAsciiRotEncoding.decode(this.encoded);
          break;
      }
      return message;
    }
  },
})

feather.replace();