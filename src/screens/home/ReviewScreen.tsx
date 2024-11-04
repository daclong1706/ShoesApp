import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {
  ContainerComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ReviewScreen = ({route}: any) => {
  const {product} = route.params;
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const StarRating = ({rating}: any) => (
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

  const filteredReviews = selectedRating
    ? product.reviews.filter((review: any) => review.rating === selectedRating)
    : product.reviews;

  const filterData = [
    {label: 'Tất cả', value: null},
    ...[5, 4, 3, 2, 1].map(star => ({label: star, value: star})),
  ];

  return (
    <ContainerComponent title="Đánh giá" back isImageBackground>
      <View style={styles.container}>
        <View>
          <FlatList
            data={filterData}
            horizontal={true}
            keyExtractor={item => item.label.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedRating === item.value && styles.selectedFilterButton,
                ]}
                onPress={() =>
                  setSelectedRating(
                    item.value === selectedRating ? null : item.value,
                  )
                }>
                <AntDesign
                  name="star"
                  size={14}
                  color={
                    selectedRating === item.value
                      ? appColors.white
                      : appColors.black
                  }
                  style={styles.starIcon}
                />
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedRating === item.value && styles.selectedText,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalFilterList}
          />
        </View>

        {/* Danh sách đánh giá */}
        <View>
          <FlatList
            data={filteredReviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.reviewContainer}>
                <RowComponent justify="space-between">
                  <TextComponent
                    text={`${item.username}`}
                    styles={styles.reviewUsername}
                  />
                  <TextComponent
                    text={`${item.date}`}
                    styles={styles.reviewDate}
                  />
                </RowComponent>

                <StarRating rating={item.rating} />

                <TextComponent
                  text={item.comment}
                  styles={styles.reviewComment}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  horizontalFilterList: {
    paddingBottom: 10,
    maxHeight: 75,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 75,
    height: 40, // Chiều cao cố định
    backgroundColor: '#f0f0f0',
    borderRadius: 26,
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: appColors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  starIcon: {
    marginRight: 4,
  },
  reviewContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#F8FBFE',
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
});

export default ReviewScreen;
