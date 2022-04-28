const generate = () => {
  var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  var string = "";
  for (var ii = 0; ii < 8; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string;
};

export default generate;
