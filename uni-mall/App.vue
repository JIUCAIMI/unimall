<script>
export default {
  onLaunch() {
    console.log('Uni Mall launched');
  }
};
</script>

<style lang="scss">
page {
  min-height: 100%;
  background: #f4f6fb;
  color: #1f2937;
  font-family: 'PingFang SC', 'Helvetica Neue', sans-serif;
}

view,
text,
button,
input,
swiper,
swiper-item {
  box-sizing: border-box;
}

.safe-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 24rpx);
}
</style>
