'use strict';
/* ================================================================
   ADMIN.JS – Nhà Hàng Hương Việt
   Toàn bộ chạy client-side; danh mục và dữ liệu khách hàng dùng chung
   localStorage giữa trang quản trị và trang chủ.
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
  {id:17,name:"Sinh tố bơ",category:"thuc-uong",description:"Sinh tố bơ béo ngậy xay cùng sữa đặc và đá, thức uống bổ dưỡng.",price:28000,image:"images/sinh-to-bo.jpg",hidden:false},
  {id:18,name:"Cơm tấm",category:"mon-chinh",description:"Cơm tấm sườn nướng thơm, ăn kèm bì, chả trứng và nước mắm.",price:65000,image:"images/cơm tấm.jpg",hidden:false}
];

const HOMEPAGE_PRODUCT_DETAILS = {
  1:{fullDescription:"Phở bò được ninh từ xương bò trong nhiều giờ cùng hồi, quế, gừng nướng và hành nướng để tạo nên nước dùng trong, ngọt thanh mà vẫn đậm hương. Bánh phở mềm vừa tới, thịt bò tái được xếp đều trên bát, ăn kèm rau thơm, giá đỗ, chanh và ớt.",ingredients:"Xương bò, bánh phở, thịt bò, hành, gừng, hồi, quế, rau thơm",preparation:"Ninh nước dùng lâu, trụng bánh phở, xếp thịt bò và chan nước dùng nóng",flavor:"Ngọt thanh · Đậm đà · Ấm bụng"},
  2:{fullDescription:"Nem rán có lớp vỏ bột mì vàng giòn, bên trong là nhân thịt heo xay quyện miến, mộc nhĩ, cà rốt và hành băm. Khi ăn, nem được cắt vừa miệng cùng rau sống, bún và nước mắm chua ngọt.",ingredients:"Thịt heo, miến, mộc nhĩ, cà rốt, trứng, rau sống",preparation:"Trộn nhân đều, cuốn nem, chiên vừa lửa đến khi lớp vỏ vàng giòn",flavor:"Giòn rụm · Mặn ngọt · Thơm nhân"},
  3:{fullDescription:"Đùi gà được ướp sả, tỏi, mật ong và nước tương rồi nướng trên lửa vừa để da vàng ướp mềm, thịt giữ được độ mọng nước. Cơm tấm dẻo thơm được dọn cùng dưa leo, cà rốt muối chua và nước mắm tỏi ớt.",ingredients:"Đùi gà, sả, tỏi, mật ong, cơm tấm, rau củ dưa muối",preparation:"Ướp gà ít nhất 30 phút, nướng đều hai mặt và hoàn thiện trên than",flavor:"Thơm lửa · Ngọt nhẹ · Béo vừa"},
  4:{fullDescription:"Tôm sú tươi được bóc vỏ và để nguyên đuôi, nhanh tay xào trên lửa lớn cùng tỏi phi vàng, hành lá và rau củ giòn. Món mang vị ngọt tự nhiên của tôm, thơm mùi tỏi và có phần sốt bám đều.",ingredients:"Tôm sú, tỏi, hành lá, ớt chuông, dầu ăn, gia vị",preparation:"Phi tỏi cho thơm, xào tôm ngắn để giữ độ dai ngọt",flavor:"Ngọt tôm · Thơm tỏi · Hơi cay"},
  5:{fullDescription:"Thịt ba chỉ cắt miếng vừa ăn được đảo sơ để ráo nước rồi kho cùng nước dừa tươi, trứng vịt và hành tím. Nước kho sệt, màu cánh gián; thịt mềm béo, thấm gia vị và ăn cùng cơm nóng rất hợp.",ingredients:"Thịt ba chỉ, trứng vịt, nước dừa, hành tím, tiêu, nước mắm",preparation:"Rim thịt với nước màu, kho nhỏ lửa cùng trứng đến khi mềm",flavor:"Béo ngậy · Đậm đà · Ngọt bùi"},
  6:{fullDescription:"Mỗi cuốn gỏi gồm tôm sú chín, thịt ba chỉ luộc, bún, xà lách, húng quế và rau thơm cuốn trong bánh tráng mỏng. Món có vị mát, ít dầu mỡ, dùng kèm tương đậu phộng bùi béo và nước chấm chua ngọt.",ingredients:"Bánh tráng, tôm, thịt ba chỉ, bún, xà lách, húng quế, đậu phộng",preparation:"Luộc tôm và thịt, sơ bánh tráng, cuốn chặt và dọn kèm nước chấm",flavor:"Thanh mát · Bùi béo · Thơm rau"},
  7:{fullDescription:"Cá lóc tươi được làm sạch, cắt khúc và ướp kỹ nước mắm, đường thốt nốt, tiêu và hành. Cá kho trong nồi đất nhỏ lửa để thịt săn lại, thấm đều nước kho sánh, thơm mùi hành và tiêu.",ingredients:"Cá lóc, nước mắm, đường thốt nốt, tiêu, hành, nước màu",preparation:"Ướp cá, kho trong tộ đất ở lửa nhỏ đến khi nước kho sệt",flavor:"Đậm đà · Cay nhẹ · Mặn ngọt"},
  8:{fullDescription:"Mực ống tươi được rửa sạch, cắt hoa và xào nhanh cùng ớt chuông đỏ, hành tây, cần tỏi và nấm. Món giữ độ giòn ngọt của mực, rau củ vẫn tươi, đượm mùi hành tỏi và sốt tiêu.",ingredients:"Mực ống, ớt chuông, hành tây, cần tỏi, nấm, tỏi, tiêu",preparation:"Xào mực lửa lớn trong thời gian ngắn để không bị dai",flavor:"Giòn ngọt · Thơm rau · Cay nhẹ"},
  9:{fullDescription:"Chả giò hải sản có nhân tôm, thịt cua, nấm mèo, miến và rau củ xắt nhỏ, cuốn trong bánh tráng rồi chiên vàng. Lớp vỏ giòn rụm bên ngoài, nhân đậm đà bên trong, ăn cùng rau sống và nước mắm chua ngọt.",ingredients:"Tôm, thịt cua, nấm mèo, miến, cà rốt, bánh tráng",preparation:"Xào nhân, cuốn chặt, chiên hai lửa để vỏ vàng giòn đều",flavor:"Giòn rụm · Ngọt hải sản · Béo nhẹ"},
  10:{fullDescription:"Thịt heo được ướp sả, tỏi, nước mắm và chút mỡ hành rồi nướng than vàng cạnh, giữ độ mềm bên trong. Bún tươi được dọn cùng rau sống, đồ chua, đậu phộng rang và nước mắm chua ngọt.",ingredients:"Thịt heo, sả, tỏi, bún tươi, rau sống, đậu phộng, đồ chua",preparation:"Ướp thịt đậm vị, nướng than than hồng và rắc mỡ hành",flavor:"Thơm sả · Ngọt thịt · Chua thanh"},
  11:{fullDescription:"Chè ba màu có ba lớp màu rực rỡ là đậu đỏ nấu mềm, đậu xanh xay mịn và rau câu giòn. Khi dọn, chè được xếp đẹp trong ly với đá bào, nước đường hoa bưởi và một lớp nước cốt dừa béo ngậy.",ingredients:"Đậu đỏ, đậu xanh, rau câu, nước cốt dừa, đường, đá bào",preparation:"Nấu từng nguyên liệu riêng, để nguội và xếp lớp trước khi rót cốt dừa",flavor:"Ngọt dịu · Béo dừa · Mát lạnh"},
  12:{fullDescription:"Bánh flan được nướng ủ trong nồi hấp để đạt độ mịn, đều và không bị rỗ. Lớp caramel đen hổ phách được làm từ đường thắng tạo vị đắng nhẹ, cân bằng với trứng sữa béo và hương vani.",ingredients:"Trứng gà, sữa tươi, sữa đặc, đường, vani",preparation:"Đánh hỗn hợp nhẹ, lọc qua rây và hấp cách thủy ở nhiệt độ thấp",flavor:"Mềm mịn · Béo sữa · Caramel thơm"},
  13:{fullDescription:"Kem xoài dừa làm từ xoài chín xay nhuyễn, nước cốt dừa và kem sữa để tạo độ béo nhẹ. Khi dọn, kem được trang trí bằng xoài tươi cắt nhỏ, cơm dừa và lá bạc hà.",ingredients:"Xoài chín, nước cốt dừa, kem sữa, xoài tươi, cơm dừa",preparation:"Xay xoài cùng hỗn hợp kem, đông lạnh và thưởng thức khi hơi mềm",flavor:"Chua ngọt · Béo dừa · Mát lạnh"},
  14:{fullDescription:"Trà sen vàng được ướp chậm từ búp chè xanh chất lượng cùng hương sen thanh tao. Khi rót, nước trà vàng tươi, dịu hương hoa và hậu vị ngọt nhẹ; có thể thưởng thức nóng để cảm nhận hương sen rõ nhất.",ingredients:"Trà xanh, hoa sen, nước sôi, đá tùy chọn",preparation:"Hãm trà ở nhiệt độ vừa, ướp sen và phục vụ nóng hoặc với đá",flavor:"Thanh tao · Thơm sen · Hậu ngọt"},
  15:{fullDescription:"Bia Heineken được phục vụ lạnh, có màu vàng trong, lớp bọt nhẹ và hương hoa bia đặc trưng. Vị đắng cân bằng tạo cảm giác sảng khoái, hợp dùng kèm các món nướng hoặc hải sản.",ingredients:"Bia Heineken nguyên lon hoặc chai, ly làm lạnh",preparation:"Bảo quản lạnh, mở và rót nhẹ để tạo bọt vừa đủ",flavor:"Sảng khoái · Đắng nhẹ · Hương hoa bia"},
  16:{fullDescription:"Nước mía được ép tươi, giữ vị ngọt tự nhiên và mùi thơm của cây mía. Chanh tươi được vắt vào ly giúp cân bằng độ ngọt, tạo vị chua thanh và mát hơn khi dùng với nhiều đá.",ingredients:"Cây mía tươi, chanh, đường tùy chọn, đá",preparation:"Ép mía ngay khi gọi món, vắt chanh và khuấy đều",flavor:"Ngọt mát · Chua nhẹ · Giải khát"},
  17:{fullDescription:"Sinh tố bơ được xay nhuyễn từ bơ Booth hoặc bơ sáp chín, kết hợp sữa đặc và sữa tươi. Ly sinh tố có độ đặc mượt, vị béo tự nhiên vừa phải và ít ngọt, thích hợp dùng lạnh.",ingredients:"Bơ chín, sữa đặc, sữa tươi, đá xay",preparation:"Xay bơ, sữa và đá cho đến khi mịn, dọn trong ly lạnh",flavor:"Béo bùi · Ngọt vừa · Mịn mượt"},
  18:{fullDescription:"Cơm tấm được dọn với sườn nướng vàng, bì mềm, chả trứng và đồ chua. Món ăn đậm hương vị miền Nam, ăn kèm nước mắm tỏi ớt.",ingredients:"Cơm tấm, sườn heo, bì, chả trứng, đồ chua, nước mắm",preparation:"Nướng sườn, làm chả trứng và dọn cùng cơm tấm nóng",flavor:"Thơm nướng · Đậm đà · Béo ngậy"}
};

const CATEGORY_NAMES = {
  "mon-chinh":"Món chính","khai-vi":"Khai vị","hai-san":"Hải sản",
  "trang-mieng":"Tráng miệng","thuc-uong":"Thức uống"
};

/* ===== TRẠNG THÁI ĐƠN MANG ĐI (chỉ cập nhật xuôi) ===== */
const ORDER_STATUS_TRANSITIONS = {
  "Chờ xác nhận":["Đã xác nhận","Huỷ đơn"],
  "Đã xác nhận":["Đang giao","Huỷ đơn"],
  "Đang giao":["Giao thành công","Huỷ đơn"],
  "Giao thành công":[],
  "Huỷ đơn":[]
};
const STATUS_BADGE = {
  "Chờ xác nhận":"badge-pending",
  "Đã xác nhận":"badge-confirmed",
  "Đang giao":"badge-shipping",
  "Giao thành công":"badge-done",
  "Huỷ đơn":"badge-cancel"
};
/* Chuyển trạng thái lưu từ luồng đặt bàn cũ sang luồng bán mang đi. */
const STATUS_MIGRATION = {
  "Chờ nhận bàn":"Chờ xác nhận",
  "Đang phục vụ":"Đang giao",
  "Hoàn thành":"Giao thành công",
  "Đã hủy":"Huỷ đơn"
};

function readCatalogState(){
  try {
    const stored = JSON.parse(localStorage.getItem('hv_catalog_state') || '{}');
    const normalizeIds = value => Array.isArray(value)
      ? [...new Set(value.map(id => String(id)))]
      : [];
    return {
      deletedIds: normalizeIds(stored.deletedIds),
      customProducts: Array.isArray(stored.customProducts) ? stored.customProducts : []
    };
  } catch(error) {
    console.error('Không thể đọc trạng thái thực đơn đã lưu.', error);
    return {deletedIds: [], customProducts: []};
  }
}

const REMOVED_PRODUCT_NAME = 'cứt';
function isRemovedCatalogProduct(product){
  return String(product && product.name || '').trim().toLocaleLowerCase('vi') === REMOVED_PRODUCT_NAME;
}

function removeUnwantedCatalogProduct(){
  try {
    const stored = JSON.parse(localStorage.getItem('hv_catalog_state') || '{}');
    if(!stored || typeof stored !== 'object' || Array.isArray(stored)){
      throw new Error('Dữ liệu thực đơn không hợp lệ.');
    }
    const customProducts = Array.isArray(stored.customProducts) ? stored.customProducts : [];
    const removedProducts = customProducts.filter(isRemovedCatalogProduct);
    if(!removedProducts.length) return;

    const deletedIds = Array.isArray(stored.deletedIds) ? stored.deletedIds.map(String) : [];
    removedProducts.forEach(product => {
      if(product.id != null) deletedIds.push(String(product.id));
    });
    localStorage.setItem('hv_catalog_state', JSON.stringify({
      ...stored,
      deletedIds: [...new Set(deletedIds)],
      customProducts: customProducts.filter(product => !isRemovedCatalogProduct(product))
    }));
  } catch(error) {
    console.error('Không thể xóa món ăn khỏi thực đơn đã lưu.', error);
    showToast('Không thể xóa món ăn khỏi thực đơn đã lưu.', 'error');
  }
}

removeUnwantedCatalogProduct();
let catalogState = readCatalogState();
const adminHiddenProductIds = [];

function getProductsFromCatalog(){
  const overrides = new Map(catalogState.customProducts
    .filter(product => !isRemovedCatalogProduct(product))
    .map(product => [String(product.id), product]));
  const defaults = defaultFoods
    .filter(product =>
      !catalogState.deletedIds.includes(String(product.id)) &&
      !isRemovedCatalogProduct(product)
    )
    .map(product => {
      const override = overrides.get(String(product.id));
      const merged = override ? {...product, ...override} : product;
      return {
        ...merged,
        onSale: Number(product.id) !== 18,
        hidden: adminHiddenProductIds.includes(String(product.id))
      };
    }).filter(product => !isRemovedCatalogProduct(product));
  const customIds = new Set(defaults.map(product => String(product.id)));
  const custom = catalogState.customProducts
    .filter(product =>
      !isRemovedCatalogProduct(product) &&
      !customIds.has(String(product.id)) &&
      !catalogState.deletedIds.includes(String(product.id))
    )
    .map(product => ({
      ...product,
      onSale: true,
      hidden: adminHiddenProductIds.includes(String(product.id))
    }));
  return [...defaults, ...custom];
}
let products = getProductsFromCatalog();

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
const ADMIN_USERS_KEY = 'hv_admin_users';
const MAX_ADMIN_USERS = sampleUsers.length;

function normalizeAdminUserName(name){
  const value = String(name || '').trim();
  return value.startsWith('Nguyễn Tấn Tùng') ? 'Nguyễn Tấn Tùng' : value;
}

function normalizeAdminUserAddress(address){
  const parts = String(address || '').split(',').map(part => part.trim());
  if(!parts.length) return '';
  const lastPart = parts.length - 1;
  if(/^(?:TP\.?\s*HCM|TP\.?\s*Hồ Chí Minh|Thành phố\s+Hồ Chí Minh)$/i.test(parts[lastPart])){
    parts[lastPart] = 'TP. Hồ Chí Minh';
  }
  return parts.join(', ');
}

function readAdminUsers(){
  try {
    const stored = JSON.parse(localStorage.getItem(ADMIN_USERS_KEY) || 'null');
    if(Array.isArray(stored)){
      return stored.slice(0, MAX_ADMIN_USERS).map(user => ({
        name: normalizeAdminUserName(user.name),
        email: String(user.email || ''),
        phone: String(user.phone || ''),
        address: normalizeAdminUserAddress(user.address),
        locked: Boolean(user.locked)
      }));
    }
  } catch(error) {
    console.error('Không thể đọc danh sách người dùng đã lưu.', error);
  }
  return sampleUsers.map(user => ({
    ...user,
    address: normalizeAdminUserAddress(user.address)
  }));
}

let users = readAdminUsers();

// Đồng bộ người dùng được cập nhật trên trang khách hàng hoặc trong admin.
function readCustomerProfilesForAdmin(){
  try {
    const profiles = JSON.parse(localStorage.getItem('hv_customer_profiles') || '{}');
    return profiles && typeof profiles === 'object' && !Array.isArray(profiles) ? profiles : {};
  } catch(error) {
    console.error('Không thể đọc hồ sơ khách hàng đã lưu.', error);
    return {};
  }
}

function mergeCustomerProfiles(){
  const profiles = readCustomerProfilesForAdmin();
  let profilesChanged = false;
  Object.values(profiles).forEach(profile => {
    if(!profile || typeof profile !== 'object') return;
    const email = String(profile.email || '').trim().toLowerCase();
    const phone = String(profile.phone || '').replace(/\D/g, '');
    let user = users.find(item =>
      (email && item.email && String(item.email).trim().toLowerCase() === email) ||
      (phone && item.phone && String(item.phone).replace(/\D/g, '') === phone)
    );
    if(!user){
      if(users.length >= MAX_ADMIN_USERS) return;
      user = {name:'', email:'', phone:'', address:'', locked:false};
      users.push(user);
    }
    if(profile.name) user.name = normalizeAdminUserName(profile.name);
    if(profile.email) user.email = profile.email;
    if(profile.phone) user.phone = profile.phone;
    if(profile.address){
      const address = normalizeAdminUserAddress(profile.address);
      if(address !== profile.address){
        profile.address = address;
        profilesChanged = true;
      }
      user.address = address;
    }
  });
  if(profilesChanged){
    try {
      localStorage.setItem('hv_customer_profiles', JSON.stringify(profiles));
    } catch(error) {
      console.error('Không thể đồng bộ địa chỉ khách hàng.', error);
    }
  }
}

function saveAdminUsers(){
  try {
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users));
    return true;
  } catch(error) {
    console.error('Không thể lưu danh sách người dùng.', error);
    showToast('Không thể lưu người dùng trên trình duyệt.', 'error');
    return false;
  }
}

mergeCustomerProfiles();
saveAdminUsers();

// Đơn bán mang đi: đọc từ localStorage (hv_orders).
const sampleOrders = [
  {id:"DH001",date:"08/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"12 Nguyễn Huệ, Quận 1, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:1,name:"Phở bò",price:60000,qty:2},{id:2,name:"Nem rán",price:45000,qty:1}],subtotal:165000,shipping:0,total:165000,status:"Chờ xác nhận"},
  {id:"DH002",date:"09/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"45 Lê Văn Sỹ, Quận 3, TP.HCM"},payment:"Trực tuyến",note:"",items:[{id:3,name:"Cơm gà nướng",price:55000,qty:2},{id:11,name:"Chè ba màu",price:25000,qty:1}],subtotal:135000,shipping:0,total:135000,status:"Chờ xác nhận"},
  {id:"DH003",date:"10/11/2026",userId:"demo@huongviet.local",receiver:{name:"Nguyễn Tấn Tùng",phone:"0900000000",address:"78 Phan Xích Long, Bình Thạnh, TP.HCM"},payment:"Tiền mặt",note:"",items:[{id:4,name:"Tôm xào tỏi",price:75000,qty:1}],subtotal:75000,shipping:0,total:75000,status:"Chờ xác nhận"},
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

// Một số đơn mẫu cũ có địa chỉ thủ công khác địa chỉ tài khoản.
// Luôn đồng bộ địa chỉ mẫu theo địa chỉ hiện tại của người dùng tương ứng.
function normalizeSampleOrderAddress(order){
  const email = String(order.userId || '').trim().toLowerCase();
  const phone = String(order.receiver && order.receiver.phone || '').replace(/\D/g, '');
  const user = users.find(item =>
    (email && String(item.email || '').trim().toLowerCase() === email) ||
    (phone && String(item.phone || '').replace(/\D/g, '') === phone)
  );
  if(!user) return order;
  return {
    ...order,
    receiver: {...order.receiver, address: user.address}
  };
}

[...sampleOrders, ...additionalSampleOrders].forEach((order, index, all) => {
  const normalized = normalizeSampleOrderAddress(order);
  order.receiver.address = normalized.receiver.address;
});

const sampleOrderIds = new Set(
  [...sampleOrders, ...additionalSampleOrders].map(order => order.id)
);
const REMOVED_ORDER_IDS = new Set(['DH1795069499862', 'DH1795069468062', 'DH1795156834645']);
function isSampleOrder(order){
  return Boolean(order && sampleOrderIds.has(order.id));
}

function addMissingSampleOrders(){
  sampleOrders.forEach((sample, index) => {
    if((index < 3 || orders.length < 10) && !orders.some(order => order.id === sample.id)){
      orders.push({...sample});
    }
  });
}

function addMissingAdditionalSampleOrders(){
  additionalSampleOrders.forEach(sample => {
    if(!orders.some(order => order.id === sample.id)){
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
const orderStatusPreview = new Map();
let orderMigrationFailed = false;
try {
  const storedOrders = JSON.parse(localStorage.getItem('hv_orders') || '[]');
  if(Array.isArray(storedOrders)){
    const ordersToKeep = storedOrders.filter(order => !REMOVED_ORDER_IDS.has(String(order.id)));
    const correctedOrders = {
      DH1792736711047: {id:'DH009', name:'Nguyễn Hoàng Minh', date:'09/11/2026, 12:00:00', phone:'0987654321'},
      DH1792736708855: {id:'DH010', name:'Trần Ngọc Anh', date:'10/11/2026, 10:40:00', phone:'0912345670'},
      DH009: {id:'DH009', name:'Nguyễn Hoàng Minh', date:'09/11/2026, 12:00:00', phone:'0987654321'},
      DH010: {id:'DH010', name:'Trần Ngọc Anh', date:'10/11/2026, 10:40:00', phone:'0912345670'}
    };
    let hasMigratedOrders = ordersToKeep.length !== storedOrders.length;
    orders = ordersToKeep.map(order => {
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
        console.error('Không thể lưu thay đổi danh sách đơn hàng.', error);
      }
    }
  }
} catch(e){}
orders = orders.filter(order => order.type !== 'booking');
addMissingSampleOrders();
addMissingAdditionalSampleOrders();
orders = orders.map(order => isSampleOrder(order) ? normalizeSampleOrderAddress(order) : order);
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
// Migrate trạng thái của đơn cũ sang luồng bán mang đi.
orders = orders.map(order => {
  if(STATUS_MIGRATION[order.status]){
    return {...order, status: STATUS_MIGRATION[order.status]};
  }
  return order;
});
const sampleOrderDisplayIds = new Map(
  [...sampleOrders, ...additionalSampleOrders].map((sample, index) => [
    sample.id,
    `DB${String(index + 1).padStart(3, '0')}`
  ])
);
const reservedDisplayIds = new Set(sampleOrderDisplayIds.values());
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
assignDisplayIds();
// Sắp xếp đơn mang đi theo mã hiển thị.
orders.sort((a, b) => a.displayId.localeCompare(b.displayId));

let adminLoggedIn = false;

/* ===== HELPER FUNCTIONS ===== */
function money(v){ return Number(v).toLocaleString('vi-VN') + 'đ'; }
function escapeHtml(value){
  return String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[character]);
}
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
  t.style.background = type === 'error' ? '#b91c1c' : type === 'warn' ? '#92400e' : type === 'info' ? '#2b1a10' : '#1a6e3a';
  t.classList.remove('is-hidden');
  t.removeAttribute('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.setAttribute('hidden',''); }, 2800);
}

function showFilterNotice(){
  showToast('Bộ lọc chỉ mang tính minh họa giao diện, không thực hiện lọc dữ liệu.', 'info');
}

function showDemoNotice(action){
  showToast(`Chức năng ${action} chỉ mang tính minh họa giao diện, không thực hiện thay đổi dữ liệu.`, 'info');
}

function statusBadge(status){
  const cls = STATUS_BADGE[status] || 'badge-pending';
  return `<span class="badge ${cls}">${escapeHtml(status)}</span>`;
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
  if(id === 'deleteConfirmBackdrop') deleteConfirmCallback = null;
}
let deleteConfirmCallback = null;

function confirmDelete(message, onConfirm){
  document.getElementById('deleteConfirmMessage').textContent = message;
  deleteConfirmCallback = onConfirm;
  openModal('deleteConfirmBackdrop');
}

document.getElementById('deleteConfirmAccept').addEventListener('click', () => {
  const callback = deleteConfirmCallback;
  closeModal('deleteConfirmBackdrop');
  if(typeof callback === 'function') callback();
});
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
    showToast('Không thể lưu thay đổi danh sách đơn hàng.', 'error');
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
  populateOrderLocationFilters();
  renderOrders();
}

window.addEventListener('storage', event => {
  if(event.key === ADMIN_USERS_KEY){
    users = readAdminUsers();
    mergeCustomerProfiles();
    renderUsers();
    renderDashboard();
    renderOrders();
    return;
  }
  if(event.key === 'hv_customer_profiles'){
    mergeCustomerProfiles();
    saveAdminUsers();
    renderUsers();
    renderOrders();
    return;
  }
  if(event.key === 'hv_catalog_state'){
    removeUnwantedCatalogProduct();
    catalogState = readCatalogState();
    products = getProductsFromCatalog();
    renderProducts();
    renderDashboard();
    return;
  }
  if(event.key !== 'hv_orders') return;
  try {
    const storedOrders = JSON.parse(event.newValue || '[]');
    if(!Array.isArray(storedOrders)) throw new Error('Dữ liệu đơn hàng không hợp lệ.');
    orderStatusPreview.clear();
    const incomingOrders = storedOrders.filter(order => order.type !== 'booking');
    orders = incomingOrders.filter(order => !REMOVED_ORDER_IDS.has(String(order.id)));
    if(orders.length !== incomingOrders.length){
      try {
        localStorage.setItem('hv_orders', JSON.stringify(orders));
      } catch(error) {
        console.error('Không thể lưu danh sách đơn hàng đã dọn.', error);
        showToast('Không thể lưu thay đổi danh sách đơn hàng.', 'error');
      }
    }
    addMissingSampleOrders();
    addMissingAdditionalSampleOrders();
    orders = orders.map(order => isSampleOrder(order) ? normalizeSampleOrderAddress(order) : order);
    assignDisplayIds();
    populateOrderLocationFilters();
    renderOrders();
    renderDashboard();
    renderStats();
  } catch(error) {
    console.error('Không thể đồng bộ đơn hàng từ trang khách hàng.', error);
    showToast('Không thể đồng bộ đơn hàng từ trang khách hàng.', 'error');
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
  const totalRev = orders.filter(o => o.status === 'Giao thành công').reduce((s,o) => s+o.total,0);
  document.getElementById('statTotalRevenue').textContent = money(totalRev);

  // Recent orders
  const tbody = document.querySelector('#dashRecentOrders tbody');
  const recent = [...orders].slice(0, 5);
  tbody.innerHTML = recent.length ? recent.map(o => `
    <tr>
      <td><b>${escapeHtml(o.displayId)}</b></td>
      <td>${escapeHtml(customerName(o))}</td>
      <td>${money(o.total)}</td>
      <td>${statusBadge(o.status)}</td>
    </tr>
  `).join('') : '<tr><td colspan="4" class="empty-hint">Chưa có đơn hàng</td></tr>';
}
function customerName(order){
  const receiverName = order.receiver && order.receiver.name;
  const user = users.find(item => item.email === order.userId);
  return normalizeAdminUserName(receiverName || (user && user.name) || '—');
}

/* ================================================================
   SECTION: SẢN PHẨM
   ================================================================ */
const PRODUCTS_PER_PAGE = 5;
const USERS_PER_PAGE = 5;
const ORDERS_PER_PAGE = 5;
let currentProductPage = 1;
let currentUserPage = 1;
const productVisibilityPreview = new Map();
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
  tbody.innerHTML = pageProducts.length ? pageProducts.map(p => {
    const isHidden = productVisibilityPreview.has(String(p.id))
      ? productVisibilityPreview.get(String(p.id))
      : p.hidden;
    return `
      <tr>
        <td><img class="thumb" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.src='images/restaurant.jpg'"></td>
        <td><b>${escapeHtml(p.name)}</b></td>
        <td>${escapeHtml(CATEGORY_NAMES[p.category] || p.category)}</td>
        <td>${money(p.price)}</td>
        <td>
          <span class="sale-status ${p.onSale ? 'is-on' : 'is-off'}">${p.onSale ? 'Có' : 'Không'}</span>
        </td>
        <td>
          <span class="visibility-status ${isHidden ? 'is-off' : 'is-on'}">${isHidden ? 'Không' : 'Có'}</span>
        </td>
        <td>
          <div class="product-action-buttons">
            <button class="abtn abtn-sm abtn-outline product-action-button" onclick="openEditProduct(${p.id})">✏ Sửa</button>
            <button class="abtn abtn-sm abtn-danger product-action-button" onclick="deleteProduct(${p.id})">🗑 Xoá</button>
            <button class="abtn abtn-sm ${isHidden ? 'abtn-success' : 'abtn-outline'} product-action-button" onclick="toggleHideProduct(${p.id})">
              ${isHidden ? 'Hiển thị' : 'Ẩn'}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('') : '<tr><td colspan="7" class="empty-hint">Không có sản phẩm nào</td></tr>';

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
  document.getElementById('productServing').value = '1 phần';
  document.getElementById('productServingSubtract').disabled = true;
  document.getElementById('productDetailHelp').textContent = 'Thông tin chi tiết sẽ hiển thị trong mục “Xem chi tiết” trên trang chủ.';
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
  const homepageDetails = HOMEPAGE_PRODUCT_DETAILS[p.id] || {};
  document.getElementById('productModalTitle').textContent = 'Sửa sản phẩm';
  document.getElementById('productId').value = p.id;
  document.getElementById('productName').value = p.name;
  document.getElementById('productCategory').value = p.category;
  document.getElementById('productPrice').value = Number(p.price).toLocaleString('vi-VN');
  document.getElementById('productDesc').value = p.description;
  document.getElementById('productFullDescription').value = p.fullDescription || homepageDetails.fullDescription || p.description;
  document.getElementById('productIngredients').value = p.ingredients || homepageDetails.ingredients || 'Nguyên liệu được lựa chọn tươi ngon theo tiêu chuẩn nhà hàng';
  document.getElementById('productPreparation').value = p.preparation || homepageDetails.preparation || 'Chế biến mới khi khách đặt để giữ trọn hương vị';
  document.getElementById('productFlavor').value = p.flavor || homepageDetails.flavor || '';
  document.getElementById('productServing').value = p.category === 'thuc-uong' ? '1 ly' : '1 phần';
  document.getElementById('productServingSubtract').disabled = true;
  document.getElementById('productDetailHelp').textContent = 'Thông tin đang hiển thị theo trang chủ. Chỉnh sửa ở đây chỉ mang tính minh họa, không lưu thay đổi.';
  const preview = document.getElementById('productImagePreview');
  preview.src = p.image;
  preview.hidden = false;
  document.getElementById('imageUploadPlaceholder').hidden = true;
  document.getElementById('productSubmitBtn').textContent = 'Lưu thay đổi';
  openModal('productModalBackdrop');
}

document.getElementById('productCategory').addEventListener('change', event => {
  document.getElementById('productServing').value = event.currentTarget.value === 'thuc-uong' ? '1 ly' : '1 phần';
  document.getElementById('productServingSubtract').disabled = true;
});

function changeProductServing(amount){
  const servingInput = document.getElementById('productServing');
  const current = Number.parseInt(servingInput.value, 10) || 1;
  const next = Math.max(1, current + amount);
  const unit = servingInput.value.includes('ly') ? 'ly' : 'phần';
  servingInput.value = `${next} ${unit}`;
  document.getElementById('productServingSubtract').disabled = next <= 1;
}

document.getElementById('productServingSubtract').addEventListener('click', () => changeProductServing(-1));
document.getElementById('productServingAdd').addEventListener('click', () => changeProductServing(1));

/* --- THÊM / SỬA SẢN PHẨM --- */
document.getElementById('productForm').addEventListener('submit', function(e){
  e.preventDefault();
  const idValue = document.getElementById('productId').value;

  if(idValue){
    closeModal('productModalBackdrop');
    showDemoNotice('sửa sản phẩm');
    return;
  }

  closeModal('productModalBackdrop');
  showDemoNotice('thêm sản phẩm');
});

/* --- NÚT LỌC / ĐẶT LẠI SẢN PHẨM --- */
document.getElementById('applyProductFilter').addEventListener('click', () => {
  showFilterNotice();
});
document.getElementById('resetProductFilter').addEventListener('click', () => {
  showToast('Chức năng đặt lại chỉ mang tính minh họa giao diện, không thực hiện thay đổi dữ liệu.', 'info');
});

function toggleHideProduct(id){
  const product = products.find(item => item.id === id);
  if(!product) return;
  const productId = String(id);
  const isHidden = productVisibilityPreview.has(productId)
    ? productVisibilityPreview.get(productId)
    : product.hidden;
  productVisibilityPreview.set(productId, !isHidden);
  renderProducts();
  showToast('Trạng thái chỉ thay đổi trong bản xem trước tại mục này, không lưu dữ liệu.', 'info');
}

function deleteProduct(id){
  const product = products.find(item => item.id === id);
  if(!product) return;
  confirmDelete(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}" không?`, () => {
    showDemoNotice('xóa sản phẩm');
  });
}

/* ================================================================
   SECTION: NGƯỜI DÙNG
   ================================================================ */
function renderUsers(){
  const list = users.map((user, index) => ({user, index}));
  const pageCount = Math.ceil(list.length / USERS_PER_PAGE);
  currentUserPage = Math.min(currentUserPage, Math.max(pageCount, 1));
  const pageStart = (currentUserPage - 1) * USERS_PER_PAGE;
  const pageUsers = list.slice(pageStart, pageStart + USERS_PER_PAGE);
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = pageUsers.length ? pageUsers.map(({user: u, index}) => `
    <tr>
      <td>${index + 1}</td>
      <td><b>${u.name}</b></td>
      <td>${u.email||'—'}</td>
      <td>${u.phone||'—'}</td>
      <td>${u.address||'—'}</td>
      <td>${u.locked
        ? '<span class="badge badge-locked">Bị khoá</span>'
        : '<span class="badge badge-active">Hoạt động</span>'}</td>
      <td>
        <button class="abtn abtn-sm abtn-outline" onclick="openEditUser(${index})">✏ Sửa</button>
        <button class="abtn abtn-sm abtn-danger" onclick="deleteUser(${index})">Xóa</button>
        <button class="abtn abtn-sm ${u.locked ? 'abtn-success' : 'abtn-danger'}" onclick="toggleLockUser(${index})">
          ${u.locked ? '🔓 Mở khoá' : '🔒 Khoá'}
        </button>
      </td>
    </tr>
  `).join('') : '<tr><td colspan="7" class="empty-hint">Không tìm thấy người dùng</td></tr>';
  renderUserPagination(pageCount);
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

/* --- NÚT LỌC / ĐẶT LẠI NGƯỜI DÙNG --- */
document.getElementById('applyUserFilter').addEventListener('click', () => {
  showFilterNotice();
});
document.getElementById('resetUserFilter').addEventListener('click', () => {
  showToast('Chức năng đặt lại chỉ mang tính minh họa giao diện, không thực hiện thay đổi dữ liệu.', 'info');
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
  const idxValue = document.getElementById('userIndex').value;
  closeModal('userModalBackdrop');
  showDemoNotice(idxValue === '' ? 'thêm người dùng' : 'sửa người dùng');
});

/* --- KHOÁ / MỞ KHOÁ NGƯỜI DÙNG --- */
function toggleLockUser(idx){
  const user = users[idx];
  if(!user) return;
  user.locked = !user.locked;
  if(!saveAdminUsers()){
    user.locked = !user.locked;
    return;
  }
  renderUsers();
  renderDashboard();
}

function deleteUser(idx){
  const user = users[idx];
  if(!user) return;
  const displayName = user.name || user.email || user.phone || 'người dùng này';
  confirmDelete(`Bạn có chắc muốn xóa người dùng "${displayName}" không?`, () => {
    showDemoNotice('xóa người dùng');
  });
}

/* ================================================================
   SECTION: ĐƠN BÁN MANG ĐI
   ================================================================ */
function sortOrdersByDisplayId(orderList){
  return [...orderList].sort((a, b) => {
    const aNumber = Number(String(a.displayId || '').replace(/\D/g, '')) || 0;
    const bNumber = Number(String(b.displayId || '').replace(/\D/g, '')) || 0;
    return aNumber - bNumber;
  });
}

function populateOrderLocationFilters(){
  const wardSelect = document.getElementById('orderWardFilter');
  const citySelect = document.getElementById('orderCityFilter');
  if(!wardSelect || !citySelect) return;

  const wards = new Set();
  const selectedCity = citySelect.value;
  orders.forEach(order => {
    const address = String(order.receiver && order.receiver.address || '');
    const wardMatch = address.match(/(phường|xã)\s+[^,]+/gi);
    if(wardMatch) wardMatch.forEach(value => wards.add(value.trim()));
  });
  wardSelect.innerHTML = '<option value="all">Tất cả phường/xã</option>' +
    [...wards].sort((a,b) => a.localeCompare(b, 'vi')).map(value =>
      `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`
    ).join('');
  citySelect.innerHTML = '<option value="all">Tất cả tỉnh/thành phố</option>' +
    '<option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>';
  if(selectedCity !== 'all') citySelect.value = 'TP. Hồ Chí Minh';
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
  if(!list.length) empty.textContent = 'Chưa có đơn hàng nào.';

  tbody.innerHTML = pageOrders.length ? pageOrders.map(o => {
    const status = orderStatusPreview.get(o.id) || o.status;
    const nextStatuses = ORDER_STATUS_TRANSITIONS[status] || [];
    const statusOptions = nextStatuses.map(s =>
      `<option value="${s}">${s}</option>`
    ).join('');

    return `
      <tr>
        <td><b>${escapeHtml(o.displayId)}</b></td>
        <td>${escapeHtml(o.date)}</td>
        <td>${escapeHtml(customerName(o))}<br><small>${escapeHtml(o.receiver && o.receiver.phone)}</small></td>
        <td>${escapeHtml(o.receiver && o.receiver.address || '—')}</td>
        <td><b>${money(o.total)}</b></td>
        <td>${statusBadge(status)}</td>
        <td>
          <div class="order-actions">
            <button class="abtn abtn-sm abtn-outline" onclick="viewOrderDetail('${o.id}')">🔍 Chi tiết</button>
            ${nextStatuses.length > 0 ? `
              <select class="abtn abtn-sm order-status-select" id="statusSel_${o.id}">
                <option value="">Cập nhật...</option>
                ${statusOptions}
              </select>
              <button class="abtn abtn-sm abtn-success order-status-submit" onclick="updateOrderStatus('${o.id}')" aria-label="Lưu trạng thái">✓</button>
            ` : ''}
          </div>
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
  showFilterNotice();
});

[
  ['productSearch', 'applyProductFilter'],
  ['userSearchName', 'applyUserFilter'],
  ['userSearchPhone', 'applyUserFilter'],
  ['orderSearchKeyword', 'applyOrderFilter'],
  ['orderAddressKeyword', 'applyOrderFilter']
].forEach(([inputId, buttonId]) => {
  document.getElementById(inputId).addEventListener('keydown', event => {
    if(event.key !== 'Enter') return;
    event.preventDefault();
    document.getElementById(buttonId).click();
  });
});

/* --- CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG --- */
function updateOrderStatus(orderId){
  const sel = document.getElementById('statusSel_' + orderId);
  if(!sel || !sel.value){ showToast('Vui lòng chọn trạng thái!', 'warn'); return; }
  const newStatus = sel.value;
  const o = orders.find(x => x.id === orderId);
  if(!o){ showToast('Không tìm thấy đơn hàng cần cập nhật.', 'error'); return; }
  const currentStatus = orderStatusPreview.get(orderId) || o.status;
  const allowedStatuses = ORDER_STATUS_TRANSITIONS[currentStatus] || [];
  if(!allowedStatuses.includes(newStatus)){
    showToast('Trạng thái chỉ được cập nhật theo đúng thứ tự.', 'error'); return;
  }
  orderStatusPreview.set(orderId, newStatus);
  renderOrders();
  showToast(`Đã cập nhật trạng thái hiển thị: ${newStatus} (chỉ xem trước, không lưu dữ liệu).`, 'info');
}

/* --- XEM CHI TIẾT ĐƠN HÀNG (chuyển sang trang riêng) --- */
function viewOrderDetail(orderId){
  const o = orders.find(x => x.id === orderId);
  if(!o) return;
  window.location.href = 'order-detail.html?id=' + encodeURIComponent(o.id) +
    '&from=orders&page=' + currentOrderPage;
}

/* ================================================================
   SECTION: THỐNG KÊ TOP 5 KHÁCH HÀNG
   ================================================================ */
function getStatsOrders(){
  const dateFrom = document.getElementById('statsDateFrom').value;
  const dateTo = document.getElementById('statsDateTo').value;
  const fromTime = dateFrom ? new Date(`${dateFrom}T00:00:00`).getTime() : null;
  const toTime = dateTo ? new Date(`${dateTo}T23:59:59`).getTime() : null;
  if(!fromTime && !toTime) return orders;
  return orders.filter(order => {
    const orderDate = parseOrderDateValue(order.date);
    if(!orderDate) return false;
    if(fromTime && orderDate.getTime() < fromTime) return false;
    if(toTime && orderDate.getTime() > toTime) return false;
    return true;
  });
}

function renderStats(){
  const tbody = document.getElementById('statsTopBody');
  const empty = document.getElementById('statsEmpty');
  const filteredOrders = getStatsOrders();

  // Nhóm theo userId (email)
  const customerMap = {};
  filteredOrders.forEach(o => {
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
  } else {
    empty.hidden = true;
    tbody.innerHTML = ranked.map((c, i) => `
      <tr>
        <td><b>#${i+1}</b></td>
        <td><b>${escapeHtml(c.name)}</b><br><small style="color:var(--muted)">${escapeHtml(c.email)}</small></td>
        <td>${c.orders.length} đơn</td>
        <td><b style="color:var(--orange)">${money(c.total)}</b></td>
        <td><button class="abtn abtn-sm abtn-outline" onclick="viewCustomerOrders('${c.email}')">📋 Xem đơn hàng</button></td>
      </tr>
    `).join('');
  }

}

document.getElementById('applyStatsFilter').addEventListener('click', showFilterNotice);
document.getElementById('resetStatsFilter').addEventListener('click', () => {
  showToast('Chức năng đặt lại chỉ mang tính minh họa giao diện, không thực hiện thay đổi dữ liệu.', 'info');
});

/* --- XEM ĐƠN HÀNG CỦA KHÁCH (từ thống kê) --- */
function viewCustomerOrders(email){
  const u = users.find(x => x.email === email);
  const customerOrders = getStatsOrders().filter(o => o.userId === email || o.receiver.name === email);
  const displayName = customerOrders.length
    ? customerName(customerOrders[0])
    : (u ? u.name : email);

  document.getElementById('statsOrderTitle').textContent = `Đơn hàng của: ${displayName}`;
  document.getElementById('statsOrderContent').innerHTML = customerOrders.length
    ? customerOrders.map(o => `
        <div style="border:1px solid var(--admin-border);border-radius:8px;margin-bottom:10px;overflow:hidden">
          <div style="background:#fdf6ee;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
            <div><a class="abtn abtn-sm abtn-outline" href="order-detail.html?id=${encodeURIComponent(o.id)}&from=stats">${escapeHtml(o.displayId)} · Xem chi tiết</a> · ${escapeHtml(o.date)}</div>
            <div>${statusBadge(o.status)}</div>
            <div><b style="color:var(--orange)">${money(o.total)}</b></div>
          </div>
          <div style="padding:10px 14px;font-size:12px;color:var(--muted)">
            ${o.items.map(item => `${escapeHtml(item.name)} × ${Number(item.qty)}`).join(' · ')}
          </div>
        </div>
      `).join('')
    : '<p class="empty-hint">Khách hàng chưa có đơn hàng nào.</p>';

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
