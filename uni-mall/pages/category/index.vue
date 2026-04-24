<template>
  <view class="category-page">
    <view class="category-sidebar">
      <view
        v-for="item in categories"
        :key="item.id"
        class="category-sidebar__item"
        :class="{ 'category-sidebar__item--active': item.id === activeCategoryId }"
        @tap="activeCategoryId = item.id"
      >
        <text class="category-sidebar__icon">{{ item.icon }}</text>
        <text>{{ item.name }}</text>
      </view>
    </view>

    <scroll-view scroll-y class="category-content">
      <view class="category-hero card">
        <view class="category-hero__title">{{ activeCategory?.name }}</view>
        <view class="category-hero__desc">{{ activeCategory?.description }}</view>
      </view>

      <scroll-view scroll-x class="filter-bar" show-scrollbar="false">
        <view class="filter-bar__inner">
          <view
            v-for="item in filters"
            :key="item.key"
            class="filter-bar__item"
            :class="{ 'filter-bar__item--active': activeFilter === item.key }"
            @tap="activeFilter = item.key"
          >
            {{ item.label }}
          </view>
        </view>
      </scroll-view>

      <view class="category-list">
        <view
          v-for="item in categoryProducts"
          :key="item.id"
          class="category-product card"
          @tap="openDetail(item.id)"
        >
          <image class="category-product__image" :src="item.image" mode="aspectFill" />
          <view class="category-product__content">
            <view class="category-product__title">{{ item.name }}</view>
            <view class="category-product__brief">{{ item.brief }}</view>
            <view class="category-product__meta">
              <text>月销 {{ item.sales }}</text>
              <text>库存 {{ item.stock }}</text>
            </view>
            <view class="category-product__footer">
              <view>
                <text class="category-product__price">￥{{ item.price }}</text>
                <text class="category-product__unit">/{{ item.unit }}</text>
              </view>
              <view class="category-product__btn" @tap.stop="add(item)">加入购物车</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { categories } from '../../data/mock';
import { getProductsByCategory } from '../../utils/catalog';
import { useCartStore } from '../../stores/cart';

const activeCategoryId = ref(categories[0].id);
const activeFilter = ref('all');
const cartStore = useCartStore();
const filters = [
  { key: 'all', label: '全部' },
  { key: 'sales', label: '销量优先' },
  { key: 'priceAsc', label: '价格从低到高' },
  { key: 'priceDesc', label: '价格从高到低' },
  { key: 'score', label: '口碑推荐' }
];

const activeCategory = computed(() =>
  categories.find((item) => item.id === activeCategoryId.value)
);

const categoryProducts = computed(() => {
  const list = [...getProductsByCategory(activeCategoryId.value)];

  switch (activeFilter.value) {
    case 'sales':
      return list.sort((a, b) => b.sales - a.sales);
    case 'priceAsc':
      return list.sort((a, b) => a.price - b.price);
    case 'priceDesc':
      return list.sort((a, b) => b.price - a.price);
    case 'score':
      return list.sort((a, b) => b.score - a.score);
    default:
      return list;
  }
});

onLoad((query) => {
  if (query.categoryId && categories.some((item) => item.id === query.categoryId)) {
    activeCategoryId.value = query.categoryId;
  }
});

function add(product) {
  cartStore.addToCart(product, 1);
}

function openDetail(id) {
  uni.navigateTo({
    url: `/pages/product/detail?id=${id}`
  });
}
</script>

<style lang="scss" scoped>
.category-page {
  display: flex;
  height: calc(100vh - 2rpx);
}

.category-sidebar {
  width: 200rpx;
  padding: 20rpx 0;
  background: #f0f3f9;
}

.category-sidebar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  padding: 24rpx 16rpx;
  font-size: 24rpx;
  color: #667085;
}

.category-sidebar__item--active {
  position: relative;
  color: #ff6b4a;
  font-weight: 700;
  background: #fff;
}

.category-sidebar__item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 28rpx;
  width: 8rpx;
  height: 56rpx;
  border-radius: 999rpx;
  background: #ff6b4a;
}

.category-sidebar__icon {
  font-size: 36rpx;
}

.category-content {
  flex: 1;
  height: 100vh;
  padding: 24rpx;
}

.category-hero {
  padding: 28rpx;
  margin-bottom: 20rpx;
  background: linear-gradient(135deg, #fffaf5, #ffffff);
}

.category-hero__title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
}

.category-hero__desc {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #667085;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding-bottom: 40rpx;
}

.filter-bar {
  width: 100%;
  margin-bottom: 20rpx;
  white-space: nowrap;
}

.filter-bar__inner {
  display: inline-flex;
  gap: 14rpx;
}

.filter-bar__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60rpx;
  padding: 0 24rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: #667085;
  background: #ffffff;
}

.filter-bar__item--active {
  color: #ff6b4a;
  background: rgba(255, 107, 74, 0.12);
}

.category-product {
  display: flex;
  gap: 20rpx;
  padding: 18rpx;
}

.category-product__image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 20rpx;
}

.category-product__content {
  flex: 1;
}

.category-product__title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.category-product__brief {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #667085;
}

.category-product__meta {
  display: flex;
  gap: 18rpx;
  margin-top: 18rpx;
  font-size: 22rpx;
  color: #98a2b3;
}

.category-product__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 22rpx;
}

.category-product__price {
  font-size: 32rpx;
  font-weight: 700;
  color: #ff5a36;
}

.category-product__unit {
  font-size: 22rpx;
  color: #98a2b3;
}

.category-product__btn {
  min-width: 156rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #ff7c59, #ff4d24);
}
</style>
