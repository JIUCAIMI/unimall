<template>
  <view v-if="product" class="detail-page safe-bottom">
    <scroll-view scroll-y class="detail-scroll">
      <image class="detail-banner" :src="product.image" mode="aspectFill" />
      <view class="detail-card card">
        <view class="detail-price-row">
          <view>
            <text class="detail-price">￥{{ product.price }}</text>
            <text class="detail-market">￥{{ product.marketPrice }}</text>
          </view>
          <text class="detail-sales">月销 {{ product.sales }}</text>
        </view>
        <view class="detail-title">{{ product.name }}</view>
        <view class="detail-brief">{{ product.brief }}</view>
        <view class="detail-tags">
          <text v-for="tag in product.tags" :key="tag" class="detail-tag">{{ tag }}</text>
        </view>
      </view>

      <view class="detail-info card">
        <view class="detail-info__title">商品说明</view>
        <view class="detail-info__row">
          <text class="detail-info__label">规格</text>
          <text class="detail-info__value">{{ product.unit }}</text>
        </view>
        <view class="detail-info__row">
          <text class="detail-info__label">库存</text>
          <text class="detail-info__value">{{ product.stock }}</text>
        </view>
        <view class="detail-info__row detail-info__row--column">
          <text class="detail-info__label">详情</text>
          <text class="detail-info__desc">{{ product.detail }}</text>
        </view>
      </view>
    </scroll-view>

    <view class="detail-action card">
      <view class="detail-action__left">
        <view class="detail-action__count">{{ totalCount }}</view>
        <view class="detail-action__text">购物车商品</view>
      </view>
      <view class="detail-action__btn detail-action__btn--ghost" @tap="goCart">购物车</view>
      <view class="detail-action__btn detail-action__btn--warm" @tap="buyNow">立即购买</view>
      <view class="detail-action__btn detail-action__btn--primary" @tap="addCurrent">加入购物车</view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getProductById } from '../../utils/catalog';
import { useCartStore } from '../../stores/cart';

const product = ref(null);
const cartStore = useCartStore();
const totalCount = computed(() => cartStore.totalCount.value);

onLoad((query) => {
  product.value = getProductById(query.id);

  if (!product.value) {
    uni.showToast({
      title: '商品不存在',
      icon: 'none'
    });
  }
});

function addCurrent() {
  if (product.value) {
    cartStore.addToCart(product.value, 1);
  }
}

function goCart() {
  uni.switchTab({
    url: '/pages/cart/index'
  });
}

function buyNow() {
  if (!product.value) {
    return;
  }

  cartStore.prepareCheckoutByProduct(product.value, 1);
  uni.navigateTo({
    url: '/pages/order/checkout'
  });
}
</script>

<style lang="scss" scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 0 20rpx;
}

.detail-scroll {
  flex: 1;
  height: calc(100vh - 140rpx);
}

.detail-banner {
  width: 100%;
  height: 560rpx;
}

.detail-card,
.detail-info {
  margin: 24rpx;
  padding: 28rpx;
}

.detail-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-price {
  font-size: 46rpx;
  font-weight: 800;
  color: #ff5a36;
}

.detail-market {
  margin-left: 12rpx;
  font-size: 24rpx;
  color: #98a2b3;
  text-decoration: line-through;
}

.detail-sales {
  font-size: 22rpx;
  color: #98a2b3;
}

.detail-title {
  margin-top: 18rpx;
  font-size: 38rpx;
  font-weight: 700;
  color: #1f2937;
}

.detail-brief {
  margin-top: 14rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #667085;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 18rpx;
}

.detail-tag {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: #ff6b4a;
  background: rgba(255, 107, 74, 0.12);
}

.detail-info__title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.detail-info__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  padding-top: 24rpx;
  font-size: 24rpx;
}

.detail-info__row--column {
  flex-direction: column;
  align-items: flex-start;
}

.detail-info__label {
  color: #98a2b3;
}

.detail-info__value,
.detail-info__desc {
  color: #1f2937;
}

.detail-info__desc {
  line-height: 1.7;
}

.detail-action {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin: 0 24rpx;
  padding: 18rpx 20rpx;
}

.detail-action__left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 140rpx;
}

.detail-action__count {
  font-size: 34rpx;
  font-weight: 800;
  color: #ff5a36;
}

.detail-action__text {
  font-size: 20rpx;
  color: #98a2b3;
}

.detail-action__btn {
  flex: 1;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  border-radius: 999rpx;
  font-size: 25rpx;
  font-weight: 700;
}

.detail-action__btn--ghost {
  color: #ff6b4a;
  background: rgba(255, 107, 74, 0.12);
}

.detail-action__btn--warm {
  color: #7a3a00;
  background: linear-gradient(135deg, #ffd9a0, #ffbf69);
}

.detail-action__btn--primary {
  color: #fff;
  background: linear-gradient(135deg, #ff7c59, #ff4d24);
}
</style>
