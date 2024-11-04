import React, {useState} from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SizeSelector,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import {
  ArrowDown,
  ArrowDown2,
  ArrowLeft2,
  Heart,
  Icon,
  ShoppingBag,
  Star,
  Star1,
} from 'iconsax-react-native';
import Collapsible from 'react-native-collapsible';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductDetail = ({navigation, route}: any) => {
  const {item: product} = route.params;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeFitCollapsed, setSizeFitCollapsed] = useState(true);
  const [isReviewsCollapsed, setReviewsCollapsed] = useState(true);
  const [isMoreInfoCollapsed, setMoreInfoCollapsed] = useState(true);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  const discount =
    product.colors[selectedColorIndex]?.discountPercentage ??
    product.discountPercentage;

  const currentColor = product.colors[selectedColorIndex];
  const images = [currentColor.colorImage, ...currentColor.images]; // Thêm ảnh gốc vào đầu danh sách các ảnh khác

  const StarRating = ({rating}: any) => {
    return (
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <AntDesign
            key={index}
            name="star"
            size={16}
            color={index < rating ? appColors.primary : appColors.gray}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      {/* RowComponent (Header) cố định ở trên */}
      <View style={[styles.headerContainer, globalStyles.shadow]}>
        <RowComponent styles={{padding: 16}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[globalStyles.shadow, styles.button, {marginRight: 12}]}>
            <ArrowLeft2 size={24} color={appColors.text} />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <TextComponent
              text={product.name}
              font={fontFamilies.medium}
              size={16}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={[styles.button, {marginRight: 12}]}>
            <ShoppingBag size={24} color={appColors.text} />
          </TouchableOpacity>
        </RowComponent>
      </View>

      {/* Nội dung cuộn trong ScrollView */}
      <ScrollView contentContainerStyle={{paddingTop: 70}}>
        <Swiper
          style={styles.swiper}
          showsPagination={true}
          loop={false}
          dotColor={appColors.primaryPastel}
          activeDotColor={appColors.primary}>
          {images.map((imageUri: string, index: number) => (
            <ImageBackground
              key={index}
              source={{uri: imageUri}}
              style={styles.mainImage}
            />
          ))}
        </Swiper>

        {/* Bảng chọn màu sắc với FlatList */}
        <FlatList
          data={product.colors}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setSelectedColorIndex(index)}
              style={[
                styles.colorOption,
                {
                  borderColor:
                    selectedColorIndex === index
                      ? appColors.primary
                      : 'transparent',
                  opacity: item.quantity > 0 ? 1 : 0.5,
                },
              ]}>
              <Image
                source={{uri: item.colorImage}}
                style={styles.colorImage}
              />
              {item.quantity === 0 && (
                <TextComponent text="Hết hàng" styles={styles.outOfStockText} />
              )}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.colorId}
        />

        <SectionComponent styles={{marginHorizontal: 8}}>
          {product.label && (
            <TextComponent
              text={product.label}
              color={appColors.primary}
              styles={{textTransform: 'uppercase', marginBottom: 6}}
              size={14}
            />
          )}
          <TextComponent text={product.name} styles={styles.productName} />
          {product.type && (
            <TextComponent text={product.type} styles={styles.productType} />
          )}
          {discount ? (
            <View>
              <RowComponent>
                <TextComponent
                  text={formatPrice(
                    product.price - (product.price * discount) / 100,
                  )}
                  size={18}
                  font={fontFamilies.medium}
                />
                <TextComponent
                  text={formatPrice(product.price)}
                  size={18}
                  styles={{
                    textDecorationLine: 'line-through',
                    marginHorizontal: 16,
                    color: appColors.gray,
                  }}
                />
              </RowComponent>
            </View>
          ) : (
            <TextComponent
              text={formatPrice(product.price)}
              font={fontFamilies.medium}
              size={18}
            />
          )}
          <SizeSelector
            sizes={product.sizes}
            onSizeSelected={size => setSelectedSize(size)}
          />
          <ButtonComponent
            text="Add to Cart"
            type="primary"
            styles={{marginVertical: 6}}
            size={16}
          />
          <ButtonComponent
            text="Favorite"
            type="primary"
            styles={{
              backgroundColor: appColors.white,
              borderColor: appColors.primary,
              borderWidth: 1,
              marginVertical: 8,
              flex: 1,
            }}
            textColor={appColors.primary}
            textStyles={{flex: 0}}
            size={16}
            icon={
              <Heart
                size={20}
                color={appColors.primary}
                style={{marginLeft: 12}}
              />
            }
            iconFlex="right"
          />
          {/* Mô tả sản phẩm */}
          <TextComponent
            text={product.description}
            styles={styles.description}
          />
          <View style={styles.infoContainer}>
            <TextComponent
              text={`• Màu sắc: ${currentColor.colorName}`}
              styles={styles.infoText}
            />
            <TextComponent
              text={`• Mã kiểu dáng: ${currentColor.colorId}`}
              styles={styles.infoText}
            />
            <TextComponent
              text={`• Quốc gia/Nơi sản xuất: ${currentColor.country[0]}`}
              styles={styles.infoText}
            />
          </View>
        </SectionComponent>
        <View style={styles.sectionContainer}>
          <SpaceComponent line />
          {/* Size & Fit */}
          <TouchableOpacity
            onPress={() => setSizeFitCollapsed(!isSizeFitCollapsed)}>
            <RowComponent justify="space-between">
              <TextComponent text="Size & Fit" styles={styles.sectionHeader} />
              <ArrowDown2 size={24} color={appColors.black} />
            </RowComponent>
          </TouchableOpacity>
          <Collapsible collapsed={isSizeFitCollapsed}>
            <TextComponent
              text="Thông tin về kích cỡ và phù hợp với sản phẩm này..."
              styles={styles.sectionContent}
            />
          </Collapsible>
          <SpaceComponent line />
          {/* Reviews */}
          <TouchableOpacity
            onPress={() => setReviewsCollapsed(!isReviewsCollapsed)}>
            <RowComponent justify="space-between">
              <TextComponent text="Đánh giá" styles={styles.sectionHeader} />
              <ArrowDown2 size={24} color={appColors.black} />
            </RowComponent>
          </TouchableOpacity>
          <SpaceComponent line />
          <Collapsible collapsed={isReviewsCollapsed}>
            {product.reviews.slice(0, 3).map((review: any, index: any) => (
              <View key={index} style={styles.reviewContainer}>
                <RowComponent justify="space-between">
                  <TextComponent
                    text={`${review.username}`}
                    styles={styles.reviewUsername}
                  />
                  <TextComponent
                    text={`${review.date}`}
                    styles={styles.reviewDate}
                  />
                </RowComponent>

                <StarRating rating={review.rating} />

                <TextComponent
                  text={review.comment}
                  styles={styles.reviewComment}
                />
              </View>
            ))}
            {/* "Xem thêm đánh giá" button */}
            {product.reviews.length > 3 && (
              <TouchableOpacity
                onPress={() => navigation.navigate('ReviewScreen', {product})}>
                <TextComponent text="Xem thêm đánh giá" />
              </TouchableOpacity>
            )}
          </Collapsible>
          {/* More Information */}
          <TouchableOpacity
            onPress={() => setMoreInfoCollapsed(!isMoreInfoCollapsed)}>
            <RowComponent justify="space-between">
              <TextComponent
                text="Thông tin thêm"
                styles={styles.sectionHeader}
              />
              <ArrowDown2 size={24} color={appColors.black} />
            </RowComponent>
          </TouchableOpacity>
          <Collapsible collapsed={isMoreInfoCollapsed}>
            <TextComponent
              text="Ký hiệu ® có thể xuất hiện một hoặc hai lần trên lưỡi giày và/hoặc lớp lót giày do sự thay đổi được thực hiện bởi nhà sản xuất. Sản phẩm bạn nhận được có thể có một số chi tiết khác biệt so với hình ảnh hiển thị trên website hoặc ứng dụng của chúng tôi."
              styles={styles.sectionContent}
            />
          </Collapsible>
          <SpaceComponent line />
        </View>
        {/* Features Section */}
        {product.features && product.features.length > 0 && (
          <SectionComponent>
            <TextComponent
              text="Tính năng nổi bật"
              styles={styles.sectionHeader}
            />
            {product.features.map((feature: any, index: number) => (
              <View key={index} style={styles.featureContainer}>
                <Image
                  source={{uri: feature.image}}
                  style={styles.featureImage}
                />
                <TextComponent
                  text={feature.description}
                  styles={styles.featureText}
                />
              </View>
            ))}
          </SectionComponent>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    zIndex: 10,
  },
  swiper: {
    height: 400,
  },
  mainImage: {
    flex: 1,
    height: 400,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productType: {
    fontSize: 16,
    color: '#555',
    marginVertical: 6,
  },
  colorList: {
    marginVertical: 16,
  },
  colorOption: {
    marginHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
  },
  colorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
  outOfStockText: {
    fontSize: 10,
    color: 'red',
    position: 'absolute',
    bottom: -8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  button: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 44,
    flexDirection: 'row',
  },
  infoContainer: {
    marginVertical: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  reviewContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  reviewUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewDate: {
    fontSize: 14,
    color: '#888',
  },
  reviewRating: {
    fontSize: 14,
    color: appColors.primary,
    marginBottom: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  featureContainer: {
    flexDirection: 'column', // Đảm bảo ảnh ở trên, mô tả ở dưới
    alignItems: 'flex-start', // Căn đều bên trái
    marginVertical: 8,
  },
  featureImage: {
    width: '100%', // Đảm bảo hình ảnh chiếm đủ chiều ngang của vùng chứa
    height: 400, // Chiều cao cố định, có thể tùy chỉnh theo ý muốn
    borderRadius: 8,
    marginBottom: 8, // Khoảng cách giữa hình ảnh và mô tả
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});

export default ProductDetail;