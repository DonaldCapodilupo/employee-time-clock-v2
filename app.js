"use strict";
/*jshint esversion: 6 */
/* jshint node: true */

const employees = {
    "001": "Nick",
    "002": "Keith",
    "003": "Chris",
    "004": "Dragan",
    "005": "Dave",
    "006": "Connor",
    "007": "Donald",
    "008": "Shayne",
};

let present_employees = [];

const time_card_object = {
    "Nick": {
        "Punch In": "",
        "Punch Out": ""
    },
    "Keith": {
        "Punch In": "",
        "Punch Out": ""
    },
    "Chris": {
        "Punch In": "",
        "Punch Out": ""
    },
    "Dragan": {
        "Punch In": "",
        "Punch Out": ""
    },
    "Dave": {
        "Punch In": "",
        "Punch Out": ""
    },
    "Connor": {
        "Punch In": "",
        "Punch Out": ""
    },
    "Donald": {
        "Punch In": "",
        "Punch Out": ""
    },
    "Shayne": {
        "Punch In": "",
        "Punch Out": ""
    }
};

function get_Current_Time() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (hours > 12) {
        hours = hours - 12;
    }


    let t_str = hours + ":" + minutes + ":" + seconds + " ";
    if (hours > 11) {
        t_str += "PM";
    } else {
        t_str += "AM";

    }

    return t_str;
}

function get_Current_Date() {
    let currentTime = new Date();
    let day = currentTime.getDate();
    let month = currentTime.getMonth();
    let year = currentTime.getFullYear();

    return month + "-" + day + "-" + year;


}

function submit_User_Input(user_input) {
    //If user input is not a valid employee id, reject it.
    if (employees[user_input] === undefined) {
        console.log(user_input + " is not a valid user number");
        return null;
    }

    //Take user input, check to see if the input matches an employee ID.
    let employee_name = employees[user_input];
    let current_time = get_Current_Time();

    console.log(employee_name + " has punched their card at " + current_time);


    //Check to see if the employee has already been punched in.
    if (present_employees.includes(employee_name)) {
        console.log(employee_name + " has is being punched out.");
        present_employees.slice(employee_name);

        let obj = {};

        obj.name = employee_name;
        obj.punch_unit = "Punch Out";
        obj.punch_time = current_time;
        create_JSON_Entry(obj);

    } else {
        console.log("Logging in " + employee_name);
        present_employees.push(employee_name);

        let obj = {};

        obj.name = employee_name;
        obj.punch_unit = "Punch In";
        obj.punch_time = current_time;
        create_JSON_Entry(obj);



    }


}

const fs = require('fs');

function create_JSON_Entry(data) {

    let json_title = get_Current_Date() + ".json";

    console.log(fs.existsSync(json_title));
    console.log(!fs.existsSync(json_title));

    if (!fs.existsSync(json_title)) {
        //create new file if not exist
        fs.openSync(json_title, 'w');
        fs.writeFileSync(json_title, JSON.stringify(time_card_object));
        
    }

    // read file
    const file = fs.readFileSync(json_title);


    //check if file is empty

    //append data to jso file
    const json = JSON.parse(file.toString());

    //add json element to json object
    json[data.name][data.punch_unit] = data.punch_time;


    fs.writeFileSync(json_title, JSON.stringify(json));


}


const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

//Allows node app to access my files in the public folder. For Javascript, CSS, pictures etc.
app.use(express.static('public'));

//Needed to retrieve user input from the frontend to process on the backend.
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//When the user first access the app.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});


//When the user makes a post request on the application.
app.post('/', (req, res) => {

    let user_input = req.body.request_input;

    console.log("Input Received: " + user_input); // changed to body

    submit_User_Input(user_input);

    console.log(present_employees);


    res.sendFile(path.join(__dirname, 'templates/index.html'), {name: "Donald"});
});

//This function runs the application.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

