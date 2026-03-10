const mongoose = require("mongoose");

const { MONGO_URI, PORT } = process.env;
const connectDB = async (app) => {
  try {
    await mongoose.connect(MONGO_URI || "");
    console.log("db connected");
    app.listen(PORT || 5000, () => {
      console.log(`Server is listening to ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
