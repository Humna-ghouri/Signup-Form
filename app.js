document.getElementById('signupForm').addEventListener('input', function () {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const signupButton = document.querySelector('.btn');

    // Change button color based on validation
    if (!email.includes('@') || password.length < 6) {
        signupButton.style.backgroundColor = '#cccccc'; // Gray when invalid
    } else {
        signupButton.style.backgroundColor = '#096ad2'; // Original color when valid
    }
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Check email validation
    if (!email.includes('@')) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address with "@" symbol.',
        });
        return; // Stop further execution
    }

    // Check password validation
    if (password.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Weak Password',
            text: 'Password must be at least 6 characters long.',
        });
        return; // Stop further execution
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    if (users.some(user => user.username === username)) {
        Swal.fire({
            icon: 'error',
            title: 'User already exists',
            text: 'Please try logging in or use a different username.',
        });
        return;
    }

    // If everything is valid, save the new user and show the success alert and image
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire({
        icon: 'success',
        title: 'Sign Up Successful!',
        text: 'You can now log in.',
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        document.querySelector(".form-section").style.display = "none"; // Hide form
        document.getElementById('fullScreenImage').style.display = 'flex'; // Show full screen image
    });
});

document.getElementById('showLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.container').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.querySelector(".form-section").style.display = "none"; 
    document.getElementById('fullScreenImage').style.display = 'flex'; 
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Redirecting...',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            document.querySelector(".form-section").style.display = "none"; // Hide form
            document.getElementById('fullScreenImage').style.display = 'flex'; // Show full screen image
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Incorrect username or password.'
        });
    }
});
