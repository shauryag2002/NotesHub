let mongoose = require("mongoose");

let mongoDB = `mongodb+srv://shaurya:shaurya@cluster0.jixqapu.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
