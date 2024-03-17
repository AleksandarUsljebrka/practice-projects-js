

class User {
  user_id = "";
  username = "";
  email = "";
  password = "";
  api_url = "http://localhost:3000/";

  constructor(username='', password='', email='') {
    this.username = username;
    this.password = password;
    this.email = email;

    
  }
  createUser() {
    let data = {
      username: this.username,
      password: this.password,
      email: this.email,
    };
    fetch(this.api_url + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        let session = new Session();
        session.user_id = data.id;
        session.startSession();
    });
  }

  loginUser(){
    fetch(this.api_url + "users")
      .then((response) => response.json())
      .then((data) => {
        
        let successfull = 0;
        
        data.forEach((user) => {
          if (
            user["email"] == this.email &&
            user["password"] == this.password
          ) {
            successfull = 1;
            let session = new Session();
            session.user_id = user.id;
            console.log(user.id)
            session.startSession();
            window.location.href = "myProfile.html";
          }
          
        });
        if(!successfull){
            alert("Invalid email or password!");
        }
      });
  }

  logout(){

  }

  getUser(user_id){
    return fetch(this.api_url + 'users')
    .then(response => response.json())
    .then(data => {
      let userReturn = '';
      data.forEach(user => {
        if (user.id == user_id) {
          userReturn = user;
        }
      });
      return userReturn;
    });
  }
}
