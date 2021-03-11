var express = require('express'); 
var app = express(); 
var PORT = 9000; 
var fxn = require('./functions');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://makanwhere:makanwhere@cluster0.buyjh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; 
const axios = require('axios')
var router = express.Router(); 

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

MongoClient.connect(url)
.then(client => {
  const db = client.db('makanwhere');
  const event = db.collection('event');
  const session = db.collection("session");
  app.locals.event = event;
  app.locals.session = session;
  app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT);
  })
}).catch(error => console.error(error));

// create event
router.post('/eventCreation', (req, res) => {
  const event = app.locals.event;
  //console.log("req: ", req.body.eventDetail);
  var code = fxn.createEvent(req.body.eventDetail, event);
  res.send(code);
});

// update participant
router.post('/userDetail', async(req, res, next) => {
  const session = app.locals.session;
  fxn.updateParticipant(req.body.userDetail, session);
});

// get nearby restaurant
router.get('/getNearbyRestaurant', async(req, res, next) => {
  fxn.getNearbyRestaurants(req.body.locationDetail);
})

// get event start date
router.get('/getStartDate', async (req, res, next) => {
  const event = app.locals.event;
  fxn.getStartDate(req.body.eventDetail, event);
})

// get event end date
router.get('/getEndDate', async (req, res, next) => {
  const event = app.locals.event;
  fxn.getEndDate(req.body.eventDetail, event);
})

// verify session ID
router.get('/verifySessID', async (req, res, next) => {
  const event = app.locals.event;
  fxn.verifySessID(req.body.eventDetail, event);
})
    
app.use(router); 
