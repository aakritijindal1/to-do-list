const mongoose = require("mongoose");

async function connectToMongoDB(task) {
  return mongoose.connect(task);
}

module.exports = {
  connectToMongoDB,
};
