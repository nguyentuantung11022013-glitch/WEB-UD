'use strict';
/* ================================================================
   ORDER-DETAIL.JS – Trang chi tiết đơn đặt bàn
   Nhà Hàng Hương Việt
   Đọc mã đơn từ URL (?id=DH001) và tải dữ liệu từ localStorage
   hoặc dữ liệu mẫu tích hợp sẵn.
   ================================================================ */

/* ===== DỮ LIỆU MẪU (đồng bộ với admin.js) ===== */
const SAMPLE_ORDERS = [
  {id:"DH001",displayId:"DB001",date:"08/11/2026",time:"18:00",guests:"2 người",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:1,name:"Phở bò",price:60000,qty:2},{id:2,name:"Nem rán",price:45000,qty:1}],total:165000,status:"Chờ nhận bàn"},
  {id:"DH002",displayId:"DB002",date:"09/11/2026",time:"19:00",guests:"4 người",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:2},{id:11,name:"Chè ba màu",price:25000,qty:1}],total:135000,status:"Chờ nhận bàn"},
  {id:"DH003",displayId:"DB003",date:"10/11/2026",time:"12:30",guests:"3 người",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"78 Phan Xích Long, Bình Thạnh, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:4,name:"Tôm xào tỏi",price:75000,qty:1}],total:75000,status:"Chờ nhận bàn"},
  {id:"DH004",displayId:"DB004",date:"04/11/2026, 10:00:00",userId:"an@email.com",receiver:{name:"Nguyễn Văn An",phone:"0901234567",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:5,name:"Thịt kho tàu",price:50000,qty:3}],total:150000,status:"Chờ nhận bàn"},
  {id:"DH005",displayId:"DB005",date:"05/11/2026, 14:45:00",userId:"binh@email.com",receiver:{name:"Trần Thị Bình",phone:"0912345678",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:7,name:"Cá kho tộ",price:68000,qty:2},{id:14,name:"Trà sen vàng",price:25000,qty:2}],total:186000,status:"Hoàn thành"},
  {id:"DH006",displayId:"DB006",date:"06/11/2026, 13:15:00",userId:"mai@email.com",receiver:{name:"Dương Thị Mai",phone:"0934567890",address:"25 Nguyễn Trãi, Quận 5, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:6,name:"Gỏi cuốn",price:35000,qty:2}],total:70000,status:"Chờ nhận bàn"},
  {id:"DH007",displayId:"DB007",date:"07/11/2026, 11:10:00",userId:"bao@email.com",receiver:{name:"Phạm Quốc Bảo",phone:"0945678901",address:"80 Nguyễn Thị Thập, Quận 7, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:10,name:"Bún thịt nướng",price:52000,qty:2}],total:104000,status:"Chờ nhận bàn"},
  {id:"DH008",displayId:"DB008",date:"08/11/2026, 19:25:00",userId:"ha@email.com",receiver:{name:"Võ Ngọc Hà",phone:"0956789012",address:"12 Võ Văn Ngân, Thủ Đức, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:12,name:"Bánh flan",price:20000,qty:2},{id:14,name:"Trà sen vàng",price:25000,qty:1}],total:65000,status:"Hoàn thành"},
  {id:"DH009",displayId:"DB009",date:"09/11/2026, 12:00:00",userId:"khoa@email.com",receiver:{name:"Đặng Minh Khoa",phone:"0987654321",address:"40 Cộng Hòa, Tân Bình, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:0,name:"Cơm trắng",price:15000,qty:1}],total:30000,status:"Đang phục vụ"},
  {id:"DH010",displayId:"DB010",date:"10/11/2026, 10:40:00",userId:"truc@email.com",receiver:{name:"Bùi Thanh Trúc",phone:"0912345670",address:"55 Phan Xích Long, Phú Nhuận, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:1}],total:55000,status:"Đã hủy"},
  {id:"DH011",displayId:"DB011",date:"11/11/2026, 09:20:00",userId:"mai@email.com",receiver:{name:"Dương Thị Mai",phone:"0934567890",address:"25 Nguyễn Trãi, Quận 5, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:1,name:"Phở bò",price:60000,qty:1}],total:60000,status:"Chờ nhận bàn"},
  {id:"DH012",displayId:"DB012",date:"11/11/2026, 11:45:00",userId:"bao@email.com",receiver:{name:"Phạm Quốc Bảo",phone:"0945678901",address:"80 Nguyễn Thị Thập, Quận 7, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:6,name:"Gỏi cuốn",price:35000,qty:2}],total:70000,status:"Chờ nhận bàn"},
  {id:"DH013",displayId:"DB013",date:"12/11/2026, 12:10:00",userId:"ha@email.com",receiver:{name:"Võ Ngọc Hà",phone:"0956789012",address:"12 Võ Văn Ngân, Thủ Đức, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:11,name:"Chè ba màu",price:25000,qty:2}],total:50000,status:"Đang phục vụ"},
  {id:"DH014",displayId:"DB014",date:"12/11/2026, 18:30:00",userId:"an@email.com",receiver:{name:"Nguyễn Văn An",phone:"0901234567",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:4,name:"Thịt kho tàu",price:50000,qty:2}],total:100000,status:"Hoàn thành"},
  {id:"DH015",displayId:"DB015",date:"13/11/2026, 10:05:00",userId:"binh@email.com",receiver:{name:"Trần Thị Bình",phone:"0912345678",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:8,name:"Mực xào rau củ",price:82000,qty:1}],total:82000,status:"Chờ nhận bàn"},
  {id:"DH016",displayId:"DB016",date:"13/11/2026, 14:15:00",userId:"cuong@email.com",receiver:{name:"Lê Minh Cường",phone:"0923456789",address:"78 Phan Xích Long, Bình Thạnh, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:10,name:"Bún thịt nướng",price:52000,qty:2}],total:104000,status:"Chờ nhận bàn"},
  {id:"DH017",displayId:"DB017",date:"14/11/2026, 08:50:00",userId:"trang@email.com",receiver:{name:"Nguyễn Thu Trang",phone:"0990123456",address:"Phường Cầu Kiệu, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:12,name:"Bánh flan",price:20000,qty:3}],total:60000,status:"Đang phục vụ"},
  {id:"DH018",displayId:"DB018",date:"14/11/2026, 17:40:00",userId:"khoa@email.com",receiver:{name:"Đặng Minh Khoa",phone:"0967890123",address:"Phường Tân Sơn Nhất, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:14,name:"Trà sen vàng",price:25000,qty:2}],total:50000,status:"Hoàn thành"},
  {id:"DH019",displayId:"DB019",date:"15/11/2026, 11:25:00",userId:"tuan.phan@email.com",receiver:{name:"Phan Minh Tuấn",phone:"0901112233",address:"Phường Bến Thành, TP.HCM"},payment:"Tiền mặt (COD)",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:1}],total:55000,status:"Chờ nhận bàn"},
  {id:"DH020",displayId:"DB020",date:"16/11/2026, 13:05:00",userId:"ngoc.le@email.com",receiver:{name:"Lê Thị Ngọc",phone:"0902223344",address:"Phường Tân Định, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:7,name:"Cá kho tộ",price:68000,qty:1}],total:68000,status:"Chờ nhận bàn"}
];

/* Map displayId ↔ order (hỗ trợ tìm theo cả id nội bộ lẫn displayId) */
const SAMPLE_BY_ID         = new Map(SAMPLE_ORDERS.map(o => [o.id, o]));
const SAMPLE_BY_DISPLAY_ID = new Map(SAMPLE_ORDERS.map(o => [o.displayId, o]));

/* ===== TRẠNG THÁI ĐƠN (đồng bộ admin.js) ===== */
const ORDER_STATUS_FLOW = ['Chờ nhận bàn', 'Đang phục vụ', 'Hoàn thành', 'Đã hủy'];
const STATUS_BADGE = {
  'Chờ nhận bàn': 'badge-pending',
  'Đang phục vụ': 'badge-shipping',
  'Hoàn thành':   'badge-done',
  'Đã hủy':       'badge-cancel',
  'Chờ xác nhận': 'badge-pending',
  'Đã xác nhận':  'badge-confirmed',
  'Đang giao':    'badge-shipping',
  'Giao thành công': 'badge-done',
  'Huỷ đơn':     'badge-cancel'
};
/* Map trạng thái cũ → mới (tương thích localStorage) */
const STATUS_MIGRATION = {
  'Chờ xác nhận':  'Chờ nhận bàn',
  'Đã xác nhận':   'Chờ nhận bàn',
  'Đang giao':     'Đang phục vụ',
  'Giao thành công': 'Hoàn thành',
  'Huỷ đơn':      'Đã hủy'
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
function loadAllOrders(){
  let orders = [];
  try {
    const stored = JSON.parse(localStorage.getItem('hv_orders') || '[]');
    if(Array.isArray(stored)){
      orders = stored.filter(o => o.type !== 'booking');
    }
  } catch(e){ /* ignore */ }

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

/* ===== LƯU TRẠNG THÁI MỚI VÀO localStorage ===== */
function saveOrderStatus(orderId, newStatus, allOrders){
  try {
    let stored = JSON.parse(localStorage.getItem('hv_orders') || '[]');
    if(Array.isArray(stored)){
      const idx = stored.findIndex(o => o.id === orderId);
      if(idx !== -1){
        stored[idx].status = newStatus;
      } else {
        /* Nếu đơn chỉ nằm trong mẫu, không có trong localStorage thì thêm vào */
        const target = allOrders.find(o => o.id === orderId);
        if(target) stored.push({...target, status: newStatus});
      }
      localStorage.setItem('hv_orders', JSON.stringify(stored));
    }
  } catch(e){ /* ignore nếu localStorage bị chặn */ }
}

/* ===== RENDER TRANG ===== */
function renderDetail(order){
  /* Cập nhật breadcrumb và tiêu đề */
  const displayId = order.displayId || order.id;
  document.title = `Chi tiết ${displayId} – Nhà Hàng Hương Việt`;
  document.getElementById('breadcrumbId').textContent = displayId;
  document.getElementById('pageTitle').textContent    = `Chi tiết đơn đặt bàn ${displayId}`;

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

  if(order.time){
    document.getElementById('orderTime').textContent = order.time;
    document.getElementById('rowTime').hidden = false;
  }
  if(order.guests){
    document.getElementById('orderGuests').textContent = order.guests;
    document.getElementById('rowGuests').hidden = false;
  }

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

  const currentIdx = ORDER_STATUS_FLOW.indexOf(order.status);
  const isLocked   = order.status === 'Hoàn thành' || order.status === 'Đã hủy';

  if(isLocked){
    sel.hidden  = true;
    btn.hidden  = true;
    note.hidden = false;
    return;
  }

  /* Chỉ cho phép cập nhật xuôi */
  const nextStatuses = ORDER_STATUS_FLOW.slice(currentIdx + 1);
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

    const currIdx = ORDER_STATUS_FLOW.indexOf(order.status);
    const newIdx  = ORDER_STATUS_FLOW.indexOf(newStatus);
    if(newIdx <= currIdx){
      showToast('Không thể cập nhật ngược trạng thái!', 'error');
      return;
    }

    /* Cập nhật trạng thái trong bộ nhớ */
    order.status = newStatus;
    saveOrderStatus(order.id, newStatus, allOrders);
    showToast(`✓ Đã cập nhật trạng thái sang "${newStatus}"`);

    /* Re-render badge và select */
    const badgeCls = STATUS_BADGE[newStatus] || 'badge-pending';
    const badge = document.getElementById('statusBadge');
    badge.textContent = newStatus;
    badge.className   = `od-badge ${badgeCls}`;
    renderStatusUpdate(order);
  });
});

function showErrorState(){
  document.getElementById('loadingState').hidden = true;
  document.getElementById('errorState').hidden   = false;
}
