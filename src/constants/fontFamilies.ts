export const fontFamilies = {
  regular: 'OpenSans_Condensed-Regular',
  bold: 'OpenSans_Condensed-Bold',
  boldItalic: 'OpenSans_Condensed-BoldItalic',
  extraBold: 'OpenSans_Condensed-ExtraBold',
  extraBoldItalic: 'OpenSans_Condensed-ExtraBoldItalic',
  italic: 'OpenSans_Condensed-Italic',
  light: 'OpenSans_Condensed-Light',
  lightItalic: 'OpenSans_Condensed-LightItalic',
  medium: 'OpenSans_Condensed-Medium',
  mediumItalic: 'OpenSans_Condensed-MediumItalic',
  semiBold: 'OpenSans_Condensed-SemiBold',
  semiBoldItalic: 'OpenSans_Condensed-SemiBoldItalic',
  semiCondensedBold: 'OpenSans_SemiCondensed-Bold',
  semiCondensedBoldItalic: 'OpenSans_SemiCondensed-BoldItalic',
  semiExtraBold: 'OpenSans_SemiCondensed-ExtraBold',
  semiExtraBoldItalic: 'OpenSans_SemiCondensed-ExtraBoldItalic',
  semiItalic: 'OpenSans_SemiCondensed-Italic',
  semiLight: 'OpenSans_SemiCondensed-Light',
  semiLightItalic: 'OpenSans_SemiCondensed-LightItalic',
  semiMedium: 'OpenSans_SemiCondensed-Medium',
  semiMediumItalic: 'OpenSans_SemiCondensed-MediumItalic',
  semiRegular: 'OpenSans_SemiCondensed-Regular',
  semiSemiBold: 'OpenSans_SemiCondensed-SemiBold',
  semiSemiBoldItalic: 'OpenSans_SemiCondensed-SemiBoldItalic',
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
