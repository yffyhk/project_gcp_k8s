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
datastore.defineMapper('user');

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/login.html');
    console.log(process.env.EXAMPLE)
});

app.post('/', urlencodedParser, async (req, res) => {
  
  console.log('someone try to login')

  const data = await login(req.body.user)

  if(data) res.send(data)
  else res.send('Null')
});


async function login(id){
  const user = await datastore.find('user', id);
  return user;
}


const server = app.listen(port);
 
console.log('Node.js web server is running..')
