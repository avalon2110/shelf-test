const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const querySchema = new Schema({
  query: {
    type:String,
    required:true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now()
  },
  radius: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Query', querySchema);
