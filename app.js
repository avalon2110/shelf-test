const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const csv = require('./csv');
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

app.get('/search', (req, res) => {
  const contentType = req.headers.accept || 'application/json';
  console.log(req.query);
  // return;
  request({
    url: 'https://api.foursquare.com/v2/venues/search',
    method: "GET",
    qs: {
      client_id: config.client_id,
      client_secret: config.client_secret,
      ll: req.query.lat + ',' + req.query.lng,
      radius: req.query.radius,
      // ll: '40.7243,-74.0018',
      v: '20180323',
      query: req.params.term,
      limit: 4
    }
  }, (err, response) => {
    if(err){
      console.log(err);
    } else {
      let query = new Query();
      query.query = req.query.term;
      query.lat = req.query.lat;
      query.lng = req.query.lng;
      query.radius = req.query.radius;
      // query.distance = response.body.
      query.save();

      const resVenues = [];
      const venues = JSON.parse(response.body).response.venues;
      // res.send(JSON.parse(response.body));
      // return;
      for(var i = 0; i < venues.length; i++){
        resVenues.push({
          name: venues[i].name,
          city: venues[i].location.city || 'no city',
          street: venues[i].location.formattedAddress.join(', ') || 'no adress',
          lat: venues[i].location.lat,
          lng: venues[i].location.lng,
        })
      }
      // console.log(resVenues);
      // return;
      if(contentType == 'application/json'){
        res.send(resVenues);

      } else if(contentType == 'text/csv'){
        res.set('Content-Type', 'text/csv');
        res.send(csv(resVenues));
      }
      res.end();
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
