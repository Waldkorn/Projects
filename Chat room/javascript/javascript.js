var username = "";
var key = "ewout"
var xhr = new XMLHttpRequest();

function login() {
	username = document.getElementById("username-input").value

	document.getElementById("login-screen").style.display = "none";
	document.getElementById("chatroom").style.display = "block";
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

		messageScreen.innerHTML += newMessage + "<br>";
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
	xhr.open("POST", "https://codegorilla.nl/read_write/api.php?action=write&mykey=ewout&value=" + message, false);
	xhr.send();
}