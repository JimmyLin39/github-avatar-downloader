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
      //cb(avatarURL,username) ;
      downloadImageByURL(avatarURL, username);
    });

    // cb(err, avatarURL);
  });
}

function downloadImageByURL(url, filePath) {
  //console.log('url', url)
  request.get(url)
         .on('error', function(err){
          console.log('err');
          throw err;
       })
         .on('response', function(response){
          console.log('download...')
         })
         .on('end', function(){
          console.log('Download complete.');
         })
         .pipe(fs.createWriteStream('./avatars/'+filePath+'.jpg'));

}

var repoOwner = process.argv[2];
var repoName = process.argv[3];

if(!repoOwner){
  console.log('please enter a repo owner.')
}else if (!repoName) {
  console.log('please enter a repo name.')
}else{
  getRepoContributors(repoOwner, repoName, function(url, username) {
  console.log("url:", url);
  console.log("username:", username);
  });
}
