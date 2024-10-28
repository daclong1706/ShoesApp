import React, {ReactNode, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  isSelected?: boolean;
  label?: string;
  icon?: ReactNode | string;
  onPress?: () => void;
}

const TagComponent = (props: Props) => {
  const {isSelected = false, label, icon, onPress} = props;

  const widthAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: isSelected ? 120 : 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSelected]);

  return (
    <View style={{marginRight: 16}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        delayPressIn={200}>
        <Animated.View
          style={[
            styles.container,
            {width: widthAnim},
            isSelected && styles.selectedContainer,
          ]}>
          <View
            style={[
              styles.logoContainer,
              isSelected && styles.selectedLogoContainer,
            ]}>
            {typeof icon === 'string' ? (
              <Image
                source={{uri: icon}}
                style={styles.logoImage}
                resizeMode="contain"
              />
            ) : (
              icon
            )}
          </View>
          {isSelected && (
            <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
              {label}
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  selectedContainer: {
    backgroundColor: appColors.primary,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedLogoContainer: {
    backgroundColor: '#fff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
});

export default TagComponent;
