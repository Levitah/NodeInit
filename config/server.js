const mongoose = require('mongoose');

const environments = require('../env');

// app
//const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(environments.database.connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//module.exports = app;