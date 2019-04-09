var request = require('request');
var fs = require('fs');
var token = require('./secrets.js');

var args = process.argv;
//var url = "https://github.com/" + args[2] + "/" + args[3];
var url = "https://api.github.com/repos/jquery/jquery/contributors";
console.log(url);

function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: 'Bearer ' + token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    contributors = JSON.parse(body);
    cb(err, contributors);
  });
}

//-------------------------------------------------------
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //console.log(result);
  printAvatarURL(result);
});


//-------------------------------------------------------

function printAvatarURL(contributors){

  //console.log(contributors);

  for(var i = 0; i < contributors.length; i++){
    //console.log(contributors[i].login + " " + contributors[i].avatar_url);
    var filePath = "avatars/" + contributors[i].login + ".jpg";
    var url = contributors[i].avatar_url;
    downloadImageByURL(url, filePath);
  }
}

//---------------------------------------------

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log(url);
         })
       .pipe(fs.createWriteStream(filePath));
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");


