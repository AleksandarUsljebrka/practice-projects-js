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

session_id = session.getCookie();

if(session_id !==""){

    document.querySelector('.ul-no-log').style.display='none';
    document.querySelector('.ul').style.display='flex';

    //filling inputs of MyProfile with data of user 
    async function populateUserData(){
        let user = new User();
        data = await user.getUser(session_id);
        console.log(data)
        if (user) {
            document.querySelector('#editProfileForm #username').value = data.username;
            document.querySelector('#editProfileForm #email').value = data.email;
            document.querySelector('#editProfileForm #password').value = data.password;
            
        }

    }
    populateUserData();
}else{
    window.location.href = '/';
}

//validation of edit form 
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

//navbar
document.querySelector('.navCustom .ul #sidebarMenu').addEventListener('click',e=>{
    e.preventDefault();

    document.querySelector('.navCustom .sidebar').style.display = 'block';
})
document.querySelector('.navCustom .sidebar #closeMenu').addEventListener('click', e=>{
    e.preventDefault();

    document.querySelector('.navCustom .sidebar').style.display = 'none';
})
  //logout 
  document.querySelector('#logout').addEventListener('click',e=>{
    e.preventDefault();
    let res = confirm("Are you sure you want to logout?");
    
    if(res){
        let ses = session.destroyCookie();
        console.log("Logout"+ses);
        window.location.href="/";

    }else{
        console.log("Necu logout");
    }
  })
  document.querySelector('#logoutSide').addEventListener('click',e=>{
    e.preventDefault();
    let res = confirm("Are you sure you want to logout?");
    
    if(res){
        session.destroyCookie();
        window.location.href="/";
        console.log("Logout");
    }else{
        console.log("Necu logout");
    }
  })
