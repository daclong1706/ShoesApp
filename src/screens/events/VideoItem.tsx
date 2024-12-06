// src/components/VideoItem.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {appColors} from '../../constants/appColor';
import {VolumeCross, VolumeHigh} from 'iconsax-react-native';

interface VideoItemProps {
  videoSource: any;
  title: string;
  brand: string;
  onPress: () => void;
  currentIndex: number;
  index: number;
  muted: boolean;
  toggleMute: () => void; // Hàm để thay đổi trạng thái âm thanh
}

const VideoItem: React.FC<VideoItemProps> = ({
  videoSource,
  title,
  brand,
  onPress,
  currentIndex,
  index,
  muted,
  toggleMute,
}) => {
  return (
    <View style={styles.containerVideo}>
      <Video
        source={videoSource}
        style={styles.backgroundVideo}
        muted={muted} // Điều khiển âm thanh từ prop muted
        repeat={true}
        resizeMode="cover"
        paused={currentIndex !== index} // Dừng video nếu không phải video đang hiển thị
      />

      <View style={styles.viewOverlay}>
        <Text style={styles.textOverlay}>{brand}</Text>
        <Text style={styles.textTitleOverlay}>{title}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Khám phá</Text>
        </TouchableOpacity>
      </View>

      {/* Nút điều khiển âm thanh */}
      <TouchableOpacity onPress={toggleMute} style={styles.muted}>
        {muted ? (
          <VolumeCross size={24} color={appColors.primary} />
        ) : (
          <VolumeHigh size={24} color={appColors.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerVideo: {
    marginTop: 50,
    position: 'relative',
  },
  backgroundVideo: {
    width: '100%',
    height: 500,
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
  muted: {
    position: 'absolute',
    padding: 10,
    borderRadius: 24,
    backgroundColor: 'white',
    bottom: 24,
    right: 24,
  },
});

export default VideoItem;
