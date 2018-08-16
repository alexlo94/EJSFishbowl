var submitbox;
var randombutton;
var submitbutton;
var form;

window.addEventListener("load", init());

function init(){
	//find the elements we attach event listeners to
	submitbox = document.getElementById("searchbox");
	randombutton = document.getElementById("randombutton");
	submitbutton = document.getElementById("searchbutton");
	form = document.getElementById("submit");

	//make the enter key behave normally
	submitbox.addEventListener("keypress", function(event){
		if(event.keyCode == 13){
			submitbutton.onClick();
			submitbox.input = "";
		}
	});

	//clear the text box after the user has submitted a url
	form.addEventListener("submit", function(event){
		submitbox.value = "";
	});
}
