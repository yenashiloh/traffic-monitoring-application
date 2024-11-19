// Main event listener for vehicle type changes
document.getElementById("vehicleType").addEventListener("change", function () {
    const vehicleType = this.value;
    const plateInput = document.getElementById("plateNumber");

    // Clear the plate number field whenever vehicle type changes
    plateInput.value = "";

    // Configure validation rules based on vehicle type
    if (vehicleType === "private" || vehicleType === "commercial" || vehicleType === "hire" || vehicleType === "government") {
        plateInput.placeholder = "LLL-DDDD";  // L for letters, D for digits
        setupPrivateVehicleValidation(plateInput);
    } else if (vehicleType === "motorcycle") {
        plateInput.placeholder = "DDD-LLL or L-DDD-LL";
        setupMotorcycleValidation(plateInput);
    } else if (vehicleType === "puv") {
        plateInput.placeholder = "LLL-DDD or LLL-DDDD";
        setupPUVsValidation(plateInput);
    } else if (vehicleType === "diplomatic" || vehicleType === "electric" || vehicleType === "hybrid" || vehicleType === "special") {
        plateInput.placeholder = "LL-DDDD";
        setupSpecialVehicleValidation(plateInput);
    } else {
        plateInput.placeholder = "Enter Plate Number";
        plateInput.removeEventListener("input", validatePlateNumber);
    }
});

function setupPrivateVehicleValidation(input) {
    input.addEventListener("input", function (e) {
        let value = e.target.value.toUpperCase();
        
        // Prevent typing numbers before letters
        if (/^\d/.test(value)) {
            input.value = value.replace(/^\d+/, ''); // Remove leading numbers
            return;
        }

        value = value.replace(/[^A-Z0-9-]/g, ''); // Remove invalid characters

        let letters = '';
        let numbers = '';

        if (value.includes('-')) {
            [letters, numbers] = value.split('-');
            letters = letters.replace(/[^A-Z]/g, '');
            numbers = numbers.replace(/[^0-9]/g, '');
        } else {
            letters = value.match(/^[A-Z]+/) ? value.match(/^[A-Z]+/)[0] : '';
            numbers = value.replace(/[A-Z]/g, '').replace(/[^0-9]/g, '');
        }

        // Format the value
        if (letters && numbers) {
            input.value = letters + '-' + numbers;
        } else {
            input.value = letters + numbers;
        }

        // Strict validation
        if (input.value.length > 0) {
            if (letters.length !== 3) {
                input.setCustomValidity("Plate number must have exactly 3 letters (e.g., LLL-DDDD)");
            } else if (numbers.length !== 4) {
                input.setCustomValidity("Plate number must have exactly 4 numbers (e.g., LLL-DDDD)");
            } else {
                input.setCustomValidity("");
            }
        } else {
            input.setCustomValidity("");
        }
    });

    // Form submit validation
    input.form.addEventListener("submit", function (event) {
        const value = input.value;
        const pattern = /^[A-Z]{3}-\d{4}$/;

        if (!pattern.test(value)) {
            event.preventDefault();
            input.setCustomValidity("Please enter a valid plate number in the format LLL-DDDD");
            input.reportValidity();
        }
    });
}

function setupMotorcycleValidation(input) {
    input.addEventListener("input", function (e) {
        let value = e.target.value.toUpperCase();
        value = value.replace(/[^A-Z0-9]/g, ''); // Remove invalid characters

        let formattedValue = '';

        if (/^[A-Z]/.test(value)) {
            // Format as 1 letter - 3 digits - 2 letters (A-123-BC)
            let letters1 = value.slice(0, 1);
            let numbers = value.slice(1).replace(/[^0-9]/g, '').slice(0, 3);
            let letters2 = value.slice(1 + numbers.length).replace(/[^A-Z]/g, '').slice(0, 2);

            formattedValue = `${letters1}-${numbers}${letters2 ? '-' + letters2 : ''}`;
        } else if (/^\d/.test(value)) {
            // Format as 3 digits - 3 letters (123-ABC)
            let numbers = value.slice(0, 3);
            let letters = value.slice(3).replace(/[^A-Z]/g, '').slice(0, 3);

            formattedValue = `${numbers}-${letters}`;
        }

        // Update the input value
        input.value = formattedValue;

        // Strict validation
        const validLetterFirst = /^[A-Z]-\d{1,3}-[A-Z]{1,2}$/;
        const validNumberFirst = /^\d{3}-[A-Z]{3}$/;

        if (input.value.length > 0) {
            if (!validLetterFirst.test(input.value) && !validNumberFirst.test(input.value)) {
                input.setCustomValidity("Plate number must follow the format L-DDD-LL or DDD-LLL.");
            } else {
                input.setCustomValidity("");
            }
        } else {
            input.setCustomValidity("");
        }
    });

    // Form submit validation
    input.form.addEventListener("submit", function (event) {
        const value = input.value;
        const validPattern = /^[A-Z]-\d{3}-[A-Z]{2}$|^\d{3}-[A-Z]{3}$/;

        if (!validPattern.test(value)) {
            event.preventDefault();
            input.setCustomValidity("Please enter a valid plate number in the format L-DDD-LL or DDD-LLL.");
            input.reportValidity();
        }
    });
}

function setupPUVsValidation(input) {
    input.addEventListener("input", function (e) {
        let value = e.target.value.toUpperCase();

        // Prevent typing numbers before letters
        if (/^\d/.test(value)) {
            input.value = value.replace(/^\d+/, ''); // Remove leading numbers
            return;
        }

        value = value.replace(/[^A-Z0-9-]/g, ''); // Remove invalid characters

        let letters = '';
        let numbers = '';

        if (value.includes('-')) {
            [letters, numbers] = value.split('-');
            letters = letters.replace(/[^A-Z]/g, '');
            numbers = numbers.replace(/[^0-9]/g, '');
        } else {
            letters = value.match(/^[A-Z]+/) ? value.match(/^[A-Z]+/)[0] : '';
            numbers = value.replace(/[A-Z]/g, '').replace(/[^0-9]/g, '');
        }

        // Format the value
        if (letters && numbers) {
            input.value = letters + '-' + numbers;
        } else {
            input.value = letters + numbers;
        }

        // Strict validation
        if (input.value.length > 0) {
            if (letters.length !== 3) {
                input.setCustomValidity("Plate number must have exactly 3 letters (e.g., LLL-DDD or LLL-DDDD)");
            } else if (numbers.length < 3 || numbers.length > 4) {
                input.setCustomValidity("Plate number must have 3 or 4 numbers (e.g., LLL-DDD or LLL-DDDD)");
            } else {
                input.setCustomValidity("");
            }
        } else {
            input.setCustomValidity("");
        }
    });

    // Form submit validation
    input.form.addEventListener("submit", function (event) {
        const value = input.value;
        const pattern = /^[A-Z]{3}-\d{3,4}$/; // Match LLL-DDD or LLL-DDDD

        if (!pattern.test(value)) {
            event.preventDefault();
            input.setCustomValidity("Please enter a valid plate number in the format LLL-DDD or LLL-DDDD");
            input.reportValidity();
        }
    });
}

function setupSpecialVehicleValidation(input) {
    input.addEventListener("input", function(e) {
        let value = e.target.value.toUpperCase();
        value = value.replace(/[^A-Z0-9-]/g, '');
        
        let letters = '';
        let numbers = '';
        
        if (value.includes('-')) {
            [letters, numbers] = value.split('-');
            letters = letters.replace(/[^A-Z]/g, '');
            numbers = numbers.replace(/[^0-9]/g, '');
        } else {
            letters = value.match(/[A-Z]+/g) ? value.match(/[A-Z]+/g)[0] : '';
            numbers = value.replace(/[A-Z]/g, '').replace(/[^0-9]/g, '');
        }
        
        if (letters && numbers) {
            input.value = letters + '-' + numbers;
        } else {
            input.value = letters + numbers;
        }
        
        // Strict validation
        if (input.value.length > 0) {
            if (letters.length !== 2) {
                input.setCustomValidity("First part must have exactly 2 letters (e.g., AB-1234)");
            } else if (numbers.length !== 4) {
                input.setCustomValidity("Second part must have exactly 4 numbers (e.g., AB-1234)");
            } else {
                input.setCustomValidity("");
            }
        } else {
            input.setCustomValidity("");
        }
    });

    // Form submit validation
    input.form.addEventListener("submit", function(event) {
        const value = input.value;
        const pattern = /^[A-Z]{2}-\d{4}$/;
        
        if (!pattern.test(value)) {
            event.preventDefault();
            input.setCustomValidity("Please enter a valid plate number in the format AB-1234");
            input.reportValidity();
        }
    });
}

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
    if (isHoliday) {
        codingDay = 'EXEMPTED';
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
            codingDay = timeCheck(cityInfo.codingHours[0], cityInfo.codingHours[1]) ? 'CODING' : 'CODING';
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
    } else if (codingDay === "NOT CODING" || codingDay === "EXEMPTED") {
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

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("resultModal").style.display = "none";
});
