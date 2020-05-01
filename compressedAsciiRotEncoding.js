

var compressedAsciiRotEncoding = {

  encode: function (message) {
    return asciiRotEncoding.encode(LZString.compressToBase64(message));
  },

  decode: function (message) {
    return LZString.decompressFromBase64(asciiRotEncoding.decode(message));
  }
}
