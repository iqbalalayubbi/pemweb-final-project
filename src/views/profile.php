<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/profile.css">
    <title>Document</title>
</head>

<body>
    <div>
        <p class="username"><?php echo $_SESSION["username"] ?> </p>
        <p class="email"> rezafahlevi@gmail.com </p>
        <p class="gatau"> gatau ini apa </p>
    </div>
    <button class="save">save</button>
    <button class="round-button"></button>
</body>

</html>