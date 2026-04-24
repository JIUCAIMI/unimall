import { computed, reactive } from 'vue';
import { products } from '../data/mock';

const STORAGE_KEY = 'uni-mall-cart';
const CHECKOUT_KEY = 'uni-mall-checkout-items';

function createCatalogMap() {
  return products.reduce((map, product) => {
    map[product.id] = product;
    return map;
  }, {});
}

const productMap = createCatalogMap();

function loadCartItems() {
  try {
    const local = uni.getStorageSync(STORAGE_KEY);
    return Array.isArray(local) ? local : [];
  } catch (error) {
    console.warn('load cart failed', error);
    return [];
  }
}

function loadCheckoutItems() {
  try {
    const local = uni.getStorageSync(CHECKOUT_KEY);
    return Array.isArray(local) ? local : [];
  } catch (error) {
    console.warn('load checkout failed', error);
    return [];
  }
}

const state = reactive({
  items: loadCartItems(),
  checkoutItems: loadCheckoutItems()
});

function persist() {
  uni.setStorageSync(STORAGE_KEY, state.items);
}

function persistCheckout() {
  uni.setStorageSync(CHECKOUT_KEY, state.checkoutItems);
}

function normalizeItem(rawItem) {
  const product = productMap[rawItem.productId];
  if (!product) {
    return null;
  }

  return {
    ...product,
    quantity: rawItem.quantity
  };
}

function findIndex(productId) {
  return state.items.findIndex((item) => item.productId === productId);
}

export function useCartStore() {
  const cartItems = computed(() =>
    state.items
      .map((item) => normalizeItem(item))
      .filter(Boolean)
  );

  const totalCount = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const checkoutItems = computed(() =>
    state.checkoutItems
      .map((item) => normalizeItem(item))
      .filter(Boolean)
  );

  const checkoutCount = computed(() =>
    state.checkoutItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  const checkoutAmount = computed(() =>
    checkoutItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  function addToCart(product, quantity = 1) {
    const index = findIndex(product.id);

    if (index > -1) {
      state.items[index].quantity += quantity;
    } else {
      state.items.push({
        productId: product.id,
        quantity
      });
    }

    persist();
    uni.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  }

  function updateQuantity(productId, quantity) {
    const index = findIndex(productId);
    if (index === -1) {
      return;
    }

    if (quantity <= 0) {
      state.items.splice(index, 1);
    } else {
      state.items[index].quantity = quantity;
    }

    persist();
  }

  function removeFromCart(productId) {
    const index = findIndex(productId);
    if (index === -1) {
      return;
    }

    state.items.splice(index, 1);
    persist();
  }

  function clearCart() {
    state.items.splice(0, state.items.length);
    persist();
  }

  function prepareCheckoutFromCart() {
    state.checkoutItems = state.items.map((item) => ({ ...item }));
    persistCheckout();
  }

  function prepareCheckoutByProduct(product, quantity = 1) {
    state.checkoutItems = [
      {
        productId: product.id,
        quantity
      }
    ];
    persistCheckout();
  }

  function clearCheckout() {
    state.checkoutItems.splice(0, state.checkoutItems.length);
    persistCheckout();
  }

  return {
    cartItems,
    totalCount,
    totalPrice,
    checkoutItems,
    checkoutCount,
    checkoutAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    prepareCheckoutFromCart,
    prepareCheckoutByProduct,
    clearCheckout
  };
}
