'use strict';
/* ================================================================
   ADMIN.JS – Nhà Hàng Hương Việt
   Toàn bộ chạy client-side; dữ liệu lưu trong biến JS (phiên trang)
   và tham chiếu sang localStorage của trang người dùng.
   ================================================================ */

/* ===== DỮ LIỆU MÓN ĂN GỐC (đồng bộ với script.js) ===== */
const defaultFoods = [
  {id:1,name:"Phở bò",category:"mon-chinh",description:"Nước dùng thanh ngọt, thịt bò mềm thơm. Phở bò truyền thống với bánh phở mềm, rau thơm và gia vị đặc biệt.",price:60000,image:"images/pho.jpg",hidden:false},
  {id:2,name:"Nem rán",category:"khai-vi",description:"Giòn rụm, đậm đà hương vị truyền thống. Nhân nem gồm thịt heo xay, miến, mộc nhĩ và rau củ.",price:45000,image:"images/nem.jpg",hidden:false},
  {id:3,name:"Cơm gà nướng",category:"mon-chinh",description:"Thịt gà thơm, cơm dẻo, ăn kèm nước chấm. Gà được ướp gia vị đặc biệt và nướng than hồng.",price:55000,image:"images/com-ga.jpg",hidden:false},
  {id:4,name:"Tôm xào tỏi",category:"hai-san",description:"Tôm tươi xào thơm cùng tỏi và rau củ. Tôm sú lớn được chế biến giòn ngọt tự nhiên.",price:75000,image:"images/tom-xao-toi.png",hidden:false},
  {id:5,name:"Thịt kho tàu",category:"mon-chinh",description:"Thịt mềm, béo ngậy, đậm vị quê nhà. Thịt ba chỉ kho nước dừa cùng trứng vịt.",price:50000,image:"images/thit-kho-tau.jpg",hidden:false},
  {id:6,name:"Gỏi cuốn",category:"khai-vi",description:"Rau tươi, tôm thịt, dùng cùng nước chấm. Gỏi cuốn tôm thịt thơm mát kèm tương đậu phộng.",price:35000,image:"images/goi-cuon.png",hidden:false},
  {id:7,name:"Cá kho tộ",category:"mon-chinh",description:"Cá kho đậm vị, ăn cùng cơm nóng. Cá lóc kho tộ đất với nước màu, tiêu và hành.",price:68000,image:"images/ca-kho-to.webp",hidden:false},
  {id:8,name:"Mực xào rau củ",category:"hai-san",description:"Mực tươi giòn kết hợp rau củ theo mùa. Mực ống xào cùng ớt chuông, hành tây và cần tỏi.",price:82000,image:"images/muc-xao-rau-cu.png",hidden:false},
  {id:9,name:"Chả giò hải sản",category:"khai-vi",description:"Lớp vỏ vàng giòn với nhân hải sản. Nhân gồm tôm, cua và rau củ xắt nhuyễn.",price:49000,image:"images/cha-gio-hai-san.jpg",hidden:false},
  {id:10,name:"Bún thịt nướng",category:"mon-chinh",description:"Thịt nướng thơm, bún tươi và rau sống. Thịt heo ướp sả nướng mọi kèm nước mắm chua ngọt.",price:52000,image:"images/bun-thit-nuong.webp",hidden:false},
  {id:11,name:"Chè ba màu",category:"trang-mieng",description:"Chè ba màu mát lạnh gồm đậu đỏ, đậu xanh, rau câu và nước cốt dừa.",price:25000,image:"images/che-ba-mau.jpg",hidden:false},
  {id:12,name:"Bánh flan",category:"trang-mieng",description:"Bánh flan mềm mịn vị caramel, dùng lạnh thơm béo vị trứng và vani.",price:20000,image:"images/banh-flan.jpg",hidden:false},
  {id:13,name:"Kem xoài dừa",category:"trang-mieng",description:"Kem xoài tự làm kết hợp nước cốt dừa tươi, mát lạnh sảng khoái.",price:30000,image:"images/kem-xoai.jpg",hidden:false},
  {id:14,name:"Trà sen vàng",category:"thuc-uong",description:"Trà ướp hương sen thanh khiết, dùng nóng hoặc đá đều tuyệt vời.",price:25000,image:"images/tra-sen.jpg",hidden:false},
  {id:15,name:"Bia Heineken",category:"thuc-uong",description:"Bia Heineken mát lạnh, phù hợp dùng kèm các món ăn.",price:22000,image:"images/bia-heniken.webp",hidden:false},
  {id:16,name:"Nước mía chanh",category:"thuc-uong",description:"Nước mía tươi ép kèm chanh tươi và đá lạnh, giải khát tuyệt vời.",price:18000,image:"images/nuoc-mia.jpg",hidden:false},
  {id:17,name:"Sinh tố bơ",category:"thuc-uong",description:"Sinh tố bơ béo ngậy xay cùng sữa đặc và đá, thức uống bổ dưỡng.",price:28000,image:"images/sinh-to-bo.jpg",hidden:false}
];

const CATEGORY_NAMES = {
  "mon-chinh":"Món chính","khai-vi":"Khai vị","hai-san":"Hải sản",
  "trang-mieng":"Tráng miệng","thuc-uong":"Thức uống"
};

/* ===== TRẠNG THÁI ĐƠN ĐẶT BÀN (chỉ cập nhật xuôi) ===== */
const ORDER_STATUS_FLOW = [
  "Chờ nhận bàn","Đang phục vụ","Hoàn thành","Đã hủy"
];
const STATUS_BADGE = {
  "Chờ nhận bàn":"badge-pending",
  "Đang phục vụ":"badge-shipping",
  "Hoàn thành":"badge-done",
  "Đã hủy":"badge-cancel",
  // Tương thích ngược với dữ liệu cũ trong localStorage
  "Chờ xác nhận":"badge-pending",
  "Đã xác nhận":"badge-confirmed",
  "Đang giao":"badge-shipping",
  "Giao thành công":"badge-done",
  "Huỷ đơn":"badge-cancel"
};
/* Map trạng thái cũ sang trạng thái mới phù hợp nghiệp vụ đặt bàn */
const STATUS_MIGRATION = {
  "Chờ xác nhận":"Chờ nhận bàn",
  "Đã xác nhận":"Chờ nhận bàn",
  "Đang giao":"Đang phục vụ",
  "Giao thành công":"Hoàn thành",
  "Huỷ đơn":"Đã hủy"
};

/* ===== DỮ LIỆU RUNTIME (chỉ trong trang admin, không đồng bộ sang trang người dùng) ===== */
let products = JSON.parse(JSON.stringify(defaultFoods)); // copy deep

// Users: dữ liệu mẫu cố định, không ghi vào cơ sở dữ liệu.
const sampleUsers = [
  {name:"Nguyễn Văn An",email:"an@email.com",phone:"0901234567",address:"Phường Sài Gòn, TP.HCM",locked:false},
  {name:"Trần Thị Bình",email:"binh@email.com",phone:"0912345678",address:"Phường Nhiêu Lộc, TP.HCM",locked:false},
  {name:"Lê Minh Cường",email:"cuong@email.com",phone:"0923456789",address:"Phường Thạnh Mỹ Tây, TP.HCM",locked:true},
  {name:"Dương Thị Mai",email:"mai@email.com",phone:"0934567890",address:"Phường Chợ Lớn, TP.HCM",locked:false},
  {name:"Phạm Quốc Bảo",email:"bao@email.com",phone:"0945678901",address:"Phường Tân Hưng, TP.HCM",locked:false},
  {name:"Võ Ngọc Hà",email:"ha@email.com",phone:"0956789012",address:"Phường Thủ Đức, TP.HCM",locked:false},
  {name:"Đặng Minh Khoa",email:"khoa@email.com",phone:"0967890123",address:"Phường Tân Sơn Nhất, TP.HCM",locked:false},
  {name:"Bùi Thanh Trúc",email:"truc@email.com",phone:"0978901234",address:"Phường An Hội Đông, TP.HCM",locked:false},
  {name:"Hoàng Gia Huy",email:"huy@email.com",phone:"0989012345",address:"Phường Vườn Lài, TP.HCM",locked:false},
  {name:"Nguyễn Thu Trang",email:"trang@email.com",phone:"0990123456",address:"Phường Cầu Kiệu, TP.HCM",locked:false},
  {name:"Phan Minh Tuấn",email:"tuan.phan@email.com",phone:"0901112233",address:"Phường Bến Thành, TP.HCM",locked:false},
  {name:"Lê Thị Ngọc",email:"ngoc.le@email.com",phone:"0902223344",address:"Phường Tân Định, TP.HCM",locked:false},
  {name:"Trần Quốc Việt",email:"viet.tran@email.com",phone:"0903334455",address:"Phường Bình Thạnh, TP.HCM",locked:false},
  {name:"Đỗ Mỹ Linh",email:"linh.do@email.com",phone:"0904445566",address:"Phường Gia Định, TP.HCM",locked:false},
  {name:"Vũ Thành Đạt",email:"dat.vu@email.com",phone:"0905556677",address:"Phường Phú Nhuận, TP.HCM",locked:false},
  {name:"Hoàng Thị Lan",email:"lan.hoang@email.com",phone:"0906667788",address:"Phường Cầu Kiệu, TP.HCM",locked:false},
  {name:"Đặng Anh Tuấn",email:"anh.tuan@email.com",phone:"0907778899",address:"Phường Tân Sơn Hòa, TP.HCM",locked:false},
  {name:"Bùi Thanh Hằng",email:"hang.bui@email.com",phone:"0908889900",address:"Phường Chợ Quán, TP.HCM",locked:false},
  {name:"Ngô Hải Nam",email:"nam.ngo@email.com",phone:"0909990011",address:"Phường Xóm Chiếu, TP.HCM",locked:false},
  {name:"Phạm Thuỳ Dương",email:"duong.pham@email.com",phone:"0910001122",address:"Phường An Hội Tây, TP.HCM",locked:false},
  {name:"Nguyễn Tấn Tùng",email:"demo@huongviet.local",phone:"0900000000",address:"Số 99 Đường Đồng Khởi, Phường Sài Gòn, TP. Hồ Chí Minh",locked:false}
];
let users = sampleUsers.map(user => ({...user}));

// Đơn đặt bàn: đọc từ localStorage người dùng (hv_orders)
const sampleOrders = [
  {id:"DH001",date:"08/11/2026",time:"18:00",guests:"2 người",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:1,name:"Phở bò",price:60000,qty:2},{id:2,name:"Nem rán",price:45000,qty:1}],subtotal:165000,shipping:0,total:165000,status:"Chờ nhận bàn"},
  {id:"DH002",date:"09/11/2026",time:"19:00",guests:"4 người",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:2},{id:11,name:"Chè ba màu",price:25000,qty:1}],subtotal:135000,shipping:0,total:135000,status:"Chờ nhận bàn"},
  {id:"DH003",date:"10/11/2026",time:"12:30",guests:"3 người",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"78 Phan Xích Long, Bình Thạnh, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:4,name:"Tôm xào tỏi",price:75000,qty:1}],subtotal:75000,shipping:0,total:75000,status:"Chờ nhận bàn"},
  {id:"DH004",date:"04/11/2026, 10:00:00",userId:"an@email.com",receiver:{name:"Nguyễn Văn An",phone:"0901234567",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:5,name:"Thịt kho tàu",price:50000,qty:3}],subtotal:150000,shipping:0,total:150000,status:"Chờ xác nhận"},
  {id:"DH005",date:"05/11/2026, 14:45:00",userId:"binh@email.com",receiver:{name:"Trần Thị Bình",phone:"0912345678",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:7,name:"Cá kho tộ",price:68000,qty:2},{id:14,name:"Trà sen vàng",price:25000,qty:2}],subtotal:186000,shipping:0,total:186000,status:"Giao thành công"},
  {id:"DH006",date:"06/11/2026, 13:15:00",userId:"mai@email.com",receiver:{name:"Dương Thị Mai",phone:"0934567890",address:"25 Nguyễn Trãi, Quận 5, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:6,name:"Gỏi cuốn",price:35000,qty:2}],subtotal:70000,shipping:0,total:70000,status:"Đã xác nhận"},
  {id:"DH007",date:"07/11/2026, 11:10:00",userId:"bao@email.com",receiver:{name:"Phạm Quốc Bảo",phone:"0945678901",address:"80 Nguyễn Thị Thập, Quận 7, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:10,name:"Bún thịt nướng",price:52000,qty:2}],subtotal:104000,shipping:0,total:104000,status:"Chờ xác nhận"},
  {id:"DH008",date:"08/11/2026, 19:25:00",userId:"ha@email.com",receiver:{name:"Võ Ngọc Hà",phone:"0956789012",address:"12 Võ Văn Ngân, Thủ Đức, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:12,name:"Bánh flan",price:20000,qty:2},{id:14,name:"Trà sen vàng",price:25000,qty:1}],subtotal:65000,shipping:0,total:65000,status:"Giao thành công"},
  {id:"DH009",date:"09/11/2026, 12:00:00",userId:"khoa@email.com",receiver:{name:"Đặng Minh Khoa",phone:"0987654321",address:"40 Cộng Hòa, Tân Bình, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:0,name:"Cơm trắng",price:15000,qty:1}],subtotal:15000,shipping:15000,total:30000,status:"Đang giao"},
  {id:"DH010",date:"10/11/2026, 10:40:00",userId:"truc@email.com",receiver:{name:"Bùi Thanh Trúc",phone:"0912345670",address:"55 Phan Xích Long, Phú Nhuận, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:1}],subtotal:55000,shipping:0,total:55000,status:"Huỷ đơn"}
];
const additionalSampleOrders = [
  {id:"DH011",date:"11/11/2026, 09:20:00",userId:"mai@email.com",receiver:{name:"Dương Thị Mai",phone:"0934567890",address:"25 Nguyễn Trãi, Quận 5, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:1,name:"Phở bò",price:60000,qty:1}],subtotal:60000,shipping:0,total:60000,status:"Chờ xác nhận"},
  {id:"DH012",date:"11/11/2026, 11:45:00",userId:"bao@email.com",receiver:{name:"Phạm Quốc Bảo",phone:"0945678901",address:"80 Nguyễn Thị Thập, Quận 7, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:6,name:"Gỏi cuốn",price:35000,qty:2}],subtotal:70000,shipping:0,total:70000,status:"Đã xác nhận"},
  {id:"DH013",date:"12/11/2026, 12:10:00",userId:"ha@email.com",receiver:{name:"Võ Ngọc Hà",phone:"0956789012",address:"12 Võ Văn Ngân, Thủ Đức, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:11,name:"Chè ba màu",price:25000,qty:2}],subtotal:50000,shipping:0,total:50000,status:"Đang giao"},
  {id:"DH014",date:"12/11/2026, 18:30:00",userId:"an@email.com",receiver:{name:"Nguyễn Văn An",phone:"0901234567",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:4,name:"Thịt kho tàu",price:50000,qty:2}],subtotal:100000,shipping:0,total:100000,status:"Giao thành công"},
  {id:"DH015",date:"13/11/2026, 10:05:00",userId:"binh@email.com",receiver:{name:"Trần Thị Bình",phone:"0912345678",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:8,name:"Mực xào rau củ",price:82000,qty:1}],subtotal:82000,shipping:0,total:82000,status:"Chờ xác nhận"},
  {id:"DH016",date:"13/11/2026, 14:15:00",userId:"cuong@email.com",receiver:{name:"Lê Minh Cường",phone:"0923456789",address:"78 Phan Xích Long, Bình Thạnh, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:10,name:"Bún thịt nướng",price:52000,qty:2}],subtotal:104000,shipping:0,total:104000,status:"Đã xác nhận"},
  {id:"DH017",date:"14/11/2026, 08:50:00",userId:"trang@email.com",receiver:{name:"Nguyễn Thu Trang",phone:"0990123456",address:"Phường Cầu Kiệu, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:12,name:"Bánh flan",price:20000,qty:3}],subtotal:60000,shipping:0,total:60000,status:"Đang giao"},
  {id:"DH018",date:"14/11/2026, 17:40:00",userId:"khoa@email.com",receiver:{name:"Đặng Minh Khoa",phone:"0967890123",address:"Phường Tân Sơn Nhất, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:14,name:"Trà sen vàng",price:25000,qty:2}],subtotal:50000,shipping:0,total:50000,status:"Giao thành công"},
  {id:"DH019",date:"15/11/2026, 11:25:00",userId:"tuan.phan@email.com",receiver:{name:"Phan Minh Tuấn",phone:"0901112233",address:"Phường Bến Thành, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:1}],subtotal:55000,shipping:0,total:55000,status:"Chờ xác nhận"},
  {id:"DH020",date:"16/11/2026, 13:05:00",userId:"ngoc.le@email.com",receiver:{name:"Lê Thị Ngọc",phone:"0902223344",address:"Phường Tân Định, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:7,name:"Cá kho tộ",price:68000,qty:1}],subtotal:68000,shipping:0,total:68000,status:"Đã xác nhận"}
];

function addMissingSampleOrders(){
  sampleOrders.forEach((sample, index) => {
    if((index < 3 || orders.length < 10) && !orders.some(order => order.id === sample.id)){
      orders.push({...sample});
    }
  });
}

function recalculateOrderTotal(order){
  if(order.id === 'DH009' || !Array.isArray(order.items)) return order;
  return {
    ...order,
    total: order.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  };
}

let orders = [];
let orderMigrationFailed = false;
try {
  const storedOrders = JSON.parse(localStorage.getItem('hv_orders') || '[]');
  if(Array.isArray(storedOrders)){
    const correctedOrders = {
      DH1792736711047: {id:'DH009', name:'Nguyễn Hoàng Minh', date:'09/11/2026, 12:00:00', phone:'0987654321'},
      DH1792736708855: {id:'DH010', name:'Trần Ngọc Anh', date:'10/11/2026, 10:40:00', phone:'0912345670'},
      DH009: {id:'DH009', name:'Nguyễn Hoàng Minh', date:'09/11/2026, 12:00:00', phone:'0987654321'},
      DH010: {id:'DH010', name:'Trần Ngọc Anh', date:'10/11/2026, 10:40:00', phone:'0912345670'}
    };
    let hasMigratedOrders = false;
    orders = storedOrders.map(order => {
      const correction = correctedOrders[order.id];
      if(!correction) return order;
      const receiver = {...order.receiver};
      const changed = order.id !== correction.id ||
        receiver.name !== correction.name ||
        receiver.phone !== correction.phone ||
        order.date !== correction.date;
      if(!changed) return order;
      hasMigratedOrders = true;
      return {
        ...order,
        id: correction.id,
        date: correction.date,
        receiver: {...receiver, name: correction.name, phone: correction.phone}
      };
    });
    if(hasMigratedOrders){
      try {
        localStorage.setItem('hv_orders', JSON.stringify(orders));
      } catch(error) {
        orderMigrationFailed = true;
        console.error('Không thể lưu thay đổi mã đơn đặt bàn và tên khách hàng.', error);
      }
    }
  }
} catch(e){}
orders = orders.filter(order => order.type !== 'booking');
addMissingSampleOrders();
additionalSampleOrders.forEach(sample => {
  if(!orders.some(order => order.id === sample.id)){
    orders.push({...sample});
  }
});
orders = orders.map(recalculateOrderTotal);
orders = orders.map(order => {
  if(order.id !== 'DH009' || (Array.isArray(order.items) && order.items.length > 0)) return order;
  return {
    ...order,
    items: [{id:0,name:'Cơm trắng',price:15000,qty:1}],
    subtotal: 15000
  };
});
orders = orders.map(recalculateOrderTotal);
// Migrate trạng thái cũ sang trạng thái mới phù hợp nghiệp vụ đặt bàn
orders = orders.map(order => {
  if(STATUS_MIGRATION[order.status]){
    return {...order, status: STATUS_MIGRATION[order.status]};
  }
  return order;
});
const customerBookingSamples = new Map(sampleOrders.slice(0, 3).map(sample => [sample.id, sample]));
const sampleOrderDisplayIds = new Map(
  [...sampleOrders, ...additionalSampleOrders].map((sample, index) => [
    sample.id,
    `DB${String(index + 1).padStart(3, '0')}`
  ])
);
const reservedDisplayIds = new Set(sampleOrderDisplayIds.values());
function synchronizeCustomerBookingSamples(){
  const synchronizedIds = new Set();
  orders = orders.map(order => {
    const sample = customerBookingSamples.get(order.id);
    if(!sample || synchronizedIds.has(order.id)) return order;
    synchronizedIds.add(order.id);
    return {...order, ...sample, receiver: {...order.receiver, ...sample.receiver}};
  });
}
function assignDisplayIds(){
  const assignedIds = new Set();
  let nextDisplayNumber = sampleOrderDisplayIds.size + 1;
  orders = orders.map(order => ({
    ...order,
    displayId: sampleOrderDisplayIds.get(order.id) || `DB${String(nextDisplayNumber++).padStart(3, '0')}`
  }));
  orders = orders.map(order => {
    if(!assignedIds.has(order.displayId)){
      assignedIds.add(order.displayId);
      return order;
    }
    let displayId;
    do {
      displayId = `DB${String(nextDisplayNumber++).padStart(3, '0')}`;
    } while (reservedDisplayIds.has(displayId) || assignedIds.has(displayId));
    assignedIds.add(displayId);
    return {...order, displayId};
  });
}
synchronizeCustomerBookingSamples();
assignDisplayIds();
// Sắp xếp đơn đặt bàn theo displayId tăng dần (DB001 → DB020)
orders.sort((a, b) => a.displayId.localeCompare(b.displayId));

let adminLoggedIn = false;

/* ===== HELPER FUNCTIONS ===== */
function money(v){ return Number(v).toLocaleString('vi-VN') + 'đ'; }
function formatPriceInput(input){
  const digits = input.value.replace(/\D/g, '');
  input.value = digits ? Number(digits).toLocaleString('vi-VN') : '';
}

document.getElementById('productPrice').addEventListener('input', event => {
  formatPriceInput(event.currentTarget);
});

function showToast(msg, type='success'){
  const t = document.getElementById('adminToast');
  t.textContent = msg;
  t.style.background = type === 'error' ? '#b91c1c' : type === 'warn' ? '#92400e' : '#1a6e3a';
  t.classList.remove('is-hidden');
  t.removeAttribute('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.setAttribute('hidden',''); }, 2800);
}

function showFilterNotice(){
  showToast('Bộ lọc chỉ mang tính minh họa giao diện, không thực hiện lọc dữ liệu.', 'warn');
}

function statusBadge(status){
  const cls = STATUS_BADGE[status] || 'badge-pending';
  return `<span class="badge ${cls}">${status}</span>`;
}

function openModal(id){
  const el = document.getElementById(id);
  el.removeAttribute('hidden');
}
function closeModal(id){
  const el = document.getElementById(id);
  el.setAttribute('hidden','');
  if(id === 'productModalBackdrop') resetProductForm();
  if(id === 'userModalBackdrop') resetUserForm();
}
function resetUserForm(){
  document.getElementById('userForm').reset();
  document.getElementById('userIndex').value = '';
}
function resetProductForm(){
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('productImagePreview').src = '';
  document.getElementById('productImagePreview').hidden = true;
  document.getElementById('imageUploadPlaceholder').hidden = false;
  document.getElementById('productModalTitle').textContent = 'Thêm sản phẩm';
  document.getElementById('productSubmitBtn').textContent = 'Thêm sản phẩm';
}

// Đóng modal khi click nút có data-close
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});
// Đóng modal khi click backdrop
document.querySelectorAll('.admin-modal-backdrop').forEach(bd => {
  bd.addEventListener('click', e => { if(e.target === bd) closeModal(bd.id); });
});

/* ===== 1. ĐĂNG NHẬP ADMIN ===== */
function performLogin(){
  adminLoggedIn = true;
  try {
    sessionStorage.setItem('hv_admin_logged_in', '1');
  } catch (error) {
    /* Không thể lưu phiên; vẫn cho phép dùng dashboard trong tab hiện tại. */
  }
  document.getElementById('adminLoginMsg').hidden = true;
  document.getElementById('adminLoginPage').hidden = true;
  document.getElementById('adminDashboard').hidden = false;
  document.getElementById('adminTopbarUser').textContent = '👤 admin';
  initDashboard();
  if(orderMigrationFailed){
    showToast('Không thể lưu thay đổi mã đơn đặt bàn và tên khách hàng.', 'error');
  }
}

function navigateToSection(sectionName){
  const link = document.querySelector(`.sidebar-link[data-section="${sectionName}"]`);
  if(link) link.click();
}

document.getElementById('adminLoginForm').addEventListener('submit', function(e){
  e.preventDefault();
  performLogin();
  // Nếu có hash, chuyển đến section tương ứng
  const hash = window.location.hash.replace('#', '');
  if(hash) navigateToSection(hash);
});

/* ===== 2. ĐĂNG XUẤT ===== */
document.getElementById('adminLogoutBtn').addEventListener('click', () => {
  adminLoggedIn = false;
  try {
    sessionStorage.removeItem('hv_admin_logged_in');
  } catch (error) {
    /* Không thể xóa storage; giao diện vẫn chuyển về trang đăng nhập. */
  }
  document.getElementById('adminDashboard').hidden = true;
  document.getElementById('adminLoginPage').hidden = false;
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
  document.getElementById('adminLoginMsg').hidden = true;
  window.location.hash = '';
});

/* ===== 3. NAVIGATION ===== */
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const sec = link.dataset.section;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.getElementById('section-' + sec).classList.add('active');
    document.getElementById('adminPageTitle').textContent = link.textContent.trim();
    // Render lại section tương ứng
    if(sec === 'dashboard') renderDashboard();
    if(sec === 'products') renderProducts();
    if(sec === 'users') renderUsers();
    if(sec === 'orders') renderOrders();
    if(sec === 'stats') renderStats();
    // Đóng sidebar mobile
    document.getElementById('adminSidebar').classList.remove('open');
  });
});

// Mobile sidebar toggle
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('adminSidebar').classList.toggle('open');
});

/* ===== 4. KHỞI TẠO ===== */
function initDashboard(){
  renderDashboard();
  renderProducts();
  renderUsers();
  renderOrders();
}

window.addEventListener('storage', event => {
  if(event.key !== 'hv_orders') return;
  try {
    const storedOrders = JSON.parse(event.newValue || '[]');
    if(!Array.isArray(storedOrders)) throw new Error('Dữ liệu đơn đặt bàn không hợp lệ.');
    orders = storedOrders.filter(order => order.type !== 'booking');
    addMissingSampleOrders();
    synchronizeCustomerBookingSamples();
    assignDisplayIds();
    renderOrders();
    renderDashboard();
    renderStats();
  } catch(error) {
    console.error('Không thể đồng bộ đơn đặt bàn từ trang khách hàng.', error);
    showToast('Không thể đồng bộ đơn đặt bàn từ trang khách hàng.', 'error');
  }
});

/* ================================================================
   SECTION: TỔNG QUAN
   ================================================================ */
function renderDashboard(){
  const visibleProducts = products.filter(p => !p.hidden).length;
  document.getElementById('statTotalProducts').textContent = visibleProducts;
  document.getElementById('statTotalUsers').textContent = users.length;
  document.getElementById('statTotalOrders').textContent = orders.length;
  const totalRev = orders.filter(o => o.status === 'Hoàn thành').reduce((s,o) => s+o.total,0);
  document.getElementById('statTotalRevenue').textContent = money(totalRev);

  // Recent orders
  const tbody = document.querySelector('#dashRecentOrders tbody');
  const recent = [...orders].slice(0, 5);
  tbody.innerHTML = recent.length ? recent.map(o => `
    <tr>
      <td><b>${o.displayId}</b></td>
      <td>${customerName(o)}</td>
      <td>${money(o.total)}</td>
      <td>${statusBadge(o.status)}</td>
    </tr>
  `).join('') : '<tr><td colspan="4" class="empty-hint">Chưa có đơn đặt bàn</td></tr>';
}
function customerName(order){
  const receiverName = order.receiver && order.receiver.name;
  const user = users.find(item => item.email === order.userId);
  return receiverName || (user && user.name) || '—';
}

/* ================================================================
   SECTION: SẢN PHẨM
   ================================================================ */
const PRODUCTS_PER_PAGE = 5;
const USERS_PER_PAGE = 5;
const ORDERS_PER_PAGE = 5;
let currentProductPage = 1;
let currentUserPage = 1;
const requestedOrderPage = Number(new URLSearchParams(window.location.search).get('ordersPage'));
let currentOrderPage = Number.isSafeInteger(requestedOrderPage) && requestedOrderPage > 0
  ? requestedOrderPage
  : 1;

function renderProducts(){
  const list = products;
  const pageCount = Math.ceil(list.length / PRODUCTS_PER_PAGE);
  currentProductPage = Math.min(currentProductPage, Math.max(pageCount, 1));
  const pageStart = (currentProductPage - 1) * PRODUCTS_PER_PAGE;
  const pageProducts = list.slice(pageStart, pageStart + PRODUCTS_PER_PAGE);
  const tbody = document.getElementById('productTableBody');
  tbody.innerHTML = pageProducts.length ? pageProducts.map(p => `
    <tr>
      <td><img class="thumb" src="${p.image}" alt="${p.name}" onerror="this.src='images/restaurant.jpg'"></td>
      <td><b>${p.name}</b></td>
      <td>${CATEGORY_NAMES[p.category] || p.category}</td>
      <td>${money(p.price)}</td>
      <td>${p.hidden
        ? '<span class="badge badge-hidden">Đã ẩn</span>'
        : '<span class="badge badge-visible">Hiển thị</span>'}</td>
      <td>
        <button class="abtn abtn-sm abtn-outline" onclick="openEditProduct(${p.id})">✏ Sửa</button>
        <button class="abtn abtn-sm abtn-danger">${p.hidden ? '🗑 Xoá hẳn' : '🗑 Xoá'}</button>
        <button class="abtn abtn-sm ${p.hidden ? 'abtn-success' : 'abtn-danger'}" onclick="toggleHideProduct(${p.id})">
          ${p.hidden ? '👁 Hiển thị' : 'Ẩn'}
        </button>
      </td>
    </tr>
  `).join('') : '<tr><td colspan="6" class="empty-hint">Không có sản phẩm nào</td></tr>';

  const pagination = document.getElementById('productPagination');
  pagination.innerHTML = pageCount > 1 ? `
    <button type="button" data-page="${currentProductPage - 1}" ${currentProductPage === 1 ? 'disabled' : ''} aria-label="Trang trước">‹</button>
    ${Array.from({length: pageCount}, (_, index) => {
      const page = index + 1;
      return `<button type="button" data-page="${page}" class="${page === currentProductPage ? 'active' : ''}" aria-current="${page === currentProductPage ? 'page' : 'false'}">${page}</button>`;
    }).join('')}
    <button type="button" data-page="${currentProductPage + 1}" ${currentProductPage === pageCount ? 'disabled' : ''} aria-label="Trang sau">›</button>
  ` : '';
}

document.getElementById('productPagination').addEventListener('click', event => {
  const button = event.target.closest('button[data-page]');
  if(!button || button.disabled) return;
  currentProductPage = Number(button.dataset.page);
  renderProducts();
});

/* --- THÊM SẢN PHẨM --- */
document.getElementById('addProductBtn').addEventListener('click', () => {
  document.getElementById('productModalTitle').textContent = 'Thêm sản phẩm';
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('productImagePreview').src = '';
  document.getElementById('productImagePreview').hidden = true;
  document.getElementById('imageUploadPlaceholder').hidden = false;
  document.getElementById('productSubmitBtn').textContent = 'Thêm sản phẩm';
  openModal('productModalBackdrop');
});

/* --- SỬA SẢN PHẨM --- */
function openEditProduct(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  document.getElementById('productModalTitle').textContent = 'Sửa sản phẩm';
  document.getElementById('productId').value = p.id;
  document.getElementById('productName').value = p.name;
  document.getElementById('productCategory').value = p.category;
  document.getElementById('productPrice').value = Number(p.price).toLocaleString('vi-VN');
  document.getElementById('productDesc').value = p.description;
  // Hiển thị preview ảnh hiện tại
  const preview = document.getElementById('productImagePreview');
  preview.src = p.image;
  preview.hidden = false;
  document.getElementById('imageUploadPlaceholder').hidden = true;
  document.getElementById('productSubmitBtn').textContent = 'Lưu thay đổi';
  openModal('productModalBackdrop');
}

/* --- FORM SẢN PHẨM CHỈ MANG TÍNH MINH HỌA --- */
document.getElementById('productForm').addEventListener('submit', function(e){
  e.preventDefault();
  closeModal('productModalBackdrop');
});

/* --- NÚT LỌC / ĐẶT LẠI SẢN PHẨM (chỉ giao diện minh họa) --- */
document.getElementById('applyProductFilter').addEventListener('click', () => {
  showFilterNotice();
});
document.getElementById('resetProductFilter').addEventListener('click', () => {
  document.getElementById('productSearch').value = '';
  document.getElementById('productCatFilter').value = 'all';
  document.getElementById('productStatusFilter').value = 'all';
  document.getElementById('productPriceSort').value = 'default';
  showToast('Đã đặt lại bộ lọc (giao diện minh họa).', 'warn');
});

/* --- ĐỔI TRẠNG THÁI MINH HỌA, CHỈ TRONG PHIÊN ADMIN --- */
function toggleHideProduct(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  p.hidden = !p.hidden;
  renderProducts();
  renderDashboard();
  showToast(`Đã chuyển trạng thái thành "${p.hidden ? 'Ẩn' : 'Hiển thị'}" (chỉ minh họa trong trang quản trị).`, 'warn');
}

/* ================================================================
   SECTION: NGƯỜI DÙNG
   ================================================================ */
function renderUsers(){
  /* Thanh lọc chỉ là giao diện minh họa – luôn hiển thị toàn bộ danh sách */
  const list = users;
  const pageCount = Math.ceil(list.length / USERS_PER_PAGE);
  currentUserPage = Math.min(currentUserPage, Math.max(pageCount, 1));
  const pageStart = (currentUserPage - 1) * USERS_PER_PAGE;
  const pageUsers = list.slice(pageStart, pageStart + USERS_PER_PAGE);
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = pageUsers.length ? pageUsers.map(u => `
    <tr>
      <td>${users.indexOf(u)+1}</td>
      <td><b>${u.name}</b></td>
      <td>${u.email||'—'}</td>
      <td>${u.phone||'—'}</td>
      <td>${u.address||'—'}</td>
      <td>${u.locked
        ? '<span class="badge badge-locked">Bị khoá</span>'
        : '<span class="badge badge-active">Hoạt động</span>'}</td>
      <td>
        <button class="abtn abtn-sm abtn-outline" onclick="openEditUser(${users.indexOf(u)})">✏ Sửa</button>
        <button class="abtn abtn-sm abtn-danger" onclick="showToast('Thao tác xóa chỉ minh họa, dữ liệu người dùng không bị thay đổi.', 'warn')">Xóa</button>
        <button class="abtn abtn-sm ${u.locked ? 'abtn-success' : 'abtn-danger'}" onclick="toggleLockUser(${users.indexOf(u)})">
          ${u.locked ? '🔓 Mở khoá' : '🔒 Khoá'}
        </button>
      </td>
    </tr>
  `).join('') : '<tr><td colspan="7" class="empty-hint">Không tìm thấy người dùng</td></tr>';
  renderUserPagination(pageCount);
}

function normalizeSearchText(value){
  return String(value || '')
    .toLocaleLowerCase('vi')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

function renderUserPagination(pageCount){
  const pagination = document.getElementById('userPagination');
  pagination.innerHTML = pageCount > 1 ? `
    <button type="button" data-page="${currentUserPage - 1}" ${currentUserPage === 1 ? 'disabled' : ''} aria-label="Trang trước">‹</button>
    ${Array.from({length: pageCount}, (_, index) => {
      const page = index + 1;
      return `<button type="button" data-page="${page}" class="${page === currentUserPage ? 'active' : ''}" aria-current="${page === currentUserPage ? 'page' : 'false'}">${page}</button>`;
    }).join('')}
    <button type="button" data-page="${currentUserPage + 1}" ${currentUserPage === pageCount ? 'disabled' : ''} aria-label="Trang sau">›</button>
  ` : '';
}

document.getElementById('userPagination').addEventListener('click', event => {
  const button = event.target.closest('button[data-page]');
  if(!button || button.disabled) return;
  currentUserPage = Number(button.dataset.page);
  renderUsers();
});

/* --- NÚT LỌC / ĐẶT LẠI NGƯỜI DÙNG (chỉ giao diện minh họa) --- */
document.getElementById('applyUserFilter').addEventListener('click', () => {
  showFilterNotice();
});
document.getElementById('resetUserFilter').addEventListener('click', () => {
  document.getElementById('userSearchName').value = '';
  document.getElementById('userSearchPhone').value = '';
  document.getElementById('userStatusFilter').value = 'all';
  showToast('Đã đặt lại bộ lọc (giao diện minh họa).', 'warn');
});

/* --- THÊM NGƯỜI DÙNG --- */
document.getElementById('addUserBtn').addEventListener('click', () => {
  document.getElementById('userModalTitle').textContent = 'Thêm người dùng';
  document.getElementById('userForm').reset();
  document.getElementById('userIndex').value = '';
  openModal('userModalBackdrop');
});

/* --- SỬA NGƯỜI DÙNG --- */
function openEditUser(idx){
  const u = users[idx];
  if(!u) return;
  document.getElementById('userModalTitle').textContent = 'Sửa người dùng';
  document.getElementById('userIndex').value = idx;
  document.getElementById('userName').value = u.name;
  document.getElementById('userEmail').value = u.email || '';
  document.getElementById('userPhone').value = u.phone || '';
  document.getElementById('userAddress').value = u.address || '';
  openModal('userModalBackdrop');
}

/* --- SUBMIT FORM NGƯỜI DÙNG --- */
document.getElementById('userForm').addEventListener('submit', function(e){
  e.preventDefault();
  closeModal('userModalBackdrop');
});

/* --- KHOÁ / MỞ KHOÁ NGƯỜI DÙNG --- */
function toggleLockUser(idx){
  const user = users[idx];
  if(!user) return;
  user.locked = !user.locked;
  renderUsers();
}

/* ================================================================
   SECTION: ĐƠN ĐẶT BÀN
   ================================================================ */
function sortOrdersByDisplayId(orderList){
  return [...orderList].sort((a, b) =>
    Number(a.displayId.slice(2)) - Number(b.displayId.slice(2))
  );
}

function renderOrders(){
  const list = sortOrdersByDisplayId(orders);
  const pageCount = Math.ceil(list.length / ORDERS_PER_PAGE);
  currentOrderPage = Math.min(currentOrderPage, Math.max(pageCount, 1));
  const pageStart = (currentOrderPage - 1) * ORDERS_PER_PAGE;
  const pageOrders = list.slice(pageStart, pageStart + ORDERS_PER_PAGE);

  const tbody = document.getElementById('orderTableBody');
  const empty = document.getElementById('orderEmpty');
  empty.hidden = list.length > 0;

  tbody.innerHTML = pageOrders.length ? pageOrders.map(o => {
    const currentIdx = ORDER_STATUS_FLOW.indexOf(o.status);
    // Chỉ cho phép chuyển sang trạng thái tiếp theo (xuôi chiều)
    const nextStatuses = ORDER_STATUS_FLOW.slice(currentIdx + 1).filter(s => {
      // Không thể cập nhật ngược, không thể hủy khi đã giao thành công
      if(o.status === 'Hoàn thành') return false;
      return true;
    });
    const statusOptions = nextStatuses.map(s =>
      `<option value="${s}">${s}</option>`
    ).join('');

    return `
      <tr>
        <td><b>${o.displayId}</b></td>
        <td>${o.date}</td>
        <td>${customerName(o)}<br><small>${o.receiver.phone}</small></td>
        <td><b>${money(o.total)}</b></td>
        <td>${statusBadge(o.status)}</td>
        <td>
          <button class="abtn abtn-sm abtn-outline" onclick="viewOrderDetail('${o.id}')">🔍 Chi tiết</button>
          ${nextStatuses.length > 0 ? `
            <select class="abtn abtn-sm" id="statusSel_${o.id}" style="border:1px solid #e6ddd5;border-radius:6px;padding:4px 6px;font-size:11px">
              <option value="">Cập nhật...</option>
              ${statusOptions}
            </select>
            <button class="abtn abtn-sm abtn-success" onclick="updateOrderStatus('${o.id}')">✓</button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('') : '';
  renderOrderPagination(pageCount);
}

function renderOrderPagination(pageCount){
  const pagination = document.getElementById('orderPagination');
  pagination.innerHTML = pageCount > 1 ? `
    <button type="button" data-page="${currentOrderPage - 1}" ${currentOrderPage === 1 ? 'disabled' : ''} aria-label="Trang trước">‹</button>
    ${Array.from({length: pageCount}, (_, index) => {
      const page = index + 1;
      return `<button type="button" data-page="${page}" class="${page === currentOrderPage ? 'active' : ''}" aria-current="${page === currentOrderPage ? 'page' : 'false'}">${page}</button>`;
    }).join('')}
    <button type="button" data-page="${currentOrderPage + 1}" ${currentOrderPage === pageCount ? 'disabled' : ''} aria-label="Trang sau">›</button>
  ` : '';
}

document.getElementById('orderPagination').addEventListener('click', event => {
  const button = event.target.closest('button[data-page]');
  if(!button || button.disabled) return;
  currentOrderPage = Number(button.dataset.page);
  renderOrders();
});

document.getElementById('applyOrderFilter').addEventListener('click', () => {
  showFilterNotice();
});
document.getElementById('resetOrderFilter').addEventListener('click', () => {
  document.getElementById('orderSearchKeyword').value = '';
  document.getElementById('orderStatusFilter').value = 'all';
  document.getElementById('orderDateFrom').value = '';
  document.getElementById('orderDateTo').value = '';
  showToast('Đã đặt lại bộ lọc (giao diện minh họa).', 'warn');
});

[
  'productSearch',
  'userSearchName',
  'userSearchPhone',
  'orderSearchKeyword'
].forEach(id => {
  document.getElementById(id).addEventListener('keydown', event => {
    if(event.key !== 'Enter') return;
    event.preventDefault();
    showFilterNotice();
  });
});

/* --- CẬP NHẬT TRẠNG THÁI ĐƠN ĐẶT BÀN --- */
function updateOrderStatus(orderId){
  const sel = document.getElementById('statusSel_' + orderId);
  if(!sel || !sel.value){ showToast('Vui lòng chọn trạng thái!', 'warn'); return; }
  const newStatus = sel.value;
  const o = orders.find(x => x.id === orderId);
  if(!o) return;
  const currIdx = ORDER_STATUS_FLOW.indexOf(o.status);
  const newIdx = ORDER_STATUS_FLOW.indexOf(newStatus);
  if(newIdx <= currIdx){
    showToast('Không thể cập nhật ngược trạng thái!', 'error'); return;
  }
  o.status = newStatus;
  showToast(`✓ Đơn ${o.displayId}: đã chuyển sang "${newStatus}"`);
  renderOrders();
  renderDashboard();
}

/* --- XEM CHI TIẾT ĐƠN ĐẶT BÀN (chuyển sang trang riêng) --- */
function viewOrderDetail(orderId){
  const o = orders.find(x => x.id === orderId);
  if(!o) return;
  window.location.href = 'order-detail.html?id=' + encodeURIComponent(o.id) +
    '&from=orders&page=' + currentOrderPage;
}

/* ================================================================
   SECTION: THỐNG KÊ TOP 5 KHÁCH HÀNG
   ================================================================ */
function renderStats(){
  const tbody = document.getElementById('statsTopBody');
  const empty = document.getElementById('statsEmpty');

  // Nhóm theo userId (email)
  const customerMap = {};
  const topFiveOrders = orders.filter(isTopFiveEligibleOrder);
  topFiveOrders.forEach(o => {
    const key = o.userId || o.receiver.name;
    if(!customerMap[key]){
      customerMap[key] = {
        name: customerName(o),
        email: key,
        orders: [],
        total: 0
      };
    }
    customerMap[key].orders.push(o);
    customerMap[key].total += o.total;
  });

  const ranked = Object.values(customerMap).sort((a,b) => b.total - a.total).slice(0, 5);

  if(ranked.length === 0){
    empty.hidden = false;
    tbody.innerHTML = '';
    return;
  }
  empty.hidden = true;
  tbody.innerHTML = ranked.map((c, i) => `
    <tr>
      <td><b>#${i+1}</b></td>
      <td><b>${c.name}</b><br><small style="color:var(--muted)">${c.email}</small></td>
      <td>${c.orders.length} đơn</td>
      <td><b style="color:var(--orange)">${money(c.total)}</b></td>
      <td><button class="abtn abtn-sm abtn-outline" onclick="viewCustomerOrders('${c.email}')">📋 Xem đơn đặt bàn</button></td>
    </tr>
  `).join('');
}

/* --- XEM ĐƠN ĐẶT BÀN CỦA KHÁCH (từ thống kê) --- */
function isTopFiveEligibleOrder(order){
  return order.userId !== 'demo@huongviet.local' ||
    (customerBookingSamples.has(order.id) &&
      order.displayId === sampleOrderDisplayIds.get(order.id));
}

function viewCustomerOrders(email){
  const u = users.find(x => x.email === email);
  const customerOrders = orders.filter(o =>
    isTopFiveEligibleOrder(o) && (o.userId === email || o.receiver.name === email)
  );
  const displayName = customerOrders.length
    ? customerName(customerOrders[0])
    : (u ? u.name : email);

  document.getElementById('statsOrderTitle').textContent = `Đơn đặt bàn của: ${displayName}`;
  document.getElementById('statsOrderContent').innerHTML = customerOrders.length
    ? customerOrders.map(o => `
        <div style="border:1px solid var(--admin-border);border-radius:8px;margin-bottom:10px;overflow:hidden">
          <div style="background:#fdf6ee;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
            <div><a class="abtn abtn-sm abtn-outline" href="order-detail.html?id=${encodeURIComponent(o.id)}&from=stats">${o.displayId} · Xem chi tiết</a> · ${o.date}</div>
            <div>${statusBadge(o.status)}</div>
            <div><b style="color:var(--orange)">${money(o.total)}</b></div>
          </div>
          <div style="padding:10px 14px;font-size:12px;color:var(--muted)">
            ${o.items.map(item => `${item.name} × ${item.qty}`).join(' · ')}
          </div>
        </div>
      `).join('')
    : '<p class="empty-hint">Không có đơn đặt bàn trong khoảng thời gian này.</p>';

  openModal('statsOrderBackdrop');
}

/* ================================================================
   TỰ ĐỘNG ĐĂNG NHẬP KHI QUAY LẠI TỪ TRANG CHI TIẾT ĐƠN
   (Chạy cuối cùng, sau khi tất cả hàm đã được định nghĩa)
   ================================================================ */
(function autoLoginFromHash(){
  function restoreAdminSession(){
    try {
      if(sessionStorage.getItem('hv_admin_logged_in') !== '1') return;
    } catch (error) {
      return;
    }
    if(!adminLoggedIn) performLogin();
    const hash = window.location.hash.replace('#', '');
    if(hash) navigateToSection(hash);
  }

  restoreAdminSession();
  window.addEventListener('pageshow', restoreAdminSession);
})();
