var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

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
      //console.log('avatar_url: ', item.avatar_url);
      //console.log(item);

      let avatarURL = item.avatar_url;
      let username = item.login;
      downloadImageByURL(avatarURL, username);
    });
    //cb(err, body);
    console.log('Download complete.');
  });
}

function downloadImageByURL(url, filePath) {
  console.log('url', url)
  request.get(url)
         .on('error', function(err){
          console.log('err');
          throw err;
       })
         .pipe(fs.createWriteStream('./avatars/'+filePath+'.jpg'));

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});