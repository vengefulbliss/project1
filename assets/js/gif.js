var topics = ["happy", 'sad', 'angry', 'contempt', 'disgust', 'fear', 'neutral', 'surprise']
var limit = 10;
var topic = "";

// Function to call the Gify query and create the div to place the rating and images.
function displayTopicInfo() {
	$("#gifArea").empty();
	topic = $(this).attr('data-name');
	//console.log($(this).attr('data-name'));
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + " &api_key=tBkahZRKJwlbtHA8plQfVFrRhELcsFVg&limit="+ limit + "&fmt=JSON";

	$.ajax({
		url: queryURL, 
		method: 'GET'
	  })
	  .done(function(response) {

	  	// console.log(queryURL);
	  	// console.log(response);
	  	// console.log(topic);
        
	  	var results = response.data;

      	for(var i = 0; i < results.length; i++) {

			// Creates a generic div to hold the topic
			var topicDiv = $('<div>');	

			// Retrieves the Rating Data
			var rating = results[i].rating;

			if (rating == "r" || rating == "pg-13") {

			} else {

			// Creates an element to have the rating displayed
			var pOne = $('<p id="rating">').text("Rating: " + rating);

			// Displays the rating
			topicDiv.append(pOne);

			// Creates an element to hold the image
			var image = $('<img>')
			image.attr('src', results[i].images.fixed_height_still.url);
			image.attr('data-still', results[i].images.fixed_height_still.url);
			image.attr('data-animate', results[i].images.fixed_height.url);
			image.attr('data-state', 'still');
			image.attr('data-name', topic);
			image.addClass('topicImage');

			// console.log("------------------");
			// console.log(results[i]);
			// console.log(topic);
			// console.log('Itterator: '+i);
			// console.log("Data Still: " + results[i].images.fixed_height_still.url);
			// console.log("Data Animate: " + results[i].images.fixed_height.url);

			// Appends the image
			topicDiv.append(image);

			// Puts the entire image above the previous images.
			$("#gifArea").prepend(topicDiv);
	  }
	  } // End of For Loop
	}); // End of Done

	  return false;

} //End of Function displayTopicInfo

// Generic function for displaying topic data
function genButtons(){

	// Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
	$('#btnArea').empty();

	// Loops through the array of topics
	for (var i = 0; i < topics.length; i++){
		// Then dynamicaly generates buttons for each topic in the array
		// Note the jQUery syntax here...
	    var a = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
	    a.addClass('btn btn-warning topic'); // Added a class
	    a.attr('data-name', topics[i]); // Added a data-attribute
	    a.text(topics[i]); // Provided the initial button text
	    $('#btnArea').append(a); // Added the button to the HTML
	}
	return false;
} // End Function genButtons

// This function handles events where one button is clicked
$('#addTopic').on('click', function(){

	// This line of code will grab the input from the textbox
	var topic = $('#topic-input').val().trim();

	// The topic from the textbox is then added to our array
	topics.push(topic);

	// Our array then runs which handles the processing of our topic array
	genButtons();

	// We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
	return false;
});

function changestate() {

	console.log($(this));
	//topic = $(this).attr('data-name');
    var state = $(this).attr('data-state');
    console.log(state);
    if (state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

} // End of function changestate

	// This calls the genButtons() function
	genButtons();

	// Generic function for displaying the topicInfo
	$(document).on('click', '.topic', displayTopicInfo);

	//Generic function for calling changestate based class topicImage
	$(document).on('click', '.topicImage', changestate);