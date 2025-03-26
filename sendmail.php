<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "jabednar06@gmail.com";
    $subject = "Zpráva z portfolia";
    $message = "Jméno: " . $_POST['name'] . "\n" .
               "Email: " . $_POST['email'] . "\n" .
               "Zpráva:\n" . $_POST['message'];
    $headers = "From: noreply@tvoje-domena.cz";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
