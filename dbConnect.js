const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const mongoUri = "mongodb://localhost:27017/new-pr";

  try {
    const connect = await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Mongodb connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(error, "Error due to connection");
    process.exit(1);
  }
};
