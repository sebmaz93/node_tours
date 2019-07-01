const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

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
app.listen(port, () => {
  console.log('Listening on Port: ', port);
});
