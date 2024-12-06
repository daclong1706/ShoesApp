// src/screens/EventScreen.tsx
import React, {useEffect, useState} from 'react';
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
import exploreAPI from '../../apis/exploreAPI';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const EventScreen = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);
  const [explores, setExplores] = useState<any[]>([]);

  useEffect(() => {
    const getAllExplores = async () => {
      try {
        const res = await exploreAPI.getAllExplores();
        setExplores(res.data.explores);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getAllExplores();
  }, []);

  const toggleMute = () => {
    setMuted(!muted); // Đảo ngược trạng thái muted
  };

  useFocusEffect(
    React.useCallback(() => {
      setMuted(false); // Đặt trạng thái muted là true khi màn hình mất focus

      return () => {
        // Cleanup function when screen loses focus
        setMuted(true); // Khôi phục lại trạng thái âm thanh khi màn hình lại focus
      };
    }, []),
  );

  return (
    <ContainerComponent back title="Khám phá">
      <View style={styles.container}>
        <Carousel
          loop={false}
          width={width}
          height={height}
          autoPlay={false}
          data={explores}
          vertical={true}
          onSnapToItem={(index: number) => setCurrentIndex(index)} // Cập nhật chỉ số video đang hiển thị
          renderItem={({index, item}: any) => (
            <VideoItem
              videoSource={item.videoSource}
              title={item.product.name}
              currentIndex={currentIndex}
              index={index}
              muted={muted}
              onPress={() => navigation.navigate('DiscoverScreen', {item})}
              toggleMute={toggleMute}
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
