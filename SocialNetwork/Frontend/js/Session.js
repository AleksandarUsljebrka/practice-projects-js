class Session{
    user_id = "";


    getToken(){
        return localStorage.getItem('token');
    }
    removeToken(){
        localStorage.removeItem('token');    
    }
    decodeJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonData = JSON.parse(atob(base64));
        return jsonData;
    }
    startSession(){
        let date = new Date();
        date.setTime(date.getTime() + (10*60*1000));
        console.log("u sesiji: "+this.user_id)
        document.cookie = `user_id=${this.user_id};expires=${date.toUTCString()}`
    }

    getCookie(){
        let cookieArray = document.cookie.split(';'); 
        let name = "user_id";
        for(let i=0; i<cookieArray.length; i++){
            let c = cookieArray[i];
            while(c.charAt(0)==' '){
                c.substring(1);
            }
            if(c.indexOf(name) == 0){
                return c.substring(name.length + 1, c.length);
            }
        }
        return "";
    }

    destroyCookie() {
        let cookieArray = document.cookie.split(';');
        
        for(let i=0; i<cookieArray.length; i++){
            let c = cookieArray[i];
            let eq = c.indexOf('=');
            let name = eq > -1 ? c.substring(0, eq) : c;
            document.cookie = name+"=;expires=Mon, 01 Jan 2018 00:00:00 GMT";
        }
        
    }
    
}