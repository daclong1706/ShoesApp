import axiosClient from './axiosClient';

class ProductAPI {
  // Hàm xử lý các yêu cầu liên quan đến sản phẩm
  HandleProductRequest = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(`/product${url}`, {
      method: method ?? 'get',
      data,
    });
  };

  // Lấy tất cả sản phẩm
  getAllProducts = async () => {
    return await this.HandleProductRequest('/');
  };

  // Lấy sản phẩm theo ID
  getProductById = async (productId: string) => {
    return await this.HandleProductRequest(`/${productId}`);
  };
}

const productAPI = new ProductAPI();
export default productAPI;
