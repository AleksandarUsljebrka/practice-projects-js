
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
  document.querySelector('#logoutNav').addEventListener('click',e=>{
    e.preventDefault();
    let res = confirm("Are you sure you want to logout?");
    
    if(res){
        session.removeToken();
        console.log("Logout");
        window.location.href="/";

    }else{
        console.log("Necu logout");
    }
  })
  document.querySelector('#logoutSide').addEventListener('click',e=>{
    e.preventDefault();
    let res = confirm("Are you sure you want to logout?");
    
    if(res){
        session.removeToken();
        window.location.href="/";
        console.log("Logout");
    }else{
        console.log("Necu logout");
    }
  })
  document.querySelector('#homeNav').addEventListener('click',e=>{
    e.preventDefault();
    
    if(session_token !== null){

        window.location.href="home.html";

    }else{
        window.location.href="/";
        
    }
  })
  document.querySelector('#myProfileNav').addEventListener('click',e=>{
    e.preventDefault();
    
    if(session_token !== null){

        window.location.href="myProfile.html";

    }else{
        window.location.href="/";
        
    }
  })