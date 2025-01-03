import {ArrowLeft, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerComponent,
  InputComponent,
  RowComponent,
  ShoesList,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {Shoes} from '../../models/ShoesModel';
import {fontFamilies} from '../../constants/fontFamilies';
import ShoeSearch from './components/ShoeSearch';
import {FilterModal} from '../../modals';

const SearchScreen = ({navigation, route}: any) => {
  const {shoes: shoesData} = route.params;
  const [search, setSearch] = useState('');
  const [filteredShoes, setFilteredShoes] = useState<Shoes[]>([]); // Danh sách giày đã lọc
  const [isFilter, setIsFilter] = useState(false);

  // Lọc sản phẩm mỗi khi `search` thay đổi
  useEffect(() => {
    if (search) {
      const filtered = shoesData.filter(
        (item: Shoes) =>
          item.name?.toLowerCase().includes(search.toLowerCase()), // Tìm kiếm không phân biệt chữ hoa/thường
      );
      setFilteredShoes(filtered);
    } else {
      setFilteredShoes([]); // Nếu không có gì tìm kiếm thì set lại danh sách lọc là rỗng
    }
  }, [search, shoesData]);

  // Hàm xử lý lọc sản phẩm với bộ lọc
  const handleFilterConfirm = (filteredItems: Shoes[]) => {
    console.log('Item: ', filteredItems.length);
    setFilteredShoes(filteredItems); // Cập nhật lại danh sách sản phẩm đã lọc
    setIsFilter(false); // Đóng modal filter
  };

  return (
    <View style={styles.container}>
      <RowComponent styles={{marginTop: 12}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, {marginRight: 12}]}>
          <ArrowLeft size={24} color={appColors.text} />
        </TouchableOpacity>
        <TextComponent text="Tìm kiếm" font={fontFamilies.medium} size={16} />
      </RowComponent>
      <View style={{paddingHorizontal: 12, marginBottom: 12}}>
        <InputComponent
          value={search}
          placeholder="Nhập tên giày bạn muốn tìm..."
          onChange={val => setSearch(val)} // Cập nhật giá trị tìm kiếm
          allowClear
          affix={<SearchNormal1 size={22} color={appColors.darkGray} />}
          onEnd={() => {}}
        />
      </View>

      {filteredShoes.length > 0 ? (
        <FlatList
          data={filteredShoes} // Hiển thị sản phẩm đã lọc
          renderItem={({item, index}) => (
            <ShoeSearch key={`Shoes ${index}`} item={item} />
          )}
          keyExtractor={item => item.productId}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{alignItems: 'center'}}>
          <TextComponent text="Không tìm thấy sản phẩm tương ứng" />
          <Image
            source={require('../../assets/images/no-item.png')}
            style={{
              width: 250,
              height: 250,
              marginTop: 100,
              marginBottom: 50,
            }}
            resizeMode="contain"
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.buttonFilter}
        onPress={() => setIsFilter(true)}>
        <Image
          source={require('../../assets/images/filter.png')}
          style={{
            width: 32,
            height: 32,
          }}
          resizeMode="contain"
          tintColor={appColors.white}
        />
      </TouchableOpacity>

      {/* Truyền hàm handleFilterConfirm vào FilterModal */}
      <FilterModal
        visible={isFilter}
        onClose={() => setIsFilter(false)}
        onConfirm={handleFilterConfirm} // Cập nhật lại danh sách khi bộ lọc được áp dụng
        shoes={shoesData}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
  button: {
    borderRadius: 50,
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  buttonFilter: {
    backgroundColor: appColors.primary,
    position: 'absolute',
    right: 32,
    bottom: 42,
    padding: 12,
    borderRadius: 36,
  },
});
