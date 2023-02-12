/*jshint esversion: 6 */
/* global console*/
/* use strict*/


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

let present_employees = [];

function get_Current_Time(){
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

function updateTime() {
    document.getElementById('time_span').innerHTML = get_Current_Time();

}

function punch_In_User() {

    //Take user input, check to see if the input matches an employee ID.
    let user_input = document.getElementById("employee_id").value;
    let employee_name = employees[user_input];

    //Check to see if the employee has allready been punched in.
    if(present_employees.includes(employee_name)){
        console.log( employee_name + " has already been logged in.");
        return null;
    }


    let current_time = get_Current_Time();

    //Confirmation-Div is for storing input to send to Backend
    const confirmation_div = document.getElementById("Confirmation-Div");

    //Confirmation-Prompt-Div is for popping up a message allowing the employee to know they have been punched in/out.
    const confirmation_prompt = document.getElementById("Confirmation-Prompt-Div");

    //Checks to see if user input is in the verified employees Object.
    if (user_input && employees[user_input]) {
        console.log("Logging in " + employees[user_input]);

        present_employees.push(employee_name);


        confirmation_div.innerHTML +=
            '<input type="text" name="' + employee_name + '" id="" value="'+ current_time+'" hidden>';

        confirmation_prompt.innerHTML +=
            employee_name + ' has punched in at ' + current_time + '<br />';


    } else {
        console.log(user_input + " is not a valid user number");
    }


}


function setupHTML() {

    let input = document.getElementById("employee_id");
    input.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            punch_In_User();
        }
    });
}


