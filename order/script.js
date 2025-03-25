const orderItemDiv = document.querySelector(".orderItem");
const inputOrderName = document.getElementById("inputOrderName");
const inputOrderPhoneNumber = document.getElementById("inputOrderPhoneNumber");
const inputOrderAddress = document.getElementById("inputOrderAdress");
const orderBtn = document.querySelector(".order");
const cancelOrder = document.querySelector(".cancelOrder");
const cartItems = JSON.parse(localStorage.getItem("cartItems"));

// 주문 탭에 열린 아이템은 장바구니의 맨 마지막에 있는 상품 -> 꺼내서 뿌리기
const orderItem = cartItems[cartItems.length - 1];
orderItemDiv.innerHTML = `<img src = "../imgs/${orderItem.productImgFileName}" />
<p>${orderItem.productName}</p>
<p>${orderItem.productPrice}원</p>`

let [orderName, orderPhoneNumber, orderAddress] = ["", "", ""];
inputOrderName.addEventListener("change", e => {
  orderName = e.target.value;
});

inputOrderPhoneNumber.addEventListener("change", e => {
  orderPhoneNumber = e.target.value;
});

inputOrderAddress.addEventListener("change", e => {
  orderAddress = e.target.value;
});

orderBtn.addEventListener("click", () => {
  // 이름 공백 체크
  if(orderName === "") {
    alert("주문자 이름이 입력되지 않았습니다. 다시 입력해주세요");
    inputOrderName.focus();
    return;
  }
  
  // 전화번호 공백 체크
  if(orderPhoneNumber === ""){
    alert("휴대폰 번호가 입력되지 않았습니다. 다시 입력해주세요")
    inputOrderPhoneNumber.focus();
    return;
  }
  
  // 전화번호 대쉬 체크
  if(orderPhoneNumber.includes("-")){
    alert("휴대폰 번호에 -를 제외하고 입력해주세요");
    inputOrderPhoneNumber.focus();
    return;
  }

  // 주소 공백 체크
  if(orderAddress === ""){
    alert("주소가 입력되지 않았습니다. 다시 입력해주세요");
    inputOrderAddress.focus();
    return;
  }

  // 위에 조건에 안걸리면 구매 성공 -> 구매 히스토리 기록하기
  const isConfirm = confirm(`[주문자 이름] ${inputOrderName.value}\n[휴대폰번호] ${inputOrderPhoneNumber.value}\n[주소] ${inputOrderAddress.value}\n위 정보로 주문하시겠습니까?`);
  if(isConfirm){
    alert(`${inputOrderName.value}님, ${orderItem.productName} 구매가 완료되었습니다.`);
    const beforeHistory = JSON.parse(localStorage.getItem("orderHistory")) ?? [];
    const orderNewHistory = {
      orderName: inputOrderName.value,
      orderProductName: orderItem.productName,
      orderPhoneNumber: inputOrderPhoneNumber.value,
      orderAddress: inputOrderAddress.value
    };
    localStorage.setItem("orderHistory", JSON.stringify([...beforeHistory, orderNewHistory]));
    location.href = "../index.html";
  } else {
    alert("주문에 실패했습니다.");
  }
  
  // 장바구니에 있는 해당 상품 삭제
  localStorage.setItem("cartItems", JSON.stringify(cartItems.splice(0, cartItems.length-1)))  
})

// 주문 취소하기를 할 경우 
cancelOrder.addEventListener("click", () => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems.slice(0, cartItems.length-1)));
})