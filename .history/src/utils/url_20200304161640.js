export default {
  getProductList: (path, rowIndex, pageSize) => `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
}
