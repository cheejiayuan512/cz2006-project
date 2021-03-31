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
  app.locals.event = event;``
  app.locals.session = session;
  app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT);
    
    // my test dump LOL 
    /*fxn.getRestaurants("QX6HTKIN", event, session).then(function(response) {
      console.log("done");
    });*/
    
  })
}).catch(error => console.error(error));

// create event
router.post('/eventCreation', (req, res) => {
  const event = app.locals.event;
  //console.log("req: ", req.body.eventDetail);
  fxn.createEvent(req.body.eventDetail, event).then(function(response) {
    res.send(response);
  });
  
});

// update participant
router.post('/userDetail', async(req, res, next) => {
  const session = app.locals.session;
  fxn.updateParticipant(req.body.userDetail, session).then(function(response) {
    res.send(response);
  });
});

// get common time slot but rn it is not done yet. it can only return all the indicated time slots
router.get('/getCommonSlot', async(req, res, next) => {
  const session = app.locals.session;
  fxn.getCommonSlot(req.body.eventDetail, session).then(function(response) {
    res.send(response);
  })
})

// get event start date
router.post('/getStartDate', async (req, res, next) => {
  const event = app.locals.event;
  fxn.getStartDate(req.body.eventDetail, event).then(function(response) {
    res.send(response);
  });
})

// get event end date
router.post('/getEndDate', async (req, res, next) => {
  const event = app.locals.event;
  fxn.getEndDate(req.body.eventDetail, event).then(function(response) {
    res.send(response);
  });
})

// get event name
router.post('/getEventName', async (req, res, next) => {
  const event = app.locals.event;
  fxn.getEventName(req.body.eventDetail, event).then(function(response) {
    res.send(response);
  });
})

// get current headcount
router.post('/getCurrentHeadcount', async (req, res, next) => {
  const session = app.locals.session;
  //console.log("In the route for getCurrentHeadcount");
  fxn.getCurrentHeadcount(req.body.eventDetail, session).then(function(response) {
    res.send(response);
    //console.log("currentHeacount: ", response);
  });
})

// get max headcount
router.post('/getMaxHeadcount', async (req, res, next) => {
  const event = app.locals.event;
  fxn.getMaxHeadcount(req.body.eventDetail, event).then(function(response) {
    res.send(response);
  });
})

// verify session ID
router.post('/verifySessID', async (req, res, next) => {
  const event = app.locals.event;
  const session = app.locals.session;
  fxn.verifySessID(req.body.eventDetail, event, session).then(function(response) {
    console.log(response);
    res.send(response);
  });
})

// get restaurant
router.post('/getRestaurants', async(req, res, next) => {
  const event = app.locals.event;
  const session = app.locals.session;
  fxn.getRestaurants(req.body.eventDetail, event, session).then(function(respponse) {
    res.send(response);
  })
})
    
app.use(router); 


