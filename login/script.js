const inputLoginId = document.getElementById("inputLoginId");
const inputLoginPw = document.getElementById("inputLoginPw");
const loginBtn = document.getElementById("login");
const rememberIdChk = document.getElementById("rememberId");

const signupUserInfos = JSON.parse(localStorage.getItem("signupUserInfo"));
const savedUserId = localStorage.getItem("savedUserId");

if(!signupUserInfos){
  alert("해당 정보로 가입된 회원이 없습니다. 회원가입 페이지로 이동합니다.");
  location.href = "../signup/index.html";
}

let [loginId, loginPw] = ["", ""];

// 이전 로그인할때 아이디 저장하기를 선택했으면 아이디필드 채워놓기
if(savedUserId){
  alert("이전에 저장한 아이디를 불러옵니다.");
  loginId = savedUserId;
  inputLoginId.value = savedUserId;
  inputLoginPw.focus();
}


inputLoginId.addEventListener("change", e => {
  loginId = e.target.value;
});

inputLoginPw.addEventListener("change", e => {
  loginPw = e.target.value;
});

loginBtn.addEventListener("click", () => {
  if(loginId === ""){
    alert("아이디를 입력해주세요");
    inputLoginId.focus();
    return;
  }

  if(loginPw === ""){
    alert("비밀번호를 입력해주세요");
    inputLoginPw.focus();
    return;
  }

  if(loginId !== "" && loginPw !== "" && !(signupUserInfos.some(user => user.id === loginId && user.pw === loginPw))){
    alert("입력한 아이디 또는 비밀번호가 일치하지 않습니다");
    inputLoginId.focus();
    return;
  }

  // 아이디 저장
  rememberIdChk ? localStorage.setItem("savedUserId", loginId) : localStorage.removeItem("savedUserId");
  
  // isLogin으로 탭 껐다 켜도 로그인 유지
  const isLogin = signupUserInfos.find(user => user.id === loginId);
  localStorage.setItem("isLogin", JSON.stringify(isLogin));
  alert(`${signupUserInfos.filter((user) => user.id === loginId)[0].username}님 환영합니다!`);
  location.href = "../index.html";
})