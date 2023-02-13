"use strict";
/*jshint esversion: 6 */
/* jshint node: true */

const employees = {
    "0000000001": "Nick",
    "0000000002": "Keith",
    "0000000003": "Chris",
    "0000000004": "Dragan",
    "0000000005": "Dave",
    "0000000006": "Connor",
    "0000000007": "Donald",
    "0000000008": "Shayne",
};

let present_employees = {};

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

function get_Current_Date(){
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

    console.log(employee_name + " has punched in at " + current_time);


    //Check to see if the employee has already been punched in.
    if (employee_name in present_employees) {
        console.log(employee_name + " has is being punched out.");
        present_employees[employee_name]["Punch Out"] = current_time;

    } else {
        console.log("Logging in " + employee_name);
        present_employees[employee_name] = {"Punch In": current_time};


    }

    create_JSON_Entry(present_employees);


}

const fs = require('fs');

function create_JSON_Entry(data) {

    let json_title = "./"+ get_Current_Date() + ".json";

    console.log(fs.existsSync(json_title));
    console.log(!fs.existsSync(json_title));

    if (!fs.existsSync(json_title)) {
        //create new file if not exist
        fs.closeSync(fs.openSync(json_title, 'w'));

    }

    // read file
    const file = fs.readFileSync(json_title);


    //check if file is empty
    if (file.length === 0) {
        //add data to json file
        fs.writeFileSync(json_title, JSON.stringify(data));
    } else {
        //append data to jso file
        const json = [JSON.parse(file.toString())];
        //add json element to json object
        let new_data = data;
        json.push(new_data);
        fs.writeFileSync(json_title, JSON.stringify(new_data));
    }
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

    console.log("Input Recieved: " + user_input); // changed to body

    submit_User_Input(user_input);

    console.log(present_employees);


    res.sendFile(path.join(__dirname, 'templates/index.html'), {name:"Donald"});
});

//This function runs the application.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

