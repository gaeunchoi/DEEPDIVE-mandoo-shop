let items = [];

// 데이터 가져오기
async function fetchItems() {
  const res = await fetch("../db.json");
  items = await res.json();
  console.log(items);
  showItems(items);
}

const ul = document.querySelector("ul");

//  페이지 따져보기
let currentPage = 1;
const itemsPerPage = 5;

// Cart 버튼 클릭시 장바구니에 추가
const addCartItem = product => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];
  localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
  alert(`선택하신 ${product.productName}이(가) 장바구니에 담겼습니다.`);
}

// Order 버튼 클릭시 order/index.html 리다이렉트
const orderCartItem = product => {
  if(confirm(`${product.productName}을(를) 주문하시겠습니까 ?`)){
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
    location.href="../order/index.html";
  }
}

// 상품 리스트 뿌리기
const showItems = () => {
  const [s, e] = [(currentPage - 1) * itemsPerPage, currentPage * itemsPerPage];
  const currentItems = items.slice(s, e);

  currentItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("show", "hidden");
    li.innerHTML = `<img src = "../imgs/${item.productImgFileName}" />
    <div>
    <h2>${item.productName}</h2>
    <p>${item.productPrice}</p>
    <button id = "cart-${item.id}" class="addCartBtn">Cart</button>
    <button id = "order-${item.id}" class="orderBtn">Order</button>
    </div>`;
    ul.appendChild(li);

    setTimeout(() => {
      li.classList.remove("hidden");
    }, 100);

    const cartBtn = li.querySelector(".addCartBtn");
    const orderBtn = li.querySelector(".orderBtn");

    // Btn 2개 -> EventListener 연결
    cartBtn.addEventListener("click", () => {
      addCartItem(item);
      cartBtn.disabled = true;
    });

    orderBtn.addEventListener("click", () => {
      orderCartItem(item);
    });
  });
  currentPage++;
  setObserver();
}

// 무한 스크롤 -> intersection observer 사용
function setObserver() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        if (currentPage <= Math.ceil(items.length / itemsPerPage)) {
          showItems();
        }
      }
    });
  }, options);

  const lastItem = document.querySelector(".show:last-child");
  if (lastItem) {
    observer.observe(lastItem);
  }
}

// 데이터 뿌리기 시작
fetchItems();