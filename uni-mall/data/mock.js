export const banners = [
  {
    id: 1,
    title: '春日鲜果节',
    subtitle: '满 99 元减 20 元',
    image: '/static/banner-fresh.svg'
  },
  {
    id: 2,
    title: '品质家居周',
    subtitle: '爆款 2 件 8 折',
    image: '/static/banner-home.svg'
  },
  {
    id: 3,
    title: '轻食能量站',
    subtitle: '办公室囤货推荐',
    image: '/static/banner-snack.svg'
  }
];

export const categories = [
  { id: 'fruit', name: '水果鲜食', icon: '🍊', description: '每日鲜摘，冷链到家' },
  { id: 'snack', name: '休闲零食', icon: '🥨', description: '低糖轻负担，越吃越香' },
  { id: 'home', name: '家居好物', icon: '🪴', description: '提升日常幸福感' },
  { id: 'beauty', name: '美妆个护', icon: '🧴', description: '口碑爆款放心买' }
];

export const products = [
  {
    id: 101,
    categoryId: 'fruit',
    name: '智利车厘子礼盒',
    brief: '果径 30mm+，清甜脆爽',
    price: 128,
    marketPrice: 168,
    unit: '2kg/箱',
    image: '/static/product-fruit.svg',
    tags: ['限时特惠', '冷链直达'],
    sales: 1260,
    stock: 58,
    detail: '精选进口果园，颗颗饱满。适合家庭分享和节日送礼。',
    express: '顺丰冷链',
    score: 4.9
  },
  {
    id: 102,
    categoryId: 'fruit',
    name: '云南蓝莓鲜果',
    brief: '大果蓝莓，酸甜平衡',
    price: 39.9,
    marketPrice: 49.9,
    unit: '125g*4盒',
    image: '/static/product-fruit.svg',
    tags: ['营养轻食'],
    sales: 860,
    stock: 96,
    detail: '新鲜采摘，口感细腻。适合早餐酸奶碗和下午加餐。',
    express: '产地直发',
    score: 4.8
  },
  {
    id: 201,
    categoryId: 'snack',
    name: '海盐碱水面包',
    brief: '现烤风味，越嚼越香',
    price: 26.8,
    marketPrice: 32.8,
    unit: '6枚装',
    image: '/static/product-snack.svg',
    tags: ['早餐优选', '人气榜'],
    sales: 2100,
    stock: 210,
    detail: '淡淡海盐香气，空气炸锅复烤后风味更佳。',
    express: '次日达',
    score: 4.8
  },
  {
    id: 202,
    categoryId: 'snack',
    name: '混合坚果能量包',
    brief: '独立小包装，便携控量',
    price: 49,
    marketPrice: 59,
    unit: '30袋/盒',
    image: '/static/product-snack.svg',
    tags: ['办公室常备'],
    sales: 3180,
    stock: 150,
    detail: '核桃、腰果、蔓越莓科学搭配，口感层次丰富。',
    express: '全国包邮',
    score: 4.9
  },
  {
    id: 301,
    categoryId: 'home',
    name: '香氛融蜡夜灯',
    brief: '卧室氛围感小家电',
    price: 139,
    marketPrice: 169,
    unit: '1套',
    image: '/static/product-home.svg',
    tags: ['新品上架'],
    sales: 420,
    stock: 75,
    detail: '无明火更安心，支持亮度调节，送礼自用都合适。',
    express: '48 小时发货',
    score: 4.7
  },
  {
    id: 302,
    categoryId: 'home',
    name: '北欧收纳托盘',
    brief: '桌面收纳更整洁',
    price: 35,
    marketPrice: 45,
    unit: '单个',
    image: '/static/product-home.svg',
    tags: ['桌面焕新'],
    sales: 750,
    stock: 183,
    detail: '适用于玄关、梳妆台和办公桌，兼顾颜值与实用。',
    express: '全国包邮',
    score: 4.7
  },
  {
    id: 401,
    categoryId: 'beauty',
    name: '氨基酸净润洁面',
    brief: '温和清洁，不拔干',
    price: 79,
    marketPrice: 99,
    unit: '120ml',
    image: '/static/product-beauty.svg',
    tags: ['回购爆款'],
    sales: 1680,
    stock: 120,
    detail: '绵密泡沫轻松带走油脂污垢，敏感肌也可放心尝试。',
    express: '品牌仓直发',
    score: 4.9
  },
  {
    id: 402,
    categoryId: 'beauty',
    name: '沁润修护面膜',
    brief: '补水舒缓，晒后维稳',
    price: 89,
    marketPrice: 109,
    unit: '10片/盒',
    image: '/static/product-beauty.svg',
    tags: ['换季必备'],
    sales: 940,
    stock: 88,
    detail: '高保湿精华配方，适合熬夜后或换季期密集修护。',
    express: '品牌仓直发',
    score: 4.8
  }
];

export const profileCards = [
  { label: '待付款', value: 2 },
  { label: '待发货', value: 1 },
  { label: '待收货', value: 3 },
  { label: '售后中', value: 0 }
];

export const searchSuggestions = ['车厘子', '蓝莓', '坚果礼盒', '香氛夜灯', '补水面膜'];

export const defaultAddress = {
  name: '陈小满',
  phone: '138****5678',
  tag: '公司',
  region: '上海市浦东新区张江高科技园区',
  detail: '科苑路 88 号 A 座 1203'
};

export const coupons = [
  { id: 1, title: '新人券', value: 20, limit: 99 },
  { id: 2, title: '品类券', value: 10, limit: 59 }
];
