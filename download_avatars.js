var request = require('request');
var fs = require('fs');
var token = require('./secrets.js');

var args = process.argv;

if(args[2] && args[3]){
  getRepoContributors(args[2], args[3], function(err, result) {
  console.log("Errors:", err);
  //console.log(result);
  printAvatarURL(result);
});

}
else console.log("Please input the github user_name and repo");


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



//-------------------------------------------------------

function printAvatarURL(contributors){

  //console.log(contributors);

  for(var i = 0; i < contributors.length; i++){
    //console.log(contributors[i].login + " " + contributors[i].avatar_url);
    var filePath = "avatars/" + contributors[i].login;
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
       .pipe(fs.createWriteStream(filePath));
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");


