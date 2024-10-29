// BrandFilter.tsx
import React, {ReactNode, useState} from 'react';
import {FlatList, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {
  TagComponent,
  TextComponent,
  ButtonComponent,
  TabBarComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {
  Adidas,
  Converse,
  Fila,
  Nike,
  Puma,
  UnderArmour,
} from '../../assets/svg';

// interface Brand {
//   id: string;
//   text: string;
//   icon: React.ReactNode;
// }

// interface BrandFilterProps {
//   brands: Brand[];
//   selectedBrand: string | null;
//   onPress: (brandId: string) => void;
// }

interface Brand {
  key: string;
  label: string;
  icon: React.ReactNode;
}

interface Props {
  isFill?: boolean;
}

const BrandFilter = (props: Props) => {
  const {isFill = true} = props;
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null); // Trạng thái nhãn hiệu được chọn

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
    } else {
      setSelectedBrand(brandId);
    }
  };

  return (
    <View style={styles.container}>
      <TabBarComponent title="Select Brand" />
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
  );
};

// const BrandFilter: React.FC<BrandFilterProps> = ({
//   brands,
//   selectedBrand,
//   onPress,
// }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerRow}>
//         <TextComponent text="Select Brand" font={fontFamilies.medium} />
//         <ButtonComponent text="See all" type="link" />
//       </View>

//       {/* Đảm bảo ScrollView nhận diện các TagComponent */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContainer} // Sắp xếp các TagComponent theo hàng ngang
//       >
//         {brands.map(brand => (
//           <TagComponent
//             key={brand.id}
//             isSelected={selectedBrand === brand.id}
//             onPress={() => onPress(brand.id)}
//             text={brand.text}
//             icon={brand.icon}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
});

export default BrandFilter;
