<?php
session_start();
require_once("connect.php");

$username = $_POST['username'];
$password = $_POST['password'];


if (isset($_POST['login'])) {
$query = "SELECT * FROM players WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($conn,$query);
$number_of_row = mysqli_num_rows($result);
$player = array();

if ($number_of_row == 1) {
	 while ($row = mysqli_fetch_assoc($result)) {

	 	$_SESSION['id'] = $row['id'];
		$_SESSION['username'] = $row['username'];
		$_SESSION['password'] = $row['password'];
		$_SESSION['email'] = $row['email'];

		$player[] = $row;

		header('location: playgame.php');
	 }		

} else{
	header("location: error.php");
	}

}
		header('Content-Type: application/json');
		echo json_encode(array ("player"=>$player));

?>