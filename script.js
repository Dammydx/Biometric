// Handle user sign-up and save to local storage
function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Save user data in local storage
    const userData = {
        name,
        email,
        password
    };

    localStorage.setItem('user', JSON.stringify(userData));

    alert('Sign up successful! You will be redirected to the attendance page.');
    window.location.href = "attendance.html"; // Redirect to attendance page
}

// Handle user sign-in by validating against stored data
function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Login successful! Redirecting to attendance page.');
        window.location.href = "attendance.html"; // Redirect to attendance page
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Function to mark attendance and store in local storage
function markAttendance(event) {
    event.preventDefault();
    
    const enteredName = document.getElementById('name').value.trim().toLowerCase();
    const enteredDepartment = document.getElementById('department').value.trim();
    const status = document.getElementById('status');

    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.name.toLowerCase() === enteredName) {
        const currentTime = new Date().toLocaleString();
        const attendanceRecord = {
            name: storedUser.name,  // Use the stored name to maintain consistency
            department: enteredDepartment,
            time: currentTime
        };

        // Save to local storage
        let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];
        attendanceData.push(attendanceRecord);
        localStorage.setItem('attendanceData', JSON.stringify(attendanceData));

        status.innerHTML = `Attendance marked for ${storedUser.name} (${enteredDepartment}) at ${currentTime}`;
        status.style.color = 'green';
    } else {
        status.innerHTML = `Error: Name does not match the registered name.`;
        status.style.color = 'red';
    }
}

// Function to handle admin login
function adminLogin(event) {
    event.preventDefault();

    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === 'admin123') {
        window.location.href = "admin-dashboard.html"; // Redirect to admin dashboard
    } else {
        alert('Invalid username or password!');
    }
}
