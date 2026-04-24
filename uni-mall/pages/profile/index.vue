<template>
  <scroll-view scroll-y class="profile-page">
    <view class="page-shell safe-bottom">
      <view class="profile-header card">
        <view class="profile-header__top">
          <image
            class="profile-header__avatar"
            src="/static/avatar.svg"
            mode="aspectFill"
          />
          <view class="profile-header__info">
            <view class="profile-header__name">午后采购官</view>
            <view class="profile-header__tag">银卡会员 · 积分 2680</view>
          </view>
        </view>
        <view class="profile-header__stats">
          <view class="profile-header__stat">
            <text class="profile-header__stat-num">12</text>
            <text class="profile-header__stat-label">收藏</text>
          </view>
          <view class="profile-header__stat">
            <text class="profile-header__stat-num">{{ totalCount }}</text>
            <text class="profile-header__stat-label">购物车</text>
          </view>
          <view class="profile-header__stat">
            <text class="profile-header__stat-num">6</text>
            <text class="profile-header__stat-label">优惠券</text>
          </view>
        </view>
      </view>

      <view class="section-title">
        <text class="section-title__main">我的订单</text>
        <text class="section-title__sub">查看全部</text>
      </view>
      <view class="order-grid card">
        <view v-for="item in profileCards" :key="item.label" class="order-grid__item">
          <text class="order-grid__value">{{ item.value }}</text>
          <text class="order-grid__label">{{ item.label }}</text>
        </view>
      </view>

      <view class="section-title">
        <text class="section-title__main">服务中心</text>
        <text class="section-title__sub">常用功能</text>
      </view>
      <view class="service-list card">
        <view v-for="item in services" :key="item.title" class="service-list__item">
          <view>
            <view class="service-list__title">{{ item.title }}</view>
            <view class="service-list__desc">{{ item.desc }}</view>
          </view>
          <text class="service-list__arrow">›</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
import { computed } from 'vue';
import { profileCards } from '../../data/mock';
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();
const totalCount = computed(() => cartStore.totalCount.value);

const services = [
  { title: '收货地址', desc: '管理常用地址和默认地址' },
  { title: '客服与帮助', desc: '订单咨询、物流和售后' },
  { title: '品牌馆', desc: '查看精选品牌和会员活动' },
  { title: '邀请有礼', desc: '分享商城获得优惠奖励' }
];
</script>

<style lang="scss" scoped>
.profile-page {
  height: 100vh;
}

.profile-header {
  padding: 28rpx;
  background: linear-gradient(135deg, #1f2937, #334155);
}

.profile-header__top {
  display: flex;
  align-items: center;
  gap: 22rpx;
}

.profile-header__avatar {
  width: 112rpx;
  height: 112rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
}

.profile-header__name {
  font-size: 36rpx;
  font-weight: 700;
  color: #fff;
}

.profile-header__tag {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.72);
}

.profile-header__stats {
  display: flex;
  justify-content: space-around;
  margin-top: 30rpx;
  padding-top: 24rpx;
  border-top: 2rpx solid rgba(255, 255, 255, 0.08);
}

.profile-header__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.profile-header__stat-num {
  font-size: 34rpx;
  font-weight: 800;
  color: #ffd7a1;
}

.profile-header__stat-label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16rpx;
  padding: 28rpx 18rpx;
}

.order-grid__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.order-grid__value {
  font-size: 38rpx;
  font-weight: 800;
  color: #ff5a36;
}

.order-grid__label {
  font-size: 22rpx;
  color: #667085;
}

.service-list {
  padding: 8rpx 24rpx;
}

.service-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #f2f4f7;
}

.service-list__item:last-child {
  border-bottom: 0;
}

.service-list__title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
}

.service-list__desc {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #98a2b3;
}

.service-list__arrow {
  font-size: 36rpx;
  color: #c0c7d3;
}
</style>
