const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

// Suppress the strictQuery deprecation warning
mongoose.set("strictQuery", false);

const mongoDb = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, res) => {
      if (err) {
        console.log("---", err);
      } else {
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "food_category"
          );
          foodCategory.find({}).toArray(function (error, categories) {
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.food_category = categories;
            }
          });
        });
      }
    }
  );
};

module.exports = mongoDb;
