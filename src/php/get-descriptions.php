<?php

require '../settings.php';

$pdo = new PDO('mysql:dbname=' . $dbname . ';host=' . $host, $db_username, $db_password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

$query_string = 
	'SELECT * FROM ' .
	$table_name_descriptions;

$query = $pdo->query($query_string);
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo(json_encode($result));

?>