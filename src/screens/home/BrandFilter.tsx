// BrandFilter.tsx
import React, {useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Adidas, Converse, Nike, Puma, UnderArmour} from '../../assets/svg';
import {TagComponent} from '../../components';
import {appColors} from '../../constants/appColor';

interface Brand {
  key: string;
  label: string;
  icon: React.ReactNode;
}

interface Props {
  isFill?: boolean;
  id?: any;
  onBrandSelect: (brandId: string | null) => void; // Nhận thêm prop này từ ProductScreen
}

const BrandFilter = (props: Props) => {
  const {isFill, onBrandSelect, id} = props;
  const [selectedBrand, setSelectedBrand] = useState<string | null>(id);

  const brands: Brand[] = [
    {key: 'nike', label: 'Nike', icon: <Nike />},
    {key: 'puma', label: 'Puma', icon: <Puma />},
    {key: 'underarmour', label: 'Under Armour', icon: <UnderArmour />},
    {key: 'adidas', label: 'Adidas', icon: <Adidas />},
    {key: 'converse', label: 'Converse', icon: <Converse />},
  ];

  const handlePress = (brandId: string) => {
    // Nếu brand đang được chọn, bỏ chọn nó bằng cách đặt lại selectedBrand thành null
    if (selectedBrand === brandId) {
      setSelectedBrand(null);
      onBrandSelect(null); // Gọi callback với null nếu bỏ chọn nhãn hiệu
    } else {
      setSelectedBrand(brandId);
      onBrandSelect(brandId); // Gọi callback với nhãn hiệu mới được chọn
    }
  };

  return isFill ? (
    <View style={styles.container}>
      <FlatList
        horizontal
        style={{
          marginLeft: StatusBar.currentHeight,
        }}
        showsHorizontalScrollIndicator={false}
        data={brands}
        renderItem={({item}) => (
          <TagComponent
            onPress={() => handlePress(item.key)}
            label={item.label}
            icon={item.icon}
            isSelected={selectedBrand === item.key} // Kiểm tra nếu nhãn hiệu đang được chọn
          />
        )}
        keyExtractor={item => item.key}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        horizontal
        style={{
          marginLeft: StatusBar.currentHeight,
        }}
        showsHorizontalScrollIndicator={false}
        data={brands}
        renderItem={({item}) => (
          <View
            style={{
              marginRight: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 50,
              backgroundColor: '#fff',
              padding: 8,
            }}>
            <TouchableOpacity
              onPress={() => handlePress(item.key)}
              style={{
                width: 44,
                height: 44,
                borderRadius: 300,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.icon}
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
});

export default BrandFilter;
