import axiosClient from './axiosClient';

class ExploreAPI {
  // Hàm xử lý các yêu cầu liên quan đến sản phẩm
  HandleExploreRequest = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(url, {
      method: method ?? 'get', // Nếu không có method, mặc định là GET
      data,
    });
  };

  // Lấy tất cả sản phẩm
  getAllExplores = async () => {
    return await this.HandleExploreRequest('/explores'); // Đảm bảo sử dụng đúng URL endpoint
  };

  // Lấy sản phẩm theo ID
  getExploreById = async (exploreId: string) => {
    return await this.HandleExploreRequest(`/explores/${exploreId}`);
  };
}

const exploreAPI = new ExploreAPI();
export default exploreAPI;
