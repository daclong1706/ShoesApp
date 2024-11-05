import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import productAPI from '../../apis/productApi'; // Thêm ProductAPI để tương tác với backend

const CreateProductScreen = ({navigation}: any) => {
  // State để lưu thông tin sản phẩm
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [colorName, setColorName] = useState('');
  const [quantity, setQuantity] = useState('');

  // Hàm xử lý tạo mới sản phẩm
  const handleCreateProduct = async () => {
    // Kiểm tra các trường bắt buộc
    if (!name || !brand || !price || !description || !colorName || !quantity) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Tạo đối tượng sản phẩm mới
    const newProduct = {
      productId: `shoe_${Date.now()}`, // Tạo ID duy nhất cho sản phẩm mới
      name,
      type,
      brand,
      price: parseFloat(price),
      description,
      colors: [
        {
          colorId: `color_${Date.now()}`,
          colorName,
          quantity: parseInt(quantity),
        },
      ],
    };

    try {
      // Gửi yêu cầu POST tới server để tạo sản phẩm mới
      const response = await productAPI.createProduct(newProduct);
      if (response.status === 201) {
        Alert.alert('Success', 'Product created successfully!');
        navigation.goBack(); // Quay lại màn hình trước sau khi thêm thành công
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create product. Please try again.');
    }
  };

  return (
    <ContainerComponent isScroll isImageBackground>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SectionComponent styles={{alignItems: 'center', marginTop: 30}}>
          <TextComponent
            title
            text="Add New Product"
            size={28}
            styles={{marginBottom: 20}}
          />
        </SectionComponent>
        <SectionComponent>
          {/* Tên sản phẩm */}
          <InputComponent
            value={name}
            placeholder="Product Name"
            onChange={val => setName(val)}
            allowClear
          />

          {/* Loại sản phẩm */}
          <InputComponent
            value={type}
            placeholder="Product Type"
            onChange={val => setType(val)}
            allowClear
          />

          {/* Thương hiệu */}
          <InputComponent
            value={brand}
            placeholder="Brand"
            onChange={val => setBrand(val)}
            allowClear
          />

          {/* Giá */}
          <InputComponent
            value={price}
            placeholder="Price"
            onChange={val => setPrice(val)}
            allowClear
          />

          {/* Mô tả */}
          <InputComponent
            value={description}
            placeholder="Description"
            onChange={val => setDescription(val)}
            allowClear
          />

          {/* Màu sắc */}
          <InputComponent
            value={colorName}
            placeholder="Color Name"
            onChange={val => setColorName(val)}
            allowClear
          />

          {/* Số lượng */}
          <InputComponent
            value={quantity}
            placeholder="Quantity"
            onChange={val => setQuantity(val)}
            allowClear
          />

          {/* Nút Thêm Sản Phẩm */}
          <SpaceComponent height={20} />
          <ButtonComponent
            type="primary"
            text="Create Product"
            onPress={handleCreateProduct}
            size={18}
          />
        </SectionComponent>
      </ScrollView>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: appColors.white,
  },
});

export default CreateProductScreen;
