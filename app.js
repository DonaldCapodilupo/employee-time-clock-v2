"use strict";
/*jshint esversion: 6 */
/* jshint node: true */


const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

//console.log(__dirname +'/public');

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

