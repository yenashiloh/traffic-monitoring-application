<?php
session_start(); 

    if (isset($_SESSION['vehicle_type']) && isset($_SESSION['plate_number']) && isset($_SESSION['coding_status']) && isset($_SESSION['city'])) {
        $vehicle_type = $_SESSION['vehicle_type'];
        $plate_number = $_SESSION['plate_number'];
        $coding_status = $_SESSION['coding_status'];
        $city = $_SESSION['city'];

        session_unset();
    } else {
        header("Location: index.php"); 
        exit();
    }
    ?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Output Result</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="fonts/material-design-iconic-font/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="wrapper" style="background-image: url('images/bg-motor.jpg');">
    
    <div class="inner">
        <div class="image-holder">
            <img src="images/motor.png" alt="">
        </div>
        <!-- Back Button -->
        <div>
            <a href="javascript:history.back()" style="text-decoration: none; margin-left: 14px; display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; border-radius: 5px; margin-bottom: 10px;">
                Back
            </a>
            <br>
        </div>
        <br>
        <!-- New paragraph for Result -->
        <p style="margin-left: 14px; font-size: 24px; font-weight: bold;">
            Result:
        </p>
        <p style="margin-left: 14px; font-size: 24px;">
            <?php

            if ($coding_status === "EXEMPTED") {
                echo "Motor Vehicle <strong>" . htmlspecialchars($vehicle_type) . "</strong> with Plate No. <strong>" . htmlspecialchars($plate_number) . "</strong> is EXEMPTED in coding scheme.";
            } else {
                echo "Motor Vehicle <strong>" . htmlspecialchars($vehicle_type) . "</strong> with Plate No. <strong>" . htmlspecialchars($plate_number) . "</strong> is <strong>" . htmlspecialchars($coding_status) . "</strong> in <strong>" . htmlspecialchars($city) . "</strong>.";
            }
            ?>
        </p>
    </div>
</div>

</body>
</html>
