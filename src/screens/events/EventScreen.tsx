// src/screens/EventScreen.tsx
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {ContainerComponent} from '../../components';
import Carousel from 'react-native-reanimated-carousel';
import VideoItem from './VideoItem';

const {width, height} = Dimensions.get('window');

const EventScreen = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);

  // Dữ liệu video
  const videos = [
    {
      uri: require('../../assets/videos/Nike-Air-Max-270.mp4'),
      title: 'AIR MAX 270',
      brand: 'Nike',
    },
    {
      uri: require('../../assets/videos/Adidas-Ultraboost.mp4'),
      title: 'Ultraboost',
      brand: 'Adidas',
    },
    {
      uri: require('../../assets/videos/Puma-FOREVER-FASTER.mp4'),
      title: 'FOREVER-FASTER',
      brand: 'Puma',
    },
    // Thêm các video khác vào đây
  ];

  const toggleMute = () => {
    setMuted(!muted); // Đảo ngược trạng thái muted
  };

  return (
    <ContainerComponent back title="Khám phá">
      <View style={styles.container}>
        <Carousel
          loop={false}
          width={width}
          height={height}
          autoPlay={false}
          data={videos}
          vertical={true}
          onSnapToItem={(index: number) => setCurrentIndex(index)} // Cập nhật chỉ số video đang hiển thị
          renderItem={({index, item}: any) => (
            <VideoItem
              videoSource={item.uri}
              title={item.title}
              brand={item.brand}
              currentIndex={currentIndex}
              index={index} // Truyền chỉ số video hiện tại vào
              muted={muted} // Truyền trạng thái muted vào
              onPress={() => navigation.navigate('DiscoverScreen')}
              toggleMute={toggleMute} // Truyền hàm toggleMute vào
            />
          )}
        />
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EventScreen;
