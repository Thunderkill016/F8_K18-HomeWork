const NAME_STORAGE_KEY = "userName";
const VISIT_STORAGE_KEY = "visitCount";
const CART_STORAGE_KEY = "cartItems";

const products = [
  { id: 1, name: "Áo thun" },
  { id: 2, name: "Quần jean" },
  { id: 3, name: "Giày thể thao" },
  { id: 4, name: "Mũ lưỡi trai" },
];

const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const readNameBtn = document.getElementById("readNameBtn");
const nameResult = document.getElementById("nameResult");
const visitCountHeading = document.getElementById("visitCountHeading");
const resetVisitBtn = document.getElementById("resetVisitBtn");
const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");
const cartList = document.getElementById("cartList");
const clearCartBtn = document.getElementById("clearCartBtn");

function renderStoredName() {
  const storedName = localStorage.getItem(NAME_STORAGE_KEY);

  if (!storedName) {
    nameResult.textContent = "Chưa có tên được lưu.";
    return;
  }

  nameInput.value = storedName;
  nameResult.textContent = `Tên đã lưu: ${storedName}`;
}

function saveName() {
  const name = nameInput.value.trim();

  if (!name) {
    nameResult.textContent = "Vui lòng nhập tên trước khi lưu.";
    return;
  }

  localStorage.setItem(NAME_STORAGE_KEY, name);
  nameResult.textContent = `Đã lưu tên: ${name}`;
}

function readName() {
  renderStoredName();
}

function renderVisitCount() {
  const currentCount = Number(localStorage.getItem(VISIT_STORAGE_KEY) || 0);
  visitCountHeading.textContent = `Bạn đã truy cập trang này ${currentCount} lần.`;
}

function increaseVisitCount() {
  const nextCount = Number(localStorage.getItem(VISIT_STORAGE_KEY) || 0) + 1;
  localStorage.setItem(VISIT_STORAGE_KEY, nextCount);
  renderVisitCount();
}

function resetVisitCount() {
  localStorage.setItem(VISIT_STORAGE_KEY, 0);
  renderVisitCount();
}

function getCartItems() {
  return JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY) || "[]");
}

function saveCartItems(cartItems) {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
}

function renderCart() {
  const cartItems = getCartItems();

  cartList.innerHTML = "";
  cartCount.textContent = `Số lượng sản phẩm trong giỏ: ${cartItems.length}`;

  if (!cartItems.length) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Giỏ hàng đang trống.";
    cartList.appendChild(emptyItem);
    return;
  }

  cartItems.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = item.name;
    cartList.appendChild(cartItem);
  });
}

function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return;
  }

  const cartItems = getCartItems();
  cartItems.push(selectedProduct);
  saveCartItems(cartItems);
  renderCart();
}

function renderProducts() {
  products.forEach((product) => {
    const productItem = document.createElement("div");
    const productName = document.createElement("span");
    const addButton = document.createElement("button");

    productName.textContent = product.name;

    addButton.type = "button";
    addButton.textContent = "Thêm vào giỏ hàng";
    addButton.addEventListener("click", () => {
      addToCart(product.id);
    });

    productItem.append(
      productName,
      document.createTextNode(" "),
      addButton
    );

    productList.appendChild(productItem);
  });
}

function clearCart() {
  sessionStorage.removeItem(CART_STORAGE_KEY);
  renderCart();
}

saveNameBtn.addEventListener("click", saveName);
readNameBtn.addEventListener("click", readName);
resetVisitBtn.addEventListener("click", resetVisitCount);
clearCartBtn.addEventListener("click", clearCart);

renderStoredName();
increaseVisitCount();
renderProducts();
renderCart();
