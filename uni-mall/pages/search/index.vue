<template>
  <view class="search-page safe-bottom">
    <view class="search-box card">
      <input
        v-model="keyword"
        class="search-box__input"
        placeholder="搜索商品名称、卖点、标签"
        confirm-type="search"
      />
      <view class="search-box__btn" @tap="handleSearch">搜索</view>
    </view>

    <view class="section-title">
      <text class="section-title__main">猜你想搜</text>
      <text class="section-title__sub">快速进入热门商品</text>
    </view>
    <view class="tag-list">
      <view
        v-for="item in searchSuggestions"
        :key="item"
        class="tag-list__item"
        @tap="useSuggestion(item)"
      >
        {{ item }}
      </view>
    </view>

    <view class="section-title">
      <text class="section-title__main">搜索结果</text>
      <text class="section-title__sub">{{ resultText }}</text>
    </view>
    <view v-if="results.length" class="result-list">
      <view
        v-for="item in results"
        :key="item.id"
        class="result-item card"
        @tap="openDetail(item.id)"
      >
        <image class="result-item__image" :src="item.image" mode="aspectFill" />
        <view class="result-item__content">
          <view class="result-item__title">{{ item.name }}</view>
          <view class="result-item__brief">{{ item.brief }}</view>
          <view class="result-item__meta">
            <text>{{ item.express }}</text>
            <text>评分 {{ item.score }}</text>
          </view>
          <view class="result-item__footer">
            <text class="result-item__price">￥{{ item.price }}</text>
            <view class="result-item__action" @tap.stop="add(item)">加入购物车</view>
          </view>
        </view>
      </view>
    </view>
    <view v-else class="empty card">
      <view class="empty__icon">🔍</view>
      <view class="empty__title">没有找到相关商品</view>
      <view class="empty__desc">试试更简短的关键词，或者从热门推荐进入</view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { searchSuggestions } from '../../data/mock';
import { searchProducts } from '../../utils/catalog';
import { useCartStore } from '../../stores/cart';

const keyword = ref('');
const submittedKeyword = ref('');
const cartStore = useCartStore();

const results = computed(() => searchProducts(submittedKeyword.value));
const resultText = computed(() =>
  submittedKeyword.value ? `共 ${results.value.length} 件与“${submittedKeyword.value}”相关` : '可先从热门词开始'
);

onLoad((query) => {
  if (query.keyword) {
    keyword.value = query.keyword;
    submittedKeyword.value = query.keyword;
  }
});

function handleSearch() {
  submittedKeyword.value = keyword.value.trim();
}

function useSuggestion(value) {
  keyword.value = value;
  submittedKeyword.value = value;
}

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
.search-page {
  min-height: 100vh;
  padding: 24rpx;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 18rpx;
}

.search-box__input {
  flex: 1;
  height: 72rpx;
  padding: 0 24rpx;
  border-radius: 999rpx;
  font-size: 26rpx;
  background: #f4f6fb;
}

.search-box__btn {
  min-width: 132rpx;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  border-radius: 999rpx;
  font-size: 26rpx;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #ff7c59, #ff4d24);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18rpx;
  margin-bottom: 24rpx;
}

.tag-list__item {
  padding: 14rpx 24rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: #667085;
  background: #ffffff;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.result-item {
  display: flex;
  gap: 20rpx;
  padding: 18rpx;
}

.result-item__image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 20rpx;
}

.result-item__content {
  flex: 1;
}

.result-item__title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.result-item__brief {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #667085;
}

.result-item__meta {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
  font-size: 22rpx;
  color: #98a2b3;
}

.result-item__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18rpx;
}

.result-item__price {
  font-size: 34rpx;
  font-weight: 700;
  color: #ff5a36;
}

.result-item__action {
  min-width: 150rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #ff7c59, #ff4d24);
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14rpx;
  min-height: 360rpx;
}

.empty__icon {
  font-size: 72rpx;
}

.empty__title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
}

.empty__desc {
  font-size: 24rpx;
  color: #667085;
}
</style>
