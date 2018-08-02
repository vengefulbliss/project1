//above is the hidden information for the project.
(function () {
	var streaming = false,
		video = document.querySelector('#video'),
		canvas = document.querySelector('#canvas'),
		sourceImage = document.querySelector('#sourceImage'),
		recognizeButton = document.querySelector('#recognizeButton'),
		width = 480,
		height = 0;

	navigator.getMedia = (navigator.getUserMedia ||
		navigator.webKitGetUserMedia ||
		navigator.mozgetUserMedia ||
		navigator.msGetUserMedia);

	navigator.getMedia({
			video: true,
			audio: false
		},
		function (stream) {
			if (navigator.mozGetUserMedia) {
				video.mozSrcObject = stream;
			} else {
				var vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL.createObjectURL(stream);
			}
			video.play();
		},
		function (err) {
			console.log("An error occured! " + err);
		});

	video.addEventListener('canplay', function (ev) {
		if (!streaming) {
			height = video.videoHeight / (video.videoWidth / width);
			video.setAttribute("width", width);
			video.setAttribute("height", height);
			canvas.setAttribute("width", "50%");
			canvas.setAttribute("height", height);
			streaming = true;
		}
	}, false);

	function takepicture() {
		canvas.width = width;
		canvas.height = height;
		canvas.getContext('2d').drawImage(video, 0, 0, width, height);
	
		
		var dataUrl = canvas.toDataURL('image/png');
		sourceImage = document.getElementById(dataUrl);
		console.log(sourceImage);
	}
	
	recognizeButton.addEventListener('click', function (ev) {
		takepicture();
		ev.preventDefault();
	}, false);
})();



function processImage() {
		
	// Replace <Subscription Key> with your valid subscription key.
		var subscriptionKey = "366783bde518439a941175d6b9a7aa52";

		// NOTE: You must use the same region in your REST call as you used to
		// obtain your subscription keys. For example, if you obtained your
		// subscription keys from westus, replace "westcentralus" in the URL
		// below with "westus".
		//
		// Free trial subscription keys are generated in the westcentralus region.
		// If you use a free trial subscription key, you shouldn't need to change 
		// this region.
		var uriBase =
				"https://westus2.api.cognitive.microsoft.com/face/v1.0/detect";

		// Request parameters.
		var params = {
				"returnFaceId": "true",
				"returnFaceLandmarks": "false",
				"returnFaceAttributes":
						"age,gender,headPose,smile,facialHair,glasses,emotion," +
						"hair,makeup,occlusion,accessories,blur,exposure,noise"
		};
		var sourceImageUrl = document.getElementById('inputImage').value;
		document.querySelector("#sourceImage").src = sourceImageUrl;

		// Perform the REST API call.
		$.ajax({
				url: uriBase + "?" + $.param(params),

				// Request headers.
				beforeSend: function(xhrObj){
						xhrObj.setRequestHeader("Content-Type","application/json");
						xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
				},

				type: "POST",

				// Request body.
				data: '{"url": ' + '"' + sourceImageUrl + '"}',
		})

		.done(function(data) {
				// Show formatted JSON on webpage.
				$("#responseTextArea").val(JSON.stringify(data, null, 2));
		})

		.fail(function(jqXHR, textStatus, errorThrown) {
				// Display error message.
				var errorString = (errorThrown === "") ?
						"Error. " : errorThrown + " (" + jqXHR.status + "): ";
				errorString += (jqXHR.responseText === "") ?
						"" : (jQuery.parseJSON(jqXHR.responseText).message) ?
								jQuery.parseJSON(jqXHR.responseText).message :
										jQuery.parseJSON(jqXHR.responseText).error.message;
				alert(errorString);
				
				
		});
};
// recognize.addEventListener('click', function (ev) {
// 					recognizeSubject();
// 					ev.preventDefault();
// 				}, false);

