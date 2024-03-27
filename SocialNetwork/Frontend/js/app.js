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
        matching: 'confirmPassword'
    },
    'confirmPassword':{
        required:true,
        maxLen:20,
        minLen:8,
        matching: 'password'
    },
    'email':{
        maxLen:30,
        minLen:10,
        email:true,
        required:true
    }
}
const validationSchemaLogin = {
   
    'password':{
        required:true,
        maxLen:20,
        minLen:8,
        
    },
    'email':{
        maxLen:30,
        minLen:10,
        email:true,
        required:true
    }
}
let session = new Session();
session = session.getToken();
if(session !== null){
    window.location.href = "myProfile.html";
    
}else{
}


let regModal = document.querySelector('.register-modal');
let openRegisterModalBtn = document.querySelector('.register-btn button');

let closeModalBtn = document.querySelector('.register-modal .close-modal');

openRegisterModalBtn.addEventListener('click', () =>{
    regModal.style.display = 'block';
})
closeModalBtn.addEventListener('click', ()=>{
    regModal.style.display = 'none';
})
let validator = new Validator(validationSchema, '#registrationForm');

document.querySelector('#registrationForm').addEventListener('submit', e=>{
    e.preventDefault();

    if(!validator.validationPassed()){
        alert("Data input is not correct!");
        console.log(username);
    }else{
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        let confirmPassword = document.querySelector('#confirmPassword').value;
        let email = document.querySelector('#email').value;
        let user = new User(username, password, email);
        user.confirmPassword = confirmPassword;        
        user.createUser();
    }
});

//login
let validatorLogin = new Validator(validationSchemaLogin, '#loginForm');
document.querySelector('#loginForm').addEventListener('submit', e=>{
    e.preventDefault();
    let email = document.querySelector('#loginForm input[name=email]').value;
    let password = document.querySelector('#loginForm input[name=password]').value;
    
    let user = new User(undefined, password, email);
    user.loginUser()
})

// //navbar
// document.querySelector('.navCustom .ul #sidebarMenu').addEventListener('click',e=>{
//     e.preventDefault();

//     document.querySelector('.navCustom .sidebar').style.display = 'block';
// })
// document.querySelector('.navCustom .sidebar #closeMenu').addEventListener('click', e=>{
//     e.preventDefault();

//     document.querySelector('.navCustom .sidebar').style.display = 'none';
// })

// let session = new Session();
// setTimeout(()=>{
//     console.log("prvi time");
//     console.log(session.getCookie());

// },3000);
// setTimeout(()=>{
//     console.log("drugi time");

//     session.destroyCookie();
// },7000);
