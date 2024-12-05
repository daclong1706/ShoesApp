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
import {ButtonComponent, RowComponent, SpaceComponent} from '../../components';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import {useAppDispatch} from '../../stores/hook';
import productAPI from '../../apis/productAPI';
import {Shoes} from '../../models/ShoesModel';

const images = [
  'https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/75c73723-2453-4549-9c68-05c825eebe4b/image.jpg',
  'https://www.joandkemp.com/wp-content/uploads/2018/03/Photo-Mar-10-4-45-18-PM.jpg',
  'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/1952de1b-fc7a-4bab-a0a8-00554bd13c5d/W+AIR+MAX+270.png',
];

const DiscoverScreen = () => {
  const [muted, setMuted] = useState(false);
  const navigation: any = useNavigation();
  const [shoes, setShoes] = useState<Shoes>();

  const getProduct = async () => {
    try {
      // Giả sử 'NIKE-026' là productId bạn cần lấy
      const product = await productAPI.getProductById('NIKE-026');
      setShoes(product.data.shoes); // Cập nhật state shoes nếu cần, nhưng không dùng ngay lập tức

      // Truyền trực tiếp sản phẩm lấy được vào navigation
      navigation.navigate('ProductDetail', {item: product.data.shoes});
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  };

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
            source={require('../../assets/videos/NIKE-AIR-MAX-270-KICKS.mp4')}
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
          <Text style={styles.title}>NIKE AIR MAX 270</Text>
          <Text style={styles.text}>
            Nike Air Max 270 mang đến sự thoải mái tuyệt vời với đệm khí Max
            Air, kết hợp cùng thiết kế hiện đại và phong cách nổi bật.
          </Text>
        </View>

        <View style={{marginVertical: 100}}>
          <Image
            source={{
              uri: 'https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/ad80fcdc-ea4c-4d5f-9a38-8f16bbc43b0c/image.jpg',
            }}
            style={{width: '100%', height: 250}}
          />
          <RowComponent>
            <Image
              source={{
                uri: 'https://images.tokopedia.net/img/cache/700/product-1/2019/9/9/6770312/6770312_c30a3637-f421-49c1-98a2-d759e07e5fba_800_800',
              }}
              style={{width: '50%', height: 250}}
            />
            <View style={{flex: 1}}>
              <Image
                source={{
                  uri: 'https://www.jordan1.vn/wp-content/uploads/2023/09/untitled_design_-_2022-08-17t135032.995_131a2fd4aa6145a689cc1054e286de05_1024x1024.png',
                }}
                style={{width: '100%', height: 125}}
              />
              <RowComponent>
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaFXfgyo8EeCq01CxdtTUGdmnFZcdY8JSJZg&s',
                  }}
                  style={{width: '50%', height: 125}}
                />
                <Image
                  source={{
                    uri: 'https://www.elleman.vn/app/uploads/2018/03/26/Nike-Air-Max-270-elle-man-feature-image.jpg',
                  }}
                  style={{width: '50%', height: 125}}
                />
              </RowComponent>
            </View>
          </RowComponent>
        </View>

        <View style={styles.context}>
          <Text style={styles.section}>Màu Sắc & Phong Cách</Text>
          <Text style={styles.text}>
            Nike Air Max 270 có nhiều màu sắc đa dạng, phù hợp với mọi phong
            cách, giúp bạn dễ dàng phối đồ và thể hiện cá tính.
          </Text>
        </View>

        <Swiper
          style={styles.swiper}
          showsPagination={true}
          loop={false}
          dotColor={appColors.primaryPastel}
          activeDotColor={appColors.primary}
          dotStyle={{
            width: 60, // Điều chỉnh chiều dài dot thành đường thẳng
            height: 5, // Điều chỉnh chiều cao dot
            borderRadius: 0, // Không làm tròn dot
          }}
          activeDotStyle={{
            width: 80, // Chiều dài dot khi active
            height: 5, // Chiều cao dot khi active
            borderRadius: 0, // Không làm tròn dot khi active
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
          <Text style={styles.section}>Nổi bật</Text>
          <Text style={styles.text}>
            Nike Air Max 270 mang đến cảm giác bước trên mây với đệm khí Max
            Air, giúp từng bước đi trở nên êm ái và nhẹ nhàng.
          </Text>
        </View>
        <View style={[styles.context, {marginBottom: 40}]}>
          <ButtonComponent
            type="primary"
            text="Xem sản phẩm"
            onPress={getProduct}
          />
        </View>
        <SpaceComponent line />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Đắc Long. All Rights Reserved.
          </Text>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 24,
  },
  text: {color: appColors.primary, fontSize: 18},
  swiper: {
    height: 500,
    marginTop: 100,
  },
  mainImage: {
    flex: 1,
    height: 500,
    resizeMode: 'cover',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#000',
    fontSize: 12,
  },
});
