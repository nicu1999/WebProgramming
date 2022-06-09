var port = 6001

var express = require('express')
var cors = require('cors');
var app = express()
var fs = require('fs');
var jwt_decode =  require('jwt-decode');
var mongoose = require('mongoose')
const { auth } = require('express-oauth2-jwt-bearer');
var rabbit = require('amqplib');
var Waypoint = require("./Waypoint")
var Comment = require("./Comment")

function readjson(filepath) {
    var obj = fs.readFileSync(filepath, 'utf8');
    return obj
}

function checkScope(req, res, next) {
    var decoded = jwt_decode(req.headers.authorization);
    if(decoded.permissions.includes(this.access)){
        next()
    } else{
        res.status(403)
        res.send()
    }
}

function bindScope(func, context) {
    return func.bind(context)
}

async function createWaypoint(body) {
    var waypoint = await Waypoint.create(body)
    return waypoint._id.valueOf()
}

async function createComment(body) {
    var comment = await Comment.create(body)
    return comment._id.valueOf()
}


async function returnWaypoint() {
    var list = await Waypoint.find();
    return list.map(({
    _id,
    waypointType,
    waypointTitle,
    waypointAttributesList,
    waypointDangerouseRadius,
    waypointDescription,
    position}) => { 
        id = _id.valueOf()
        return{
            id,
            waypointType,
            waypointTitle,
            waypointAttributesList,
            waypointDangerouseRadius,
            waypointDescription,
            position}
    })
}

async function returnComments(waypointId) {
    var list = await Comment.find({ 'idWaypoint': waypointId});
    return list.map(({
    _id,
    comment}) => {
        id = _id.valueOf()
        return{
            id,
            comment}
    })
}


var user_acces = { access: 'application:user' }
var admin_acces = { access: 'application:admin' }
var checkScopeUser = bindScope(checkScope, user_acces)
var checkScopeAdmin = bindScope(checkScope, admin_acces)
var url = "mongodb://admin:password@localhost:27017"//mongo:27017"
var QUEUE_NAME = 'square';
var EXCHANGE_TYPE = 'direct';
var EXCHANGE_NAME = 'main';
var KEY = 'myKey';

//start

connection = rabbit.connect('amqp://localhost');

connection.then(async (conn)=>{
    const channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);

    app.use(cors({
        origin: 'http://localhost:8080'
    }));
    
    app.use(express.json())
    
    const checkJwt = auth({
        audience: 'https://refugee-helper/',
        issuerBaseURL: `https://dev-ewtts3qr.us.auth0.com/`,
      });    
    
    mongoose.connect(url)
    .then(() => {
        console.log("connected") 
    })
    .catch((err) => {
        console.log(err) 
    })
    
    app.route('/')
        .get((req, res) => {
            res.status(200)
            res.send("Works!")
        })
    
    app.post('/user/emailadmin', checkJwt, checkScopeUser, function (req, res) {
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(req.body)))
        res.send('Email Send');
    });
    
    app.post('/user/postcomment', checkJwt, checkScopeUser, function (req, res) {
        createComment(req.body)
        res.send('Comment posted');
    });
    
    
    app.get('/user/comments/:id', checkJwt, checkScopeUser, async function (req, res) {
        var list = await returnComments(req.params.id)
        res.send(list)
    });
    

    app.post('/admin', checkJwt, checkScopeAdmin, function (req, res) {
        console.log(req.body)
        body = req.body
        res.send(createWaypoint(body));
    });
    
    app.route('/options')
        .get((req, res) => {
            let options = readjson('options/mapoptions.json');
            res.status(200)
            res.send(options)
        })
    
    app.route('/markers')
        .get(async (req, res) => {
            var list = []
            try{
                var list = await returnWaypoint()
            } catch(e) {
                console.log(e.message);
            }
            res.send(list)
        })
    
    app.listen(port, function () {
        console.log('app listening on port ' + port)
    }) 
 })
