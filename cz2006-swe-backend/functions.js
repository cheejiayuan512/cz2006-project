const e = require('express');
const { resolveContent } = require('nodemailer/lib/shared');
var mail = require('./email');
const key = process.env.GOOGLE_API_KEY


// generate a unique code for each session
async function codeGeneration(event) {
    console.log("in codeGeneration fxn");
    while(true) {
        var code = Math.random().toString(36).substring(2,10).toUpperCase();
        if (await event.find({eventCode: code}).count() === 0) {
            console.log("code in codeGeneration: ", code);
            return code;
        }
    }
}

// create event and store in DB
function createEvent(data, event) {
    return new Promise(function(resolve, reject) {
        console.log("in createEvent function");
        let code;
        codeGeneration(event).then((response) => {
            code = response;
            console.log("code: ", code);
            console.log(code);
            data["eventCode"] = code;
            console.log(data);
            event.insertOne(data, function(err, res) {
                if (err) throw err;
                console.log("Document inserted successfully into Event!");
            })
            resolve(code);
        })
    });
}

// insert participant details into DB
function updateParticipant(data, session) {
    return new Promise(function(resolve, reject) {
        session.insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("Document inserted successfully into Session!");
        })

        resolve("Submitted!");
    })
    
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
// separate into 2 fxns, one is to check validity of evenctcode, the other to check if numPax >= headCount
function verifySessID(sessID, event, session) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, result) => {
            if (result) {
                session.find({eventCode: sessID}).count((err, num) => {
                    if (err) throw err;

                    else {
                        if (result.length === 0){
                            resolve(false);
                        }
                        else if (num < parseInt(result[0].headCount)) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            }
            else {
                resolve(false);
                console.log("Empty array returned!");
            }
        });
    })
}

// get event name
function getEventName(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, event) => {
            if (!err) {
                //console.log(startDate[0].eventStartDate);
                resolve(event[0].eventName);
            }
            else {
                console.log("ERROR: ", err);
            }
        });
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

// get current headcount of event
function getCurrentHeadcount(sessID, session) {
    //console.log("in getCurrentHeadcount fxn");
    return new Promise(function(resolve, reject) {
        session.find({eventCode: sessID}).count((err, currHeadcount) => {
            if (!err) {
                //console.log(currHeadcount);
                let hc = currHeadcount.toString();
                resolve(hc);
            }
            else {
                console.log("ERROR: ", err);
            }
        });
    })
}

// get maximum headcount of event
function getMaxHeadcount(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, result) => {
            if (!err) {
                //console.log(startDate[0].eventStartDate);
                resolve(result[0].headCount);
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
    getEventName: getEventName,
    getCurrentHeadcount: getCurrentHeadcount,
    getMaxHeadcount: getMaxHeadcount
}
