//above is the hidden information for the project.



(function () {
	var streaming = false,
		video = document.querySelector('#video'),
		canvas = document.querySelector('#canvas'),
		photo = document.querySelector('#kairos-response'),
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
	
		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
		recognizeSubject();
		
	}
	
	recognizeButton.addEventListener('click', function (ev) {
		takepicture();
		ev.preventDefault();
	}, false);

})();



function recognizeSubject() {
	var request = new XMLHttpRequest();

	request.open('POST', 'https://api.kairos.com/v2/' + 'analytics');
	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('app_id', '9943ae12');
	request.setRequestHeader('app_key', '454f54a4dcac195f43937907f9d4f647');

	request.onreadystatechange = function () {
		if (this.readyState === 0) {
			console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			console.log('Body:', JSON.parse(this.responseText));
			var myObj = JSON.parse(this.responseText);
		}
		document.getElementById("kairos-response").innerHTML = "Welcome " + myObj.images["0"].candidates["0"].subject_id;

		if (document.getElementById("kairos-response").value != "") {
			document.body.style.backgroundColor = "SpringGreen";
			setTimeout(redirect, 3000);
		}

		function redirect() {
			location.href = "";
		}
	};
	detect = function (image_data, callback, is_url) {
		var myObj = new image();
		myObj.onload = function () {
			if (is_url) {
				data = image_data;
			} else {
				data = String(imageToDataURI(myObj));
				data = data.replace("data:image/jpeg;base64,", "");
				data = data.replace("data:image/jpg;base64,", "");
				data = data.replace("data:image/png;base64,", "");
				data = data.replace("data:image/gif;base64,", "");
				data = data.replace("data:image/bmp;base64,", "");
			}

		};
	}
}

// function drawBoundingBox(photo, scaling_factor, face, color) {
// 	var imageObj = new Image();
// 	imageObj.onload = function () {
// 		var canvas = $('#photo')[0];
// 		var context = canvas.getContext('2d');
// 		context.clearRect(0, 0, canvas.width, canvas.height);
// 		context.drawImage(imageObj, 0, 0, imageObj.width * scaling_factor, imageObj.height * scaling_factor);

// 		if (face) {
// 			var top = face.top * scaling_factor;
// 			var left = face.left * scaling_factor;
// 			var width = face.width * scaling_factor;
// 			var height = face.height * scaling_factor;

// 			// draw bounding box
// 			context.beginPath();
// 			context.rect(left, top, width, height);
// 			context.lineWidth = 4;
// 			context.strokeStyle = color;
// 			context.stroke();
// 		}
// 	};
// 	imageObj.src = photo;
// }

// function dataURItoBlob(dataURI) {
// 	// convert base64/URLEncoded data component to raw binary data held in a string
// 	var byteString;
// 	if (dataURI.split(',')[0].indexOf('base64') >= 0)
// 		byteString = atob(dataURI.split(',')[1]);
// 	else
// 		byteString = unescape(dataURI.split(',')[1]);

// 	// separate out the mime component
// 	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

// 	// write the bytes of the string to a typed array
// 	var ia = new Uint8Array(byteString.length);
// 	for (var i = 0; i < byteString.length; i++) {
// 		ia[i] = byteString.charCodeAt(i);
// 	}

// 	return new Blob([ia], {
// 		type: mimeString
// 	});
// }