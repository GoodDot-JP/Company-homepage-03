<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // フォームからのデータを取得
    $company = $_POST['company'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // タスクをキューに追加
    $task = [
        'company' => $company,
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'message' => $message
    ];
    file_put_contents('queue.txt', serialize($task) . PHP_EOL, FILE_APPEND);

    echo "お問い合わせ内容が送信されました。";
}
?>

