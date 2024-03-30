<?php

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Basic validation (more can be added with Javascript)
if (empty($name) || empty($email) || empty($message)) {
    echo "Please fill in all required fields.";
    exit;
}

// Get current timestamp
$timestamp = date('Y-m-d H:i:s');

// Prepare data for JSON
$data = array(
    "name" => $name,
    "email" => $email,
    "message" => $message,
    "timestamp" => $timestamp,
);

// Encode data to JSON
$json_data = json_encode($data, JSON_PRETTY_PRINT);

// Open the JSON file (replace 'client.json' with your desired path)
$file = fopen('../assets/db/client.json', 'a'); // 'a' for append mode

// Write JSON data to the file
if (fwrite($file, $json_data) === false) {
    echo "Error saving data to JSON file.";
    exit;
}

fclose($file);

// Success message
echo "Thank you for your message! Your information has been saved.";
