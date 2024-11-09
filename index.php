<?php
session_start(); 

$servername = "localhost";
$username = 'root';
$password = '';
$dbname = "vehicle_coding_detector";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vehicle_type = $_POST["vehicle_type"];
    $plate_number = $_POST["plate_number"];
    $day = $_POST["day"];
    $time = $_POST["time"];
    $city = $_POST["city"];

    $start_coding_time = "10:01";
    $end_coding_time = "16:59";
    $coding_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    $exempted_vehicle_types = ["Motorcycle", "Emergency Vehicle"]; 

    $formatted_time = date("H:i", strtotime($time));

    $is_exempted = false;
    foreach ($exempted_vehicle_types as $exempted_type) {
        if (stripos($vehicle_type, $exempted_type) !== false) {
            $is_exempted = true;
            break;
        }
    }

    if ($is_exempted) {
        $coding_status = "EXEMPTED";
    } elseif (in_array($day, $coding_days) && $formatted_time >= $start_coding_time && $formatted_time <= $end_coding_time) {
        $coding_status = "CODING";
    } else {
        $coding_status = "NOT CODING";
    }

    $stmt = $conn->prepare("INSERT INTO vehicle_coding (vehicle_type, plate_number, day, time, city, coding_status)
                             VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $vehicle_type, $plate_number, $day, $formatted_time, $city, $coding_status);

    if ($stmt->execute() === TRUE) {
        // Store result in session variables
        $_SESSION['vehicle_type'] = $vehicle_type;
        $_SESSION['plate_number'] = $plate_number;
        $_SESSION['coding_status'] = $coding_status;
        $_SESSION['city'] = $city;

        header("Location: output.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Traffic Monitoring Application</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="fonts/material-design-iconic-font/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" href="css/style.css">
    <style>
        .form-wrapper {
            width: 100%;
        }
        .time-form-warapper {
            display: flex;
            align-items: center;
            width: 100%;
        }
        .time-wrapper {
            display: flex;
            align-items: center;
            width: 100%;
        }
        .time-wrapper .form-control {
            width: 100%;
        }
        .time-wrapper label {
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <div class="wrapper" style="background-image: url('images/bg-motor.jpg');">
        <div class="inner">
            <div class="image-holder">
                <img src="images/motor.png" alt="">
            </div>
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <h3>Traffic Monitoring Application</h3>
                <div class="form-wrapper">
                    <input type="text" placeholder="Enter Vehicle Type" class="form-control" id="vehicle_type" name="vehicle_type" required>
                </div>
                <div class="form-wrapper">
                    <input type="text" placeholder="Enter Plate Number" class="form-control" id="plate_number" name="plate_number" required>
                </div>
                <div class="form-wrapper">
                    <select class="form-control" id="day" name="day" required>
                        <option value="" disabled selected>Select a day</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select>
                </div>
                <div class="form-wrapper time-form-warapper">
                    <div class="time-wrapper">
                        <label for="time">Time</label>
                        <input type="time" class="form-control" id="time" name="time" required>
                    </div>
                </div>
                <div class="form-wrapper">
                    <input type="text" class="form-control" id="city" placeholder="Enter City" name="city" required>
                </div>
                <button type="submit">Submit <i class="zmdi zmdi-arrow-right"></i></button>
            </form>
        </div>
    </div>
</body>
</html>
