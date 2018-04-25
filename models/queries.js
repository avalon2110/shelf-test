const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const querySchema = new Schema({
  query: {
    type:String,
    required:true
  },
  ll: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now()
  },
  distance: {
    type: String
    // required: true
  }
});

module.exports = mongoose.model('Query', querySchema);
