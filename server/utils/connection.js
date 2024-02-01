var mongoose = require('mongoose')
const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

var conn = mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(db => {
    console.log('Database connected');
    return db
  })
  .catch(error => {
    console.log('Error connecting to database', error)
  })
module.exports = conn