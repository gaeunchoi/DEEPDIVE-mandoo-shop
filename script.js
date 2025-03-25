// 요소 가져오기
const welcomeUserSpan = document.querySelector(".welcomeUser");
const headaerLogin = document.querySelector(".headerLogin");
const mainLogin = document.querySelector(".mainLogin");

// localStorage 가져오기
const isLogin = JSON.parse(localStorage.getItem("isLogin"));
const signupUserInfos = JSON.parse(localStorage.getItem("signupUserInfo"));

if(isLogin){
  mainLogin.style.display = "none";
  headaerLogin.innerText = "Logout";
  headaerLogin.href = "";

  headaerLogin.addEventListener("click", () => {
    localStorage.removeItem("isLogin");
    location.reload();
  });
}

welcomeUserSpan.innerText = isLogin ? `${isLogin.username}` : "게스트";