var express = require('express'); 
var app = express(); 
var PORT = 9000; 
var fxn = require('./functions');
  
// Single routing 
const axios = require('axios')
var router = express.Router(); 
module.exports = router


// create event
router.post('/eventCreation', async(req, res, next) => {
  fxn.createEvent(req.body);
});

// update participant
router.post('/userDetail', async(req, res, next) => {
  fxn.updateParticipant(req.body);
});

// get nearby restaurant
router.get('/getNearbyRestaurant', async(req, res, next) => {
  fxn.getNearbyRestaurants(req.body);
})
    
app.use(router); 
  
app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
}); 