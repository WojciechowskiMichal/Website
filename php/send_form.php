<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = $_POST['g-recaptcha-response'];
    $secretKey = "6LcZNB4pAAAAAOJQFsDWmVt_9DN6XlaR2ORr3CXM";
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$response}");
    $verified = json_decode($verify);

    if ($verified->success) {
        // Pobierz dane z formularza
        $full_name = $_POST["full_name"];
        $email = $_POST["email"];
        $mobile_number = $_POST["mobile_number"];
        $email_subject = $_POST["email_subject"];
        $message = $_POST["message"];

        // Utwórz treść emaila
        $to = "michal@michalwojciechowski.pl"; // Zastąp adresem email odbiorcy
        $subject = "Formularz kontaktowy: $email_subject";
        $headers = "From: $email";
        $message_body = "Imię i nazwisko: $full_name\n";
        $message_body .= "Email: $email\n";
        $message_body .= "Numer telefonu: $mobile_number\n";
        $message_body .= "Wiadomość:\n$message";

        // Wyślij email
        if (mail($to, $subject, $message_body, $headers)) {
            $response = array('success' => true, 'message' => 'Wiadomość została wysłana!');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Przepraszamy, wystąpił błąd podczas wysyłania wiadomości.');
            echo json_encode($response);
        }
    } else {
        // ReCAPTCHA nie została zaznaczona lub jest nieprawidłowa
        $response = array('success' => false, 'message' => 'Proszę zaznaczyć ReCAPTCHA.');
        echo json_encode($response);
    }
} else {
    // Jeśli formularz nie został wysłany, przekieruj lub obsłuż w odpowiedni sposób
    $response = array('success' => false, 'message' => 'Wysyłanie formularza nie jest dozwolone.');
    echo json_encode($response);
}
?>
