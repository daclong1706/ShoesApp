// PopularShoes.tsx
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  TextComponent,
  ButtonComponent,
  TabBarComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColor';

interface Shoe {
  id: string;
  name: string;
  price: string;
  image: any;
}

interface PopularShoesProps {
  shoes: Shoe[];
  onSeeAll: () => void;
  onAddToCart: (shoeId: string) => void;
}

const PopularShoes: React.FC<PopularShoesProps> = ({
  shoes,
  onSeeAll,
  onAddToCart,
}) => {
  return (
    <View style={styles.container}>
      <TabBarComponent title="Popular Shoes" size={18} onPress={onSeeAll} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {shoes.slice(0, 7).map(shoe => (
          <View key={shoe.id} style={styles.shoeCard}>
            <Image source={shoe.image} style={styles.shoeImage} />
            <TextComponent
              text="BEST SELLER"
              color={appColors.primary}
              font={fontFamilies.medium}
              size={12}
            />
            <TextComponent
              text={shoe.name}
              font={fontFamilies.semiBold}
              size={16}
              styles={styles.shoeName}
            />
            <TextComponent
              text={`$${shoe.price}`}
              font={fontFamilies.medium}
              size={14}
              color={appColors.black}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAddToCart(shoe.id)}>
              <TextComponent
                text="+"
                color={appColors.white}
                font={fontFamilies.bold}
                size={24}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Nút "See All" ở cuối cùng */}
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll}>
          <TextComponent
            text="See all"
            color={appColors.primary}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: StatusBar.currentHeight,
  },
  shoeCard: {
    width: 150,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  shoeImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  shoeName: {
    marginVertical: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: appColors.primary,
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeAllButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});

export default PopularShoes;
