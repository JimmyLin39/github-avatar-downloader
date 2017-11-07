var request = require('request');
var secrets = require('./secrets.js');
console.log(secrets.GITHUB_TOKEN);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    // change response body from JSON to JS
    let bodyObj = JSON.parse(body);
    // the bodyObj is an array contain objects
    // for each item in bodyObj find the object key avatar_url
    bodyObj.forEach(function(item){
      console.log('avatar_url: ', item.avatar_url);
    });

    //cb(err, body);

  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});