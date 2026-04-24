<template>
  <scroll-view scroll-y class="page">
    <view class="page-shell safe-bottom">
      <view class="hero card">
        <view class="hero__header">
          <view>
            <view class="hero__title">鲜选商城</view>
            <view class="hero__subtitle">把今日值得买的都放在这里</view>
          </view>
          <view class="hero__badge">新品日</view>
        </view>
        <view class="hero__search" @tap="goSearch">
          <text class="hero__search-icon">🔎</text>
          <text>搜索商品、品类、品牌</text>
        </view>
        <swiper class="hero__swiper" circular autoplay interval="3200" duration="500">
          <swiper-item v-for="item in banners" :key="item.id">
            <view class="banner-slide">
              <image class="banner-slide__image" :src="item.image" mode="aspectFill" />
              <view class="banner-slide__mask">
                <view class="banner-slide__title">{{ item.title }}</view>
                <view class="banner-slide__subtitle">{{ item.subtitle }}</view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>

      <view class="section-title">
        <text class="section-title__main">热门分类</text>
        <text class="section-title__sub">精选 4 大频道</text>
      </view>
      <view class="category-grid">
        <view
          v-for="item in categories"
          :key="item.id"
          class="category-grid__item card"
          @tap="goCategory(item.id)"
        >
          <text class="category-grid__icon">{{ item.icon }}</text>
          <text class="category-grid__name">{{ item.name }}</text>
          <text class="category-grid__desc">{{ item.description }}</text>
        </view>
      </view>

      <view class="promo card">
        <view class="promo__left">
          <view class="promo__eyebrow">今日福利</view>
          <view class="promo__title">下单立享 88 折</view>
          <view class="promo__desc">新人专享券可与满减叠加</view>
        </view>
        <view class="promo__right">马上抢</view>
      </view>

      <view class="section-title">
        <text class="section-title__main">热销推荐</text>
        <text class="section-title__sub">高复购口碑单品</text>
      </view>
      <view class="product-grid">
        <ProductCard
          v-for="item in hotProducts"
          :key="item.id"
          :product="item"
          @add="handleAddToCart"
        />
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
import ProductCard from '../../components/ProductCard.vue';
import { banners, categories, products } from '../../data/mock';
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();
const hotProducts = products.slice(0, 6);

function handleAddToCart(product) {
  cartStore.addToCart(product, 1);
}

function goCategory(categoryId) {
  uni.navigateTo({
    url: `/pages/category/index?categoryId=${categoryId}`
  });
}

function goSearch() {
  uni.navigateTo({
    url: '/pages/search/index'
  });
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
}

.hero {
  padding: 24rpx;
  background: linear-gradient(160deg, #fff7f3, #fff 36%, #eef7ff);
}

.hero__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.hero__title {
  font-size: 44rpx;
  font-weight: 800;
  color: #1f2937;
}

.hero__subtitle {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #667085;
}

.hero__badge {
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: #ff5a36;
  background: rgba(255, 107, 74, 0.12);
}

.hero__search {
  display: flex;
  align-items: center;
  gap: 14rpx;
  height: 80rpx;
  padding: 0 24rpx;
  margin-top: 24rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: #98a2b3;
  background: #fff;
}

.hero__search-icon {
  font-size: 28rpx;
}

.hero__swiper {
  height: 300rpx;
  margin-top: 24rpx;
  border-radius: 24rpx;
  overflow: hidden;
}

.banner-slide {
  position: relative;
  height: 100%;
}

.banner-slide__image {
  width: 100%;
  height: 100%;
}

.banner-slide__mask {
  position: absolute;
  inset: 0;
  padding: 36rpx 32rpx;
  background: linear-gradient(90deg, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.05));
}

.banner-slide__title {
  font-size: 38rpx;
  font-weight: 700;
  color: #fff;
}

.banner-slide__subtitle {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.88);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.category-grid__item {
  display: flex;
  flex-direction: column;
  min-height: 190rpx;
  padding: 24rpx;
}

.category-grid__icon {
  font-size: 44rpx;
}

.category-grid__name {
  margin-top: 18rpx;
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}

.category-grid__desc {
  margin-top: 10rpx;
  font-size: 22rpx;
  line-height: 1.5;
  color: #667085;
}

.promo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx;
  margin-bottom: 28rpx;
  background: linear-gradient(135deg, #1f2937, #374151);
}

.promo__eyebrow {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.66);
}

.promo__title {
  margin-top: 10rpx;
  font-size: 34rpx;
  font-weight: 700;
  color: #fff;
}

.promo__desc {
  margin-top: 10rpx;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
}

.promo__right {
  min-width: 140rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 700;
  color: #1f2937;
  background: #ffd7a1;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20rpx;
}
</style>
