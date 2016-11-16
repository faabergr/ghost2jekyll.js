var fs = require('fs');
fs.readFile('breakpoints.ghost.2016-11-04.json', function(err, data) {
  if (err) {
    throw err;
  }

  parseGhostPosts(data);
});

function parseGhostPosts(someJson) {
  var parsed = JSON.parse(someJson);
  var posts = parsed.db[0].data.posts;

  for (var k = 0; k < posts.length; k++) {
    if (posts[k].status != 'published' || posts[k].page !== 0) continue;

    var title = posts[k].title.replace(/ /g, '-').replace(/[^0-9a-z-]/gi, '');
    var postOutput = '---\nlayout: post\ntitle: ' + posts[k].title + '\n---\n\n' + posts[k].markdown;
    console.log(posts[k]['published_at']);
    var datePosted = new Date();
    datePosted.setTime(Date.parse(posts[k]['published_at']));
    var month = datePosted.getMonth() + 1;
    var fileName = datePosted.getFullYear() + '-' + month + '-' + datePosted.getDate() + '-' + title;
    fs.writeFile('output/' + fileName + '.md', postOutput, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }


}