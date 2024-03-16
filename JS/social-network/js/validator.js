class Validator{
    constructor(validationSchema, formId){
        this.elements = validationSchema;
        this.errors = {};
        this.formId = formId;

        this.generateErrors();
        this.addListener();
        this.validationPassed();        
       
    }
    generateErrors(){
        for(let element in this.elements){
            
            this.errors[element] = [];
        };
    }
    addListener(){
        for(let element in this.elements){
            document.querySelector(`${this.formId} input[name="${element}"]`).addEventListener('input', this.validate.bind(this));
        }
    }
    validate(e){
   
        let elArray = this.elements;

        let input = e.target;
        let inputName = input.getAttribute('name');
        let inputValue = input.value;

        this.errors[inputName] = [];

        if(elArray[inputName].required){
            if(inputValue ===''){
                console.log(inputName+" - "+inputValue);
                this.errors[inputName].push('This field is required!');            
            }
        }
        if(elArray[inputName].email){
            if(!this.validateEmail(inputValue)){
                this.errors[inputName].push('Email is not valid!');            
            }
        }
        if(inputValue.length > elArray[inputName].maxLen || inputValue.length < elArray[inputName].minLen){
            this.errors[inputName].push(`Input length has to be between ${elArray[inputName].minLen} and ${elArray[inputName].maxLen}!`);            

        }
        if(elArray[inputName].matching){
            let el = document.querySelector(`${this.formId} input[name=${elArray[inputName].matching}]`);
            if(inputValue !== el.value){
                this.errors[inputName].push(`Password doesn't match!`);            
            }
            if(this.errors[inputName].length === 0){
                this.errors[inputName] = [];
                this.errors[elArray[inputName].matching] = [];
            }
        }
        this.populateErrors(this.errors);
    }
    populateErrors(errors){
        for(const elem of document.querySelectorAll('ul')){
            elem.remove();
        }
        for(let key of Object.keys(errors)){
            let parentElement = document.querySelector(`${this.formId} input[name=${key}]`).parentElement;
            let errorElement = document.createElement('ul');
            parentElement.appendChild(errorElement);

          
            errors[key].forEach(error => {
                
                let li = document.createElement('li');
                li.innerText = error;
                
                errorElement.appendChild(li);
            });
        }
    }
    validateEmail(email){
        let regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

        return regex.test(email);
    }   
    validationPassed() {
		for(let key of Object.keys(this.errors)) {
			if(this.errors[key].length > 0) {
				return false;
			}
		}

		return true;
	}

}