class Post{
    post_id = '';
    user_id = '';
    likes = '';
    content = '';
    api_url = "https://localhost:7090/";
    session ='';
    session_token='';
    constructor(){
        this.session = new Session();
        this.session_token = session.getToken();
    }
    async create() {
        
        let data = {
            content:this.content,
            userId:this.user_id
        }
        let response = await fetch(this.api_url+"Post/add-post",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${session_token}`
            },
            body:JSON.stringify(data)
        });
        data = await response.json();

        return data;
    }
    async getAll(){
        
        let response = await fetch(this.api_url+"Post/get-all",{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${session_token}`
            }
        });
        let data = await response.json();
        return data;
    }
}