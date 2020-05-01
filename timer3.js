$(document).ready(function() {
    // $("#start0").click(function() {
    //     //create new timer object (constructor function) + display
    init(); 
    // });


});

var allTimers = [];
var timerNumberArray = [];
var timerNumber = 0;

var status = 0;

// var timerID, startID, stopID, resetID;


function init() {
    //call "new" constructor functions here + set "onclick" events to start and reset
    // var testTimer = new Timer("timer0");
    // document.getElementById("start0").onclick = function() {testTimer.start(); 
    // }
    // document.getElementById("stop0").onclick = function() {testTimer.stop(); 
    // }
    // document.getElementById("reset0").onclick = function() {
    //     testTimer.reset();
    // }

    document.getElementById("new-timer").onclick = function() {
        allTimers.push(new Timer());
        

        var newestTimer = allTimers[allTimers.length-1];
        newestTimer.add();
        document.getElementById('user-input').value = "";
        document.getElementById('custom-days').value = "0";
        document.getElementById('custom-hours').value = "0";
        document.getElementById('custom-minutes').value = "0";
        document.getElementById('custom-seconds').value = "0";
        
        //might need to do a forEach() to make sure start button is on for all Timers in array
        document.getElementById(newestTimer.startID).onclick = function() {
            newestTimer.start();
        }

        document.getElementById(newestTimer.stopID).onclick = function() {
            newestTimer.stop();
        }

        document.getElementById(newestTimer.resetID).onclick = function() {
            newestTimer.reset();
        }

        document.getElementById(newestTimer.deleteID).onclick = function() {
            newestTimer.delete();
        }

    }

}


//this is a constructor function for a new timer
function Timer() {

    
    timerNumber = timerNumber+1;
    timerNumberArray.push(timerNumber);

    this.status = 0;
    this.time = 0;

    this.timerID = "timer" + timerNumberArray[timerNumberArray.length-1];
    this.startID = "#start" + timerNumberArray[timerNumberArray.length-1];
    this.stopID = "stop" + timerNumberArray[timerNumberArray.length-1];
    this.resetID = "reset" + timerNumberArray[timerNumberArray.length-1];
    this.deleteID = "delete" + timerNumberArray[timerNumberArray.length-1];

    // this.timerID = document.getElementById(timerID);
    getCustomValues(this.timerID);
    
    this.customDays = customDays;
    this.customHours = customHours;
    this.customMinutes = customMinutes;
    this.customSeconds = customSeconds;

    this.timerName = timerName;

    this.mustacheData = {};
    

}

function getCustomValues(timerID) {
    //get the timer name from user input
    timerName = document.getElementById('user-input').value;
    
    //get number values inputted by user for days, hours, minutes, seconds
    customDays = timerID.customDays = document.getElementById('custom-days').value;
    customHours = timerID.customHours = document.getElementById('custom-hours').value;
    customMinutes = timerID.customMinutes = document.getElementById('custom-minutes').value;
    customSeconds = timerID.customSeconds = document.getElementById('custom-seconds').value;
}


Timer.prototype.add = function() {
    //add stuff to add to HTML doc here (mustache, etc)
    // getCustomValues(this.timerID);

    this.mustacheData = {
        "timerName": this.timerName,
        "timerID": this.timerID,
        "customDays": this.customDays,
        "customHours": this.customHours,
        "customMinutes": this.customMinutes,
        "customSeconds": this.customSeconds,
        "startID": this.startID,
        "stopID": this.stopID,
        "resetID": this.resetID,
        "deleteID": this.deleteID
    }

    var timerTemplate = 
        '<div class="timer" id={{timerID}}>'+
        '<div class="timerName">' +
            '<p>{{timerName}}</p>' +
        '</div>'+

        '<div class="timeCount">'+
            '<span class="timeel days number">{{customDays}}</span>' +
            '<span class="timeel timeRefDays text">days</span>'+
            '<span class="timeel hours number">{{customHours}}</span>'+
            '<span class="timeel timeRefHours text">hours</span>'+
            '<span class="timeel minutes number">{{customMinutes}}</span>'+
            '<span class="timeel timeRefMinutes text">minutes</span>'+
            '<span class="timeel seconds number">{{customSeconds}}</span>'+
            '<span class="timeel timeRefSeconds text">seconds</span>'+
        '</div>'+

        '<div class="controls">'+
            '<button class="start" id="{{startID}}">Start</button>'+
            '<button class ="stop" id="{{stopID}}">Stop</button>' +
            '<button class ="reset" id="{{resetID}}">Reset</button>' +
            '<button class ="delete" id="{{deleteID}}">Delete</button>'
        '</div>'+
        '</div>';

    var html = Mustache.render(timerTemplate, this.mustacheData);

    $(".timers").append(html);
}

Timer.prototype.start = function(timerID) {
    timerID = this.timerID;

    if(this.status == 0) {
        this.status = 1;
        console.log("start");
        this.countUp();
       
    } else {
        this.status = 0;
    }
}

// function countUp(timerID) {
//     if(status == 1) {
//         console.log("countUptest");
//         console.log(timerID);
//         countUp.interval = setTimeout(function() {
//             time = getInputTime(timerID) + 1000;
//             convertInputTime(time, timerID);
//             countUp(timerID);
//         }, 1000);
//     }
// }

//this is the function that adds the 1000 milliseconds every loop
Timer.prototype.countUp = function() {
    
    if(this.status == 1) {
        var self = this;
        console.log("count up working");
        // clearTimeout(self.countUp.interval);
        self.countUp.interval = setTimeout(function() {
            self.time = (self.getInputTime(self.timerID) + 1000);
            self.convertInputTime(self.time);
            self.countUp();
        }, 1000); 
        
        // setTimeout(function() {
        //     that.time = that.getInputTime() + 1000;
        //     console.log(that.time);
        //     that.convertInputTime(that.time);
        //     that.countUp();
        // }, 1000);
        
        // var that = this;
        // setTimeout(function() {
        //     that.time++;
        //     that.timerID.innerHTML = getInputTime(that.time);
        //     that.countUp();
        // }, 1000);


    }
}

function getInputTime(timerID) {

    var startingDays = timerID.getElementsByClassName('days')[0].innerHTML;
    var startingHours = timerID.getElementsByClassName('hours')[0].innerHTML;
    var startingMin = timerID.getElementsByClassName('minutes')[0].innerHTML;
    var startingSec = timerID.getElementsByClassName('seconds')[0].innerHTML;

    //inputTime in milliseconds, pass this into convertInputTime function
    var startTime = ((startingSec * 1000) + (startingMin * 60 * 1000) + (startingHours * 60 * 60 * 1000) + (startingDays * 24 * 60 * 60 * 1000));
    return startTime;
    
}


Timer.prototype.getInputTime = function(timerID) {
    timerID = document.getElementById(this.timerID);

    var startingDays = $($(timerID).find(".days")).html();
    var startingHours = $($(timerID).find(".hours")).html();
    var startingMin = $($(timerID).find(".minutes")).html();
    var startingSec = $($(timerID).find(".seconds")).html();

    //inputTime in milliseconds, pass this into convertInputTime function
    return ((startingSec * 1000) + (startingMin * 60 * 1000) + (startingHours * 60 * 60 * 1000) + (startingDays * 24 * 60 * 60 * 1000));

    //*** you just need to take the starting input time, conver to milliseconds, then add 1000 milliseconds for every pass of the timeOut, then break that into days/hours/minutes/seconds before passing into html
}

// function convertInputTime(startTime) {
//     var total_seconds = parseInt(Math.floor(startTime / 1000));
//     var total_minutes = parseInt(Math.floor(total_seconds / 60));
//     var total_hours = parseInt(Math.floor(total_minutes / 60));
    
//     days = parseInt(Math.floor(total_hours / 24));
//     seconds = parseInt(total_seconds % 60);
//     minutes = parseInt(total_minutes % 60);
//     hours = parseInt(total_hours % 24);

//     console.log(days);
//     console.log(seconds);
//     console.log(minutes);
//     console.log(hours);

//     days = days + 1;
//     seconds = seconds + 1;
//     minutes = minutes + 1;
//     hours = hours + 1;

    
//     // updateHTMLTime(timerID); 

// }


//this is the function that converts the 1000++ millisecond countUp function into days/hours/minutes/seconds + passes to HTML
Timer.prototype.convertInputTime = function(startTime) {

    var total_seconds = parseInt(Math.floor(startTime / 1000));
    var total_minutes = parseInt(Math.floor(total_seconds / 60));
    var total_hours = parseInt(Math.floor(total_minutes / 60));
    
    days = parseInt(Math.floor(total_hours / 24));
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    this.updateHTMLTime(this.timerID);
}

function updateHTMLTime(timerID) {

    $($(timerID).find(".days")).html();
    $($(timerID).find(".hours")).html(hours);
    $($(timerID).find(".minutes")).html(minutes);
    $($(timerID).find(".seconds")).html(seconds);
   
    // timerID.getElementsByClassName('days')[0].innerHTML = days;
    // timerID.getElementsByClassName('hours')[0].innerHTML = hours;
    // timerID.getElementsByClassName('minutes')[0].innerHTML = minutes;
    // timerID.getElementsByClassName('seconds')[0].innerHTML = seconds; 
}

Timer.prototype.updateHTMLTime = function(timerID) {
    timerID = document.getElementById(this.timerID);

    $($(timerID).find(".days")).html(days);
    $($(timerID).find(".hours")).html(hours);
    $($(timerID).find(".minutes")).html(minutes);
    $($(timerID).find(".seconds")).html(seconds);
}



// function resetTimerHTML(timerID) {
//     timerID.getElementsByClassName('days')[0].innerHTML = 0;
//     timerID.getElementsByClassName('hours')[0].innerHTML = 0;
//     timerID.getElementsByClassName('minutes')[0].innerHTML = 0;
//     timerID.getElementsByClassName('seconds')[0].innerHTML = 0; 
// }

Timer.prototype.stop = function() {
    this.status = 0;
    clearTimeout(this.countUp.interval);
    
}
Timer.prototype.reset = function() {
    this.status = 0;
    clearTimeout(this.countUp.interval);
    timerID = document.getElementById(this.timerID);
    
    $($(timerID).find(".days")).html(0);
    $($(timerID).find(".hours")).html(0);
    $($(timerID).find(".minutes")).html(0);
    $($(timerID).find(".seconds")).html(0);
    
};

Timer.prototype.delete = function() {
    timerID = document.getElementById(this.timerID);
    $(timerID).hide();
}


//for persisting purposes:
//use web storage to get all timer values + current Date() when the window is closed or refreshed.
//on load, get the difference between current Date(); and the last persisted Date() and add those values to all persisted timer values. then convert to days/hours/minutes/seconds, then update HTML to reflect the new values before beginning to count up again.
//if status = 1 when browser is closed or refreshed, onload should start it up again.



