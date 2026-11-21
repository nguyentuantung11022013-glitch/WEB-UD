/* ===== DỮ LIỆU MÓN ĂN ===== */
const foods = [
  {id:1,name:"Phở bò",category:"mon-chinh",description:"Nước dùng thanh ngọt, thịt bò mềm thơm. Phở bò truyền thống với bánh phở mềm, rau thơm và gia vị đặc biệt.",fullDescription:"Phở bò được ninh từ xương bò trong nhiều giờ cùng hồi, quế, gừng nướng và hành nướng để tạo nên nước dùng trong, ngọt thanh mà vẫn đậm hương. Bánh phở mềm vừa tới, thịt bò tái được xếp đều trên bát, ăn kèm rau thơm, giá đỗ, chanh và ớt.",ingredients:"Xương bò, bánh phở, thịt bò, hành, gừng, hồi, quế, rau thơm",preparation:"Ninh nước dùng lâu, trụng bánh phở, xếp thịt bò và chan nước dùng nóng",flavor:"Ngọt thanh · Đậm đà · Ấm bụng",price:60000,image:"images/pho.jpg"},
  {id:2,name:"Nem rán",category:"khai-vi",description:"Giòn rụm, đậm đà hương vị truyền thống. Nhân nem gồm thịt heo xay, miến, mộc nhĩ và rau củ.",fullDescription:"Nem rán có lớp vỏ bột mì vàng giòn, bên trong là nhân thịt heo xay quyện miến, mộc nhĩ, cà rốt và hành băm. Khi ăn, nem được cắt vừa miệng cùng rau sống, bún và nước mắm chua ngọt.",ingredients:"Thịt heo, miến, mộc nhĩ, cà rốt, trứng, rau sống",preparation:"Trộn nhân đều, cuốn nem, chiên vừa lửa đến khi lớp vỏ vàng giòn",flavor:"Giòn rụm · Mặn ngọt · Thơm nhân",price:45000,image:"images/nem.jpg"},
  {id:3,name:"Cơm gà nướng",category:"mon-chinh",description:"Thịt gà thơm, cơm dẻo, ăn kèm nước chấm. Gà được ướp gia vị đặc biệt và nướng than hồng.",fullDescription:"Đùi gà được ướp sả, tỏi, mật ong và nước tương rồi nướng trên lửa vừa để da vàng ướp mềm, thịt giữ được độ mọng nước. Cơm tấm dẻo thơm được dọn cùng dưa leo, cà rốt muối chua và nước mắm tỏi ớt.",ingredients:"Đùi gà, sả, tỏi, mật ong, cơm tấm, rau củ dưa muối",preparation:"Ướp gà ít nhất 30 phút, nướng đều hai mặt và hoàn thiện trên than",flavor:"Thơm lửa · Ngọt nhẹ · Béo vừa",price:55000,image:"images/com-ga.jpg"},
  {id:4,name:"Tôm xào tỏi",category:"hai-san",description:"Tôm tươi xào thơm cùng tỏi và rau củ. Tôm sú lớn được chế biến giòn ngọt tự nhiên.",fullDescription:"Tôm sú tươi được bóc vỏ và để nguyên đuôi, nhanh tay xào trên lửa lớn cùng tỏi phi vàng, hành lá và rau củ giòn. Món mang vị ngọt tự nhiên của tôm, thơm mùi tỏi và có phần sốt bám đều.",ingredients:"Tôm sú, tỏi, hành lá, ớt chuông, dầu ăn, gia vị",preparation:"Phi tỏi cho thơm, xào tôm ngắn để giữ độ dai ngọt",flavor:"Ngọt tôm · Thơm tỏi · Hơi cay",price:75000,image:"images/tom-xao-toi.png"},
  {id:5,name:"Thịt kho tàu",category:"mon-chinh",description:"Thịt mềm, béo ngậy, đậm vị quê nhà. Thịt ba chỉ kho nước dừa cùng trứng vịt.",fullDescription:"Thịt ba chỉ cắt miếng vừa ăn được đảo sơ để ráo nước rồi kho cùng nước dừa tươi, trứng vịt và hành tím. Nước kho sệt, màu cánh gián; thịt mềm béo, thấm gia vị và ăn cùng cơm nóng rất hợp.",ingredients:"Thịt ba chỉ, trứng vịt, nước dừa, hành tím, tiêu, nước mắm",preparation:"Rim thịt với nước màu, kho nhỏ lửa cùng trứng đến khi mềm",flavor:"Béo ngậy · Đậm đà · Ngọt bùi",price:50000,image:"images/thit-kho-tau.jpg"},
  {id:6,name:"Gỏi cuốn",category:"khai-vi",description:"Rau tươi, tôm thịt, dùng cùng nước chấm. Gỏi cuốn tôm thịt thơm mát kèm tương đậu phộng.",fullDescription:"Mỗi cuốn gỏi gồm tôm sú chín, thịt ba chỉ luộc, bún, xà lách, húng quế và rau thơm cuốn trong bánh tráng mỏng. Món có vị mát, ít dầu mỡ, dùng kèm tương đậu phộng bùi béo và nước chấm chua ngọt.",ingredients:"Bánh tráng, tôm, thịt ba chỉ, bún, xà lách, húng quế, đậu phộng",preparation:"Luộc tôm và thịt, sơ bánh tráng, cuốn chặt và dọn kèm nước chấm",flavor:"Thanh mát · Bùi béo · Thơm rau",price:35000,image:"images/goi-cuon.png"},
  {id:7,name:"Cá kho tộ",category:"mon-chinh",description:"Cá kho đậm vị, ăn cùng cơm nóng. Cá lóc kho tộ đất với nước màu, tiêu và hành.",fullDescription:"Cá lóc tươi được làm sạch, cắt khúc và ướp kỹ nước mắm, đường thốt nốt, tiêu và hành. Cá kho trong nồi đất nhỏ lửa để thịt săn lại, thấm đều nước kho sánh, thơm mùi hành và tiêu.",ingredients:"Cá lóc, nước mắm, đường thốt nốt, tiêu, hành, nước màu",preparation:"Ướp cá, kho trong tộ đất ở lửa nhỏ đến khi nước kho sệt",flavor:"Đậm đà · Cay nhẹ · Mặn ngọt",price:68000,image:"images/ca-kho-to.webp"},
  {id:8,name:"Mực xào rau củ",category:"hai-san",description:"Mực tươi giòn kết hợp rau củ theo mùa. Mực ống xào cùng ớt chuông, hành tây và cần tỏi.",fullDescription:"Mực ống tươi được rửa sạch, cắt hoa và xào nhanh cùng ớt chuông đỏ, hành tây, cần tỏi và nấm. Món giữ độ giòn ngọt của mực, rau củ vẫn tươi, đượm mùi hành tỏi và sốt tiêu.",ingredients:"Mực ống, ớt chuông, hành tây, cần tỏi, nấm, tỏi, tiêu",preparation:"Xào mực lửa lớn trong thời gian ngắn để không bị dai",flavor:"Giòn ngọt · Thơm rau · Cay nhẹ",price:82000,image:"images/muc-xao-rau-cu.png"},
  {id:9,name:"Chả giò hải sản",category:"khai-vi",description:"Lớp vỏ vàng giòn với nhân hải sản. Nhân gồm tôm, cua và rau củ xắt nhuyễn.",fullDescription:"Chả giò hải sản có nhân tôm, thịt cua, nấm mèo, miến và rau củ xắt nhỏ, cuốn trong bánh tráng rồi chiên vàng. Lớp vỏ giòn rụm bên ngoài, nhân đậm đà bên trong, ăn cùng rau sống và nước mắm chua ngọt.",ingredients:"Tôm, thịt cua, nấm mèo, miến, cà rốt, bánh tráng",preparation:"Xào nhân, cuốn chặt, chiên hai lửa để vỏ vàng giòn đều",flavor:"Giòn rụm · Ngọt hải sản · Béo nhẹ",price:49000,image:"images/cha-gio-hai-san.jpg"},
  {id:10,name:"Bún thịt nướng",category:"mon-chinh",description:"Thịt nướng thơm, bún tươi và rau sống. Thịt heo ướp sả nướng mọi kèm nước mắm chua ngọt.",fullDescription:"Thịt heo được ướp sả, tỏi, nước mắm và chút mỡ hành rồi nướng than vàng cạnh, giữ độ mềm bên trong. Bún tươi được dọn cùng rau sống, đồ chua, đậu phộng rang và nước mắm chua ngọt.",ingredients:"Thịt heo, sả, tỏi, bún tươi, rau sống, đậu phộng, đồ chua",preparation:"Ướp thịt đậm vị, nướng than than hồng và rắc mỡ hành",flavor:"Thơm sả · Ngọt thịt · Chua thanh",price:52000,image:"images/bun-thit-nuong.webp"},
  // --- TRÁNG MIỆNG ---
  {id:11,name:"Chè ba màu",category:"trang-mieng",description:"Chè ba màu mát lạnh gồm đậu đỏ, đậu xanh, rau câu và nước cốt dừa.",fullDescription:"Chè ba màu có ba lớp màu rực rỡ là đậu đỏ nấu mềm, đậu xanh xay mịn và rau câu giòn. Khi dọn, chè được xếp đẹp trong ly với đá bào, nước đường hoa bưởi và một lớp nước cốt dừa béo ngậy.",ingredients:"Đậu đỏ, đậu xanh, rau câu, nước cốt dừa, đường, đá bào",preparation:"Nấu từng nguyên liệu riêng, để nguội và xếp lớp trước khi rót cốt dừa",flavor:"Ngọt dịu · Béo dừa · Mát lạnh",price:25000,image:"images/che-ba-mau.jpg"},
  {id:12,name:"Bánh flan",category:"trang-mieng",description:"Bánh flan mềm mịn vị caramel, dùng lạnh thơm béo vị trứng và vani.",fullDescription:"Bánh flan được nướng ủ trong nồi hấp để đạt độ mịn, đều và không bị rỗ. Lớp caramel đen hổ phách được làm từ đường thắng tạo vị đắng nhẹ, cân bằng với trứng sữa béo và hương vani.",ingredients:"Trứng gà, sữa tươi, sữa đặc, đường, vani",preparation:"Đánh hỗn hợp nhẹ, lọc qua rây và hấp cách thủy ở nhiệt độ thấp",flavor:"Mềm mịn · Béo sữa · Caramel thơm",price:20000,image:"images/banh-flan.jpg"},
  {id:13,name:"Kem xoài dừa",category:"trang-mieng",description:"Kem xoài tự làm kết hợp nước cốt dừa tươi, mát lạnh sảng khoái.",fullDescription:"Kem xoài dừa làm từ xoài chín xay nhuyễn, nước cốt dừa và kem sữa để tạo độ béo nhẹ. Khi dọn, kem được trang trí bằng xoài tươi cắt nhỏ, cơm dừa và lá bạc hà.",ingredients:"Xoài chín, nước cốt dừa, kem sữa, xoài tươi, cơm dừa",preparation:"Xay xoài cùng hỗn hợp kem, đông lạnh và thưởng thức khi hơi mềm",flavor:"Chua ngọt · Béo dừa · Mát lạnh",price:30000,image:"images/kem-xoai.jpg"},
  // --- THỨC UỐNG ---
  {id:14,name:"Trà sen vàng",category:"thuc-uong",description:"Trà ướp hương sen thanh khiết, dùng nóng hoặc đá đều tuyệt vời.",fullDescription:"Trà sen vàng được ướp chậm từ búp chè xanh chất lượng cùng hương sen thanh tao. Khi rót, nước trà vàng tươi, dịu hương hoa và hậu vị ngọt nhẹ; có thể thưởng thức nóng để cảm nhận hương sen rõ nhất.",ingredients:"Trà xanh, hoa sen, nước sôi, đá tùy chọn",preparation:"Hãm trà ở nhiệt độ vừa, ướp sen và phục vụ nóng hoặc với đá",flavor:"Thanh tao · Thơm sen · Hậu ngọt",price:25000,image:"images/tra-sen.jpg"},
  {id:15,name:"Bia Heineken",category:"thuc-uong",description:"Bia Heineken mát lạnh, phù hợp dùng kèm các món ăn.",fullDescription:"Bia Heineken được phục vụ lạnh, có màu vàng trong, lớp bọt nhẹ và hương hoa bia đặc trưng. Vị đắng cân bằng tạo cảm giác sảng khoái, hợp dùng kèm các món nướng hoặc hải sản.",ingredients:"Bia Heineken nguyên lon hoặc chai, ly làm lạnh",preparation:"Bảo quản lạnh, mở và rót nhẹ để tạo bọt vừa đủ",flavor:"Sảng khoái · Đắng nhẹ · Hương hoa bia",price:22000,image:"images/bia-heniken.webp"},
  {id:16,name:"Nước mía chanh",category:"thuc-uong",description:"Nước mía tươi ép kèm chanh tươi và đá lạnh, giải khát tuyệt vời.",fullDescription:"Nước mía được ép tươi, giữ vị ngọt tự nhiên và mùi thơm của cây mía. Chanh tươi được vắt vào ly giúp cân bằng độ ngọt, tạo vị chua thanh và mát hơn khi dùng với nhiều đá.",ingredients:"Cây mía tươi, chanh, đường tùy chọn, đá",preparation:"Ép mía ngay khi gọi món, vắt chanh và khuấy đều",flavor:"Ngọt mát · Chua nhẹ · Giải khát",price:18000,image:"images/nuoc-mia.jpg"},
  {id:17,name:"Sinh tố bơ",category:"thuc-uong",description:"Sinh tố bơ béo ngậy xay cùng sữa đặc và đá, thức uống bổ dưỡng.",fullDescription:"Sinh tố bơ được xay nhuyễn từ bơ Booth hoặc bơ sáp chín, kết hợp sữa đặc và sữa tươi. Ly sinh tố có độ đặc mượt, vị béo tự nhiên vừa phải và ít ngọt, thích hợp dùng lạnh.",ingredients:"Bơ chín, sữa đặc, sữa tươi, đá xay",preparation:"Xay bơ, sữa và đá cho đến khi mịn, dọn trong ly lạnh",flavor:"Béo bùi · Ngọt vừa · Mịn mượt",price:28000,image:"images/sinh-to-bo.jpg"},
  {id:18,name:"Cơm tấm",category:"mon-chinh",description:"Cơm tấm sườn nướng thơm, ăn kèm bì, chả trứng và nước mắm.",fullDescription:"Cơm tấm được dọn với sườn nướng vàng, bì mềm, chả trứng và đồ chua. Món ăn đậm hương vị miền Nam, ăn kèm nước mắm tỏi ớt.",ingredients:"Cơm tấm, sườn heo, bì, chả trứng, đồ chua, nước mắm",preparation:"Nướng sườn, làm chả trứng và dọn cùng cơm tấm nóng",flavor:"Thơm nướng · Đậm đà · Béo ngậy",price:65000,image:"images/cơm tấm.jpg"}
];

/* ===== DOM ELEMENTS ===== */
const foodGrid = document.getElementById("foodGrid");
const featuredFoodGrid = document.getElementById("featuredFoodGrid");
const searchInput = document.getElementById("searchInput");
const categoryOptions = document.getElementById("categoryOptions");
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

/* ===== GIỎ HÀNG MANG ĐI ===== */
let cart = [{id: 4, qty: 1}, {id: 5, qty: 1}];

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const food = getCatalogFood(item.id);
    return sum + (food ? food.price : 0);
  }, 0);
}

/* ===== TÀI KHOẢN DEMO ===== */
let currentUser = null;
const DEFAULT_DEMO_USER = {
  name: "Nguyễn Tấn Tùng",
  email: "demo@huongviet.local",
  phone: "0900000000",
  address: "Số 99 Đường Đồng Khởi, Phường Sài Gòn, TP. Hồ Chí Minh"
};
const REMOVED_ORDER_IDS = new Set(["DH1795069499862", "DH1795069468062"]);
const REMOVED_PRODUCT_NAME = "cứt";

function normalizeDemoUserName(user) {
  if (!user || typeof user !== "object") return user;
  const name = String(user.name || "").trim();
  return name.startsWith(DEFAULT_DEMO_USER.name)
    ? {...user, name: DEFAULT_DEMO_USER.name}
    : user;
}

const DEMO_ORDER_HISTORY = [
  {id:"DH001",date:"08/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:1,name:"Phở bò",price:60000,qty:2},{id:2,name:"Nem rán",price:45000,qty:1}],subtotal:165000,shipping:0,total:165000,status:"Chờ xác nhận"},
  {id:"DH002",date:"09/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:2},{id:11,name:"Chè ba màu",price:25000,qty:1}],subtotal:135000,shipping:0,total:135000,status:"Chờ xác nhận"},
  {id:"DH003",date:"10/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"78 Phan Xích Long, Bình Thạnh, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:4,name:"Tôm xào tỏi",price:75000,qty:1}],subtotal:75000,shipping:0,total:75000,status:"Chờ xác nhận"}
];

function initializeDemoOrderHistory() {
  try {
    const storedOrders = JSON.parse(localStorage.getItem("hv_orders") || "[]");
    const orders = Array.isArray(storedOrders)
      ? storedOrders.filter(order => !REMOVED_ORDER_IDS.has(String(order.id)))
      : [];
    if (Array.isArray(storedOrders) && orders.length !== storedOrders.length) {
      localStorage.setItem("hv_orders", JSON.stringify(orders));
    }
    const hasDemoOrders = orders.some(order =>
      String(order.userId || "").toLocaleLowerCase("vi") === DEFAULT_DEMO_USER.email ||
      (order.receiver && String(order.receiver.phone || "").replace(/\D/g, "") === DEFAULT_DEMO_USER.phone)
    );
    if (!hasDemoOrders) {
      localStorage.setItem("hv_orders", JSON.stringify([...DEMO_ORDER_HISTORY, ...orders]));
    }
  } catch (error) {
    console.error("Không thể khởi tạo lịch sử đặt hàng mẫu.", error);
  }
}

function readCustomerProfiles() {
  try {
    const profiles = JSON.parse(localStorage.getItem("hv_customer_profiles") || "{}");
    return profiles && typeof profiles === "object" && !Array.isArray(profiles) ? profiles : {};
  } catch (error) {
    console.error("Không thể đọc hồ sơ khách hàng đã lưu.", error);
    return {};
  }
}

function customerProfileKey(user) {
  return String(user.email || user.phone || user.name || "").trim().toLowerCase();
}

function getDemoUser() {
  const profiles = readCustomerProfiles();
  const directProfile = profiles[DEFAULT_DEMO_USER.email];
  if (directProfile) return normalizeDemoUserName(directProfile);
  const profile = Object.values(profiles).find(item =>
    item && (
      String(item.phone || "").replace(/\D/g, "") === DEFAULT_DEMO_USER.phone ||
      String(item.name || "").trim().toLocaleLowerCase("vi") === DEFAULT_DEMO_USER.name.toLocaleLowerCase("vi")
    )
  );
  return normalizeDemoUserName(profile || DEFAULT_DEMO_USER);
}

function setCurrentUser(user, previousUser = null) {
  currentUser = normalizeDemoUserName(user);
  try {
    if (currentUser) {
      localStorage.setItem("hv_customer_user", JSON.stringify(currentUser));
      const profileKey = customerProfileKey(currentUser);
      if (profileKey) {
        const profiles = readCustomerProfiles();
        if (previousUser) {
          const previousEmailKey = String(previousUser.email || "").trim().toLowerCase();
          if (previousEmailKey && previousEmailKey !== profileKey &&
              previousEmailKey !== DEFAULT_DEMO_USER.email) {
            delete profiles[previousEmailKey];
          }
          const previousPhoneKey = String(previousUser.phone || "").replace(/\D/g, "");
          Object.keys(profiles).forEach(key => {
            const profile = profiles[key];
            if (profile && String(profile.phone || "").replace(/\D/g, "") === previousPhoneKey) {
              delete profiles[key];
            }
          });
        }
        profiles[profileKey] = currentUser;
        if (previousUser &&
            String(previousUser.email || "").trim().toLowerCase() === DEFAULT_DEMO_USER.email) {
          profiles[DEFAULT_DEMO_USER.email] = currentUser;
        }
        localStorage.setItem("hv_customer_profiles", JSON.stringify(profiles));
      }
    } else {
      localStorage.removeItem("hv_customer_user");
    }
  } catch (error) {
    console.error("Không thể lưu hồ sơ khách hàng.", error);
  }
  updateUserUI();
  renderCart();
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
  document.getElementById("checkoutName").value = "";
  document.getElementById("checkoutPhone").value = "";
  document.getElementById("checkoutAddress").value = "";
  updateUserUI();
  renderCart();
}

function restoreCurrentUser() {
  try {
    const storedUser = JSON.parse(localStorage.getItem("hv_customer_user") || "null");
    currentUser = storedUser && typeof storedUser === "object"
      ? normalizeDemoUserName(storedUser)
      : null;
  } catch (error) {
    currentUser = null;
  }
  updateUserUI();
  renderCart();
}

window.addEventListener("storage", event => {
  if(event.key !== "hv_customer_profiles") return;
  if(!currentUser) return;
  try {
    const profiles = JSON.parse(localStorage.getItem("hv_customer_profiles") || "{}");
    const emailKey = String(currentUser.email || "").trim().toLowerCase();
    const phoneKey = String(currentUser.phone || "").replace(/\D/g, "");
    const updated = profiles[emailKey] || Object.values(profiles).find(profile =>
      profile && String(profile.phone || "").replace(/\D/g, "") === phoneKey
    );
    if(updated){
      currentUser = normalizeDemoUserName({...currentUser, ...updated});
      localStorage.setItem("hv_customer_user", JSON.stringify(currentUser));
      updateUserUI();
      renderCart();
    }
  } catch(error) {
    console.error("Không thể đồng bộ hồ sơ người dùng.", error);
  }
});

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

function getCatalogFood(id){
  const catalogState = readCatalogState();
  const custom = (catalogState.customProducts || []).find(food =>
    String(food.id) === String(id) && !isRemovedCatalogProduct(food)
  );
  const base = foods.find(food =>
    String(food.id) === String(id) && !isRemovedCatalogProduct(food)
  );
  if(custom && base) return {...base, ...custom};
  return custom || base || null;
}

function getFilteredFoods() {
  const catalogState = readCatalogState();
  const overrides = new Map((catalogState.customProducts || []).map(food => [String(food.id), food]));
  const defaults = foods
    .filter(food =>
      !catalogState.deletedIds.includes(String(food.id)) &&
      !catalogState.hiddenIds.includes(String(food.id)) &&
      !isRemovedCatalogProduct(food)
    )
    .map(food => overrides.has(String(food.id)) ? {...food, ...overrides.get(String(food.id))} : food)
    .filter(food => !isRemovedCatalogProduct(food));
  const defaultIds = new Set(defaults.map(food => String(food.id)));
  const custom = (catalogState.customProducts || [])
    .filter(food =>
      !isRemovedCatalogProduct(food) &&
      !defaultIds.has(String(food.id)) &&
      !catalogState.deletedIds.includes(String(food.id)) &&
      !catalogState.hiddenIds.includes(String(food.id))
    );
  return [...defaults, ...custom].filter(food =>
    true
  );
}

function readCatalogState() {
  try {
    const stored = JSON.parse(localStorage.getItem("hv_catalog_state") || "{}");
    const normalizeIds = value => Array.isArray(value)
      ? [...new Set(value.map(id => String(id)))]
      : [];
    const hiddenIds = normalizeIds(stored.hiddenIds).filter(id => !["4", "5", "18"].includes(id));
    hiddenIds.push("18");
    return {
      hiddenIds,
      deletedIds: normalizeIds(stored.deletedIds),
      customProducts: Array.isArray(stored.customProducts) ? stored.customProducts : []
    };
  } catch (error) {
    console.error("Không thể đọc trạng thái thực đơn.", error);
    return {hiddenIds: [], deletedIds: [], customProducts: []};
  }
}

function isRemovedCatalogProduct(product) {
  return String(product && product.name || "").trim().toLocaleLowerCase("vi") === REMOVED_PRODUCT_NAME;
}

function removeUnwantedCatalogProduct() {
  try {
    const stored = JSON.parse(localStorage.getItem("hv_catalog_state") || "{}");
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) {
      throw new Error("Dữ liệu thực đơn không hợp lệ.");
    }
    const customProducts = Array.isArray(stored.customProducts) ? stored.customProducts : [];
    const removedProducts = customProducts.filter(isRemovedCatalogProduct);
    if (!removedProducts.length) return;

    const deletedIds = Array.isArray(stored.deletedIds) ? stored.deletedIds.map(String) : [];
    removedProducts.forEach(product => {
      if (product.id != null) deletedIds.push(String(product.id));
    });
    localStorage.setItem("hv_catalog_state", JSON.stringify({
      ...stored,
      deletedIds: [...new Set(deletedIds)],
      customProducts: customProducts.filter(product => !isRemovedCatalogProduct(product))
    }));
  } catch (error) {
    console.error("Không thể xóa món ăn khỏi thực đơn đã lưu.", error);
    showSearchNotice("Không thể xóa món ăn khỏi thực đơn đã lưu.");
  }
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
          <button type="button" class="btn-add-cart" data-add-cart="${food.id}">Thêm giỏ</button>
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

/* ===== RENDER MÓN NỔI BẬT ===== */
function renderFeaturedFoods() {
  featuredFoodGrid.innerHTML = [1, 2, 3, 5, 8]
    .map(id => getFilteredFoods().find(food => String(food.id) === String(id)))
    .filter(Boolean)
    .map(foodCard)
    .join("");
}

function renderCatalog() {
  renderFoods();
  renderFeaturedFoods();
}

renderCatalog();

window.addEventListener("storage", event => {
  if (event.key !== "hv_catalog_state") return;
  removeUnwantedCatalogProduct();
  renderCatalog();
});

/* ===== FILTERS & SEARCH ===== */
function showSearchNotice(message = "Chức năng chỉ mang tính chất minh họa") {
  const toast = document.getElementById("searchToast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.hidden = true; }, 2800);
}

function openSearchResults(query = "", category = "all") {
  const params = new URLSearchParams();
  const searchTerm = String(query).trim();
  if (searchTerm) params.set("q", searchTerm);
  if (category && category !== "all") params.set("category", category);

  try {
    sessionStorage.setItem("hv_search_results_foods", JSON.stringify(getFilteredFoods()));
  } catch (error) {
    console.error("Không thể chuẩn bị dữ liệu tìm kiếm.", error);
    showSearchNotice("Không thể mở trang kết quả tìm kiếm. Vui lòng thử lại.");
    return;
  }

  const queryString = params.toString();
  window.location.href = `search-results.html${queryString ? `?${queryString}` : ""}`;
}

document.getElementById("basicSearchButton").addEventListener("click", () => {
  openSearchResults(searchInput.value);
});
document.getElementById("searchInput").addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  openSearchResults(searchInput.value);
});

categoryOptions.addEventListener("click", event => {
  const button = event.target.closest(".category-option");
  if (!button) return;
  openSearchResults("", button.dataset.category);
});

/* ===== TÌM KIẾM NÂNG CAO ===== */
document.getElementById("applyAdvanced").addEventListener("click", () => openSearchResults());
sortFilter.addEventListener("change", () => showSearchNotice());
document.querySelectorAll("#advancedFields input").forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    showSearchNotice();
  });
});
document.getElementById("resetAdvanced").addEventListener("click", () => {
  showSearchNotice("Chức năng đặt lại chỉ mang tính minh họa giao diện, không thực hiện thay đổi dữ liệu.");
});

/* ===== XEM CHI TIẾT MÓN ĂN ===== */
document.querySelectorAll(".food-grid").forEach(grid => grid.addEventListener("click", event => {
  const addButton = event.target.closest("button[data-add-cart]");
  if (addButton) {
    showSearchNotice("Chức năng thêm món chỉ minh họa; không thêm món thật vào giỏ hàng.");
    return;
  }

  const detailButton = event.target.closest("button[data-food]");
  if (!detailButton) return;
  const food = getCatalogFood(detailButton.dataset.food);
  if (!food) return;

  document.getElementById("detailImage").src = food.image;
  document.getElementById("detailImage").alt = food.name;
  document.getElementById("detailName").textContent = food.name;
  document.getElementById("detailCategory").textContent = categoryNames[food.category] || food.category;
  document.getElementById("detailDescription").textContent = food.description;
  document.getElementById("detailPrice").textContent = money(food.price);
  document.getElementById("detailFullDescription").textContent =
    food.fullDescription || food.description;
  document.getElementById("detailFlavor").textContent =
    food.flavor ? `Hương vị: ${food.flavor}` : "";
  document.getElementById("detailServing").textContent =
    food.category === "thuc-uong" ? "1 ly" : "1 phần";
  document.getElementById("detailIngredients").textContent =
    food.ingredients || "Nguyên liệu được lựa chọn tươi ngon theo tiêu chuẩn nhà hàng";
  document.getElementById("detailPreparation").textContent =
    food.preparation || "Chế biến mới khi khách đặt để giữ trọn hương vị";
  document.getElementById("detailAddCart").dataset.foodId = String(food.id);
  document.getElementById("foodDetailDialog").showModal();
}));

document.getElementById("detailAddCart").addEventListener("click", () => {
  showSearchNotice("Chức năng thêm món chỉ minh họa; không thêm món thật vào giỏ hàng.");
  document.getElementById("foodDetailDialog").close();
});

document.querySelector("#foodDetailDialog .close-dialog").addEventListener("click", () => {
  document.getElementById("foodDetailDialog").close();
});

/* ===== GIỎ HÀNG MANG ĐI ===== */
function renderCart() {
  const itemsEl = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");
  const checkoutForm = document.getElementById("checkoutForm");
  itemsEl.innerHTML = cart.map(item => {
    const food = getCatalogFood(item.id);
    if (!food) return "";
    return `
      <div class="cart-item">
        <img src="${food.image}" alt="${escapeHtml(food.name)}" onerror="this.src='images/restaurant.jpg'">
        <div class="cart-item-info">
          <h3>${escapeHtml(food.name)}</h3>
          <span>${money(food.price)} / phần${item.qty > 1 ? " · phần thêm miễn phí (minh họa)" : ""}</span>
        </div>
        <div class="cart-item-quantity">
          <button type="button" class="cart-quantity-subtract" data-cart-subtract-id="${item.id}" aria-label="Bớt một phần ${escapeHtml(food.name)}" ${item.qty <= 1 ? "disabled" : ""}>−</button>
          <span aria-label="Số lượng">${item.qty}</span>
          <button type="button" class="cart-quantity-add" data-cart-add-id="${item.id}" aria-label="Thêm một phần ${escapeHtml(food.name)}">+</button>
        </div>
        <strong class="cart-item-subtotal">${money(food.price)}</strong>
      </div>
    `;
  }).join("");

  const itemCount = cart.length;
  document.getElementById("cartCount").textContent = String(itemCount);
  document.getElementById("cartButton").setAttribute("aria-label", `Giỏ hàng, ${itemCount} món`);
  emptyEl.hidden = cart.length > 0;
  checkoutForm.hidden = cart.length === 0;
  if (currentUser && !document.getElementById("checkoutName").value.trim()) {
    document.getElementById("checkoutName").value = currentUser.name || "";
  }
  if (currentUser && !document.getElementById("checkoutPhone").value.trim()) {
    document.getElementById("checkoutPhone").value = currentUser.phone || "";
  }
  const accountAddressOption = document.getElementById("accountAddressOption");
  const accountAddressRadio = document.querySelector('input[name="deliveryAddressChoice"][value="account"]');
  const customAddressRadio = document.querySelector('input[name="deliveryAddressChoice"][value="custom"]');
  const customAddressInput = document.getElementById("checkoutAddress");
  const hasAccountAddress = Boolean(currentUser && currentUser.address && currentUser.address.trim());
  accountAddressOption.hidden = !hasAccountAddress;
  document.getElementById("checkoutProfileAddress").textContent = hasAccountAddress
    ? currentUser.address
    : "";
  if (!hasAccountAddress) customAddressRadio.checked = true;
  if (hasAccountAddress && !accountAddressRadio.checked && !customAddressRadio.checked) {
    accountAddressRadio.checked = true;
  }
  customAddressInput.disabled = accountAddressRadio.checked && hasAccountAddress;
  customAddressInput.required = !customAddressInput.disabled;
  document.getElementById("cartTotal").textContent = money(getCartTotal());
}

document.querySelectorAll('input[name="deliveryAddressChoice"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const useAccountAddress = radio.value === "account" && radio.checked;
    const addressInput = document.getElementById("checkoutAddress");
    addressInput.disabled = useAccountAddress;
    addressInput.required = !useAccountAddress;
  });
});

function showCheckoutMessage(message, isError = false) {
  const messageEl = document.getElementById("checkoutMessage");
  messageEl.textContent = message;
  messageEl.classList.toggle("is-error", isError);
  messageEl.hidden = false;
}

function renderCustomerOrderHistory(phoneLookup = "") {
  const historyEl = document.getElementById("customerOrderHistory");
  let orders;
  try {
    const storedValue = localStorage.getItem("hv_orders");
    orders = storedValue ? JSON.parse(storedValue) : [];
    if (!Array.isArray(orders)) {
      throw new Error("Danh sách đơn hàng không hợp lệ.");
    }
  } catch (error) {
    console.error("Không thể đọc lịch sử đặt hàng.", error);
    historyEl.textContent = "Không thể tải lịch sử đặt hàng. Vui lòng thử lại.";
    return;
  }

  const lookupPhone = String(phoneLookup).replace(/\D/g, "");
  const email = !lookupPhone && currentUser && currentUser.email
    ? currentUser.email.toLocaleLowerCase("vi")
    : "";
  const phone = lookupPhone || (currentUser && currentUser.phone
    ? currentUser.phone.replace(/\D/g, "")
    : "");
  const customerOrders = orders
    .filter(order => {
      const orderEmail = typeof order.userId === "string" ? order.userId.toLocaleLowerCase("vi") : "";
      const orderPhone = order.receiver && order.receiver.phone
        ? String(order.receiver.phone).replace(/\D/g, "")
        : "";
      return (email && orderEmail === email) || (phone && orderPhone === phone);
    })
    .sort((a, b) => String(b.id || "").localeCompare(String(a.id || ""), undefined, {numeric: true}));

  if (!customerOrders.length) {
    historyEl.innerHTML = `<p class="customer-order-history-empty">${
      lookupPhone ? "Không tìm thấy đơn hàng với số điện thoại này." : "Bạn chưa có đơn hàng nào."
    }</p>`;
    return;
  }

  historyEl.innerHTML = customerOrders.map(order => {
    const items = Array.isArray(order.items) ? order.items : [];
    const detailUrl = `order-detail.html?id=${encodeURIComponent(order.id || "")}&from=customer`;

    return `
      <article class="customer-order-card">
        <div class="customer-order-heading">
          <strong>${escapeHtml(order.id || "Đơn hàng")}</strong>
          <span>${escapeHtml(order.status || "Chờ xác nhận")}</span>
        </div>
        <p>${escapeHtml(order.date || "")} · ${money(Number(order.total) || 0)}</p>
        <p>${items
          .map(item => `${escapeHtml(item.name || "Món ăn")} × ${Number(item.qty) || 0}`)
          .join(", ")}</p>
        <div class="customer-order-card-actions">
          <a class="customer-order-detail-btn" href="${detailUrl}">🔍 Chi tiết</a>
        </div>
      </article>
    `;
  }).join("");
}

function addDemoCartQuantity(foodId) {
  const item = cart.find(cartItem => cartItem.id === foodId);
  if (!item) {
    showSearchNotice("Chỉ có thể thêm số lượng Tôm xào tỏi và Thịt kho tàu.");
    return;
  }

  item.qty += 1;
  renderCart();
  showSearchNotice(`Đã thêm ${getCatalogFood(foodId).name}. Tổng tiền minh họa vẫn giữ nguyên.`);
}

function subtractDemoCartQuantity(foodId) {
  const item = cart.find(cartItem => cartItem.id === foodId);
  if (!item || item.qty <= 1) return;

  item.qty -= 1;
  renderCart();
  showSearchNotice(`Đã bớt ${getCatalogFood(foodId).name}. Tổng tiền minh họa vẫn giữ nguyên.`);
}

document.getElementById("cartItems").addEventListener("click", event => {
  const subtractButton = event.target.closest("button[data-cart-subtract-id]");
  if (subtractButton) {
    subtractDemoCartQuantity(Number(subtractButton.dataset.cartSubtractId));
    return;
  }

  const addButton = event.target.closest("button[data-cart-add-id]");
  if (!addButton) return;
  addDemoCartQuantity(Number(addButton.dataset.cartAddId));
});

document.getElementById("cartButton").addEventListener("click", () => {
  document.getElementById("cartDialog").showModal();
});
document.getElementById("closeCartButton").addEventListener("click", () => {
  document.getElementById("cartDialog").close();
});
document.getElementById("continueShopping").addEventListener("click", () => {
  document.getElementById("cartDialog").close();
  document.getElementById("thuc-don").scrollIntoView({behavior: "smooth"});
});
document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  window.location.reload();
});
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

document.getElementById("orderHistoryBtn").addEventListener("click", () => {
  closeUserMenu();
  document.getElementById("orderHistoryLookupForm").hidden = true;
  renderCustomerOrderHistory();
  document.getElementById("orderHistoryDialog").showModal();
});
document.getElementById("orderHistoryLookupForm").addEventListener("submit", event => {
  event.preventDefault();
  const phone = document.getElementById("orderHistoryPhone").value.replace(/\D/g, "");
  const message = document.getElementById("orderHistoryLookupMessage");
  if (phone.length < 8 || phone.length > 15) {
    message.textContent = "Vui lòng nhập số điện thoại hợp lệ.";
    message.hidden = false;
    return;
  }
  message.hidden = true;
  renderCustomerOrderHistory(phone);
});
document.querySelector("#orderHistoryDialog .close-dialog").addEventListener("click", () => {
  document.getElementById("orderHistoryDialog").close();
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
  document.getElementById("customerProfileDialog").close();
  showSearchNotice("Chỉnh sửa thông tin chỉ mang tính minh họa giao diện, không thực hiện thay đổi dữ liệu.");
});

document.querySelector("#loginDialog .close-dialog").addEventListener("click", () => {
  document.getElementById("loginDialog").close();
});

// Đăng nhập và đăng ký đều dùng chung tài khoản mẫu, không xác thực hay lưu mật khẩu.
function loginToDemoAccount() {
  setCurrentUser({...getDemoUser()});
  setTimeout(() => {
    document.getElementById("loginDialog").close();
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
  }, 1000);
}

document.getElementById("demoLogin").addEventListener("click", loginToDemoAccount);

document.getElementById("demoRegister").addEventListener("click", () => {
  document.getElementById("registerMessage").hidden = true;
  document.querySelector('.dialog-tabs .tab-btn[data-tab="login"]').click();
  loginToDemoAccount();
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

/* ===== KHỞI TẠO ===== */
initializeDemoOrderHistory();
removeUnwantedCatalogProduct();
renderCatalog();
renderCart();
restoreCurrentUser();
if (new URLSearchParams(window.location.search).get("openOrderHistory") === "1") {
  document.getElementById("orderHistoryLookupForm").hidden = true;
  renderCustomerOrderHistory();
  document.getElementById("orderHistoryDialog").showModal();
  const returnUrl = new URL(window.location.href);
  returnUrl.searchParams.delete("openOrderHistory");
  window.history.replaceState(null, "", returnUrl.href);
}

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
