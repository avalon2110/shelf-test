const checkQuery = require('./validation');

let obj = {
  term: 'string',
  lat: 123,
  lng: 'qwe',
  redius: 123
}
test('check lng is not number', () => {
  expect(checkQuery(obj)).toEqual('lat or lng is not a number');
});
