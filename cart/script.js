const ul = document.querySelector(".cartList");
const selectRemoveBtn = document.getElementById("selectRemove");
const allRemoveBtn = document.getElementById("allRemove");
const cartItems = JSON.parse(localStorage.getItem("cartItems"));

// 장바구니에 상품 없는 경우 상품 페이지 리다이렉트
if(!cartItems) {
  emptyCart();
} else {
  // 장바구니 리스트 뿌리기
  displayCart(cartItems);
}

selectRemoveBtn.addEventListener("click", () => {
  removeCartItems();
});

allRemoveBtn.addEventListener("click", () => {
  removeAllCartItems();
});

// 카트가 빈 경우 처리
function emptyCart(){
  ul.style.display = "none";
  const cart = document.querySelector(".cart");
  const p = document.createElement("p");
  p.innerText = "장바구니가 비어있습니다.\n3초후 상품페이지 이동 팝업이 나타납니다.";
  cart.appendChild(p);
  
  setTimeout(() => {
    if(confirm("상품 페이지로 이동하시겠습니까 ?")){
      location.href="../products/index.html";
    }}, 3000)
  return;
}

// 카트 목록 뿌리기
function displayCart(cartItems){
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="cItem"><label for ="${item.productName}"><input type="checkbox" id="${item.productName}">
    <img src = "../imgs/${item.productImgFileName}" />${item.productName}</label></div>`;
    ul.appendChild(li);
  });
  return;
}

// 선택 삭제 버튼 클릭 시 
const removeCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  // 체크된 값 가져와서 장바구니에서 제거
  const checkedItems = Array.from(document.querySelectorAll(".cartList input[type='checkbox']:checked")).map(v => v.id);
  const removedItemList = cartItems.filter(v => !(checkedItems.includes(v.productName)));
  console.log(checkedItems, removedItemList);
  
  // 모든 상품을 선택해서 장바구니가 비게 된 경우
  if(removedItemList.length === 0) {
    localStorage.removeItem("cartItems");
    emptyCart();
  }

  // 제거한 목록 localstorage 반영
  localStorage.setItem("cartItems", JSON.stringify(removedItemList));
  
  // 목록 다시 뿌리기
  ul.innerHTML = "";
  displayCart(removedItemList);
}

// 전체 삭제 버튼 클릭 시
const removeAllCartItems = () => {
  localStorage.removeItem("cartItems");
  location.reload();
}