$(document).ready(function(){
// -----------------------------------------------------------
//Global variables
// -----------------------------------------------------------
var topics = ["dog", "cat", "rabbit", "hamster", "skunk"];
// -----------------------------------------------------------
//Display buttons for each topic
// -----------------------------------------------------------
function renderButtons(){
	$("#buttons-view").empty();
	for(var i=0;i<topics.length;i++){
		var topic = $("<button>");
		topic.addClass("animal");
		topic.attr("data-name", topics[i]);
		topic.text(topics[i]);
		$("#buttons-view").append(topic);
	}
}
// -----------------------------------------------------------
//Loads the still image of animals when the animal button 
//pressed.
// -----------------------------------------------------------
function displayAnimalInfo(){
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + 
	"&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(response){
		console.log(response);
		$("#animalDisplay").empty();
		for(var i=0; i<response.data.length ;i++) {
			var imgStill = response.data[i].images.fixed_height_still.url;
			var imgAnimate = response.data[i].images.fixed_height.url;
			var rating = response.data[i].rating;
			var img = $("<img>");
			img.attr("src", imgStill);
			img.attr("state", "still");
			img.attr("imgStill", imgStill);
			img.attr("imgAnimate", imgAnimate);
			img.addClass("animalImage");
			var newDiv = $("<div class='animalClass'>");
			var p =$("<h3>");
			p.text("Rating: "+ rating);
			newDiv.html(p).append(img);
			$("#animalDisplay").append(newDiv);
		}
	});
}
// -----------------------------------------------------------
//Toggles between the still image and the animated ones when 
//the image button pressed.
// -----------------------------------------------------------
function displayAnimalImage(){
	var state = $(this).attr("state");
	if(state === "still"){
		$(this).attr("state", "animate");
		$(this).attr("src", ($(this).attr("imgAnimate")));
	}
	else {
		$(this).attr("state", "still");
		$(this).attr("src", ($(this).attr("imgStill")));
	}
}
// -----------------------------------------------------------
//Adding new animal to the topics array.
// -----------------------------------------------------------
$("#add-animal").on("click", function(event){
	event.preventDefault();
	var newAnimal = $("#animal-input").val().trim();
	if(newAnimal !== ""){
		topics.push(newAnimal);
	}
	else{
		alert("Oops animal name not entered!");
	}
	$("#animal-input").val("");
	renderButtons();
});
// -----------------------------------------------------------
//Click event for all the animal buttons displayed on the 
//page.
// -----------------------------------------------------------
$(document).on("click", ".animal", displayAnimalInfo);
// -----------------------------------------------------------
//Click events for the animal images.
// -----------------------------------------------------------
$(document).on("click", ".animalImage", displayAnimalImage);
// -----------------------------------------------------------
//Calling renderButtons for displaying the buttons 
//corresponding to each topic in topics array.
// -----------------------------------------------------------
renderButtons();
});