var db = require('./db');
var mail = require('./email');
const key = process.env.GOOGLE_API_KEY

// generate a unique code for each session
function codeGeneration() {
    while (true) {
        var code = Math.random().toString(36).substring(7);
        if (db.collection("event.eventDetails").find({eventCode: code}).count() === 0) {
            return code;
        }
    }
}

// create event and store in DB
function createEvent(data) {
    var code = codeGeneration();
    data["eventCode"] = code;
    db.collection("event").insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("Document inserted successfully into Event!");
        db.close();
    })
}

// insert participant details into DB, check if currentPax >= maxPax
function updateParticipant(data) {
    if (db.collection("session").aggregate([
        {$project: {ab: {$cmp: ['$currentPax', '$maxPax']}}},
        {$match: {ab: {$gt: 0}}}
    ]).count() === 0) {
        db.collection("session").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("Document inserted successfully into Session!");
            db.close();
        })
    }
    else {
<<<<<<< Updated upstream
        // logic to find suitable time slots and suitable cuisine for them ** not done **
=======
        // logic to find suitable time slots and suitable cuisine for them **not done**
>>>>>>> Stashed changes
        // call gooogle places API to get a list of restaurants
        try {
            const area = data.area;
            const cuisine = data.cuisine;
            const budget = data.budget;
            const numOfPax = data.numOfPax;
            const {data} = axios.get(
              `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${area}+${cuisine}+${budget}+${numOfPax}&type=restaurant&key=${key}`
            );
            return data;
          } 
          catch (err) {
            next(err)
          }
        // display result list **not done**
        // send email to organiser to notify him/her that result is ready
        SendEmail(eventCode, resultList);
    }
}

// send email to organiser
function sendEmail(eventCode, resultList) {
    var destEmail = db.collection("event.eventDetails").find({eventCode: eventCode}, {organiserEmail: 1})
    var mailOptions = {
        from: 'makanwhere@gmail.com',
        to: destEmail,
        subject: 'Here is a list of restaurant for you & your friends!',
        text: resultList
      };
      
    mail.transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
<<<<<<< Updated upstream
=======

// verify session ID aka room code
function verifySessID(sessID) {
    if (db.collection("event.eventDetails").find({eventCode: sessID}.count() === 1)) {
        return true;
    }
    else {
        return false;
    }
}

// get start date of event
function getStartDate(sessID) {
    var startDate = db.collection("event.eventDetails").find({eventCode: sessID}, {eventStartDate: 1});
    return startDate;
}

// get end date of event
function getEndDate(sessID) {
    var endDate = db.collection("event.eventDetails").find({eventCode: sessID}, {eventEndDate: 1});
    return endDate;
}

// function to get nearby restaurants
function getNearbyRestaurants(data) {
    var lat = data.lat;
    var long = data.long;
    var radius = data.radius;
    try {
        const {result} = axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key='+ key + '&location='+ lat +','+ long +'&radius='+radius+'&keyword=food')
    }
    catch (err){
        next(err);
    }
    return result;
}

module.exports = {
    codeGeneration: codeGeneration,
    createEvent: createEvent,
    updateParticipant: updateParticipant,
    sendEmail: sendEmail,
    verifySessID:verifySessID,
    getStartDate: getStartDate,
    getEndDate: getEndDate,
    getNearbyRestaurants: getNearbyRestaurants
}
>>>>>>> Stashed changes
