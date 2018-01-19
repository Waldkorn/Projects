var username = "";
var key = "ewout"
var request = new XMLHttpRequest();
var highestId = 2000;

var messageScreen = document.getElementById("message-screen");

function login() {
	username = getUserName();
	key = getKey();

	if (username != "") {

		hideLoginScreen();
		showChatroom();

		window.setInterval(function(){
			getAllMessageIds();
			refreshChat();
		}, 1000);

	} else {
		alert("please submit a username")
	}
}

function sendMessage() {

	//finds the the message that has to be displayed
	var messageString = "<b>" + username + ": </b>" + document.getElementById("chat-text-area").value;

	//only submit a message if the message isn't nothing
	if (messageString != "") {
		// sends message to server
		postMessage(messageString);
	}

	//reset text input field
	document.getElementById("chat-text-area").value = "";

	//make sure the most recent messages are always shown.
	scrollToBottom("message-screen");
}

function refreshChat() {
	for (i = 0; i < correctids.length; i++) {
		if (correctids[i] >= highestId) {
			var messageId = correctids[i];
			var newMessage = JSON.parse(grabMessageById(messageId)).value;

			messageScreen.innerHTML += newMessage + "<br>";

			scrollToBottom("message-screen");
			highestId = messageId + 1;
		}
	}
}

function getAllMessageIds() {
	//vraagt de ids aan die bij de chatroom horen
	request.open("GET" , "https://codegorilla.nl/read_write/api.php?action=list&mykey=" + key, false);
	request.send();
	correctids = request.response;

	//correctids word van stringformaat overgezet naar array formaat met integers
	correctids = correctids.split(",");
	for (i = 0 ; i < correctids.length; i++) {
		correctids[i] = parseInt(correctids[i]);
	}
}

function scrollToBottom(id){
   var div = document.getElementById(id);
   div.scrollTop = div.scrollHeight - div.clientHeight;
}

function grabMessageById(id) {
	request.open("GET", "https://codegorilla.nl/read_write/api.php?action=read&format=json&mykey=" + key + "&id=" + id, false);
	request.send();
	return request.response;
}

function postMessage(message) {
	request.open("POST", "https://codegorilla.nl/read_write/api.php?action=write&mykey=" + key + "&value=" + message, false);
	request.send();
}

function getUserName() {
	return document.getElementById("username-input").value;
}

function getKey() {
	return document.getElementById("chatroom-input").value;
}

function hideLoginScreen() {
	document.getElementById("login-screen").style.display = "none";	
}

function showChatroom() {
	document.getElementById("chatroom").style.display = "block";
}