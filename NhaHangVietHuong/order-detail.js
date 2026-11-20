'use strict';
/* ================================================================
   ORDER-DETAIL.JS – Trang chi tiết đơn hàng
   Nhà Hàng Hương Việt
   Đọc mã đơn từ URL (?id=DH001) và tải dữ liệu từ localStorage
   hoặc dữ liệu mẫu tích hợp sẵn.
   ================================================================ */

/* ===== DỮ LIỆU MẪU (đồng bộ với admin.js) ===== */
const SAMPLE_ORDERS = [
  {id:"DH001",displayId:"DB001",date:"08/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:1,name:"Phở bò",price:60000,qty:2},{id:2,name:"Nem rán",price:45000,qty:1}],total:165000,status:"Chờ xác nhận"},
  {id:"DH002",displayId:"DB002",date:"09/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:2},{id:11,name:"Chè ba màu",price:25000,qty:1}],total:135000,status:"Chờ xác nhận"},
  {id:"DH003",displayId:"DB003",date:"10/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"78 Phan Xích Long, Bình Thạnh, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:4,name:"Tôm xào tỏi",price:75000,qty:1}],total:75000,status:"Chờ xác nhận"},
  {id:"DH004",displayId:"DB004",date:"04/11/2026, 10:00:00",userId:"an@email.com",receiver:{name:"Nguyễn Văn An",phone:"0901234567",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:5,name:"Thịt kho tàu",price:50000,qty:3}],total:150000,status:"Chờ xác nhận"},
  {id:"DH005",displayId:"DB005",date:"05/11/2026, 14:45:00",userId:"binh@email.com",receiver:{name:"Trần Thị Bình",phone:"0912345678",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:7,name:"Cá kho tộ",price:68000,qty:2},{id:14,name:"Trà sen vàng",price:25000,qty:2}],total:186000,status:"Giao thành công"},
  {id:"DH006",displayId:"DB006",date:"06/11/2026, 13:15:00",userId:"mai@email.com",receiver:{name:"Dương Thị Mai",phone:"0934567890",address:"25 Nguyễn Trãi, Quận 5, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:6,name:"Gỏi cuốn",price:35000,qty:2}],total:70000,status:"Chờ xác nhận"},
  {id:"DH007",displayId:"DB007",date:"07/11/2026, 11:10:00",userId:"bao@email.com",receiver:{name:"Phạm Quốc Bảo",phone:"0945678901",address:"80 Nguyễn Thị Thập, Quận 7, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:10,name:"Bún thịt nướng",price:52000,qty:2}],total:104000,status:"Chờ xác nhận"},
  {id:"DH008",displayId:"DB008",date:"08/11/2026, 19:25:00",userId:"ha@email.com",receiver:{name:"Võ Ngọc Hà",phone:"0956789012",address:"12 Võ Văn Ngân, Thủ Đức, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:12,name:"Bánh flan",price:20000,qty:2},{id:14,name:"Trà sen vàng",price:25000,qty:1}],total:65000,status:"Giao thành công"},
  {id:"DH009",displayId:"DB009",date:"09/11/2026, 12:00:00",userId:"khoa@email.com",receiver:{name:"Đặng Minh Khoa",phone:"0987654321",address:"40 Cộng Hòa, Tân Bình, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:0,name:"Cơm trắng",price:15000,qty:1}],total:30000,status:"Đang giao"},
  {id:"DH010",displayId:"DB010",date:"10/11/2026, 10:40:00",userId:"truc@email.com",receiver:{name:"Bùi Thanh Trúc",phone:"0912345670",address:"55 Phan Xích Long, Phú Nhuận, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:1}],total:55000,status:"Huỷ đơn"},
  {id:"DH011",displayId:"DB011",date:"11/11/2026, 09:20:00",userId:"mai@email.com",receiver:{name:"Dương Thị Mai",phone:"0934567890",address:"25 Nguyễn Trãi, Quận 5, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:1,name:"Phở bò",price:60000,qty:1}],total:60000,status:"Chờ xác nhận"},
  {id:"DH012",displayId:"DB012",date:"11/11/2026, 11:45:00",userId:"bao@email.com",receiver:{name:"Phạm Quốc Bảo",phone:"0945678901",address:"80 Nguyễn Thị Thập, Quận 7, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:6,name:"Gỏi cuốn",price:35000,qty:2}],total:70000,status:"Chờ xác nhận"},
  {id:"DH013",displayId:"DB013",date:"12/11/2026, 12:10:00",userId:"ha@email.com",receiver:{name:"Võ Ngọc Hà",phone:"0956789012",address:"12 Võ Văn Ngân, Thủ Đức, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:11,name:"Chè ba màu",price:25000,qty:2}],total:50000,status:"Đang giao"},
  {id:"DH014",displayId:"DB014",date:"12/11/2026, 18:30:00",userId:"an@email.com",receiver:{name:"Nguyễn Văn An",phone:"0901234567",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:4,name:"Thịt kho tàu",price:50000,qty:2}],total:100000,status:"Giao thành công"},
  {id:"DH015",displayId:"DB015",date:"13/11/2026, 10:05:00",userId:"binh@email.com",receiver:{name:"Trần Thị Bình",phone:"0912345678",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:8,name:"Mực xào rau củ",price:82000,qty:1}],total:82000,status:"Chờ xác nhận"},
  {id:"DH016",displayId:"DB016",date:"13/11/2026, 14:15:00",userId:"cuong@email.com",receiver:{name:"Lê Minh Cường",phone:"0923456789",address:"78 Phan Xích Long, Bình Thạnh, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:10,name:"Bún thịt nướng",price:52000,qty:2}],total:104000,status:"Chờ xác nhận"},
  {id:"DH017",displayId:"DB017",date:"14/11/2026, 08:50:00",userId:"trang@email.com",receiver:{name:"Nguyễn Thu Trang",phone:"0990123456",address:"Phường Cầu Kiệu, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:12,name:"Bánh flan",price:20000,qty:3}],total:60000,status:"Đang giao"},
  {id:"DH018",displayId:"DB018",date:"14/11/2026, 17:40:00",userId:"khoa@email.com",receiver:{name:"Đặng Minh Khoa",phone:"0967890123",address:"Phường Tân Sơn Nhất, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:14,name:"Trà sen vàng",price:25000,qty:2}],total:50000,status:"Giao thành công"},
  {id:"DH019",displayId:"DB019",date:"15/11/2026, 11:25:00",userId:"tuan.phan@email.com",receiver:{name:"Phan Minh Tuấn",phone:"0901112233",address:"Phường Bến Thành, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:1}],total:55000,status:"Chờ xác nhận"},
  {id:"DH020",displayId:"DB020",date:"16/11/2026, 13:05:00",userId:"ngoc.le@email.com",receiver:{name:"Lê Thị Ngọc",phone:"0902223344",address:"Phường Tân Định, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:7,name:"Cá kho tộ",price:68000,qty:1}],total:68000,status:"Chờ xác nhận"}
];

/* Map displayId ↔ order (hỗ trợ tìm theo cả id nội bộ lẫn displayId) */
const SAMPLE_BY_ID         = new Map(SAMPLE_ORDERS.map(o => [o.id, o]));
const SAMPLE_BY_DISPLAY_ID = new Map(SAMPLE_ORDERS.map(o => [o.displayId, o]));

const SAMPLE_USER_ADDRESSES = {
  "demo@huongviet.local":"Số 99 Đường Đồng Khởi, Phường Sài Gòn, TP. Hồ Chí Minh",
  "an@email.com":"Phường Sài Gòn, TP.HCM",
  "binh@email.com":"Phường Nhiêu Lộc, TP.HCM",
  "cuong@email.com":"Phường Thạnh Mỹ Tây, TP.HCM",
  "mai@email.com":"Phường Chợ Lớn, TP.HCM",
  "bao@email.com":"Phường Tân Hưng, TP.HCM",
  "ha@email.com":"Phường Thủ Đức, TP.HCM",
  "khoa@email.com":"Phường Tân Sơn Nhất, TP.HCM",
  "truc@email.com":"Phường An Hội Đông, TP.HCM",
  "trang@email.com":"Phường Cầu Kiệu, TP.HCM",
  "tuan.phan@email.com":"Phường Bến Thành, TP.HCM",
  "ngoc.le@email.com":"Phường Tân Định, TP.HCM"
};

/* ===== TRẠNG THÁI ĐƠN (đồng bộ admin.js) ===== */
const ORDER_STATUS_TRANSITIONS = {
  'Chờ xác nhận': ['Đã xác nhận', 'Huỷ đơn'],
  'Đã xác nhận': ['Đang giao', 'Huỷ đơn'],
  'Đang giao': ['Giao thành công', 'Huỷ đơn'],
  'Giao thành công': [],
  'Huỷ đơn': []
};
const STATUS_BADGE = {
  'Chờ xác nhận': 'badge-pending',
  'Đã xác nhận':  'badge-confirmed',
  'Đang giao':    'badge-shipping',
  'Giao thành công': 'badge-done',
  'Huỷ đơn':     'badge-cancel'
};
/* Chuyển trạng thái cũ của đơn đặt bàn sang trạng thái đơn hàng mang đi. */
const STATUS_MIGRATION = {
  'Chờ nhận bàn': 'Chờ xác nhận',
  'Đang phục vụ': 'Đang giao',
  'Hoàn thành': 'Giao thành công',
  'Đã hủy': 'Huỷ đơn'
};

/* ===== HELPERS ===== */
function money(v){ return Number(v).toLocaleString('vi-VN') + 'đ'; }
function escHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* Quay lại đúng section đã mở chi tiết đơn. */
function getReturnSection(){
  const params = new URLSearchParams(window.location.search);
  const requestedSection = params.get('from');
  return ['orders', 'stats'].includes(requestedSection) ? requestedSection : 'orders';
}

function getReturnPage(){
  const requestedPage = Number(new URLSearchParams(window.location.search).get('page'));
  return Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
}

function goBackToAdmin(section = getReturnSection()){
  const targetSection = ['dashboard', 'orders', 'stats'].includes(section) ? section : 'orders';
  const pageQuery = targetSection === 'orders' ? '?ordersPage=' + getReturnPage() : '';
  window.location.href = 'admin.html' + pageQuery + '#' + targetSection;
}

document.getElementById('ordersBreadcrumbLink').addEventListener('click', event => {
  event.preventDefault();
  goBackToAdmin();
});

document.getElementById('errorBackLink').addEventListener('click', event => {
  event.preventDefault();
  goBackToAdmin();
});

function showToast(msg, type='success'){
  const t = document.getElementById('odToast');
  t.textContent = msg;
  t.style.background = type === 'error' ? '#b91c1c' : type === 'warn' ? '#92400e' : '#1a6e3a';
  t.removeAttribute('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.setAttribute('hidden',''), 3000);
}

/* ===== ĐỌC DANH SÁCH ĐƠN (kết hợp localStorage + mẫu) ===== */
const REMOVED_ORDER_IDS = new Set(['DH1795069499862', 'DH1795069468062']);

function loadAllOrders(){
  let orders = [];
  try {
    const stored = JSON.parse(localStorage.getItem('hv_orders') || '[]');
    if(Array.isArray(stored)){
      orders = stored.filter(o =>
        o.type !== 'booking' && !REMOVED_ORDER_IDS.has(String(o.id))
      );
    }
  } catch(e){ /* ignore */ }

  let profiles = {};
  try {
    const storedProfiles = JSON.parse(localStorage.getItem('hv_customer_profiles') || '{}');
    if(storedProfiles && typeof storedProfiles === 'object') profiles = storedProfiles;
  } catch(e) { /* ignore */ }

  function currentUserAddress(order){
    const email = String(order.userId || '').trim().toLowerCase();
    const profile = profiles[email];
    return (profile && profile.address) || SAMPLE_USER_ADDRESSES[email];
  }

  orders = orders.map(order => {
    const address = currentUserAddress(order);
    if(!address || !SAMPLE_BY_ID.has(order.id)) return order;
    return {...order, receiver:{...(order.receiver || {}), address}};
  });

  /* Đảm bảo các đơn mẫu luôn có trong danh sách */
  SAMPLE_ORDERS.forEach(sample => {
    if(!orders.some(o => o.id === sample.id)){
      orders.push({...sample});
    }
  });

  /* Migrate trạng thái cũ */
  orders = orders.map(o => ({
    ...o,
    status: STATUS_MIGRATION[o.status] || o.status
  }));

  /* Gán displayId cho đơn chưa có */
  const sampleDisplayMap = new Map(SAMPLE_ORDERS.map(s => [s.id, s.displayId]));
  let nextNum = SAMPLE_ORDERS.length + 1;
  orders = orders.map(o => ({
    ...o,
    displayId: o.displayId || sampleDisplayMap.get(o.id) || `DB${String(nextNum++).padStart(3,'0')}`
  }));

  return orders;
}

/* ===== RENDER TRANG ===== */
function renderDetail(order){
  /* Cập nhật breadcrumb và tiêu đề */
  const displayId = order.displayId || order.id;
  document.title = `Chi tiết ${displayId} – Nhà Hàng Hương Việt`;
  document.getElementById('breadcrumbId').textContent = displayId;
  document.getElementById('pageTitle').textContent    = `Chi tiết đơn hàng ${displayId}`;

  /* Badge trạng thái */
  const badgeCls = STATUS_BADGE[order.status] || 'badge-pending';
  const badge = document.getElementById('statusBadge');
  badge.textContent = order.status;
  badge.className = `od-badge ${badgeCls}`;

  /* Thông tin đơn */
  document.getElementById('displayId').textContent   = displayId;
  document.getElementById('orderDate').textContent   = order.date || '—';
  document.getElementById('orderPayment').textContent= order.payment || '—';
  document.getElementById('orderNote').textContent   = order.note || '— (Không có ghi chú)';

  /* Thông tin khách hàng */
  const rec = order.receiver || {};
  document.getElementById('receiverName').textContent  = rec.name  || '—';
  document.getElementById('receiverPhone').textContent = rec.phone || '—';
  if(rec.address){
    document.getElementById('receiverAddress').textContent = rec.address;
    document.getElementById('rowAddress').hidden = false;
  }

  /* Bảng món ăn */
  const items = Array.isArray(order.items) ? order.items : [];
  document.getElementById('itemsTableBody').innerHTML = items.map((item, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${escHtml(item.name)}</td>
      <td class="od-text-right">${money(item.price)}</td>
      <td class="od-text-center">${Number(item.qty)}</td>
      <td class="od-text-right"><strong>${money(item.price * item.qty)}</strong></td>
    </tr>
  `).join('') || `<tr><td colspan="5" style="text-align:center;color:#6e6259;padding:20px">Chưa có món ăn nào</td></tr>`;

  document.getElementById('orderTotal').textContent = money(order.total || 0);

  /* Cập nhật trạng thái */
  renderStatusUpdate(order);

  /* Hiển thị nội dung */
  document.getElementById('loadingState').hidden = true;
  document.getElementById('detailContent').hidden = false;
}

function renderStatusUpdate(order){
  const sel  = document.getElementById('newStatusSelect');
  const btn  = document.getElementById('updateStatusBtn');
  const note = document.getElementById('statusDoneNote');

  const nextStatuses = ORDER_STATUS_TRANSITIONS[order.status] || [];
  const isLocked = nextStatuses.length === 0;

  if(isLocked){
    sel.hidden  = true;
    btn.hidden  = true;
    note.hidden = false;
    return;
  }

  /* Chỉ cho phép cập nhật xuôi */
  sel.innerHTML = `<option value="">-- Chọn trạng thái mới --</option>` +
    nextStatuses.map(s => `<option value="${escHtml(s)}">${escHtml(s)}</option>`).join('');
}

/* ===== KHỞI TẠO ===== */
document.addEventListener('DOMContentLoaded', () => {
  const params  = new URLSearchParams(window.location.search);
  const rawId   = params.get('id') || '';

  if(!rawId){
    showErrorState();
    return;
  }

  const allOrders = loadAllOrders();

  /* Tìm đơn theo id nội bộ (DH001) hoặc displayId (DB001) */
  const order = allOrders.find(o => o.id === rawId || o.displayId === rawId);

  if(!order){
    showErrorState();
    return;
  }

  renderDetail(order);

  /* ===== XỬ LÝ NÚT CẬP NHẬT TRẠNG THÁI ===== */
  document.getElementById('updateStatusBtn').addEventListener('click', () => {
    const newStatus = document.getElementById('newStatusSelect').value;
    if(!newStatus){
      showToast('Vui lòng chọn trạng thái mới!', 'warn');
      return;
    }

    const allowedStatuses = ORDER_STATUS_TRANSITIONS[order.status] || [];
    if(!allowedStatuses.includes(newStatus)){
      showToast('Trạng thái chỉ được cập nhật theo đúng thứ tự!', 'error');
      return;
    }

    order.status = newStatus;
    const badge = document.getElementById('statusBadge');
    badge.textContent = newStatus;
    badge.className = `od-badge ${STATUS_BADGE[newStatus] || 'badge-pending'}`;
    renderStatusUpdate(order);
    showToast(`Đã cập nhật trạng thái hiển thị: ${newStatus} (chỉ xem trước, không lưu dữ liệu).`, 'warn');
  });
});

function showErrorState(){
  document.getElementById('loadingState').hidden = true;
  document.getElementById('errorState').hidden   = false;
}
