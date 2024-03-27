let session = new Session();
session_token = session.getToken();

async function getUserData() {
  let user = new User();
  userData = await user.getUser(session_token);
  return userData;
}

let userData;
async function checkSession() {
  userData = await getUserData();

  if (userData === null) {
    session.removeToken();
    window.location.href = "/";
  }
}

if (session_token !== null) {
  checkSession();

  document.querySelector(".ul-no-log").style.display = "none";
  document.querySelector(".ul").style.display = "flex";
} else {
  window.location.href = "/";
}

document.querySelector("#postPostBtn").addEventListener("click", (e) => {
  e.preventDefault();

  async function createPost() {
    let post = new Post();
    let session = new Session();
    let userObj = session.decodeJwt(session.getToken());

    post.content = document.querySelector("#postContent").value;
    post.user_id = userObj.id;
    post.likes = 0;
    document.querySelector("#postContent").value = "";

    let response = await post.create();
    console.log(response);

    console.log(userObj);
    console.log(userObj.username);
    console.log(userObj.id);

    let currentUser = userObj.id;

    document.querySelector("#allPosts").innerHTML += `<div class="one-post">
                                                        <p><b>Author:</b> ${userObj.username}</p>
                                                        <div class="post-content">${post.content}</div>
                                                        <div class="post-actions">
                                                            <div>
                                                                <button id="like"><span>${post.likes}</span> Likes</button>
                                                                <button class="delete-btn">Comments</button>
                                                                                                                             </div>
                                                            </div>
                                                        <div class="post-comment">
                                                            <form >
                                                                <input type="text" placeholder="Write a comment...">
                                                                <button>Comment</button>
                                                            </form>
                                                        </div>
                                                    </div>`;
  }

  createPost();
});
async function getAllPosts() {
  let allPosts = new Post();
  allPosts = await allPosts.getAll();

  let userData = await getUserData();
  let deleteBtn = "";
console.log(userData);
  allPosts["postList"].forEach((element) => {
    if (element.username === userData.username)
      deleteBtn = `<button class="delete-btn">Delete</button>`;

    document.querySelector("#allPosts").innerHTML += `<div class="one-post">
                                                        <div id="author"><p><b>Author:</b> ${element.username}</p></div>
                                                        <div class="post-content">${element.content}</div>
                                                        <div class="post-actions">
                                                            <div>
                                                                <button id="like"><span>${element.likes}</span> Likes</button>
                                                                <button class="delete-btn">Comments</button>
                                                                ${deleteBtn}
                                                            </div>
                                                        </div>
                                                        <div class="post-comment">
                                                            <form >
                                                                <input type="text" placeholder="Write a comment...">
                                                                <button>Comment</button>
                                                            </form>
                                                        </div>
                                                    </div>`;
  });
  console.log(allPosts);
}
getAllPosts();
