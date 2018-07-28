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
	
		var imageData = canvas.toDataURL('image/png');
		photo.setAttribute('src', imageData);
		recognizeSubject();
		console.log(imageData);
	}
	
	recognizeButton.addEventListener('click', function (ev) {
		takepicture();
		ev.preventDefault();
	}, false);

})();
var api_url = "https://api.kairos.com"
var app_id = "9943ae12";
var app_key = "454f54a4dcac195f43937907f9d4f647";
var image_url = "imageData"
var origin = "Access-Control-Allow-Origin"
function recognizeSubject() {

	var headers = new Headers();
	/*Header type	Response header
Forbidden header name	no */
headers.append("app_id", app_id)
headers.append("app_key", app_key);
var payload = {"image" : image_url};
var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'http://catfacts-api.appspot.com/api/facts?number=99'
fetch(proxyUrl + targetUrl)
  .then(blob => blob.json())
  .then(data => {
    console.table(data);
    document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
    return data;
  })
  .catch(e => {
    console.log(e);
    return e;
  });
var init = {
	method: "POST",
	headers: headers,
	body: JSON.stringify(payload)
};
	const request = async  () => {
		const response = await fetch(api_url + "/v2/analytics", init)
		const json = await response.json();
		console.log(json);
	}
	request();
}

