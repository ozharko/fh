<?php
/* header('Content-Type: application/json; charset=utf-8'); */

$data = array(
    'get' => $_GET,
    'post' => $_POST,
    'files' => $_FILES,
    'error' => false,
    'status' => 'ok'
);

echo json_encode($data);