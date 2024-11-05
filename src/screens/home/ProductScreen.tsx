// ProductScreen.tsx
import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ContainerComponent, ShoesList} from '../../components';
import BrandFilter from './BrandFilter';

const ProductScreen = ({navigation, route}: any) => {
  const {shoes: originalShoes, title: title} = route.params;
  const [brand, setBrand] = useState<string | null>(title);
  const [filteredShoes, setFilteredShoes] = useState(originalShoes);

  // Hàm xử lý khi chọn nhãn hiệu từ BrandFilter
  const handleBrandSelect = (brandId: string | null) => {
    setBrand(brandId);
  };

  // Lọc danh sách shoes mỗi khi brand thay đổi
  useEffect(() => {
    if (title === 'All Shoes') {
      setFilteredShoes(originalShoes);
    } else if (brand) {
      // Lọc shoes theo brand được chọn
      const filtered = originalShoes.filter(
        (shoe: any) => shoe.brand.toLowerCase() === brand.toLowerCase(),
      );
      setFilteredShoes(filtered);
    } else {
      // Nếu không có brand nào được chọn, hiển thị tất cả
      setFilteredShoes(originalShoes);
    }
  }, [brand, originalShoes]);

  return (
    <ContainerComponent
      isImageBackground
      back
      title={brand ? brand : 'All Shoes'}>
      <BrandFilter onBrandSelect={handleBrandSelect} isFill id={brand} />
      <FlatList
        data={filteredShoes}
        renderItem={({item}) => (
          <View style={styles.shoesItem}>
            <ShoesList item={item} type="card" />
          </View>
        )}
        keyExtractor={item => item.productId}
        numColumns={2}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </ContainerComponent>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
  },
  shoesItem: {
    flex: 1,
    marginHorizontal: 10,
    maxWidth: '45%',
  },
});
