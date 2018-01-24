
<?PHP

	header("Content-Type:application/json");

	$verb = $_SERVER['REQUEST_METHOD'];
	$my_file = 'file.txt';
	$messages = openMessage($my_file);
	//var_dump($messages);

	if ($verb == "GET") {
		if (isset($_GET['lastid'])) {
			http_response_code(200);
			echo response(openMessage($my_file));
		}
	} elseif ($verb == "PUT") {
		writeMessage($my_file, $messages);
		http_response_code(200);
	} else {
		http_response_code(400);
	}

	function openMessage($file) {
		$handle = fopen($file, 'r');
		return fread($handle,filesize($file));
	}

	function writeMessage($file, $message) {
		$message = json_encode($message);
		$handle = fopen($file, 'w');
		fwrite($handle, $message);
	}

	function response($message) {
		header("HTTP/1.1 ");
		
		$response['message'] = $message;
		
		$json_response = json_encode($response);
		echo $json_response;
	}

/*
	if($verb == "GET") {
		if(isset($_GET['action']) and isset($_GET['mykey'])) {
			$name = $_GET['mykey'];
			response($name);
		} else {
			echo "error: please enter required parameters";
		}
	} elseif ($verb == "PUT") {
		$handle = fopen($my_file, 'w');
		$data = 'This is the data as well';
		fwrite($handle, $data);
		$handle = fopen($my_file, 'r');
		response(fread($handle,filesize($my_file)));
	} else {
		echo "error: verb unknown";
	}

	function response($name) {
		header("HTTP/1.1 ");
		
		$Response = $name;
		
		$json_response = $Response;
		echo $json_response;
	}
*/
?>