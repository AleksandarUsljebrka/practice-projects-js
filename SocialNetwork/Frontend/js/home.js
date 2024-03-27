let session = new Session();

 session_token = session.getToken();

 async function checkSession(){
     let user = new User();
     data = await user.getUser(session_token);

     if (data === null) {
         session.removeToken();
         window.location.href = "/";
         }
 }
 
 if(session_token !==null    ){
    checkSession();

    document.querySelector('.ul-no-log').style.display='none';
    document.querySelector('.ul').style.display='flex';

}else{
    window.location.href = '/';
}

document.querySelector("#postPostBtn").addEventListener('click',e=>{
    e.preventDefault();

    async function createPost(){
        let post = new Post();
        post.content = document.querySelector("#postContent").value;
        let data = await post.create();
        console.log(data);
    }
    createPost();
})