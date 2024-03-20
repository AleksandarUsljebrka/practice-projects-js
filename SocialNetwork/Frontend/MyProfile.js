

const validationSchema = {
    'username':{
        required: true,
        maxLen: 20,
        minLen: 3
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
          
            
        }

    }
    populateUserData();
}else{
    window.location.href = '/';
}

//edit form 
  document.querySelector('#editBtn').addEventListener('click', e=>{
    e.preventDefault();

    if(!validator.validationPassed()){
        alert("Data input is not correct!");
        console.log(username);
    }else{
        let usernm = document.querySelector('#editProfileForm #username').value;
        let pass = document.querySelector('#editProfileForm  #newPassword').value;
        let em = document.querySelector('#editProfileForm  #email').value;
        let user = new User(usernm, pass, em);
        let data={ username: usernm, password:pass, email: em }
        fetch('http://localhost:3000/users/?id=1',{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then(response=>response.json()).then(data=>{
            console.log(data);
})
      //  user.editUser();
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
