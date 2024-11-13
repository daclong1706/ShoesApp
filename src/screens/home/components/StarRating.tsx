import React from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../../../constants/appColor';
import {TextComponent} from '../../../components';

type Props = {
  stars: number;
};

const StarRating: React.FC<Props> = ({stars}) => {
  const MAX_STARS = 5;

  // Hàm để tô màu ngôi sao dựa trên `averageStars`
  const renderStars = () => {
    return Array.from({length: MAX_STARS}, (_, index) => {
      const starColor =
        index < Math.round(stars) ? appColors.primary : appColors.gray;
      return (
        <AntDesign
          key={index}
          name="star"
          size={16}
          color={starColor}
          style={{marginRight: 2}}
        />
      );
    });
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {renderStars()}
      {/* {noNum ?? (
        <TextComponent text={stars.toFixed(1)} styles={{marginLeft: 5}} />
      )} */}
    </View>
  );
};

export default StarRating;
