const Json2csvParser = require('json2csv').Parser;
const fields = ['name', 'city', 'street', 'lat', 'lng'];

module.exports = function(data){
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(data);
  return csv;
}
