window.onload=function(){
	var currentUser = JSON.parse(sessionStorage.getItem("AppCurrentUser"));
	var divCurrentUser = document.getElementById('divCurrentUser');
	var lblCurrentUserName = document.getElementById('lblCurrentUserName');
	var menuLogin = document.getElementById('menuLogin');
	var menuRegister = document.getElementById('menuRegister');
	var menuLogout = document.getElementById('menuLogout');

	if (divCurrentUser !== null){
		if (currentUser === null){
			divCurrentUser.style.display = "none";
		} else {
			divCurrentUser.style.display = "block";
			lblCurrentUserName.innerHTML = currentUser.name;
		}
	}

	if (currentUser === null){
		menuLogin.style.display = 'contents';	
		menuRegister.style.display = 'contents';	
		menuLogout.style.display = 'none';	
	} else {
		menuLogin.style.display = 'none';	
		menuRegister.style.display = 'none';	
		menuLogout.style.display = 'contents';	
	}
}

function logout(){
	sessionStorage.setItem("AppCurrentUser", null);
	alert('SUCCESS: You have been logged out and will be returned to the home page');
	window.location = "index.html";
}

function registerNewUser(){
	var txtName = document.getElementById('name');
	var txtEmail = document.getElementById('mail');
	var txtPassword = document.getElementById('password');
	var txtConfirmPassword = document.getElementById('confirm');

	//Make sure that all the information is filled in, otherwise show a message
	if (txtName.value === "" || txtEmail.value === "" || txtPassword.value === "" || txtConfirmPassword.value === ""){
		return alert('ERROR: All fields need to be filled in to register a new user.');
	}

	//Make sure that the passwords match
	if (txtPassword.value !== txtConfirmPassword.value){
		return alert('ERROR: Password and confirm password needs to match.');
	}

	//Make sure a user with entered username or email doesn't already exist
	getUser(txtEmail.value).then(function(userResult) {
  	return alert('ERROR: A user with this username or email already exists.');
	}).catch(function(err){
		addNewUser(txtName.value, txtEmail.value, txtPassword.value).then(function(userResult){
			alert('SUCCESS: You have successfully registered as a new user, you will now be logged in.');
			loginUser(userResult);	
		});	
	});
}

function loginUser(user){
	sessionStorage.setItem("AppCurrentUser", JSON.stringify(user));
	window.location = "index.html";
}

function userSignIn(){
	var txtEmail = document.getElementById('txtEmail');
	var txtPassword = document.getElementById('txtPassword');

	if (txtEmail.value === "" || txtPassword.value === ""){
		return alert('ERROR: All fields need to be filled in to sign in');
	}

	getUser(txtEmail.value).then(function(userResult) {
		if (userResult.password !== txtPassword.value){
			alert('ERROR: Incorrect password');
		} else {
			alert('SUCCESS: You are now successfully logged in.');
			loginUser(userResult);
		}
	}).catch(function(err){
		alert('ERROR: User does not exist');
	});
}