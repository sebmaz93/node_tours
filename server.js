const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

process.on('uncaughtException', err => {
  console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB_1, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connected'))
  .catch(e => console.log('DB error:', e));

// Server
const port = process.env.PORT || 8081;
const server = app.listen(port, () => {
  console.log('Listening on Port: ', port);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
