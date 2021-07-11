'use strict';

const express = require('express');
const crypto = require('crypto');
var http = require('http');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var {Datastore} = require('@google-cloud/datastore');


const port=8080;

const app = express();

const datastore = new Datastore();

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/login.html');
    console.log(process.env.EXAMPLE)
});

app.post('/', urlencodedParser, async (req, res) => {
  
  console.log('someone try to login')

  const data = await login(req.body.user)
  
  if(data) {
    console.log(data.pw)
    console.log(req.body.pw)
    if(data.pw == req.body.pw)  res.send('Logined');
    else res.send('Wrong Info.');
  }
  else res.send('Null')
});


async function login(id){
  const key = datastore.key(['user',id]);
  const user = await datastore.get(key);
  return user[0];
}


const server = app.listen(port);
 
console.log('Node.js web server is running..')
