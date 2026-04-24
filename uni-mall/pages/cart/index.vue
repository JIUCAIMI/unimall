<template>
  <view class="cart-page safe-bottom">
    <template v-if="cartItems.length">
      <scroll-view scroll-y class="cart-list">
        <view v-for="item in cartItems" :key="item.id" class="cart-item card">
          <image class="cart-item__image" :src="item.image" mode="aspectFill" />
          <view class="cart-item__content">
            <view class="cart-item__title">{{ item.name }}</view>
            <view class="cart-item__brief">{{ item.brief }}</view>
            <view class="cart-item__footer">
              <view class="cart-item__price">￥{{ item.price }}</view>
              <view class="cart-item__stepper">
                <text class="cart-item__stepper-btn" @tap="changeQuantity(item, -1)">-</text>
                <text class="cart-item__stepper-count">{{ item.quantity }}</text>
                <text class="cart-item__stepper-btn" @tap="changeQuantity(item, 1)">+</text>
              </view>
            </view>
            <view class="cart-item__remove" @tap="remove(item.id)">删除</view>
          </view>
        </view>
      </scroll-view>

      <view class="cart-settlement card">
        <view>
          <view class="cart-settlement__label">合计 {{ totalCount }} 件商品</view>
          <view class="cart-settlement__price">￥{{ totalPrice.toFixed(2) }}</view>
        </view>
        <view class="cart-settlement__actions">
          <view class="cart-settlement__clear" @tap="clearCart">清空</view>
          <view class="cart-settlement__checkout" @tap="checkout">去结算</view>
        </view>
      </view>
    </template>

    <view v-else class="empty card">
      <view class="empty__icon">🛒</view>
      <view class="empty__title">购物车还是空的</view>
      <view class="empty__desc">去首页挑几件心动好物吧</view>
      <view class="empty__btn" @tap="goHome">去逛逛</view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.cartItems.value);
const totalCount = computed(() => cartStore.totalCount.value);
const totalPrice = computed(() => cartStore.totalPrice.value);

function changeQuantity(item, delta) {
  cartStore.updateQuantity(item.id, item.quantity + delta);
}

function remove(productId) {
  cartStore.removeFromCart(productId);
}

function clearCart() {
  uni.showModal({
    title: '提示',
    content: '确定清空购物车吗？',
    success: ({ confirm }) => {
      if (confirm) {
        cartStore.clearCart();
      }
    }
  });
}

function checkout() {
  cartStore.prepareCheckoutFromCart();
  uni.navigateTo({
    url: '/pages/order/checkout'
  });
}

function goHome() {
  uni.switchTab({
    url: '/pages/home/index'
  });
}
</script>

<style lang="scss" scoped>
.cart-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24rpx;
}

.cart-list {
  flex: 1;
  height: calc(100vh - 250rpx);
}

.cart-item {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.cart-item__image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 20rpx;
}

.cart-item__content {
  flex: 1;
}

.cart-item__title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.cart-item__brief {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #667085;
}

.cart-item__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
}

.cart-item__price {
  font-size: 34rpx;
  font-weight: 700;
  color: #ff5a36;
}

.cart-item__stepper {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.cart-item__stepper-btn,
.cart-item__stepper-count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52rpx;
  height: 52rpx;
  border-radius: 14rpx;
  font-size: 28rpx;
}

.cart-item__stepper-btn {
  color: #1f2937;
  background: #f4f6fb;
}

.cart-item__stepper-count {
  width: 70rpx;
  font-size: 24rpx;
  color: #1f2937;
}

.cart-item__remove {
  margin-top: 18rpx;
  font-size: 22rpx;
  color: #98a2b3;
}

.cart-settlement {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx;
}

.cart-settlement__label {
  font-size: 24rpx;
  color: #667085;
}

.cart-settlement__price {
  margin-top: 8rpx;
  font-size: 40rpx;
  font-weight: 800;
  color: #ff5a36;
}

.cart-settlement__actions {
  display: flex;
  gap: 16rpx;
}

.cart-settlement__clear,
.cart-settlement__checkout {
  min-width: 140rpx;
  height: 68rpx;
  line-height: 68rpx;
  text-align: center;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 700;
}

.cart-settlement__clear {
  color: #667085;
  background: #f4f6fb;
}

.cart-settlement__checkout {
  color: #fff;
  background: linear-gradient(135deg, #ff7c59, #ff4d24);
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14rpx;
  min-height: 500rpx;
  margin-top: 120rpx;
}

.empty__icon {
  font-size: 90rpx;
}

.empty__title {
  font-size: 34rpx;
  font-weight: 700;
  color: #1f2937;
}

.empty__desc {
  font-size: 24rpx;
  color: #667085;
}

.empty__btn {
  margin-top: 18rpx;
  min-width: 200rpx;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  border-radius: 999rpx;
  font-size: 26rpx;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #ff7c59, #ff4d24);
}
</style>
