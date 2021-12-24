<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
  'first' => $_POST['first'],
  'second' => $_POST['second'],
  'result' => $_POST['first'] * $_POST['second'],
  'type' => 'multiplication'
]);
