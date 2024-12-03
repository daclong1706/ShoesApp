import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ContainerComponent,
  InputComponent,
  ShoesList,
  TextComponent,
} from '../../components';
import {SearchNormal1} from 'iconsax-react-native';
import {appColors} from '../../constants/appColor';
import {Shoes} from '../../models/ShoesModel';

const SearchScreen = ({navigation, route}: any) => {
  const {shoes: shoesData} = route.params;
  const [search, setSearch] = useState('');
  const [filteredShoes, setFilteredShoes] = useState<Shoes[]>([]);

  // Lọc sản phẩm mỗi khi `search` thay đổi
  useEffect(() => {
    if (search) {
      const filtered = shoesData.filter(
        (item: Shoes) =>
          item.name?.toLowerCase().includes(search.toLowerCase()), // Tìm kiếm không phân biệt chữ hoa/thường
      );
      setFilteredShoes(filtered);
    } else {
      setFilteredShoes([]);
    }
  }, [search, shoesData]);

  return (
    <View style={styles.container}>
      <View style={{padding: 12, marginBottom: 12}}>
        <InputComponent
          value={search}
          placeholder="Nhập tên giày bạn muốn tìm..."
          onChange={val => setSearch(val)} // Cập nhật giá trị tìm kiếm
          allowClear
          affix={<SearchNormal1 size={22} color={appColors.darkGray} />}
          onEnd={() => {}}
        />
      </View>

      {search && filteredShoes.length > 0 ? (
        <FlatList
          data={filteredShoes} // Hiển thị sản phẩm đã lọc
          renderItem={({item, index}) => (
            <ShoesList key={`Shoes ${index}`} item={item} type="card" />
          )}
          keyExtractor={item => item.productId}
          numColumns={2}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        />
      ) : search ? (
        <Text style={styles.noResultsText}>Không tìm thấy sản phẩm nào.</Text>
      ) : null}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: appColors.darkGray,
  },
});
