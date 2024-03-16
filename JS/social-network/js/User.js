class User {
  user_id = "";
  username = "";
  password = "";
  api_url = "http://localhost:3000/";

  constructor(){
    this.fetchData();
  }
  fetchData(){

      fetch(this.api_url+'user')
      .then(response =>
        {
            if(!response.ok){
                throw new Error("Not Ok Response");
            }
            
            return response.json();
        }).then(data=>{
            console.log(data);
        });
    }
}