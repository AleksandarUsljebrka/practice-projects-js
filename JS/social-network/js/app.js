let user = new User();
const validationSchema = {
    'username':{
        required: true,
        maxLen: 20,
        minLen: 3
    },
    // 'lastName':{
    //     required: true,
    //     maxLen:20,
    //     minLen:3
    // },
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
    // 'phoneNumber':{
    //     maxLen:15,
    //     minLen:9
    // },
    'email':{
        maxLen:30,
        minLen:10,
        email:true,
        required:true
    }
}

let regModal = document.querySelector('.register-modal');
let openRegisterModalBtn = document.querySelector('.register-btn button');

let closeModalBtn = document.querySelector('.register-modal .close-modal');
console.log(closeModalBtn)

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
    }else{
        alert("OK")
    }
})

user.fetchData();