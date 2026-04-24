# uni-app 商城小程序

这是一个基于 `uni-app` 的商城小程序原型项目，已经包含：

- 首页轮播、分类入口、热销商品
- 分类页切换与商品列表
- 搜索页与分类筛选
- 商品详情页
- 本地缓存购物车
- 购物车结算与确认订单页
- 我的页面与订单概览

## 目录结构

```text
uni-mall
├─ App.vue
├─ main.js
├─ manifest.json
├─ pages.json
├─ components
├─ data
├─ pages
├─ stores
└─ utils
```

## 运行方式

推荐直接使用 HBuilderX 导入 `uni-mall` 目录：

1. 打开 HBuilderX
2. 选择“文件 -> 导入 -> 从本地目录导入”
3. 选择当前目录下的 `uni-mall`
4. 运行到微信开发者工具或其他小程序平台

## 下一步建议

- 把 `data/mock.js` 替换成真实后端接口
- 接入登录、地址、订单和支付能力
- 将确认订单页替换为真实下单接口
- 为 tabBar 增加自定义图标
- 接入搜索、筛选、优惠券和活动专题页
