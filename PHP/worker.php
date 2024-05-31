<?php
// 無限ループでキューを監視
while (true) {
    $tasks = file('queue.txt', FILE_IGNORE_NEW_LINES);
    if ($tasks) {
        // 最初のタスクを取り出し
        $task = unserialize(array_shift($tasks));
        file_put_contents('queue.txt', implode(PHP_EOL, $tasks));

        // メールを送信
        $to = "your-email@example.com";
        $subject = "お問い合わせフォームより";
        $body = "会社名: {$task['company']}\n氏名: {$task['name']}\n電話番号: {$task['phone']}\nメールアドレス: {$task['email']}\n\nお問い合わせ内容:\n{$task['message']}";
        $headers = "From: {$task['email']}";

        mail($to, $subject, $body, $headers);
    }

    // 少し待機
    sleep(5);
}
?>
