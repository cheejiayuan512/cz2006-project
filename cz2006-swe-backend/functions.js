const e = require('express');
var mail = require('./email');
const key = process.env.GOOGLE_API_KEY


// generate a unique code for each session
function codeGeneration(event) {
    //console.log("in codeGeneration fxn");
    while (true) {
        var code = Math.random().toString(36).substring(7);
        if (event.find({eventCode: code}).count() === 0) {
            break;
        }
    }
    return code;
}

// create event and store in DB
function createEvent(data, event) {
    //console.log("in createEvent function");
    var code = codeGeneration(event);
    console.log(code);
    console.log(data);
    data["eventCode"] = code;
    event.insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("Document inserted successfully into Event!");
    })
    return code;
}

// insert participant details into DB, check if currentPax >= maxPax
function updateParticipant(data, session) {
    if (session.aggregate([
        {$project: {ab: {$cmp: ['$currentPax', '$maxPax']}}},
        {$match: {ab: {$gt: 0}}}
    ]).count() === 0) {
        session.insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("Document inserted successfully into Session!");
        })
    }
    else {
        // logic to find suitable time slots and suitable cuisine for them **not done**
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
    var destEmail = db.collection("event").find({eventCode: eventCode}, {organiserEmail: 1})
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

// verify session ID aka room code
function verifySessID(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).count((err, num) => {
            if (err) throw err;
            else {
                if (num >= 1) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
        })
    })
}

// get start date of event
function getStartDate(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, startDate) => {
            if (!err) {
                //console.log(startDate[0].eventStartDate);
                resolve(startDate[0].eventStartDate);
            }
            else {
                console.log("ERROR: ", err);
            }
        });
    })
}

// get end date of event
function getEndDate(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, startDate) => {
            if (!err) {
                //console.log(startDate[0].eventStartDate);
                resolve(startDate[0].eventEndDate);
            }
            else {
                console.log("ERROR: ", err);
            }
        });
    })
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
