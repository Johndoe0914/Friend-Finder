
var friendsData = require("../data/friends")
var bodyparser = require("body-parser")

module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friendsData)

    });
    
    app.post("/api/friends", function(req,res){
        var bestMatch = {
            "name" : "none",
            "photo": "none"

        };

        function sum(array){
            var total = 0;
            for(var i = 0; i < array.length; i++){
                total += parseInt(array[i])
            }
            return total
        }
        //new user scores
        var newFriend = req.body;

        var newFriendScore = sum(req.body.scores)

        var friendTotal = 0;

        for(var i = 0; i < friendsData.length; i++){
            friendTotal = sum(friendsData[i].scores)
            if(friendTotal == newFriendScore){
                bestMatch.name = friendsData[i].name;
                bestMatch.photo = friendsData[i].photo
            }
        };
        if(bestMatch.name == "none"){
            var closest = 50;
            for(var i = 0; i < friendsData.length; i++){
                friendTotal = sum(friendsData[i].scores);
                var difference = Math.abs(friendTotal - newFriendScore);
                if(difference <= closest){
                    closest = difference;
                    bestMatch.name = friendsData[i].name;
                    bestMatch.photo = friendsData[i].photo;
                }
            }
        }
        friendsData.push(newFriend);
        res.json(bestMatch);
        
    });
};