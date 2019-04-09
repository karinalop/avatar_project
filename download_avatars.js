var request = require('request');
var fs = require('fs');

var args = process.argv;
//var url = "https://github.com/" + args[2] + "/" + args[3];
var url = "https://api.github.com/repos/jquery/jquery/contributors";
console.log(url);




request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         //var contributors = JSON.parse(response);
         console.log(response);

       })
       .pipe(fs.createWriteStream('./object.txt'));               // Note 4


