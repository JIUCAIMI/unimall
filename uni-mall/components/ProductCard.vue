<template>
  <view class="product-card card" @tap="handleOpenDetail">
    <image class="product-card__image" :src="product.image" mode="aspectFill" />
    <view class="product-card__content">
      <view class="product-card__title">{{ product.name }}</view>
      <view class="product-card__brief">{{ product.brief }}</view>
      <view class="product-card__tags">
        <text v-for="tag in product.tags" :key="tag" class="product-card__tag">{{ tag }}</text>
      </view>
      <view class="product-card__footer">
        <view>
          <text class="product-card__price">￥{{ product.price }}</text>
          <text class="product-card__market">￥{{ product.marketPrice }}</text>
        </view>
        <view class="product-card__action" @tap.stop="handleAddToCart">加入</view>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add']);

function handleAddToCart() {
  emit('add', props.product);
}

function handleOpenDetail() {
  uni.navigateTo({
    url: `/pages/product/detail?id=${props.product.id}`
  });
}
</script>

<style lang="scss" scoped>
.product-card {
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: 260rpx;
  display: block;
}

.product-card__content {
  padding: 20rpx;
}

.product-card__title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.product-card__brief {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #667085;
  min-height: 68rpx;
}

.product-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 16rpx;
}

.product-card__tag {
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  color: #ff6b4a;
  background: rgba(255, 107, 74, 0.12);
}

.product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20rpx;
}

.product-card__price {
  font-size: 34rpx;
  font-weight: 700;
  color: #ff5a36;
}

.product-card__market {
  margin-left: 12rpx;
  font-size: 22rpx;
  color: #98a2b3;
  text-decoration: line-through;
}

.product-card__action {
  min-width: 108rpx;
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
