$( document ).ready(function() {
	// An array of searches, new searches will be pushed into this array;
	var emotions = [];
	// Creating Functions & Methods
	// Function that displays all gif buttons
	function displayGifButtons(){
			$("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
			for (var i = 0; i < emotions.length; i++){
					var gifButton = $("<button>");
					gifButton.addClass("emotion");
					gifButton.addClass("btn btn-primary")
					gifButton.attr("data-name", emotions[i]);
					gifButton.text(emotions[i]);
					$("#gifButtonsView").append(gifButton);
			}
	}
	// Function to add a new emotion button
	function addNewButton(){
			$("#addGif").on("click", function(){
			var emotion = $("#input").val().trim();
			if (emotion == ""){
				return false; // added so user cannot add a blank button
			}
			emotions.push(emotion);
	
			displayGifButtons();
			return false;
			});
	}
	// Function to remove last button
			// Doesnt work properly yet removes all of the added buttons
			// rather than just the last
	function removeLastSearch(){
			$("removeGif").on("click", function(){
			emotions.pop(emotion);
			displayGifButtons();
			return false;
			});
	}
	//funciton for displaying gifs.
	function displayGifs(){
		var emotion= $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=Gv5a25eM2jd9YrXikPBCingsj57WEsCL";
		console.log(queryURL); //display the constructed url
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			console.log(response); 
			$("#gifsView").empty(); //erases the info from the previous click.
			var results = response.data;
			if(results == ""){
				alert("there was an error completing your search");
			}
			for (var i=0; i<results.length; i++){

				var gifDiv = $("<div>"); //this is where the gifs go into.
				gifDiv.addClass("gifDiv");
				var gifRating = $("<p>").text("Rating: " + results[i].rating);
				gifDiv.append(gifRating);


			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
			gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
			gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
			gifImage.attr("data-state", "still"); // set the image state
			gifImage.addClass("image");
			gifDiv.append(gifImage);
			// pulling still image of gif
			// adding div of gifs to gifsView div
			$("#gifsView").prepend(gifDiv);
			}
		});
	}

	//calling functinos and methods
	displayGifButtons();
	addNewButton();
	$(document).on("click", ".emotion", displayGifs);
	$(document).on("click", ".image", function(){
		var state = $(this).attr('data-state');
		if ( state == 'still'){
			$(this).attr('src', $(this).data('animate'));
			$(this.attr('data-state', 'animate'));
		}else{
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
	});
	});
