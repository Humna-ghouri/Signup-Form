// // document.getElementsByClassName("container").addEventlistener("click",function(){
// //     var name=document.getElementById("name")
// //     var email = document.getElementById("email")
// // })
//   // Add event listener to the form's submit event
//   document.getElementById('registrationForm').addEventListener('submit', function(event) {
//     // Prevent the form from submitting to a server
//     event.preventDefault();
    
//     // Get form data
//     const fullname = document.getElementById('fullname').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const phone = document.getElementById('phone').value;
//     const dob = document.getElementById('dob').value;

//     // Create an object to store all data
//     const userData = {
//         fullname: fullname,
//         email: email,
//         password: password,
//         phone: phone,
//         dob: dob
//     };

//     // Save the object to localStorage
//     localStorage.setItem('userData', JSON.stringify(userData));

//     // Notify the user that the data was saved
//     alert('User data saved to local storage!');

//     // Optionally, clear the form after submission
//     document.getElementById('registrationForm').reset();
// });












 document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('fullScreenImage').style.display = 'flex';
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(user => user.username === username)) {
      Swal.fire({
          icon: 'error',
          title: 'User already exists',
          text: 'Please try logging in or use a different username.',
      });
      return;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  Swal.fire({
      icon: 'success',
      title: 'Sign Up Successful!',
      text: 'You can now log in.',
      timer: 2000,
      showConfirmButton: false
  }).then(() => {
      document.getElementById('signupForm').reset();
  });
});

document.getElementById('showLogin').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.container').style.display = 'none';
  document.getElementById('loginContainer').style.display = 'block';
});
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;


  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

  if (user) {
      console.log('Login successful for:', loginUsername);

      Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting...',
          timer: 2000,
          showConfirmButton: false
      }).then(() => {
          window.location.href = 'https://w3layouts.com/wp-content/uploads/2020/08/Music-Beat-Website-Template.jpg'; 
      });
  } else {
      console.log('Login failed. User not found or password incorrect.');

      Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Incorrect username or password.'
      });
  }
});