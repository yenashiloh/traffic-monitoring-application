<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vehicle Registration</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="js/validation.js" defer></script>
</head>

<body>
    <div class="card">
        <!-- Title Section -->
        <div class="card-title">
            <h1>Check Vehicle UVVRP Coding</h1>
            <p>Enter the vehicle plate number to determine if it is subject to the UVVRP coding scheme on a specific day based on the last digit of the plate number.</p>
        </div>

        <!-- Form Section -->
        <form action="submit.php" method="POST">
            <!-- Vehicle Type Dropdown -->
            <label for="vehicleType">Vehicle Type:</label>
            <select id="vehicleType" name="vehicleType" required>
                <option value="">Select Vehicle Type</option>
                <option value="private">Private Vehicle</option>
                <option value="motorcycle">Motorcycle Vehicle</option>
                <option value="government">Government Vehicle</option>
                <option value="puv">Public Utility Vehicle (PUV)</option>
                <option value="commercial">Commercial Vehicle</option>
                <option value="hire">Motor Vehicles for Hire (e.g., Transport Network Services)</option>
                <option value="diplomatic">Diplomatic Vehicle</option>
                <option value="electric">Electric Vehicle</option>
                <option value="hybrid">Hybrid Vehicle</option>
                <option value="special">Special Vehicles (e.g., Emergency Vehicles, Fire Trucks)</option>
            </select>

            <!-- Plate Number -->
            <label for="plateNumber">Plate Number:</label>
            <div class="tooltip">
                <input type="text" id="plateNumber" name="plateNumber" placeholder="ABC 1234" maxlength="7" required>
                <span class="tooltiptext">Note: Plate number must be entered in capital letters.</span>
            </div>

            <!-- Date -->
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required onchange="setDay()">

            <!-- Day (Disabled) -->
            <label for="day">Day:</label>
            <input type="text" id="day" name="day" disabled>

            <label for="time">Time:</label>
            <input type="time" id="time" name="time" required>

            <!-- City Dropdown -->
            <label for="city">City:</label>
            <select id="city" name="city" required>
                <option value="">Select City</option>
                <option value="Caloocan">Caloocan</option>
                <option value="Las Piñas">Las Piñas</option>
                <option value="Malabon">Malabon</option>
                <option value="Manila">Manila</option>
                <option value="Marikina">Marikina</option>
                <option value="Mandaluyong">Mandaluyong</option>
                <option value="Makati">Makati</option>
                <option value="Muntinlupa">Muntinlupa</option>
                <option value="Navotas">Navotas</option>
                <option value="Pasay">Pasay</option>
                <option value="Paranaque">Paranaque</option>
                <option value="Pasig">Pasig</option>
                <option value="Pateros">Pateros</option>
                <option value="Quezon City">Quezon City</option>
                <option value="San Juan">San Juan</option>
                <option value="Taguig">Taguig</option>
                <option value="Valenzuela">Valenzuela</option>
            </select>

            <button type="submit">Submit</button>
        </form>
    </div>

    <div id="resultModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div id="modalMessage"></div>

            <div class="road">
                <u id="codingDayIndicator"></u>
                <div class="taxi">
                    <div class="light_beam"></div>
                    <span>
                        <b></b>
                        <i></i>
                    </span>
                </div>
            </div>
        </div>
    </div>

</body>

</html>