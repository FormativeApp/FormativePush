Parse.Cloud.define("postCreated", function(request, response) {

	var name = request.params.name;
	var text = request.params.text;
	var type = request.params.type;
	var team = request.params.team;
	var sender = request.params.sender;

	var pushQuery = new Parse.Query(Parse.Installation);

	pushQuery.equalTo('deviceType', 'ios');
	pushQuery.equalTo('PWDid', team);
	pushQuery.notEqualTo('userId', sender);

	console.log("Test!");

	Parse.Push.send({
	    where: pushQuery, // Set our Installation query
	    data: {
	    	alert: name + " sent an " + type + " to your care team " + ": \n" + text
	    }
	}, 
	{
		success: function() {
	      // Push was successful
	      response.success();
	  	},
	  	error: function(error) {
	  		throw "Got an error " + error.code + " : " + error.message;
	  	}
	});

});


Parse.Cloud.define("commentCreated", function(request, response) {

	var name = request.params.name;
	var creator = request.params.creator;
	var text = request.params.text;

	var pushQuery = new Parse.Query(Parse.Installation);

	pushQuery.equalTo('deviceType', 'ios');
	pushQuery.equalTo('userId', creator);


	Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
    	alert: name + " added a comment to your post: " + text
    }
	}, 
	{
	success: function() {
		response.success();
      	// Push was successful
    },
      error: function(error) {
      	throw "Got an error " + error.code + " : " + error.message;
    	}
  	});

});

Parse.Cloud.define("newUserCreated", function(request, response) {

	var name = request.params.name;
	var team = request.params.team;
	var sender = request.params.sender;

	var pushQuery = new Parse.Query(Parse.Installation);

	pushQuery.equalTo('deviceType', 'ios');
	pushQuery.equalTo('PWDid', team);
	pushQuery.notEqualTo('userId', sender);

	console.log("Test!");

	Parse.Push.send({
	    where: pushQuery, // Set our Installation query
	    data: {
	    	alert: name + " just joined your care team!"
	    }
	}, 
	{
		success: function() {
	      // Push was successful
	      response.success();
	  	},
	  	error: function(error) {
	  		throw "Got an error " + error.code + " : " + error.message;
	  	}
	});

});
