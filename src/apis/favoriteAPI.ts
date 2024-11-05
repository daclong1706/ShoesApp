import axiosClient from './axiosClient';

class FavoriteAPI {
  // Lấy tất cả sản phẩm yêu thích
  getFavorite = async () => {
    return await axiosClient.get('/favorites');
  };

  // Thêm sản phẩm vào danh sách yêu thích
  addFavorite = async (productId: string) => {
    return await axiosClient.post('/favorites', {productId});
  };

  // Xóa sản phẩm khỏi danh sách yêu thích
  removeFavorite = async (productId: string) => {
    return await axiosClient.delete(`/favorites/${productId}`);
  };
}

const favoriteAPI = new FavoriteAPI();
export default favoriteAPI;
