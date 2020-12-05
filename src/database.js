const mongoose = require("mongoose");

const { notes_app_mongodb_host, notes_app_mongodb_database } = process.env;
const mongo_url = `mongodb://${notes_app_mongodb_host}/${notes_app_mongodb_database}`;

mongoose
  .connect(mongo_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Database connected"))
  .catch((err) => console.log(err));

  console.log(mongo_url);