const { default: axios } = require('axios');
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

// get preferred cuisine
function getCuisine(sessID, session) {
    return new Promise(function(resolve, reject) {
        getAllParticipants(sessID, session).then((result) => {
            var i = 0;
            var j = 0;
            var cuisineList = []
            for(i = 0; i < result.length; i++) {
                for(j = 0; j < result[i].userCuisine.length; j++) {
                    if (cuisineList.includes(result[i].userCuisine[j])) {
                        continue;
                    }
                    else {
                        cuisineList.push(result[i].userCuisine[j]);
                    }
                }
            }
            console.log(cuisineList);
            resolve(cuisineList);
        })
    })
}

// get preferred budget
function getBudget(sessID, session) {
    return new Promise(function(resolve, reject) {
        getAllParticipants(sessID, session).then((result) => {
            var i = 0;
            var j = 0;
            var budgetList = []
            for(i = 0; i < result.length; i++) {
                for(j = 0; j < result[i].userBudget.length; j++) {
                    if (budgetList.includes(result[i].userBudget[j])) {
                        continue;
                    }
                    else {
                        budgetList.push(result[i].userCuisine[j]);
                    }
                }
            }
            console.log(budgetList);
            resolve(budgetList);
        })
    })
}

// get latitude
function getLatitude(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, result) => {
            if (!err) {
                //console.log(result);
                resolve(result[0].latitude);
            }
            else {
                console.log("ERROR:", err);
            }
            
        })
    })
}

// get longitude
function getLongitude(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, result) => {
            if (!err) {
                //console.log(result);
                resolve(result[0].longitude);
            }
            else {
                console.log("ERROR:", err);
            }
            
        })
    })
}

// get list of restaurants 
function getRestaurants(sessID, event, session) {
    return new Promise(function(resolve, reject) {
        getCuisine(sessID, session).then((cuisineList) => {
            var cuisine = cuisineList.join();
            cuisine = cuisine.replace(", ", "+");
                getLatitude(sessID, event).then((latitude) => {
                    getLongitude(sessID, event).then((longitude) => {
                        axios.post("https://maps.googleapis.com/maps/api/place/textsearch/json?query=food" + cuisine + "&sensor=true&location=" + latitude + "," + longitude + "&key=AIzaSyCxfAAGnMO0FO5UMouqUomiQTd0VXvz5zs")
                        .then((res) => {
                            console.log(res.data)
                            resolve(res.data);
                        })
                    })
                })
        })
    })
}

// send email to organiser
function sendEmail(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((response) => {
            var destEmail = response[0].organiserEmail;
        }).then((res) => {
            var mailOptions = {
                from: 'makanwhere@gmail.com',
                to: res,
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
        })
    })
}

// verify session ID aka room code
function verifySessID(sessID, event, session) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, result) => {
            //console.log("result[0].headCount] = ", result[0].headCount);
            if (result === undefined || result.length == 0) {
                resolve("Invalid event code.");
                console.log("Empty array returned!");
            }
            else {
                session.find({roomID: sessID}).count((err, num) => {
                    if (err) throw err;
                    else {
                        console.log("num = ", num);
                        if (num < parseInt(result[0].headCount)) {
                            resolve("Valid.");
                        }
                        else {
                            resolve("Room is full.");
                        }
                    }
                });
            }
        });
    })
}

// get event name
function getEventName(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, result) => {
            if (!err) {
                resolve(result[0].eventName);
            }
            else {
                console.log("ERROR: ", err);
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

// get current headcount of event
function getCurrentHeadcount(sessID, session) {
    //console.log("in getCurrentHeadcount fxn");
    return new Promise(function(resolve, reject) {
        session.find({roomID: sessID}).count((err, currHeadcount) => {
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
                resolve(result[0].headCount.toString());
            }
            else {
                console.log("ERROR: ", err);
            }
        });
    })
}

// function to get all participants of an event
function getAllParticipants(sessID, session) {
    console.log("In getAllParticipants fxn");
    return new Promise(function(resolve, reject) {
        session.find({roomID: sessID}).toArray((err, result) => {
            if (!err) {
                //console.log(result);
                resolve(result);
            }
            else {
                console.log("ERROR: ", err);
            }
        })
    })
}

// function to get user selected slot for each day
function getSelectedSlot(userTiming) {
    console.log("in getSelectedSlot fxn");
    var i = 0;
    var indexes = [];
    console.log(userTiming.length)
    for(i=0; i<=userTiming.length; i++) {
        if (userTiming[i] == true) {
            indexes.push(i);
        }
    }
    console.log(indexes)
    return indexes;
}

function getCommonSlot(sessID, session) {
    return new Promise(function(resolve, reject) {
        getAllParticipants(sessID, session).then((resultList) => {
            var i = 0;
            var j = 0;
            var k = 0;
            var totalPax = resultList.length;   // might not even need this now, supposed to check whether any value in
                                                // timetable is equal to maxPax
            var finalList =  JSON.parse(JSON.stringify(resultList[0].userTiming));
            //console.log("hehe: ", finalList);
            for (j = 0; j< resultList[0].userTiming.length; j++){
                for(k = 0; k < resultList[0].userTiming[0].length; k++) {
                    finalList[j][k] = 0;
                }
            }
            console.log("hehe2: ", finalList);
            for (i = 0; i< resultList.length; i++){
                for (j = 0; j< resultList[0].userTiming.length; j++){
                    for(k = 0; k < resultList[0].userTiming[0].length; k++) {
                        //console.log(resultList[i].userTiming[j][k])
                        if (resultList[i].userTiming[j][k] === true){
                            finalList[j][k] += 1;
                        };
                    }
                }
            }
            console.log('finalList:\n',finalList);
            resolve(finalList);
        })
    })
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
    getMaxHeadcount: getMaxHeadcount,
    getAllParticipants: getAllParticipants,
    getSelectedSlot: getSelectedSlot,
    getCommonSlot: getCommonSlot,
    getCuisine: getCuisine,
    getBudget: getBudget,
    getLatitude: getLatitude,
    getLongitude: getLongitude,
    getRestaurants: getRestaurants
}
