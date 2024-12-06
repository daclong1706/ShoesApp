import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {appColors} from '../../../constants/appColor';

interface ExploreItemProps {
  videoSource: any;
  title: string;
  onPress: () => void;
  currentVideo: any;
  index: number;
  handleVideoPress: (videoSource: any) => void;
}

const ExploreItem: React.FC<ExploreItemProps> = ({
  videoSource,
  title,
  onPress,
  currentVideo,
  index,
  handleVideoPress,
}) => {
  const splitBrandAndProduct = (productName: string, type: number) => {
    const parts = productName.split(' ');

    const brand = parts[0];
    const product = parts.slice(1).join(' ');

    if (type === 0) {
      return brand;
    } else if (type === 1) {
      return product;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.containerVideo}>
      <TouchableOpacity onPress={() => handleVideoPress(videoSource)}>
        <Video
          source={{uri: videoSource}} // Đảm bảo video đúng với link bạn truyền vào
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode="cover"
          paused={currentVideo !== videoSource} // Kiểm tra video đang phát
        />
      </TouchableOpacity>

      <View style={styles.viewOverlay}>
        <Text style={styles.textOverlay}>{splitBrandAndProduct(title, 0)}</Text>
        <Text style={styles.textTitleOverlay}>
          {splitBrandAndProduct(title, 1)}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Khám phá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerVideo: {
    position: 'relative',
    marginBottom: 10,
  },
  backgroundVideo: {
    width: '100%',
    height: 300,
  },
  viewOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  textOverlay: {
    color: 'white',
    fontSize: 16,
    marginBottom: 6,
    fontFamily: 'LaOriental',
  },
  textTitleOverlay: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Facon',
  },
  button: {
    backgroundColor: appColors.white,
    paddingVertical: 8,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    maxWidth: 140,
  },
  buttonText: {
    color: appColors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ExploreItem;
