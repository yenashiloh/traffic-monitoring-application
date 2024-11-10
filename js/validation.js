document.getElementById("vehicleType").addEventListener("change", function () {
    const vehicleType = this.value;
    const plateInput = document.getElementById("plateNumber");

    // Clear the plate number field whenever vehicle type changes
    plateInput.value = ""; // Clear the input field

    // Adjust pattern, range, and placeholder based on vehicle type
    if (vehicleType === "private" || vehicleType === "commercial" || vehicleType === "hire" || vehicleType === "government") {
        plateInput.setAttribute("pattern", "[A-Z]{3}[0-9]{4}|[0-9]{4}[A-Z]{3}");
        plateInput.setAttribute("minlength", "7"); // e.g., PBC1234 or 1234PBC
        plateInput.setAttribute("maxlength", "7");
        plateInput.placeholder = "PBC1234 / 1234PBC";
    } else if (vehicleType === "motorcycle") {
        // Updated pattern for motorcycles
        plateInput.setAttribute("pattern", "[A-Z]{2}[0-9]{5}");
        plateInput.setAttribute("minlength", "7"); // e.g., AB12345
        plateInput.setAttribute("maxlength", "7");
        plateInput.placeholder = "AB12345";
    } else if (vehicleType === "puv") {
        // Updated PUV plate format
        plateInput.setAttribute("pattern", "[0-9]{3}[A-Z]{3}|[A-Z]{1}[0-9]{3}[A-Z]{2}");
        plateInput.setAttribute("minlength", "6"); // e.g., 123PBC or P123BC
        plateInput.setAttribute("maxlength", "6");
        plateInput.placeholder = "123PBC / P123BC";
    } else if (vehicleType === "diplomatic" || vehicleType === "electric" || vehicleType === "hybrid" || vehicleType === "special") {
        plateInput.setAttribute("pattern", "[A-Z]{2}[0-9]{4}");
        plateInput.setAttribute("minlength", "6"); // e.g., AB1234
        plateInput.setAttribute("maxlength", "6");
        plateInput.placeholder = "AB1234";
    } else {
        plateInput.setAttribute("pattern", "");
        plateInput.setAttribute("minlength", "");
        plateInput.setAttribute("maxlength", "");
        plateInput.placeholder = "Enter Plate Number";
    }
});

function setDay() {
    const date = document.getElementById("date").value;
    if (date) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const selectedDate = new Date(date);
        document.getElementById("day").value = days[selectedDate.getDay()];
    } else {
        document.getElementById("day").value = ""; // Clear if no date is selected
    }
}

document.getElementById("time").addEventListener("input", function () {
    const timeInput = this.value;
    const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]( ?[APMapm]{2})?$/;

    if (!timePattern.test(timeInput)) {
        this.setCustomValidity("Enter valid time, e.g., 13:30 or 1:30 PM");
    } else {
        this.setCustomValidity("");
    }
});

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const plateNumber = document.getElementById("plateNumber").value.trim().toUpperCase();
    const date = new Date(document.getElementById("date").value);
    const city = document.getElementById("city").value;
    const vehicleType = document.getElementById("vehicleType").value;
    const time = new Date(`1970-01-01T${document.getElementById("time").value}:00`);
    const day = date.getDay();

    const digitsOnly = plateNumber.replace(/\D/g, '');

    const lastDigit = digitsOnly.slice(-1);

    // Determine the coding day based on the last digit
    let codingDay = 'NOT CODING';

    if (['1', '2'].includes(lastDigit) && day == 1) {
        codingDay = 'CODING';
    } else if (['3', '4'].includes(lastDigit) && day == 2) {
        codingDay = 'CODING';
    } else if (['5', '6'].includes(lastDigit) && day == 3) {
        codingDay = 'CODING';
    } else if (['7', '8'].includes(lastDigit) && day == 4) {
        codingDay = 'CODING';
    } else if (['9', '0'].includes(lastDigit) && day == 5) {
        codingDay = 'CODING';
    }

    // Check if the selected date is a holiday (no coding on holidays)
    const holidays = [
        new Date('2024-03-29'), new Date('2024-04-09'), new Date('2024-04-10'),
        new Date('2024-05-01'), new Date('2024-06-12'),
        new Date('2024-11-30'), new Date('2024-12-25'),
    ];

    // Check if selected date is holiday
    const isHoliday = holidays.some(holiday => holiday.toDateString() === date.toDateString());
    if (isHoliday){
        codingDay = 'NOT CODING';
    }

    const codingCities = {
        'Muntinlupa': {
            codingHours: ['07:00 AM', '10:00 AM', '05:00 PM', '08:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Caloocan': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Las Pinas': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Makati': {
            codingHours: ['07:00 AM', '7:00 PM'],
        },
        'Mandaluyong': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Manila': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Paranaque': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Pasay': {
            codingHours: ['07:00 AM', '10:00 AM', '4:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Pasig': {
            codingHours: ['07:00 AM', '10:00 AM', '4:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Quezon City': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'San Juan': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Taguig': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Valenzuela': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Malabon': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Marikina': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Navotas': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        },
        'Pateros': {
            codingHours: ['07:00 AM', '10:00 AM', '5:00 PM', '8:00 PM'],
            windowHours: ['10:01 AM', '4:59 PM', '8:01 PM', '06:59 AM']
        }
    };

    function convertTo24Hour(time12hr) {
        const [time, modifier] = time12hr.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);

        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0; // Midnight case
        }

        return new Date(`1970-01-01T${hours.toString().padStart(2, '0')}:${minutes}:00`);
    }


    const cityInfo = codingCities[city];

    if (cityInfo && codingDay == 'CODING') {
        const timeCheck = (start, end) => {
            const startTime = convertTo24Hour(start);
            const endTime = convertTo24Hour(end);
            return startTime <= time && time <= endTime;
        };

        if (city === 'Makati') {
            codingDay = timeCheck(cityInfo.codingHours[0], cityInfo.codingHours[1]) ? 'CODING' : 'NOT CODING';
        } else {
            const firstWindowCheck = timeCheck(cityInfo.windowHours[0], cityInfo.windowHours[1]);
            const secondWindowCheck = timeCheck(cityInfo.windowHours[2], cityInfo.windowHours[3]);

            // Handle the 8:01 PM to 6:59 AM time range separately
            const lateNightCheck = (time >= convertTo24Hour(cityInfo.windowHours[2]) || time <= convertTo24Hour(cityInfo.windowHours[3]));

            codingDay = (firstWindowCheck || secondWindowCheck || lateNightCheck) ? 'NOT CODING' : 'CODING';
        }
    }

    // else if (isHoliday) {
    //     codingDay = 'NOT CODING';
    // }

    // Get the <u> element
    let uElement = document.getElementById("codingDayIndicator");

    // Check if codingDay is "CODING" and show or hide the <u> element accordingly
    if (codingDay === "CODING") {
        uElement.style.display = "block"; // Show the <u> element
    } else if (codingDay === "NOT CODING") {
        uElement.style.display = "none"; // Hide the <u> element
    } else {
        Element.style.display = "block";
    }

    // Prepare the message for the modal
    const modalMessage = `${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)} with plate number of ${plateNumber} is <b>${codingDay}</b> in ${city}.`;

    // Display the modal with the result
    document.getElementById("modalMessage").innerHTML = modalMessage;
    const modal = document.getElementById("resultModal");
    modal.style.display = "block";

    // Close modal functionality
    const closeModal = document.querySelector(".close");
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal if the user clicks outside of it
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// Close the modal when the user clicks on <span> (x)
document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("resultModal").style.display = "none";
});
