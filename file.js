
var thumbnails = []
var limit = 10;
var sourceImage = "";
function displayTopicInfo() {
	$("#gallery").empty();
	soureImage = $(this).attr('value');
	//console.log($(this).attr('value'));
    var queryURL = "https://westus2.api.cognitive.microsoft.com/face/v1.0/detect" + "?" + $.param(params)

	$.ajax({
		url: queryURL, 
		method: 'GET'
	  })
	  .done(function(response) {


var results = response.data;

for(var i = 0; i < results.length; i++) {

// Creates a generic div to hold the inputImage
var imageDiv = $('<div>');	

// Retrieves the Rating Data


// Displays the rating
imageDiv.append(pOne);


var image = $('<img>')
image.attr('src', results[i].images.fixed_height_still.url);
image.attr('data-still', results[i].images.fixed_height_still.url);
image.attr('data-animate', results[i].images.fixed_height.url);
image.attr('data-state', 'still');
image.attr('value', sourceImage);
image.addClass('inputImageImage');
image.attr( "style", "display: block !important;")

// console.log("------------------");
// console.log(results[i]);
// console.log(inputImage);
// console.log('Itterator: '+i);
// console.log("Data Still: " + results[i].images.fixed_height_still.url);
// console.log("Data Animate: " + results[i].images.fixed_height.url);

// Appends the image
	// Appends the image
	imageDiv.append(sourceImage);

	// Puts the entire image above the previous images.
	$("#gallery").prepend();
}
 // End of Done

return false;

}, //End of Function displayTopicInfo

function genButtons(){

	// Deletes the thumbnails prior to adding new thumbnails (this is necessary otherwise you will have repeat buttons)
	$('#btnArea').empty();

	// Loops through the array of thumbnails
	for (var i = 0; i < thumbnails.length; i++){
		// Then dynamicaly generates buttons for each inputImage in the array
		// Note the jQUery syntax here...
	    var a = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>) // Added a class
	    a.attr('value', thumbnails[i]); // Added a data-attribute
	    a.text(thumbnails[i]); // Provided the initial button text
	    $('#gallery').append(a); 
	}
	return false;
}, // End Function genButtons

// This function handles events where one button is clicked
$('#recognizeButton').on('click',  function(){

	// This line of code will grab the input from the textbox
	var  sourceImage = $('#canvas').val().trim();

	// The inputImage from the textbox is then added to our array
	thumbnails.push(sourceImage);

	// Our array then runs which handles the processing of our inputImage array
	genButtons();

	// We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
	return false;
}));

function changestate() {

	console.log($(this));
	//inputImage = $(this).attr('value');
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

	// Generic function for displaying the imageInfo
	$(document).on('click', '#recognizeButton', displayimageInfo);

	//Generic function for calling changestate based class Image
	
	$(document).on('click', '#recognizeButton', changestate)};