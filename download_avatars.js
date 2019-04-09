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
    console.log(contributors[i].login + " " + contributors[i].avatar_url);
  }
}

//getRepoContributors(url);

