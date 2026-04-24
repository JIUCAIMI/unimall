<template>
  <view class="checkout-page safe-bottom">
    <scroll-view scroll-y class="checkout-scroll">
      <view class="address card">
        <view class="address__top">
          <view class="address__title">收货地址</view>
          <view class="address__tag">{{ defaultAddress.tag }}</view>
        </view>
        <view class="address__name">
          {{ defaultAddress.name }} {{ defaultAddress.phone }}
        </view>
        <view class="address__detail">
          {{ defaultAddress.region }} {{ defaultAddress.detail }}
        </view>
      </view>

      <view class="goods card">
        <view class="goods__title">商品清单</view>
        <view v-for="item in checkoutItems" :key="item.id" class="goods__item">
          <image class="goods__image" :src="item.image" mode="aspectFill" />
          <view class="goods__content">
            <view class="goods__name">{{ item.name }}</view>
            <view class="goods__brief">{{ item.brief }}</view>
            <view class="goods__meta">
              <text>{{ item.express }}</text>
              <text>x{{ item.quantity }}</text>
            </view>
          </view>
          <view class="goods__price">￥{{ (item.price * item.quantity).toFixed(2) }}</view>
        </view>
      </view>

      <view class="coupon card">
        <view class="coupon__title">优惠与配送</view>
        <view class="coupon__row">
          <text>配送方式</text>
          <text>快递包邮</text>
        </view>
        <view class="coupon__row">
          <text>优惠券</text>
          <text class="coupon__value">-￥{{ discount.toFixed(2) }}</text>
        </view>
        <view class="coupon__tips">
          已自动使用最优优惠券
          <text v-if="bestCoupon">：{{ bestCoupon.title }}（满 {{ bestCoupon.limit }} 减 {{ bestCoupon.value }}）</text>
        </view>
      </view>

      <view class="remark card">
        <view class="remark__title">订单备注</view>
        <textarea
          v-model="remark"
          class="remark__input"
          maxlength="80"
          placeholder="给商家留言，例如：工作日白天送达"
        />
      </view>
    </scroll-view>

    <view class="submit-bar card">
      <view>
        <view class="submit-bar__count">共 {{ checkoutCount }} 件</view>
        <view class="submit-bar__price">实付 ￥{{ payAmount.toFixed(2) }}</view>
      </view>
      <view class="submit-bar__btn" @tap="submitOrder">提交订单</view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { coupons, defaultAddress } from '../../data/mock';
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();
const remark = ref('');

const checkoutItems = computed(() => cartStore.checkoutItems.value);
const checkoutCount = computed(() => cartStore.checkoutCount.value);
const checkoutAmount = computed(() => cartStore.checkoutAmount.value);

const bestCoupon = computed(() => {
  const amount = checkoutAmount.value;
  return coupons
    .filter((item) => amount >= item.limit)
    .sort((a, b) => b.value - a.value)[0];
});

const discount = computed(() => (bestCoupon.value ? bestCoupon.value.value : 0));
const payAmount = computed(() => Math.max(0, checkoutAmount.value - discount.value));

onShow(() => {
  if (!checkoutItems.value.length) {
    uni.showToast({
      title: '暂无待结算商品',
      icon: 'none'
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 400);
  }
});

function submitOrder() {
  uni.showModal({
    title: '下单成功',
    content: `订单金额 ￥${payAmount.value.toFixed(2)}，可继续接入支付接口`,
    showCancel: false,
    success: () => {
      cartStore.clearCheckout();
      uni.switchTab({
        url: '/pages/profile/index'
      });
    }
  });
}
</script>

<style lang="scss" scoped>
.checkout-page {
  min-height: 100vh;
  padding: 24rpx;
}

.checkout-scroll {
  height: calc(100vh - 160rpx);
}

.address,
.goods,
.coupon,
.remark {
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.address__top,
.coupon__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.address__title,
.goods__title,
.coupon__title,
.remark__title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.address__tag {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  color: #ff6b4a;
  background: rgba(255, 107, 74, 0.12);
}

.address__name {
  margin-top: 18rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
}

.address__detail,
.coupon__tips {
  margin-top: 14rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #667085;
}

.goods__item {
  display: flex;
  gap: 18rpx;
  padding-top: 22rpx;
}

.goods__image {
  width: 140rpx;
  height: 140rpx;
  border-radius: 18rpx;
}

.goods__content {
  flex: 1;
}

.goods__name {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}

.goods__brief {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #667085;
}

.goods__meta {
  display: flex;
  justify-content: space-between;
  margin-top: 16rpx;
  font-size: 22rpx;
  color: #98a2b3;
}

.goods__price {
  font-size: 28rpx;
  font-weight: 700;
  color: #ff5a36;
}

.coupon__row {
  padding-top: 20rpx;
  font-size: 26rpx;
  color: #1f2937;
}

.coupon__value {
  color: #ff5a36;
  font-weight: 700;
}

.remark__input {
  width: 100%;
  min-height: 160rpx;
  margin-top: 20rpx;
  padding: 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  background: #f4f6fb;
}

.submit-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 24rpx;
}

.submit-bar__count {
  font-size: 22rpx;
  color: #667085;
}

.submit-bar__price {
  margin-top: 8rpx;
  font-size: 38rpx;
  font-weight: 800;
  color: #ff5a36;
}

.submit-bar__btn {
  min-width: 200rpx;
  height: 74rpx;
  line-height: 74rpx;
  text-align: center;
  border-radius: 999rpx;
  font-size: 26rpx;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #ff7c59, #ff4d24);
}
</style>
