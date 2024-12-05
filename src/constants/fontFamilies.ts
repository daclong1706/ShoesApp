export const fontFamilies = {
  regular: '',
  medium: 'AirbnbCereal_W_Md',
  semiBold: 'AirbnbCereal_W_Bd',
  bold: 'AirbnbCereal_W_XBd',
  Awesome6Brand: 'FontAwesome6_Solid',
};

{
  /* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={
              [...shoes] // Tạo bản sao mảng để tránh thay đổi mảng gốc
                .sort(() => Math.random() - 0.5) // Sắp xếp ngẫu nhiên
                .slice(0, 5) // Giới hạn tối đa 5 sản phẩm
            }
            renderItem={({item, index}) => (
              <ShoesList key={`Shoes ${index}`} item={item} type="card" />
            )}
            keyExtractor={item => item.productId}
            ListFooterComponent={
              shoes.length > 5 ? <SeeAllButton onPress={handleSeeAll} /> : null
            }
            nestedScrollEnabled
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={shoes
              .filter(item => item.label?.includes('Best Seller')) // Lọc chỉ Best Seller
              .slice(0, 5)} // Hiển thị tối đa 5 sản phẩm
            renderItem={({item, index}) => (
              <ShoesList key={`Shoes ${index}`} item={item} type="card" />
            )}
            keyExtractor={item => item.productId}
            ListFooterComponent={
              shoes.filter(item => item.label?.includes('Best Seller')).length >
              5 ? (
                <SeeAllButton onPress={handleSeeAll} />
              ) : null
            }
            nestedScrollEnabled
          /> */
}
