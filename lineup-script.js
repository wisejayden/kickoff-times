const axios = require('axios');
const moment = require('moment');
// import schedule from 'src/rwc.schedule.js';
const rwc = require('./src/rwc-schedule.json');
const fs = require('fs');


const schedule = rwc.sport_events;
let argumentDay;

console.log("IS IT?", moment("2019-09-23T10:15:00+00:00").isSame(moment(new Date())));


function loopThroughSchedule(day) {
    for(var i = 0; i < schedule.length; i++) {
        if(moment(schedule[i].scheduled).isSame(argumentDay, "day")) {
            makeApiCall(schedule[i].id);
        }

    }
}



var args = process.argv.slice(2);

if (args[0] === "" || "today") {
    argumentDay = moment(new Date());
} else if (args[0] === "tomorrow") {
    argumentDay = moment(new Date()).add(1, 'days');
}
loopThroughSchedule();





function makeApiCall(id) {

        // var stream = fs.createWriteStream("src/my_file.txt");
        // stream.once('open', function(fd) {
        // stream.write("My first row\n");
        // stream.write("My second row\n");
        // stream.end();
        // });


    
    axios({
        method: 'get',
        async: true,
        crossDomain: true,
        url: `https://api.sportradar.us/rugby/trial/v2/union/en/matches/${id}/lineups.json?api_key=37vfn24yhgracbpcx9ry95ta`,
      }).then(res => {
        fs.appendFile('src/lineups.json', JSON.stringify(res.data), function (err) {
            if (err) throw err;
            console.log('Saved!', res.data);
          });
      });
}


