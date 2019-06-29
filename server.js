const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

console.log(process.env);

// Server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('Listening on Port: ', port);
});
