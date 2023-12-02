<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = $_POST['g-recaptcha-response'];
    $secretKey = "Code ReCAPTCHa"; // Code ReCAPTCHa
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$response}");
    $verified = json_decode($verify);

    if ($verified->success) {
        $full_name = $_POST["full_name"]; //Full Name 
        $email = $_POST["email"]; //Mail 
        $mobile_number = $_POST["mobile_number"]; //Mobile Phone
        $message = $_POST["message"]; //Message

        //Email Validations

        if (strlen($full_name) > 35) {
            echo json_encode(array('success' => false, 'message' => 'Full Name must not exceed 35 characters.'));
            exit;
        }

        if (strlen($email) > 50) {
            echo json_encode(array('success' => false, 'message' => 'Email must not exceed 50 characters.'));
            exit;
        }

        if (!preg_match("/^\d{0,9}$/", $mobile_number)) {
            echo json_encode(array('success' => false, 'message' => 'Mobile Number must be up to 9 digits.'));
            exit;
        }

        if (strlen($message) > 250) {
            echo json_encode(array('success' => false, 'message' => 'Message must not exceed 250 characters.'));
            exit;
        }

        $to = "michal@michalwojciechowski.pl"; //Here you enter the email address to which emails should be sent
        $subject = "Formularz kontaktowy: {$_POST["email_subject"]}";
        $headers = "From: $email";
        $message_body = "Imię i Nazwisko: $full_name\n";
        $message_body .= "Email: $email\n";
        $message_body .= "Numer telefonu: $mobile_number\n";
        $message_body .= "Wiadomość:\n$message";

        if (mail($to, $subject, $message_body, $headers)) {
            echo json_encode(array('success' => true, 'message' => 'Message was sent!'));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Sorry, an error occurred while sending your message.'));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Please select ReCAPTCHA.'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Submitting the form is not allowed.'));
}
?>
