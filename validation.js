const _ = require('lodash');

module.exports = function(obj) {
  if(!_.isString(obj.term)){
    return 'term is not string';
  }
  if(!+obj.lat || !+obj.lng){
    return 'lat or lng is not a number!';
  }

  if(!+obj.radius){
    return 'radius is not a number';
  }
}
