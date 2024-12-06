import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {appColors} from '../constants/appColor';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {appInfo} from '../constants/appInfos';
import {fontFamilies} from '../constants/fontFamilies';
import {Shoes} from '../models/ShoesModel';

interface FilterModalProps {
  shoes: Shoes[]; // Update this to be an array of Shoes
  visible: boolean;
  onClose: () => void;
  onConfirm: (filteredShoes: Shoes[]) => void; // Callback để trả lại giày đã lọc
}

const FilterModal = ({
  shoes,
  visible,
  onClose,
  onConfirm,
}: FilterModalProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('Tăng dần');

  const brands = ['Nike', 'Adidas', 'Puma'];
  const labels = [
    'Trending',
    'New Arrival',
    'Best Seller',
    'Limited Edition',
    'Top Rated',
    'Back in Stock',
    'On Sale',
  ];
  const ratings = [1, 2, 3, 4, 5];
  const prices = ['Dưới 1 triệu', '1 triệu - 3 triệu', 'Trên 3 triệu'];
  const sort = ['Tăng dần', 'Giảm dần'];

  // Lọc và sắp xếp danh sách giày khi nhấn nút "Thực hiện"
  const handleConfirm = () => {
    let result: any[] = shoes;

    if (selectedBrand) {
      result = result.filter(
        shoe => shoe.brand.toLowerCase() === selectedBrand.toLowerCase(),
      );
    }
    if (selectedLabel) {
      result = result.filter(shoe =>
        shoe.label.toLowerCase().includes(selectedLabel.toLowerCase()),
      );
    }
    if (selectedRating !== null) {
      result = result.filter(shoe => {
        const averageRating =
          shoe.reviews?.reduce(
            (sum: number, review: any) => sum + review.rating,
            0,
          ) / (shoe.reviews?.length || 1);
        return averageRating >= selectedRating;
      });
    }
    if (selectedPrice) {
      result = result.filter(shoe => {
        if (selectedPrice === 'Dưới 1 triệu') {
          return shoe.price < 1000000;
        } else if (selectedPrice === '1 triệu - 3 triệu') {
          return shoe.price >= 1000000 && shoe.price <= 3000000;
        } else if (selectedPrice === 'Trên 3 triệu') {
          return shoe.price > 3000000;
        }
        return true;
      });
    }

    if (selectedSort === 'Tăng dần') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'Giảm dần') {
      result = result.sort((a, b) => b.price - a.price);
    }

    // Trả kết quả lọc cho trang cha
    onConfirm(result);
    onClose(); // Đóng modal sau khi thực hiện lọc
  };

  // Render các lựa chọn bộ lọc
  const renderFilterOption = (
    label: string,
    data: (string | number)[], // Có thể là string[] hoặc number[]
    onSelect: (value: any) => void,
    selectedValue: string | number | null,
  ) => {
    return (
      <View style={styles.filterOption}>
        <Text style={styles.filterLabel}>{label}</Text>

        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.optionItem,
                selectedValue === item && styles.selectedOption,
              ]}
              onPress={() => {
                // Kiểm tra xem nếu item đã được chọn thì hủy chọn
                if (selectedValue === item) {
                  onSelect(null); // Hủy chọn
                } else {
                  onSelect(item); // Chọn item
                }
              }}>
              <Text
                style={[
                  styles.optionText,
                  selectedValue === item && styles.selectedOptionText,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TextComponent
            text="Bộ lọc và sắp xếp"
            title
            size={20}
            styles={{textAlign: 'center'}}
          />
          <SpaceComponent line color={appColors.gray} />
          <View>
            {renderFilterOption(
              'Thương hiệu',
              brands,
              setSelectedBrand,
              selectedBrand,
            )}
            {renderFilterOption(
              'Nhãn hiệu',
              labels,
              setSelectedLabel,
              selectedLabel,
            )}
            {renderFilterOption(
              'Đánh giá',
              ratings,
              (value: number) => setSelectedRating(value),
              selectedRating,
            )}
            {renderFilterOption('Sắp xếp', sort, setSelectedSort, selectedSort)}
            {renderFilterOption('Giá', prices, setSelectedPrice, selectedPrice)}
          </View>
          <SpaceComponent line />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, styles.cancelButton]}
              onPress={onClose}>
              <TextComponent text="Hủy" size={16} font={fontFamilies.medium} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={handleConfirm}>
              <TextComponent
                text="Thực hiện"
                color={appColors.white}
                size={16}
                font={fontFamilies.medium}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: appColors.grayLight,
  },
  filterOption: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    color: appColors.black,
    marginBottom: 10,
  },
  optionItem: {
    backgroundColor: appColors.grayLight,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: appColors.primary,
  },
  selectedOptionText: {
    color: appColors.white,
  },
  optionText: {
    color: appColors.black,
    fontSize: 14,
    fontFamily: fontFamilies.regular,
  },
  Button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: appColors.primary,
    borderRadius: 60,
    width: appInfo.sizes.WIDTH * 0.4,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
