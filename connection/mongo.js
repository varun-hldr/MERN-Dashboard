const MongoClient = require("mongodb").MongoClient;

let db;
const connectDb = (callback) => {
  if (db) return callback();
  MongoClient.connect(
    process.env.CONNECTION_URL,
    { useUnifiedTopology: true },
    (err, database) => {
      if (err) return console.log(err);
      db = database.db(process.env.DATABASE_NAME);
      console.log("Database Connected");
      callback();
    }
  );
};

const getCol = (collectionToGet) => {
  return db.collection(collectionToGet);
};

module.exports = {
  connectDb,
  getCol,
};
