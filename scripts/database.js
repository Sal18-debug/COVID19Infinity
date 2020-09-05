//Create databases
var remoteCouch = false;
var usersDB = new PouchDB('users');

//Function to check if user exists
function getUser(email){
	return usersDB.get(email).then((response) => response);
}

//Function to add new user
function addNewUser(name, email, password){
	var newUser = {
    _id: email,
    name: name,
		password: password
  };

  return usersDB.put(newUser).then(() => getUser(email));
}