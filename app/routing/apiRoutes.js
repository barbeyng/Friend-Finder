var path = require('path');
var friends = require('../data/friends.js');

module.exports = function (app) {
	app.get('/api/friends', function (req, res) {
		return res.json(friends);
	});

	app.post('/api/friends', function (req, res) {
		var matchedFriend = {
			name: '',
			img_url: '',
			scoreDifference: 1000
		};

		var data = req.body;
		var userScores = data.scores;
		var totalDifference = 0;

		for (var i = 0; i < friends.length; i++) {
			var friend = friends[i];
			totalDifference = 0;
			for (var j = 0; j < friend.scores.length; j++) {
				var friendScore = friend.scores[j];
				var userScore = userScores[j];
				totalDifference += Math.abs(parseInt(userScore) - parseInt(friendScore));
				if (totalDifference <= matchedFriend.scoreDifference) {
					matchedFriend.name = friend.name;
					matchedFriend.img_url = friend.img_url;
					matchedFriend.scoreDifference = totalDifference;
				}
			}
		}

		friends.push(data);
		res.json(matchedFriend);
		// var data = req.body;
		// var scores = data.scores;

		// var matchName = '';
		// var matchImage = '';
		// var totalDifference = 10000;
		// for (var i = 0; i < friends.length; i++) {

		// 	// Compute differenes for each question
		// 	var eachDifference = 0;
		// 	for (var j = 0; j < scores.length; j++) {
		// 		eachDifference += Math.floor(friends[i].scores[j] - scores[j] * 100);
		// 	}

		// 	// If lowest difference, record the friend match
		// 	if (eachDifference < totalDifference) {

		// 		totalDifference = eachDifference;
		// 		matchName = friends[i].name;
		// 		matchImage = friends[i].img_url;
		// 	}
		// }

		// friends.push(data);

		// res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	})
};