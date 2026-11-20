const categoryNames = {
  "mon-chinh": "Món chính",
  "khai-vi": "Khai vị",
  "hai-san": "Hải sản",
  "trang-mieng": "Tráng miệng",
  "thuc-uong": "Thức uống"
};
const resultsTitle = document.getElementById("searchResultsTitle");
const resultsCount = document.getElementById("searchResultsCount");
const resultsGrid = document.getElementById("searchResultsGrid");
const emptyMessage = document.getElementById("searchResultsEmpty");
const cartItemsElement = document.getElementById("cartItems");
const toast = document.getElementById("searchResultsToast");
let resultFoods = [];
const cart = [{id: 4, qty: 1}, {id: 5, qty: 1}];

function formatPrice(value) {
  return `${(Number(value) || 0).toLocaleString("vi-VN")}đ`;
}

function readSearchFoods() {
  const storedFoods = sessionStorage.getItem("hv_search_results_foods");
  if (!storedFoods) return [];

  const foods = JSON.parse(storedFoods);
  if (!Array.isArray(foods)) {
    throw new Error("Danh sách món tìm kiếm không hợp lệ.");
  }
  return foods;
}

function createFoodCard(food) {
  const card = document.createElement("article");
  card.className = "food-card";

  const image = document.createElement("img");
  image.src = food.image || "images/restaurant.jpg";
  image.alt = food.name || "Món ăn";
  image.onerror = () => {
    image.src = "images/restaurant.jpg";
  };

  const body = document.createElement("div");
  body.className = "food-card-body";

  const name = document.createElement("h3");
  name.textContent = food.name || "Món ăn";

  const description = document.createElement("p");
  description.textContent = food.description || "";

  const category = document.createElement("small");
  category.textContent = categoryNames[food.category] || "";

  const price = document.createElement("div");
  price.className = "price";
  price.textContent = formatPrice(food.price);

  const actions = document.createElement("div");
  actions.className = "food-card-actions";

  const detailButton = document.createElement("button");
  detailButton.type = "button";
  detailButton.className = "btn-detail";
  detailButton.dataset.foodDetail = String(food.id);
  detailButton.textContent = "Chi tiết món ăn";

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "btn-add-cart";
  addButton.dataset.addCart = String(food.id);
  addButton.textContent = "Thêm giỏ";

  actions.append(detailButton, addButton);
  body.append(name, category, description, price, actions);
  card.append(image, body);
  return card;
}

function showNotice(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.hidden = true;
  }, 2800);
}

function findFood(id) {
  return resultFoods.find(food => String(food.id) === String(id));
}

function addCartQuantity(foodId) {
  const item = cart.find(cartItem => String(cartItem.id) === String(foodId));
  if (!item) {
    showNotice("Chức năng thêm món chỉ mang tính minh họa; giỏ hàng không thay đổi.");
    return;
  }

  showNotice("Chức năng thêm giỏ chỉ mang tính minh họa; không thêm món thật.");
}

function addDemoCartQuantity(foodId) {
  const item = cart.find(cartItem => String(cartItem.id) === String(foodId));
  if (!item) return;

  item.qty += 1;
  renderCart();
  const food = findFood(foodId);
  showNotice(`Đã tăng số lượng minh họa của ${food ? food.name : "món ăn"}. Tổng tiền vẫn giữ nguyên.`);
}

function subtractCartQuantity(foodId) {
  const item = cart.find(cartItem => String(cartItem.id) === String(foodId));
  if (!item || item.qty <= 1) return;

  item.qty -= 1;
  renderCart();
  const food = findFood(foodId);
  showNotice(`Đã bớt ${food ? food.name : "món ăn"}. Tổng tiền minh họa vẫn giữ nguyên.`);
}

function renderCart() {
  cartItemsElement.replaceChildren();
  cart.forEach(item => {
    const food = findFood(item.id);
    if (!food) return;

    const row = document.createElement("div");
    row.className = "cart-item";
    const image = document.createElement("img");
    image.src = food.image || "images/restaurant.jpg";
    image.alt = food.name || "Món ăn";
    image.onerror = () => {
      image.src = "images/restaurant.jpg";
    };

    const info = document.createElement("div");
    info.className = "cart-item-info";
    const name = document.createElement("h3");
    name.textContent = food.name || "Món ăn";
    const price = document.createElement("span");
    price.textContent = `${formatPrice(food.price)} / phần${item.qty > 1 ? " · phần thêm miễn phí (minh họa)" : ""}`;
    info.append(name, price);

    const quantity = document.createElement("div");
    quantity.className = "cart-item-quantity";
    const subtractButton = document.createElement("button");
    subtractButton.type = "button";
    subtractButton.className = "cart-quantity-subtract";
    subtractButton.dataset.cartSubtractId = String(item.id);
    subtractButton.setAttribute("aria-label", `Bớt một phần ${food.name}`);
    subtractButton.disabled = item.qty <= 1;
    subtractButton.textContent = "−";
    const quantityText = document.createElement("span");
    quantityText.setAttribute("aria-label", "Số lượng");
    quantityText.textContent = String(item.qty);
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "cart-quantity-add";
    addButton.dataset.cartAddId = String(item.id);
    addButton.setAttribute("aria-label", `Thêm một phần ${food.name}`);
    addButton.textContent = "+";
    quantity.append(subtractButton, quantityText, addButton);

    const subtotal = document.createElement("strong");
    subtotal.className = "cart-item-subtotal";
    subtotal.textContent = formatPrice(food.price);
    row.append(image, info, quantity, subtotal);
    cartItemsElement.append(row);
  });

  const itemCount = cart.length;
  document.getElementById("cartCount").textContent = String(itemCount);
  document.getElementById("cartButton").setAttribute("aria-label", `Giỏ hàng, ${itemCount} món`);
  document.getElementById("cartEmpty").hidden = cart.length > 0;
  document.getElementById("cartTotal").textContent = formatPrice(125000);
}

function openFoodDetails(food) {
  document.getElementById("detailImage").src = food.image || "images/restaurant.jpg";
  document.getElementById("detailImage").alt = food.name || "Món ăn";
  document.getElementById("detailName").textContent = food.name || "Món ăn";
  document.getElementById("detailCategory").textContent = categoryNames[food.category] || food.category || "";
  document.getElementById("detailDescription").textContent = food.description || "";
  document.getElementById("detailFullDescription").textContent = food.fullDescription || food.description || "";
  document.getElementById("detailPrice").textContent = formatPrice(food.price);
  document.getElementById("detailServing").textContent = food.category === "thuc-uong" ? "1 ly" : "1 phần";
  document.getElementById("detailIngredients").textContent =
    food.ingredients || "Nguyên liệu được lựa chọn tươi ngon theo tiêu chuẩn nhà hàng";
  document.getElementById("detailPreparation").textContent =
    food.preparation || "Chế biến mới khi khách đặt để giữ trọn hương vị";
  document.getElementById("detailFlavor").textContent = food.flavor ? `Hương vị: ${food.flavor}` : "";
  document.getElementById("detailAddCart").dataset.foodId = String(food.id);
  document.getElementById("foodDetailDialog").showModal();
}

resultsGrid.addEventListener("click", event => {
  const addButton = event.target.closest("button[data-add-cart]");
  if (addButton) {
    addCartQuantity(addButton.dataset.addCart);
    return;
  }

  const detailButton = event.target.closest("button[data-food-detail]");
  if (!detailButton) return;
  const food = findFood(detailButton.dataset.foodDetail);
  if (food) openFoodDetails(food);
});

cartItemsElement.addEventListener("click", event => {
  const subtractButton = event.target.closest("button[data-cart-subtract-id]");
  if (subtractButton) {
    subtractCartQuantity(subtractButton.dataset.cartSubtractId);
    return;
  }

  const addButton = event.target.closest("button[data-cart-add-id]");
  if (addButton) addDemoCartQuantity(addButton.dataset.cartAddId);
});

document.getElementById("cartButton").addEventListener("click", () => {
  document.getElementById("cartDialog").showModal();
});
document.getElementById("closeCartButton").addEventListener("click", () => {
  document.getElementById("cartDialog").close();
});
document.querySelector("#foodDetailDialog .close-dialog").addEventListener("click", () => {
  document.getElementById("foodDetailDialog").close();
});
document.getElementById("detailAddCart").addEventListener("click", event => {
  addCartQuantity(event.currentTarget.dataset.foodId);
  document.getElementById("foodDetailDialog").close();
});
document.getElementById("continueShopping").addEventListener("click", () => {
  document.getElementById("cartDialog").close();
  resultsGrid.scrollIntoView({behavior: "smooth"});
});
document.querySelectorAll('input[name="deliveryAddressChoice"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const useAccountAddress = radio.value === "account" && radio.checked;
    const addressInput = document.getElementById("checkoutAddress");
    addressInput.disabled = useAccountAddress;
    addressInput.required = !useAccountAddress;
  });
});
document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  window.location.href = "index (1).html";
});

try {
  const foods = readSearchFoods();
  resultFoods = foods;
  const results = resultFoods;

  resultsTitle.textContent = "Kết quả tìm kiếm";
  resultsCount.textContent = `Có ${results.length} món ăn`;
  emptyMessage.hidden = results.length > 0;
  if (!foods.length) {
    emptyMessage.textContent = "Hãy quay về trang chủ và tìm kiếm thực đơn.";
    emptyMessage.hidden = false;
  }
  resultsGrid.replaceChildren(...results.map(createFoodCard));
  renderCart();
} catch (error) {
  console.error("Không thể tải kết quả tìm kiếm.", error);
  resultsTitle.textContent = "Không thể tải kết quả tìm kiếm";
  resultsCount.textContent = "";
  emptyMessage.textContent = "Hãy quay về trang chủ và thử lại.";
  emptyMessage.hidden = false;
}
