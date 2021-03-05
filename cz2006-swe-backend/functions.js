var db = require('./db');
var mail = require('./email');

// generate a unique code for each session
function asyncCodeGeneration() {
    while (true) {
        var code = Math.random().toString(36).substring(7);
        if (db.collection("event").find({eventCode: code}).count() === 0) {
            return code;
        }
    }
}

// create event and store in DB
function asyncCreateEvent(data) {
    var code = asyncCodeGeneration();
    data["eventCode"] = code;
    db.collection("event").insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("Document inserted successfully into Event!");
        db.close();
    })
}

// insert participant details into DB, check if currentPax >= maxPax
function asyncUpdateParticipant(data) {
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
        // logic to find suitable time slots and suitable cuisine for them ** not dont **
        // call gooogle places API to get a list of restaurants
        try {
            const area = data.area;
            const cuisine = data.cuisine;
            const budget = data.budget;
            const numOfPax = data.numOfPax;
            const {data} = await axios.get(
              `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${area}+${cuisine}+${budget}+${numOfPax}&type=restaurant&key=${key}`
            );
            return data;
          } 
          catch (err) {
            next(err)
          }
        // display result list **not done**
        // send email to organiser to notify him/her that result is ready
        asyncSendEmail(eventCode, resultList);
    }
}

// send email to organiser
function asyncSendEmail(eventCode, resultList) {
    var destEmail = db.collection("event").find({eventCode: eventCode}, {organiserEmail: 1})
    var mailOptions = {
        from: 'makanwhere@gmail.com',
        to: destEmail,
        subject: 'Sending Email using Node.js',
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
