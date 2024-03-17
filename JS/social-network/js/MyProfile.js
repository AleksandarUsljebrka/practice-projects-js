
const validationSchema = {
    'username':{
        required: true,
        maxLen: 20,
        minLen: 3
    },
    'password':{
        required:true,
        maxLen:20,
        minLen:8,
       
    },
    'newPassword':{
        required:true,
        maxLen:20,
        minLen:8,
        matching: 'confirmPassword'
    },
    'confirmPassword':{
        required:true,
        maxLen:20,
        minLen:8,
        matching: 'newPassword'
    },
    'email':{
        maxLen:30,
        minLen:10,
        email:true,
        required:true
    }
}
let session = new Session();
let validator = new Validator(validationSchema,'#editProfileForm');

session = session.getCookie();
let userDataPromise;

if(session !==""){
    let user = new User();
    userDataPromise = user.getUser(session);
   
}else{
    window.location.href = '/';
}
userDataPromise.then(userData => {
    if (userData && Object.keys(userData).length !== 0) {
      document.querySelector('#editProfileForm #username').value = userData.username;
      document.querySelector('#editProfileForm #email').value = userData.email;
      document.querySelector('#editProfileForm #password').value = userData.password;
      
    }
  });

  document.querySelector('#editBtn').addEventListener('submit', e=>{
    e.preventDefault();

    if(!validator.validationPassed()){
        alert("Data input is not correct!");
        console.log(username);
    }else{
        let username = document.querySelector('#editProfileForm #username').value;
        let password = document.querySelector('#editProfileForm  #password').value;
        let email = document.querySelector('#editProfileForm  #email').value;
        let user = new User(username, password, email);
        
        user.createUser();
    }
  })