const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
  active: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

function save(user) {
  var mongoDB = "mongodb://localhost/NodeInit";
  mongoose.connect(mongoDB);
  user.save((err) => {
    if (err) return handleError(err);
    // saved!
  });
}