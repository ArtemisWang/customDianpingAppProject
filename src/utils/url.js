export default {
  getProductList: (path, rowIndex, pageSize) => `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
  getProductDetail: (id) => `/mock/product_detail/${id}.json`,
  getShopById: (id) => `/mock/shops/${id}.json`,
  getPopularKeywords: () => '/mock/keywords/popular.json',
  getRelatedKeywords: (text) => `/mock/keywords/related.json?keyword=${text}`,
  getRelatedShops: (keyword) => `/mock/shops/related.json?keyword=${keyword}`,
  getOrders: () => `/mock/orders/orders.json`, 
}