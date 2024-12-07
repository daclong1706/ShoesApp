// ProductScreen.tsx
import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ContainerComponent, ShoesList} from '../../components';
import BrandFilter from './BrandFilter';

const ProductScreen = ({navigation, route}: any) => {
  const {
    shoes: originalShoes,
    title: title,
    brand: isBrand,
    label: isLabel,
  } = route.params;
  const [brand, setBrand] = useState<string | null>(isBrand ? title : '');
  const [label, setLabel] = useState<string | null>(isLabel ? title : '');
  const [filteredShoes, setFilteredShoes] = useState(originalShoes);

  // Hàm xử lý khi chọn nhãn hiệu từ BrandFilter
  const handleBrandSelect = (brandId: string | null) => {
    setBrand(brandId);
  };

  const name = isBrand ? brand : isLabel ? label : 'All Shoes';

  // Lọc danh sách shoes mỗi khi brand thay đổi
  useEffect(() => {
    if (title === 'All Shoes') {
      setFilteredShoes(originalShoes);
    } else {
      // Lọc shoes theo brand, label và rated nếu có
      const filtered = originalShoes.filter((shoe: any) => {
        const matchesBrand = brand
          ? shoe.brand.toLowerCase() === brand.toLowerCase()
          : true;
        const matchesLabel = label
          ? shoe.label.toLowerCase().includes(label.toLowerCase())
          : true;
        // const matchesRated = rated ? shoe.rated >= rated : true;

        return matchesBrand && matchesLabel;
      });

      setFilteredShoes(filtered);
    }
  }, [brand, label, originalShoes]);

  return (
    <ContainerComponent isImageBackground back title={name as string}>
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
