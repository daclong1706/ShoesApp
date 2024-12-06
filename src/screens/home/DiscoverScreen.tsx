import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArrowLeft, VolumeCross, VolumeHigh} from 'iconsax-react-native';
import {appColors} from '../../constants/appColor';
import {useNavigation} from '@react-navigation/native';
import {
  ButtonComponent,
  FooterComponent,
  RowComponent,
  SpaceComponent,
} from '../../components';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import {useAppDispatch} from '../../stores/hook';
import productAPI from '../../apis/productAPI';
import {Shoes} from '../../models/ShoesModel';
import {fontFamilies} from '../../constants/fontFamilies';

const DiscoverScreen = ({navigation, route}: any) => {
  const {item} = route.params;
  const [muted, setMuted] = useState(false);
  const [shoes, setShoes] = useState<Shoes>();
  console.log(item.product.detail.title);
  const getProduct = async () => {
    try {
      // Giả sử 'NIKE-026' là productId bạn cần lấy
      const product = await productAPI.getProductById(item.product.id);
      setShoes(product.data.shoes); // Cập nhật state shoes nếu cần, nhưng không dùng ngay lập tức
      setMuted(true);
      // Truyền trực tiếp sản phẩm lấy được vào navigation
      navigation.navigate('ProductDetail', {item: product.data.shoes});
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  };

  const images = item.product.images;

  return (
    <View style={styles.container}>
      <RowComponent styles={{backgroundColor: 'white', padding: 16}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft
            size={24}
            color={appColors.black}
            style={{marginLeft: 6}}
          />
        </TouchableOpacity>
        <Text
          style={{marginLeft: 24, color: 'black', fontFamily: 'LaOriental'}}>
          Khám phá
        </Text>
      </RowComponent>
      <ScrollView>
        <View style={styles.containerVideo}>
          <Video
            source={{uri: item.videoSource}}
            style={styles.backgroundVideo}
            repeat={true}
            resizeMode="cover"
            muted={muted}
          />

          <TouchableOpacity
            onPress={() => {
              setMuted(!muted);
            }}
            style={styles.muted}>
            {muted ? (
              <VolumeCross size={24} color={appColors.primary} />
            ) : (
              <VolumeHigh size={24} color={appColors.primary} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.context}>
          <Text style={styles.title}>{item.product.name}</Text>
          <Text style={styles.text}>{item.product.description}</Text>
        </View>

        <View style={{marginVertical: 100}}>
          <Image
            source={{
              uri: item.product.additionalImages[0],
            }}
            style={{width: '100%', height: 250}}
          />
          <RowComponent>
            <Image
              source={{
                uri: item.product.additionalImages[1],
              }}
              style={{width: '50%', height: 250}}
            />
            <View style={{flex: 1}}>
              <Image
                source={{
                  uri: item.product.additionalImages[2],
                }}
                style={{width: '100%', height: 125}}
              />
              <RowComponent>
                <Image
                  source={{
                    uri: item.product.additionalImages[3],
                  }}
                  style={{width: '50%', height: 125}}
                />
                <Image
                  source={{
                    uri: item.product.additionalImages[4],
                  }}
                  style={{width: '50%', height: 125}}
                />
              </RowComponent>
            </View>
          </RowComponent>
        </View>

        <View style={styles.context}>
          <Text style={styles.section}>{item.product.detail.title}</Text>
          <Text style={styles.text}>{item.product.detail.description}</Text>
        </View>

        <Swiper
          style={styles.swiper}
          showsPagination={true}
          loop={false}
          dotColor={appColors.primaryPastel}
          activeDotColor={appColors.primary}
          dotStyle={{
            width: 60,
            height: 5,
            borderRadius: 0,
          }}
          activeDotStyle={{
            width: 80,
            height: 5,
            borderRadius: 0,
          }}>
          {images.map((imageUri: string, index: number) => (
            <ImageBackground
              key={index}
              source={{uri: imageUri}}
              style={styles.mainImage}
            />
          ))}
        </Swiper>

        <View style={[styles.context, {marginVertical: 80}]}>
          <Text style={styles.section}>{item.product.highlight.title}</Text>
          <Text style={styles.text}>{item.product.highlight.description}</Text>
        </View>
        <View style={[styles.context, {marginBottom: 40}]}>
          <ButtonComponent
            type="primary"
            text="Xem sản phẩm"
            onPress={getProduct}
          />
        </View>
        <FooterComponent />
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  backgroundVideo: {
    width: '100%',
    height: 500,
  },
  containerVideo: {
    marginBottom: 50,
    position: 'relative',
  },
  muted: {
    position: 'absolute',
    padding: 10,
    borderRadius: 24,
    backgroundColor: 'white',
    bottom: 24,
    left: 24,
  },
  context: {marginHorizontal: 24},
  title: {
    fontSize: 16,
    fontFamily: 'Higher Jump',
    color: appColors.primary,
    marginBottom: 16,
  },
  section: {
    color: appColors.primary,
    fontSize: 26,
    marginVertical: 24,
    fontFamily: 'YanoneKaffeesatz-Medium',
  },
  text: {
    color: appColors.primary,
    fontSize: 18,
    fontFamily: fontFamilies.regular,
  },
  swiper: {
    height: 500,
    marginTop: 100,
  },
  mainImage: {
    flex: 1,
    height: 500,
    resizeMode: 'cover',
  },
});
