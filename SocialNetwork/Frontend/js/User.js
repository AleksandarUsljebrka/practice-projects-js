

class User {
  user_id = "";
  username = "";
  email = "";
  password = "";
  api_url = "https://localhost:7090/";

  constructor(username='', password='', email='') {
    this.username = username;
    this.password = password;
    this.email = email;
    this.confirmPassword = '';
    
  }
  createUser() {
    let data = {
      username: this.username,
      password: this.password,
      email: this.email,
      confirmPassword: this.confirmPassword
    };
    fetch(this.api_url + "User/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((data) => {
        if(flag === true && token !==null){

          console.log(data);
          localStorage.setItem('token', data.token);
        }else{
          alert("Error ocured!");
        }
        // let session = new Session();
        // session.user_id = data.id;
        // session.startSession();
    });
  }

  loginUser(){
    let data = {
      password: this.password,
      email: this.email,
    };
    fetch(this.api_url + "User/login",
    {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.token !== null && data.flag !== false){

          localStorage.setItem('token', data.token);
          window.location.href = "myProfile.html";       
        }else
        alert("Wrong password or email!");
        });
      
  }

  // editUser(){
  //   let session = new Session();
  //   session_id = session.getCookie();

  //   let data ={
  //       username: this.username,
  //       password: this.password,
  //       email: this.email
  //   }

  //   // fetch(`${this.api_url}users/?id=${session_id}`,{
  //   //     method: 'PUT',
  //   //     headers:{"Conten-Type":"application/json"},
  //   //     body: JSON.stringify(data)
  //   // })
  //   // .then(response=>response.json())
  //   // .then(data=>{
  //   //     window.location.href ="myProfile.html";
  //   // })
  // }

  async getUser(token){
    // fetch(`${this.api_url}User/user`,{
    //   method:'GET',
    //   headers:{
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
    // .then(response=>response.json())
    // .then(data=>{
    //   return data;
    // })
    let response = await fetch(`${this.api_url}User/user`,{
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
    let data = await response.json();
    // let user = '';
    // data.forEach(u =>{
    //     if(u.id == user_id){
    //         user = u;
            
    //     }
    // })
    return data;
  }
}
