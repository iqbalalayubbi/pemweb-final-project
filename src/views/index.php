<?php
include '../components/cards.php';
include '../components/icons.php';
?>

<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../output.css" rel="stylesheet">
    <title>Easy Task</title>
    <!-- Include Typed.js Library -->
    <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
</head>

<body class="px-8">
    <!-- landing page -->
    <div class="h-screen">
        <?php include '../components/navbar.php'; ?>
        <div class="mt-24 flex flex-col items-center gap-3 relative h-3/5">
            <h1 class="text-5xl font-extrabold text-center leading-snug">Make Your Task Easier <br>With <span class="text-purple-600 px-2" id="typed-text"></span></h1>
            <p class="text-center text-lg">manage your task <br> that can be easy in one application</p>
            <a href="../views/register.php" class="mt-5">
                <button class="btn-primary transform transition duration-500 hover:scale-110 hover:bg-purple-700">Manage Task Now</button>
            </a>
            <img src="../assets/ilustration.svg" alt="" class="absolute left-0 bottom-0 transform transition duration-500 hover:scale-105">
            <img src="../assets/ilustration-1.svg" alt="" class="absolute right-0 top-0 transform transition duration-500 hover:scale-105">
        </div>
    </div>
    <!-- feature -->
    <div class="mt-32 h-screen">
        <h1 class="text-title">Many Features</h1>
        <p class="text-description">Make your productive with many flexibility</p>
        <div class="flex justify-center flex-wrap gap-10 mt-10 h-full">
            <!-- cards -->
            <?= card("Tracking Task", "Mark your task finish or not for tracking the task", $task) ?>
            <?= card("Set Deadline", "Give your task with the timeline so you can track anytime", $time) ?>
            <?= card("Text Block", "Easy to make custom note using note block", $list) ?>
        </div>
    </div>
    <!-- how to use -->
    <div class="-mt-20 h-screen">
        <h1 class="text-title">How To Use</h1>
        <p class="text-description">from this you can start and manage project</p>
        <div class="flex justify-center flex-wrap gap-10 mt-20">
            <?= cardTutor("Add New Task", "../assets/tutor-1.svg", "1") ?>
            <?= cardTutor("Determine Deadline", "../assets/tutor-2.svg", "2") ?>
            <?= cardTutor("Save Task and Enjoy", "../assets/tutor-3.svg", "3") ?>
        </div>
    </div>
    <footer class="mb-5">
        <?php include '../components/navbar.php'; ?>
    </footer>

    <script>
        // Initialize Typed.js
        var typed = new Typed('#typed-text', {
            strings: ["Easy Task"],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true
        });
    </script>
</body>

</html>
