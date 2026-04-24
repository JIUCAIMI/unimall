import { categories, products } from '../data/mock';

export function getProductsByCategory(categoryId) {
  return products.filter((item) => item.categoryId === categoryId);
}

export function getProductById(id) {
  return products.find((item) => item.id === Number(id));
}

export function getCategoryById(id) {
  return categories.find((item) => item.id === id);
}

export function searchProducts(keyword) {
  const query = String(keyword || '').trim().toLowerCase();

  if (!query) {
    return products;
  }

  return products.filter((item) => {
    const text = [item.name, item.brief, item.detail, item.tags.join(' ')]
      .join(' ')
      .toLowerCase();
    return text.includes(query);
  });
}
