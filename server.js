//require all the appropriate libraries
var express = require('express');
var app = express();
app.use(express.static('static'));
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);
//nedb code below
var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload : true}); 
//templating engine code below
app.set('view engine', 'ejs');

//define method to handle user submissions
app.post('/videosubmit', function(req, res){
	var submission = new Object();
	submission.url = req.body.url;
	submission.id = getId(submission.url);

	db.insert(submission, function (err, newDocs) {
		console.log("err: " + err);
		console.log("newDocs: " + newDocs);
	});
	res.append('');
});

//define test method used for debugging BROKEN
app.get('/test', function(req,res){
	var chosenurl = "https://www.youtube.com/embed/pDkIl3WF3sc?ecver=2";
	res.render('template.ejs', {"chosenurl":chosenurl});
});

//define method to handle blank get request
app.get('/', function(req, res){
	db.find({}, function(err, docs){
		//debug run through all of the results
		for(var i = 0; i < docs.length; i++){
			console.log(docs[i]);
		}

		var randomindex = Math.random()*docs.length;
		randomindex = Math.floor(randomindex);
		console.log("RandomIndex: " + randomindex);
		var chosenurl = docs[randomindex];
		console.log(chosenurl);
		res.render('template.ejs', {"chosenurl":chosenurl.id});
	});
});

//function to get the viewID from a youtube url
function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

app.listen(8084);