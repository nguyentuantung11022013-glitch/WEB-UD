/* ===== DỮ LIỆU MÓN ĂN ===== */
const foods = [
  {id:1,name:"Phở bò",category:"mon-chinh",description:"Nước dùng thanh ngọt, thịt bò mềm thơm. Phở bò truyền thống với bánh phở mềm, rau thơm và gia vị đặc biệt.",price:60000,image:"images/pho.jpg"},
  {id:2,name:"Nem rán",category:"khai-vi",description:"Giòn rụm, đậm đà hương vị truyền thống. Nhân nem gồm thịt heo xay, miến, mộc nhĩ và rau củ.",price:45000,image:"images/nem.jpg"},
  {id:3,name:"Cơm gà nướng",category:"mon-chinh",description:"Thịt gà thơm, cơm dẻo, ăn kèm nước chấm. Gà được ướp gia vị đặc biệt và nướng than hồng.",price:55000,image:"images/com-ga.jpg"},
  {id:4,name:"Tôm xào tỏi",category:"hai-san",description:"Tôm tươi xào thơm cùng tỏi và rau củ. Tôm sú lớn được chế biến giòn ngọt tự nhiên.",price:75000,image:"images/tom-xao-toi.png"},
  {id:5,name:"Thịt kho tàu",category:"mon-chinh",description:"Thịt mềm, béo ngậy, đậm vị quê nhà. Thịt ba chỉ kho nước dừa cùng trứng vịt.",price:50000,image:"images/thit-kho-tau.jpg"},
  {id:6,name:"Gỏi cuốn",category:"khai-vi",description:"Rau tươi, tôm thịt, dùng cùng nước chấm. Gỏi cuốn tôm thịt thơm mát kèm tương đậu phộng.",price:35000,image:"images/goi-cuon.png"},
  {id:7,name:"Cá kho tộ",category:"mon-chinh",description:"Cá kho đậm vị, ăn cùng cơm nóng. Cá lóc kho tộ đất với nước màu, tiêu và hành.",price:68000,image:"images/ca-kho-to.webp"},
  {id:8,name:"Mực xào rau củ",category:"hai-san",description:"Mực tươi giòn kết hợp rau củ theo mùa. Mực ống xào cùng ớt chuông, hành tây và cần tỏi.",price:82000,image:"images/muc-xao-rau-cu.png"},
  {id:9,name:"Chả giò hải sản",category:"khai-vi",description:"Lớp vỏ vàng giòn với nhân hải sản. Nhân gồm tôm, cua và rau củ xắt nhuyễn.",price:49000,image:"images/cha-gio-hai-san.jpg"},
  {id:10,name:"Bún thịt nướng",category:"mon-chinh",description:"Thịt nướng thơm, bún tươi và rau sống. Thịt heo ướp sả nướng mọi kèm nước mắm chua ngọt.",price:52000,image:"images/bun-thit-nuong.webp"},
  // --- TRÁNG MIỆNG ---
  {id:11,name:"Chè ba màu",category:"trang-mieng",description:"Chè ba màu mát lạnh gồm đậu đỏ, đậu xanh, rau câu và nước cốt dừa.",price:25000,image:"images/che-ba-mau.jpg"},
  {id:12,name:"Bánh flan",category:"trang-mieng",description:"Bánh flan mềm mịn vị caramel, dùng lạnh thơm béo vị trứng và vani.",price:20000,image:"images/banh-flan.jpg"},
  {id:13,name:"Kem xoài dừa",category:"trang-mieng",description:"Kem xoài tự làm kết hợp nước cốt dừa tươi, mát lạnh sảng khoái.",price:30000,image:"images/kem-xoai.jpg"},
  // --- THỨC UỐNG ---
  {id:14,name:"Trà sen vàng",category:"thuc-uong",description:"Trà ướp hương sen thanh khiết, dùng nóng hoặc đá đều tuyệt vời.",price:25000,image:"images/tra-sen.jpg"},
  {id:15,name:"Bia Heineken",category:"thuc-uong",description:"Bia Heineken mát lạnh, phù hợp dùng kèm các món ăn.",price:22000,image:"images/bia-heniken.webp"},
  {id:16,name:"Nước mía chanh",category:"thuc-uong",description:"Nước mía tươi ép kèm chanh tươi và đá lạnh, giải khát tuyệt vời.",price:18000,image:"images/nuoc-mia.jpg"},
  {id:17,name:"Sinh tố bơ",category:"thuc-uong",description:"Sinh tố bơ béo ngậy xay cùng sữa đặc và đá, thức uống bổ dưỡng.",price:28000,image:"images/sinh-to-bo.jpg"}
];

/* ===== DOM ELEMENTS ===== */
const foodGrid = document.getElementById("foodGrid");
const featuredFoodGrid = document.getElementById("featuredFoodGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const pagination = document.getElementById("pagination");
const emptyMessage = document.getElementById("emptyMessage");
const perPage = 5;
let currentPage = 1;

const categoryNames = {
  "mon-chinh": "Món chính",
  "khai-vi": "Khai vị",
  "hai-san": "Hải sản",
  "trang-mieng": "Tráng miệng",
  "thuc-uong": "Thức uống"
};

/* ===== CHỌN MÓN (chỉ giao diện) ===== */
let cart = [];

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const food = foods.find(f => f.id === item.id);
    return sum + (food ? food.price * item.qty : 0);
  }, 0);
}

/* ===== TÀI KHOẢN DEMO ===== */
let currentUser = null;

function setCurrentUser(user) {
  currentUser = user;
  try {
    if (user) {
      localStorage.setItem("hv_customer_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("hv_customer_user");
    }
  } catch (error) {
    /* Trình duyệt có thể chặn storage; giao diện vẫn hoạt động trong bộ nhớ. */
  }
  updateUserUI();
}
function logout() {
  currentUser = null;
  try {
    localStorage.removeItem("hv_customer_user");
  } catch (error) {
    /* Storage không khả dụng. */
  }
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
  updateUserUI();
}

function restoreCurrentUser() {
  try {
    const storedUser = JSON.parse(localStorage.getItem("hv_customer_user") || "null");
    currentUser = storedUser && typeof storedUser === "object" ? storedUser : null;
  } catch (error) {
    currentUser = null;
  }
  updateUserUI();
}

function updateUserUI() {
  const userBar = document.getElementById("userBar");
  const loginToggle = document.getElementById("loginToggle");
  closeUserMenu();
  if (currentUser) {
    userBar.hidden = false;
    loginToggle.style.display = "none";
    document.getElementById("userMenuToggle").textContent = `👤 ${currentUser.name}`;
  } else {
    userBar.hidden = true;
    loginToggle.style.display = "";
  }
}

function closeUserMenu() {
  const options = document.getElementById("userMenuOptions");
  const toggle = document.getElementById("userMenuToggle");
  options.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

/* ===== HELPERS ===== */
function money(value) {
  return value.toLocaleString("vi-VN") + "đ";
}

function formatPriceInput(input) {
  const digits = input.value.replace(/\D/g, "");
  input.value = digits ? Number(digits).toLocaleString("vi-VN") : "";
}

["priceMin", "priceMax"].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => formatPriceInput(input));
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getFilteredFoods() {
  return foods;
}

function foodCard(food) {
  return `
    <article class="food-card">
      <img src="${food.image}" alt="${food.name}" onerror="this.src='images/restaurant.jpg'">
      <div class="food-card-body">
        <h3>${food.name}</h3>
        <p>${food.description.length > 60 ? food.description.substring(0, 60) + '...' : food.description}</p>
        <div class="price">${money(food.price)}</div>
        <div class="food-card-actions">
          <button type="button" class="btn-detail" data-food="${food.id}">Xem chi tiết</button>
        </div>
      </div>
    </article>
  `;
}

function renderFoods() {
  const result = getFilteredFoods();
  const pageCount = Math.ceil(result.length / perPage);
  currentPage = Math.min(currentPage, Math.max(1, pageCount));
  const start = (currentPage - 1) * perPage;
  const pageFoods = result.slice(start, start + perPage);
  foodGrid.innerHTML = pageFoods.map(foodCard).join("");
  emptyMessage.hidden = result.length !== 0;
  pagination.innerHTML = "";
  for (let page = 1; page <= pageCount; page++) {
    const button = document.createElement("button");
    button.textContent = page;
    button.className = page === currentPage ? "active" : "";
    button.addEventListener("click", () => { currentPage = page; renderFoods(); });
    pagination.appendChild(button);
  }
}

function showSearchNotice() {
  const toast = document.getElementById("searchToast");
  toast.textContent = "Bộ lọc chỉ mang tính minh họa giao diện, không thực hiện lọc dữ liệu.";
  toast.hidden = false;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.hidden = true; }, 2800);
}

/* ===== RENDER MÓN NỔI BẬT ===== */
featuredFoodGrid.innerHTML = [1, 2, 3, 5, 8]
  .map(id => foods.find(food => food.id === id))
  .map(foodCard)
  .join("");

/* ===== FILTERS & SEARCH ===== */
document.getElementById("basicSearchButton").addEventListener("click", showSearchNotice);
document.getElementById("searchInput").addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  showSearchNotice();
});

/* ===== TÌM KIẾM NÂNG CAO ===== */
document.getElementById("applyAdvanced").addEventListener("click", showSearchNotice);
document.querySelectorAll("#advancedFields input").forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    showSearchNotice();
  });
});
document.getElementById("resetAdvanced").addEventListener("click", () => {
  categoryFilter.value = "all";
  sortFilter.value = "default";
  document.getElementById("priceMin").value = "";
  document.getElementById("priceMax").value = "";
  currentPage = 1;
  renderFoods();
});

/* ===== XEM CHI TIẾT MÓN ĂN ===== */
document.querySelectorAll(".food-grid").forEach(grid => grid.addEventListener("click", event => {
  const detailButton = event.target.closest("button[data-food]");
  if (!detailButton) return;
  const food = foods.find(item => item.id === Number(detailButton.dataset.food));
  if (!food) return;

  document.getElementById("detailImage").src = food.image;
  document.getElementById("detailImage").alt = food.name;
  document.getElementById("detailName").textContent = food.name;
  document.getElementById("detailCategory").textContent = categoryNames[food.category] || food.category;
  document.getElementById("detailDescription").textContent = food.description;
  document.getElementById("detailPrice").textContent = money(food.price);
  document.getElementById("foodDetailDialog").showModal();
}));

document.querySelector("#foodDetailDialog .close-dialog").addEventListener("click", () => {
  document.getElementById("foodDetailDialog").close();
});

/* ===== CHỌN MÓN KÈM ĐẶT BÀN ===== */
const bookingFoodSelect = document.getElementById("bookingFoodSelect");
const bookingFoodPicker = document.getElementById("bookingFoodPicker");
const bookingFoodToggle = document.getElementById("bookingFoodToggle");
const bookingFoodOptions = document.getElementById("bookingFoodOptions");
let selectedBookingFoodId = null;
let activeBookingFoodIndex = -1;

function closeBookingFoodOptions() {
  bookingFoodOptions.hidden = true;
  bookingFoodSelect.setAttribute("aria-expanded", "false");
  bookingFoodToggle.setAttribute("aria-expanded", "false");
  bookingFoodSelect.removeAttribute("aria-activedescendant");
  activeBookingFoodIndex = -1;
}

function renderBookingFoodOptions(showAll = false) {
  const keyword = showAll ? "" : bookingFoodSelect.value.trim().toLocaleLowerCase("vi");
  const matchingFoods = foods.filter(food => food.name.toLocaleLowerCase("vi").includes(keyword));
  bookingFoodOptions.innerHTML = "";

  if (matchingFoods.length === 0) {
    const emptyOption = document.createElement("div");
    emptyOption.className = "booking-food-empty";
    emptyOption.textContent = "Không tìm thấy món phù hợp";
    bookingFoodOptions.appendChild(emptyOption);
  } else {
    matchingFoods.forEach(food => {
      const option = document.createElement("button");
      option.type = "button";
      option.id = `booking-food-option-${food.id}`;
      option.className = "booking-food-option";
      option.dataset.foodId = food.id;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(food.id === selectedBookingFoodId));
      option.innerHTML = `<span>${escapeHtml(food.name)}</span><span>${money(food.price)}</span>`;
      bookingFoodOptions.appendChild(option);
    });
  }

  bookingFoodOptions.hidden = false;
  bookingFoodSelect.setAttribute("aria-expanded", "true");
  bookingFoodToggle.setAttribute("aria-expanded", "true");
  activeBookingFoodIndex = -1;
}

function selectBookingFood(foodId) {
  const food = foods.find(item => item.id === foodId);
  if (!food) return;
  selectedBookingFoodId = food.id;
  bookingFoodSelect.value = `${food.name} - ${money(food.price)}`;
  closeBookingFoodOptions();
}

bookingFoodSelect.addEventListener("input", () => {
  selectedBookingFoodId = null;
  renderBookingFoodOptions();
});
bookingFoodSelect.addEventListener("focus", () => {
  if (bookingFoodOptions.hidden) renderBookingFoodOptions();
});
bookingFoodToggle.addEventListener("click", () => {
  if (bookingFoodOptions.hidden) {
    renderBookingFoodOptions(true);
    bookingFoodSelect.focus();
  } else {
    closeBookingFoodOptions();
  }
});
bookingFoodOptions.addEventListener("click", event => {
  const option = event.target.closest("[data-food-id]");
  if (option) selectBookingFood(Number(option.dataset.foodId));
});
bookingFoodSelect.addEventListener("keydown", event => {
  let options = [...bookingFoodOptions.querySelectorAll("[data-food-id]")];
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (bookingFoodOptions.hidden) {
      renderBookingFoodOptions();
      options = [...bookingFoodOptions.querySelectorAll("[data-food-id]")];
    }
    if (options.length === 0) return;
    activeBookingFoodIndex = event.key === "ArrowDown"
      ? (activeBookingFoodIndex + 1) % options.length
      : (activeBookingFoodIndex <= 0 ? options.length - 1 : activeBookingFoodIndex - 1);
    options.forEach((option, index) => option.classList.toggle("active", index === activeBookingFoodIndex));
    bookingFoodSelect.setAttribute("aria-activedescendant", options[activeBookingFoodIndex].id);
  } else if (event.key === "Enter" && !bookingFoodOptions.hidden && activeBookingFoodIndex >= 0) {
    event.preventDefault();
    selectBookingFood(Number(options[activeBookingFoodIndex].dataset.foodId));
  } else if (event.key === "Escape") {
    closeBookingFoodOptions();
  }
});
document.addEventListener("click", event => {
  if (!bookingFoodPicker.contains(event.target)) closeBookingFoodOptions();
});

function renderBookingSelection() {
  const itemsEl = document.getElementById("bookingItems");
  const emptyEl = document.getElementById("bookingEmpty");
  itemsEl.innerHTML = cart.map(item => {
    const food = foods.find(f => f.id === item.id);
    if (!food) return "";
    return `
      <div class="booking-item">
        <img src="${food.image}" alt="${food.name}" onerror="this.src='images/restaurant.jpg'">
        <div class="booking-item-info">
          <h4>${food.name}</h4>
          <div>${money(food.price)} / phần</div>
        </div>
        <div class="booking-item-qty">
          <button type="button" class="qty-btn" data-booking-qty="${food.id}" data-change="-1" aria-label="Giảm ${food.name}">−</button>
          <span>${item.qty}</span>
          <button type="button" class="qty-btn" data-booking-qty="${food.id}" data-change="1" aria-label="Tăng ${food.name}">+</button>
        </div>
        <div class="booking-item-subtotal">${money(food.price * item.qty)}</div>
        <button type="button" class="booking-remove" data-remove-booking-food="${food.id}" aria-label="Xóa ${food.name}" title="Xóa">✕</button>
      </div>
    `;
  }).join("");

  emptyEl.hidden = cart.length > 0;
  document.getElementById("bookingTotal").textContent = money(getCartTotal());
}

document.getElementById("addBookingFood").addEventListener("click", () => {
  const food = foods.find(item => item.id === selectedBookingFoodId);
  if (!food) {
    bookingFoodSelect.focus();
    renderBookingFoodOptions(true);
    return;
  }

  const selectedItem = cart.find(item => item.id === food.id);
  if (selectedItem) {
    selectedItem.qty += 1;
  } else {
    cart.push({ id: food.id, qty: 1 });
  }
  selectedBookingFoodId = null;
  bookingFoodSelect.value = "";
  closeBookingFoodOptions();
  renderBookingSelection();
});

document.getElementById("bookingItems").addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-booking-qty]");
  if (quantityButton) {
    const item = cart.find(entry => entry.id === Number(quantityButton.dataset.bookingQty));
    if (!item) return;
    item.qty += Number(quantityButton.dataset.change);
    if (item.qty <= 0) cart = cart.filter(entry => entry.id !== item.id);
    renderBookingSelection();
    return;
  }

  const removeButton = event.target.closest("[data-remove-booking-food]");
  if (removeButton) {
    const foodId = Number(removeButton.dataset.removeBookingFood);
    cart = cart.filter(item => item.id !== foodId);
    renderBookingSelection();
  }
});

/* ===== LỊCH SỬ ĐẶT BÀN MẪU (cố định, không lưu dữ liệu người dùng) ===== */
const sampleBookings = [
  {
    id: "DB001",
    date: "08/11/2026",
    time: "18:00",
    name: "Nguyễn Tấn Tùng",
    phone: "0900000000",
    guests: "2 người",
    paymentMethod: "Tiền mặt",
    items: [{ name: "Phở bò", price: 60000, qty: 2 }, { name: "Nem rán", price: 45000, qty: 1 }],
    total: 165000,
    status: "Đã xác nhận"
  },
  {
    id: "DB002",
    date: "09/11/2026",
    time: "19:00",
    name: "Nguyễn Tấn Tùng",
    phone: "0900000000",
    guests: "4 người",
    paymentMethod: "Trực tuyến",
    items: [{ name: "Cơm gà nướng", price: 55000, qty: 2 }, { name: "Chè ba màu", price: 25000, qty: 1 }],
    total: 135000,
    status: "Đã tiếp nhận"
  },
  {
    id: "DB003",
    date: "10/11/2026",
    time: "12:30",
    name: "Nguyễn Tấn Tùng",
    phone: "0900000000",
    guests: "3 người",
    paymentMethod: "Tiền mặt",
    items: [{ name: "Tôm xào tỏi", price: 75000, qty: 1 }],
    total: 75000,
    status: "Đã xác nhận"
  }
];

/* ===== GỬI YÊU CẦU ĐẶT BÀN ===== */
document.getElementById("bookingForm").addEventListener("submit", function(event) {
  event.preventDefault();
  cart = [];
  selectedBookingFoodId = null;
  closeBookingFoodOptions();
  document.querySelectorAll("#bookingForm input, #bookingForm select, #bookingForm textarea").forEach(field => {
    field.value = "";
  });
  renderBookingSelection();
});

/* ===== LỊCH SỬ ĐẶT BÀN ===== */
document.getElementById("bookingHistoryBtn").addEventListener("click", () => {
  renderBookingHistory();
  document.getElementById("bookingHistoryDialog").showModal();
});

function renderBookingHistory() {
  const listEl = document.getElementById("bookingHistoryList");
  const emptyEl = document.getElementById("bookingHistoryEmpty");
  const bookings = currentUser ? sampleBookings : [];
  emptyEl.textContent = currentUser
    ? "Bạn chưa có lịch sử đặt bàn nào."
    : "Vui lòng đăng nhập để xem lịch sử đặt bàn.";
  emptyEl.hidden = bookings.length > 0;
  listEl.innerHTML = bookings.map(booking => {
    const items = Array.isArray(booking.items) ? booking.items : [];
    const itemMarkup = items.length
      ? items.map(item => `<div>${escapeHtml(item.name)} × ${Number(item.qty)} — ${money(Number(item.price) * Number(item.qty))}</div>`).join("")
      : "<div>Chưa chọn món</div>";
    return `
      <article class="booking-card">
        <div class="booking-history-header">
          <strong>${escapeHtml(booking.id)}</strong>
          <span>${escapeHtml(booking.date)} · ${escapeHtml(booking.time)}</span>
          <span class="booking-status booking-status-pending">${escapeHtml(booking.status)}</span>
        </div>
        <div class="booking-history-details">
          <div><strong>Khách hàng:</strong> ${escapeHtml(booking.name)}</div>
          <div><strong>Số điện thoại:</strong> ${escapeHtml(booking.phone)}</div>
          <div><strong>Số khách:</strong> ${escapeHtml(booking.guests)}</div>
          <div><strong>Thanh toán:</strong> ${escapeHtml(booking.paymentMethod)}</div>
          <div class="booking-history-items"><strong>Món đã đặt:</strong>${itemMarkup}</div>
          ${booking.note ? `<div class="booking-history-items"><strong>Ghi chú:</strong> ${escapeHtml(booking.note)}</div>` : ""}
        </div>
        <div class="booking-history-total"><strong>Tổng tiền món:</strong> ${money(Number(booking.total) || 0)}</div>
      </article>
    `;
  }).join("");
}

/* ===== ĐĂNG NHẬP / ĐĂNG KÝ ===== */
// Tabs
document.querySelectorAll(".dialog-tabs .tab-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".dialog-tabs .tab-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    document.getElementById(this.dataset.tab === "login" ? "tabLogin" : "tabRegister").classList.add("active");
  });
});

document.getElementById("loginToggle").addEventListener("click", () => {
  document.getElementById("loginDialog").showModal();
});

document.getElementById("userMenuToggle").addEventListener("click", () => {
  const options = document.getElementById("userMenuOptions");
  const isExpanded = options.hidden;
  options.hidden = !isExpanded;
  document.getElementById("userMenuToggle").setAttribute("aria-expanded", String(isExpanded));
});

document.addEventListener("click", event => {
  if (!event.target.closest(".user-menu")) closeUserMenu();
});

document.getElementById("editCustomerBtn").addEventListener("click", () => {
  if (!currentUser) return;
  document.getElementById("profileName").value = currentUser.name;
  document.getElementById("profileEmail").value = currentUser.email;
  document.getElementById("profilePhone").value = currentUser.phone;
  document.getElementById("profileAddress").value = currentUser.address;
  closeUserMenu();
  document.getElementById("customerProfileDialog").showModal();
});

document.querySelector("#customerProfileDialog .close-dialog").addEventListener("click", () => {
  document.getElementById("customerProfileDialog").close();
});

document.getElementById("customerProfileForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!currentUser) return;
  document.getElementById("customerProfileDialog").close();
});

document.querySelector("#loginDialog .close-dialog").addEventListener("click", () => {
  document.getElementById("loginDialog").close();
});

// Đăng nhập
document.getElementById("demoLogin").addEventListener("click", () => {
  const demoUser = {
    name: "Nguyễn Tấn Tùng",
    email: "demo@huongviet.local",
    phone: "0900000000",
    address: "Số 99 Đường Đồng Khởi, Phường Sài Gòn, TP. Hồ Chí Minh"
  };

  setCurrentUser(demoUser);
  setTimeout(() => {
    document.getElementById("loginDialog").close();
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
  }, 1000);
});

document.getElementById("demoRegister").addEventListener("click", () => {
  document.querySelectorAll("#tabRegister input").forEach(input => {
    input.value = "";
  });
  setCurrentUser(null);
  document.querySelector('.dialog-tabs .tab-btn[data-tab="login"]').click();
  document.getElementById("loginDialog").close();
});

// Đăng xuất
document.getElementById("logoutBtn").addEventListener("click", () => {
  logout();
});

/* ===== HEADER MENU MOBILE ===== */
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelectorAll("#nav a").forEach(navLink => {
    navLink.classList.toggle("active", navLink === link);
  });
  document.getElementById("nav").classList.remove("open");
}));

/* ===== ĐẶT BÀN ===== */
/* ===== KHỞI TẠO ===== */
renderFoods();
renderBookingSelection();
restoreCurrentUser();

/* ===== Hero Slider ===== */
(function() {
  const heroImages = [
    "images/restaurant.jpg",
    "images/restaurant1.webp",
    "images/restaurant2.webp"
  ];
  const hero = document.querySelector(".hero");
  const dots = document.querySelectorAll(".hero-dots span");
  let currentSlide = 0;
  let autoSlideTimer = null;

  function setSlide(index) {
    currentSlide = index;
    hero.style.backgroundImage =
      "linear-gradient(90deg,#1c1009d9 0%,#1c1009a8 43%,#1c100900 100%)," +
      "url('" + heroImages[index] + "')";
    dots.forEach(function(dot, i) {
      dot.style.background = i === index ? "var(--gold)" : "#ffffff8c";
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(function() {
      setSlide((currentSlide + 1) % heroImages.length);
    }, 4000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  dots.forEach(function(dot, i) {
    dot.style.cursor = "pointer";
    dot.addEventListener("click", function() {
      setSlide(i);
      startAutoSlide();
    });
  });

  setSlide(0);
  startAutoSlide();
})();
