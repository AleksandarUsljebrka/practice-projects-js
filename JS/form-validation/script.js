const config = {
    'firstName':{
        required: true,
        maxLen: 20,
        minLen: 3
    },
    'lastName':{
        required: true,
        maxLen:20,
        minLen:3
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
    'phoneNumber':{
        maxLen:15,
        minLen:9
    },
    'email':{
        maxLen:30,
        minLen:10,
        email:true,
        required:true
    }
}

let validator = new Validator(config);


