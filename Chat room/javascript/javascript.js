var username = "";
var key = "ewout"
var xhr = new XMLHttpRequest();
var highestId = 0;

//var correctids = [464, 465, 466, 467, 468, 469, 471, 464];

function login() {
	username = document.getElementById("username-input").value

	document.getElementById("login-screen").style.display = "none";
	document.getElementById("chatroom").style.display = "block";

	scrollToBottom("message-screen");
}

function sendMessage() {

	//define variables
	var messageScreen = document.getElementById("message-screen");
	var messageString = username + ": " + document.getElementById("chat-text-area").value;

	//only submit a message if the message isn't nothing
	if (messageString != "") {
		// sends message to server
		postMessage(messageString);
		var messageId = xhr.response;

		// grabs message from server
		grabMessageById(messageId);
		var newMessage = xhr.response;

		//messageScreen.innerHTML += newMessage + "<br>";

		//highestID = messageId;
	}

	//reset text input field
	document.getElementById("chat-text-area").value = "";

	//make sure the most recent messages are always shown.
	scrollToBottom("message-screen");
}

function scrollToBottom(id){
   var div = document.getElementById(id);
   div.scrollTop = div.scrollHeight - div.clientHeight;
}

function grabMessageById(id) {
	xhr.open("GET", "https://codegorilla.nl/read_write/api.php?action=read&mykey=" + key + "&id=" + id, false);
	xhr.send();
}

function postMessage(message) {
	xhr.open("POST", "https://codegorilla.nl/read_write/api.php?action=write&mykey=" + key + "&value=" + message, false);
	xhr.send();
	console.log(xhr.response);
}

function refreshChat() {
	var messageScreen = document.getElementById("message-screen");
	for (i = 0; i < correctids.length; i++) {
		if (correctids[i] >= highestId) {
			grabMessageById(correctids[i]);
			var newMessage = xhr.response;

			messageScreen.innerHTML += newMessage + "<br>";

			scrollToBottom("message-screen");
			highestId = correctids[i] + 1;
			console.log(highestId);
		}
	}
}

window.setInterval(function(){
	getAllMessageIds();
	refreshChat();
}, 1000);

function getAllMessageIds() {
	xhr.open("GET" , "https://codegorilla.nl/read_write/api.php?action=list&mykey=" + key, false);
	xhr.send();
	correctids = xhr.response;
	correctids = correctids.split(",");
	for (i = 0 ; i < correctids.length; i++) {
		correctids[i] = parseInt(correctids[i]);
	}
}