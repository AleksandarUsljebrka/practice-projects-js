let session = new Session();

 session_token = session.getToken();


if(session_token !==null    ){

    document.querySelector('.ul-no-log').style.display='none';
    document.querySelector('.ul').style.display='flex';

}else{
    window.location.href = '/';
}
