<?php 
require 'connect.php';
require 'session.php';
confirm_logged_in();



$query = "SELECT * FROM playgame";
$result = mysqli_query($conn,$query);
$number_of_rows = mysqli_num_rows($result);
$temp_array = array();

if ($number_of_rows > 0) {

		while ($row = mysqli_fetch_assoc($result)) 
		{

	$temp_array[] = $row;
			}
}

		header('Content-Type: application/json');
	echo json_encode(array ("playgame"=>$temp_array));

// header('Content-Disposition: attachment; filename="file.json"');



 ?>