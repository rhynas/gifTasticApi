var topicsArray = [
	{
		mainTopic : "Nature",
		subTopic : ["Fire","Water", "Wood", "Metal"]
	},
	{
		mainTopic : "Food & Drink",
		subTopic : ["Cookies", "Cakes", "Decoration"]
	},
	{
		mainTopic : "Reactions",
		subTopic : ["Happy", "Sad", "Crazy", "Overwhelm"]
	},
	{
		mainTopic : "Decades",
		subTopic : ["60's", "70's", "80's", "90's"]
	},
	{
		mainTopic : "Animals",
		subTopic : ["Dog", "Cat", "Bunny", "Cow"]
	},
]

var topic = "";
var currentIndex;

function displayTopics(){
	var maxTopics = 10;
	var selSubTopic = $(this).attr("data-name");		
	var selTopic = topicsArray[currentIndex].mainTopic;	
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selSubTopic + "&limit=" +maxTopics+ "&api_key=dc6zaTOxFJmzC";
	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(response) {
		for (var i = 0; i < response.data.length; i++) {
			var topicDiv = $("<div class='d-topic  col-md-4'>");
			//response.length
			var rating = response.data[i].rating;

			var pRate = $("<p>").text("Rating: " + rating);

			topicDiv.append(pRate);

			var imageurlstill = response.data[i].images.original_still.url;
			var imageurlanimated = response.data[i].images.original.url;

			var image = $('<img>')
			.attr("src", imageurlstill)
			.attr("data-state", "still")
			.attr("data-animated", imageurlanimated)
			.attr("data-still", imageurlstill).addClass('gif');

			topicDiv.append(image);
			$("#divApiImages").prepend(topicDiv);
			
		}


 		$(".gif").on("click", function(){
			var s = $(this).attr("data-state");	
			if (s === "still") {
				var currentUrl = $(this).attr("src");
				$(this).attr("src", $(this).data("animated"));
				$(this).attr("data-state", "animate");
				
			} else {
				var currentUrl = $(this).attr("src");
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
	

		  }
    	});


	});//end ajax function
}


function createMainTopics(){
	$("#divApiButtons").empty();
	for (var i = 0; i < topicsArray.length; i++) {
		var b = $("<button>");
		b.addClass("topic-class list-group-item");
		b.attr("data-name", topicsArray[i].mainTopic);
		b.attr("data-index", i);
		b.text(topicsArray[i].mainTopic);
		$("#divApiButtons").append(b);
	}
}//end function create buttons for main topics


function createSubTopics(){
	$("#divApiSubTopics").empty();
	$("#message").empty().html("<p>Select one of the following Sub-topics</p>")

	for (var i = 0; i < topicsArray[currentIndex].subTopic.length; i++) {
		var b = $("<button>");
		b.addClass("sub-topic-class btn btn-primary");
		b.attr("data-name", topicsArray[currentIndex].subTopic[i]);
		b.text(topicsArray[currentIndex].subTopic[i]);
		$("#divApiSubTopics").append(b);
	}
}//end function create buttons

$(document).ready(function(){

	$("#add-topic").on("click", function(event){
		//prevent from to refresh
		//we grab the info from the text box and remove 
		//any blank spaces before and after the initital 
		//and final words
		var	topic = $("#topic-input").val().trim();
		var object = {mainTopic:topic, subTopic:[]};
		//Add the new topic in our topic array
		topicsArray.push(object);
		//recreate the buttons
		createMainTopics()
		event.preventDefault();
  	})//end add topic on click function

	$("#add-sub-topic").on("click", function(event){
		//we grab the info from the text box and remove 
		//any blank spaces before and after the initital 
		//and final word
		var	st = $("#sub-topic-input").val().trim();
		//Add the new topic in our topic array
		topicsArray[currentIndex].subTopic.push(st);
		//recreate the buttons
		createSubTopics()
		event.preventDefault();
  	})//end add topic on click function
	
   $(document).on("click", ".sub-topic-class", displayTopics);
 	
	createMainTopics();	


	$(document).on("click", ".topic-class", function(event){
		currentIndex = $(this).data("index");
		createSubTopics();
	}); 


});//End document ready function