class Post{
    post_id = '';
    user_id = '';
    likes = '';
    content = '';
    api_url = "https://localhost:7090/";

    async create() {
        let session = new Session();
        let session_token = session.getToken();
        let data = {
            content:this.content
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
}