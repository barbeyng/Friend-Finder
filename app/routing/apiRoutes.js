var path = require('path');
var friends = require('../data/friends.js');

// Retrieve objects in friends array to display in route
module.exports = function (app) {
	app.get('/api/friends', function (req, res) {
		return res.json(friends);
	});

	// User added name and image
	app.post('/api/friends', function (req, res) {
		var matchedFriend = {
			name: '',
			img_url: '',
			scoreDifference: 1000
		};

		var data = req.body;
		var userScores = data.scores;
		var totalDifference = 0;

		// Compare user input with existing friends' data
		for (var i = 0; i < friends.length; i++) {
			var friend = friends[i];
			totalDifference = 0;
			for (var j = 0; j < friend.scores.length; j++) {
				var friendScore = friend.scores[j];
				var userScore = userScores[j];
				// Subtract the two scores to find the difference
				totalDifference += Math.abs(parseInt(userScore) - parseInt(friendScore));
				// Match will be the object score with the lowest score difference
				if (totalDifference <= matchedFriend.scoreDifference) {
					matchedFriend.name = friend.name;
					matchedFriend.img_url = friend.img_url;
					matchedFriend.scoreDifference = totalDifference;
				}
			}
		}

		friends.push(data);
		res.json(matchedFriend);
	})
};