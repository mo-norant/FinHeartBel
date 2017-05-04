var functions = require('firebase-functions');
var math = require('mathjs');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.listarray = functions.https.onRequest((request, response) => {
 var data = math.range(0,50);
 response.send(data.toJSON);
});
