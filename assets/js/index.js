var generateFavs = function(result) {
	//console.log(result)
	$("#favorites").empty();

	//console.log(result);
	for(var i = 0; i < 4; i++) {

		//define device Item with props
		var deviceItem = result[i];
		//console.log(deviceItem);
		//console.log(typeof(JSON.parse(deviceItem)))
		//define jquery Dom elements
		var favButton = $("<a>")
		var colDiv = $("<div>");
		var cardDiv = $("<div>");
		var cardBlock = $("<div>");
		var title = $("<h4>");
		var img = $("<img>");
		var deviceLabels = $("<p>");
		var moreInfo =("<a>");

		favButton.attr({
			name: deviceItem.label,
			class: "favButton",
		});

		colDiv.attr({ class: "col-md-3 col-sm-6",
	});

		cardDiv.attr({
			class: "card deviceCard"
		});
		
		img.attr({
			src: deviceItem.image,
			alt: deviceItem.label, 
			class: "card-img-top"
		});
		
		cardBlock.attr({
			class: "card-block",
			style: "text-align:center"
		});

		title.attr({
			class: "card-title",
			style: "font-weight: bold;"
		})

		title.text(deviceItem.label);

		deviceLabels.attr({
			style: "font-weight:bold;color:black"
		})

		console.log(deviceItem.deviceLabels);
		deviceLabels.text("Device Labels : " + deviceItem.deviceLabels);

		moreInfo.attr({
		href: deviceItem.url,
		class: "btn btn-primary card-btn",
		target: "_blank"
		});
	
	moreInfo.text("More Info")

	
	colDiv.append(cardDiv);
	cardDiv.append(img);
	cardDiv.append($("<hr>"))
	cardBlock.append(title);
	cardBlock.append($("<hr>"));
	cardBlock.append(deviceLabels);
	cardBlock.append($("<hr>"));
	cardBlock.append(moreInfo);


	cardDiv.append(cardBlock)

	$("#favorites").append(colDiv);
}
};

var myFavs = [
{
	image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5882/5882900_sd.jpg;maxHeight=640;maxWidth=550" ,
	label: "thin, powerful, perfect for any situation" ,
	deviceLabels: "Ultra book",
  url: "https://www.bestbuy.com/site/razer-blade-stealth-13-3-qhd-touch-screen-laptop-intel-core-i7-16gb-memory-512gb-solid-state-drive-black/6172318.p?skuId=6172318" 
},
{
	image: "./assets/images/surfacepro.jpg", 
	label: "The Surface Pro 4! hybrid device",
	deviceLabels: "Powerful 2 in 1 device",
	url: "https://www.bestbuy.com/site/microsoft-surface-pro-with-lte-advanced-unlocked-12-3-touch-screen-intel-core-i5-8gb-memory-256gb-solid-state-drive-silver/6216320.p?skuId=6216320"
},

{
	image:	"./assets/images/surfacebook2.jpg",
	label: "Surface Book 2",
	deviceLabels: "Microsoft Surface book, the power of a desktop; portability of a tablet.",
	url: "https://www.bestbuy.com/site/microsoft-surface-book-2-15-touch-screen-pixelsense-display-intel-core-i7-16gb-256gb-dgpu-silver/6145601.p?skuId=6145601"
},
{
	image: "./assets/images/macbookpro.jpg",
	label: "Macbook Pro",
	deviceLabels: "Top of the line MacBook Pro",
	url: "https://www.bestbuy.com/site/apple-macbook-pro-15-display-intel-core-i7-16-gb-memory-256gb-flash-storage-latest-model-space-gray/5721702.p?skuId=5721702"
}
];

      
$(document).ready(function(){
  $.get("api/user").done(function(result) {
    console.log(result);
    typeof(result);
    if (result) {
      $.get("/api/favorites/" + result.user, function(result){
        console.log(result)
        if(result === "NO Favorites" || result.length < 5){
            console.log("we are in no favs ")
          generateFavs(myFavs);
        } else {
            console.log("we are in there are favs")
          generateFavs(result);
        }
      })
    }
  })
});