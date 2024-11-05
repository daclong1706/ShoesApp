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

  // Các hàm cụ thể để dễ sử dụng
  // Lấy tất cả sản phẩm
  getAllProducts = async () => {
    return await this.HandleProductRequest('/');
  };

  // Lấy sản phẩm theo ID
  getProductById = async (productId: string) => {
    return await this.HandleProductRequest(`/${productId}`);
  };

  // Tạo mới sản phẩm
  createProduct = async (newProductData: any) => {
    return await this.HandleProductRequest('/', newProductData, 'post');
  };

  // Cập nhật sản phẩm theo ID
  updateProduct = async (productId: string, updatedData: any) => {
    return await this.HandleProductRequest(`/${productId}`, updatedData, 'put');
  };

  // Xóa sản phẩm theo ID
  deleteProduct = async (productId: string) => {
    return await this.HandleProductRequest(
      `/${productId}`,
      undefined,
      'delete',
    );
  };
}

const productAPI = new ProductAPI();
export default productAPI;
