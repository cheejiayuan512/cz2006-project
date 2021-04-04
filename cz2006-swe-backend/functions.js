const { default: axios } = require('axios');
const e = require('express');
const { resolveContent } = require('nodemailer/lib/shared');
var mail = require('./email');
var fs = require('fs');

const Email = require('email-templates');


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
            var cuisineList = []
            for(var i = 0; i < result.length; i++) {
                for(var j = 0; j < result[i].userCuisine.length; j++) {
                    if (cuisineList.includes(result[i].userCuisine[j])) {
                        continue;
                    }
                    else {
                        cuisineList.push(result[i].userCuisine[j]);
                    }
                }
            }
            cuisineList = cuisineList.join(' OR ')
            console.log(cuisineList);
            resolve(cuisineList);
        })
    })
}

// get preferred budget
function getBudget(sessID, session) {
    return new Promise(function(resolve, reject) {
        getAllParticipants(sessID, session).then((result) => {
            var lower = 4;
            var higher = 0;
            for(var i = 0; i < result.length; i++) {
                if (result[i].userBudget[0]<lower){
                    lower=result[i].userBudget[0];
                }
                if (result[i].userBudget[1]>higher){
                    higher=result[i].userBudget[1];
                }
            }
            resolve([lower,higher]);
        })
    })
}

// get latitude
function getLatitude(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, result) => {
            if (!err) {
                console.log(result[0].location.lat);
                resolve([result[0].location.lat]);
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
                // console.log('======',result[0].location.lng);
                resolve([result[0].location.lng]);
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

// get organiser email
function getOrganiserEmail(sessID, event) {
    return new Promise(function(resolve, reject) {
        event.find({eventCode: sessID}).toArray((err, result) => {
            if (!err) {
                resolve(result[0].organiserEmail);
            }
            else {
                console.log("ERROR: ", err);
            }
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
                // console.log("startDate: ", startDate[0].startDate);
                resolve(startDate[0].startDate);
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
                resolve(startDate[0].endDate);
            }
            else {
                console.log("ERROR: ", err);
            }
        });
    })
}

// get current headcount of event
function getCurrentHeadcount(sessID, session) {
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
    console.log(sessID);
    return new Promise(function(resolve, reject) {
        session.find({roomID: sessID}).toArray((err, result) => {
            if (!err) {
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
    var indexes = [];
    console.log(userTiming.length)
    for(var i=0; i<=userTiming.length; i++) {
        if (userTiming[i] == true) {
            indexes.push(i);
        }
    }
    console.log(indexes);
    return indexes;
}

function getCommonSlot(sessID, session, event) {
    return new Promise(function(resolve, reject) {
        getAllParticipants(sessID, session).then((resultList) => {
            getStartDate(sessID, event).then((startDate) => {
                var totalPax = resultList.length;   // might not even need this now, supposed to check whether any
                                                    // value in timetable is equal to maxPax
                var availableSlots = [];
                var availablePeriods = [];
                var finalList =  JSON.parse(JSON.stringify(resultList[0].userTiming));
                var numberOfSlots = 0;
                var previous;
                var start;
                var outputList = [];
                for (var j = 0; j< resultList[0].userTiming.length; j++){
                    for(var k = 0; k < resultList[0].userTiming[0].length; k++) {
                        finalList[j][k] = 0;
                    }
                }

                for (var i = 0; i< resultList.length; i++){
                    for (var j = 0; j< resultList[0].userTiming.length; j++){
                        for(var k = 0; k < resultList[0].userTiming[0].length; k++) {
                            //console.log(resultList[i].userTiming[j][k])
                            if (resultList[i].userTiming[j][k] === true){
                                finalList[j][k] += 1;
                            };
                        }
                    }
                }
                finalList = finalList.slice(1,resultList[0].userTiming.length)
                for (i = 0; i< finalList.length; i++){
                    finalList[i].shift();
                }
                for (var j = 0; j < finalList.length; j++){
                    for (var k = 0; k < finalList[0].length; k++){
                        if (finalList[j][k]===totalPax){
                            availableSlots = availableSlots.concat([[j,k]]);
                        }
                    }
                }
                availableSlots = availableSlots.concat([[30,0]]); // This is random value that should never be reached
                numberOfSlots = availableSlots.length;
                if (numberOfSlots === 0){
                    resolve(finalList);
                    return;
                }
                start = availableSlots[0];
                previous = availableSlots[0];
                for (var j = 1; j < numberOfSlots; j++){
                    if (availableSlots[j][0]!==start[0] || availableSlots[j][1]!==previous[1]+1){
                        availablePeriods = availablePeriods.concat([[start[0],start[1],previous[1]]]);
                        start = availableSlots[j];
                    }
                    previous = availableSlots[j];
                }
                startDate = new Date(startDate);
                for (var j=0; j<availablePeriods.length;j++){
                    var day = (startDate + availablePeriods[j][0]).toString().substring(4,15);
                    var startTime = 8 + availablePeriods[j][1];
                    var endTime = 9 + availablePeriods[j][2];
                    if (startTime<10){
                        startTime = '0'.concat(startTime.toString()).concat(':00')
                    } else {
                        startTime = startTime.toString().concat(':00')
                    }
                    if (endTime<10){
                        endTime = '0'.concat(endTime.toString()).concat(':00')
                    }
                    else if (endTime===24){
                        endTime = '23:59'
                    }
                    else {
                        endTime = endTime.toString().concat(':00')
                    }
                    outputList = outputList.concat([day.concat(' from ').concat(startTime).concat(' to ').concat(endTime)]);
                }
                if (outputList.length===0){
                    outputList.concat('There is no common timeslot');
                }
                console.log('outputList:\n',outputList);
                resolve(outputList);
            })
        })
    })
}

// send email to organiser
function sendEmail(sessID, event, session) {
    return new Promise(function(resolve, reject) {
        getRestaurants(sessID, event, session).then((restaurants)=> { //we actl dont need this alr but if someone figure out the html in email shit then yay
            getOrganiserEmail(sessID, event).then((destEmail) => {
                getEventName(sessID, event).then((eventName) => {
                    const email = new Email({
                        transport: mail.transporter,
                        send: true,
                        preview: false,
                        views: {
                          options: {
                            extension: 'pug',
                          },
                          root: 'emails',
                        },
                      });
    
                    email.send({
                        template: 'hello',
                        message: {
                          from: 'Makan Where makanwhere@gmail.com',
                          to: "lixianchai@gmail.com", //destEmail
                        },
                        locals: {
                          event: eventName
                        },
                    })
                    resolve("Email sent!");
                })
            })
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
