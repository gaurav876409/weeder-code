const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("insert your own db string here")
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("there was some error", err);
    });
}

module.exports = connect;
