
(function () {
		var streaming = false,
			video = document.querySelector('#video'),
			canvas = document.querySelector('#canvas'),
			photo = document.querySelector('#photo'),
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
	function(stream){
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		} else {
			var vendorURL = window.URL || window.webkitURL;
			video.src = vendorURL.createObjectURL(stream);
		}
	video.play();
	},
	function(err) {
		console.log("An error occured! " + err);
	}
	);

video.addEventListener('canplay', function(ev) {
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
	recognizeSubject();

}

recognizeButton.addEventListener('click', function(ev) {
	takepicture();
	ev.preventDefault();
}, false);

})();

function recognizeSubject() {
	var request = new XMLHttpRecquest();

	request.open('POST', 'https://api.kairos.com/recognize');

	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('app_id', '9943ae12' );
	request.setRequestHeader('app_key', '454f54a4dcac195f43937907f9d4f647' );

request.onreadystatechange= function() {
	if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', JSON.parse(this.responseText));
		var myObj = JSON.parse(this.responseText);
	}

document.getElementById("infoTables").innerHTML = "Welcome " + myObj.images["0"].candidates["0"].subject_id;

if (document.getElementById("infoTables").value != "") {
	document.body.style.backgroundColor = "SpringGreen";
	setTimout(redirect, 3000);

}
function redirect() {
	location.href = "http://url.address";
}
};
var photo = document.getElementById("photo").getAttribute("src");

var body = {
'image': photo, 
'gallery_name': 'Estabonoodle'
};
request.send(JSON.stringify(body));
}