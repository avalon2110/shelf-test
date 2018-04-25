const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(config.db, (err) => {
  if(err){
    console.log(err);
  } else {
    console.log('Connected to DB');
  }
});

const Query = require('./models/queries');

app.get('/queries', (req, res) => {
  Query.find({}, (err, queries) => {
    res.send(queries);
  })
})

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/search/:q/:ll', (req, res) => {
  request({
    url: 'https://api.foursquare.com/v2/venues/search',
    method: "GET",
    qs: {
      client_id: config.client_id,
      client_secret: config.client_secret,
      ll: '40.7243,-74.0018',
      v: '20180323',
      query: req.params.q,
      limit: 4
    }
  }, (err, response) => {
    if(err){
      console.log(err);
    } else {
      let query = new Query();
      query.query = req.params.q;
      query.ll = req.params.ll;
      // query.distance = response.body.
      query.save();
      res.send(JSON.parse(response.body));
    }
  })
})


app.listen(3000, (err) => {
  if(err){
    console.log(err);
  } else {
    console.log("server started on port 3000");
  }
})
