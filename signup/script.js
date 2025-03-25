const inputUserId = document.getElementById("inputUserId");
const inputUserPw = document.getElementById("inputUserPw");
const inputUserName = document.getElementById("inputUserName");
const signupBtn = document.getElementById("signup");

// 회원가입하는 유저 정보
let signupUserInfo = {
  id: "",
  pw: "",
  username: "",

  setId(v){
    if(v.length < 6){
      alert("입력받은 ID가 6자 이하입니다. 다시 입력해주세요");
      inputUserId.value = ""
      inputUserId.focus();
      return;
    } 
    this.id = v;
  },

  setPw(v) {
    if(v.length < 8){
      alert("입력받은 PW가 8자 이하입니다. 다시 입력해주세요");
      inputUserPw.value = ""
      inputUserPw.focus();
      return;
    }
    this.pw = v;
  },

  setUserName(v) {
    console.log(v);
    this.username = v;
  },
};

// 입력받은 정보 set
inputUserId.addEventListener("change", e => {
  signupUserInfo.setId(e.target.value);
});

inputUserPw.addEventListener("change", e => {
  signupUserInfo.setPw(e.target.value);
})

inputUserName.addEventListener("change", e => {
  signupUserInfo.setUserName(e.target.value);
});

// 공백값 체크
signupBtn.addEventListener("click", () => {
  if(signupUserInfo.id === ""){
    alert("아이디가 입력되지 않았습니다. 아이디를 입력하세요");
    inputUserId.focus();
    return;
  }

  if(signupUserInfo.pw === ""){
    alert("비밀번호가 입력되지 않았습니다. 비밀번호를 입력하세요");
    inputUserPw.focus();
    return;
  }

  if(signupUserInfo.username === ""){
    alert("사용자 이름이 입력되지 않았습니다. 이름을 입력하세요");
    inputUserName.focus();
    return;
  }

  // 회원가입 확인
  const isConfirm = confirm(`[id] ${signupUserInfo.id} \n[pw] ${signupUserInfo.pw} \n[name] ${signupUserInfo.username} \n입력하신 정보가 정확한지 확인해주세요`);
  
  if(isConfirm){
    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    const userInfo = JSON.parse(localStorage.getItem("signupUserInfo")) ?? [];
    const newUserInfo = [...userInfo, signupUserInfo]
    localStorage.setItem("signupUserInfo", JSON.stringify(newUserInfo));
    location.href="../login/index.html";
  } else {
    alert("회원가입에 실패했습니다.");
  }

})
