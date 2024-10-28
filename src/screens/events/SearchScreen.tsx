import {View, Text} from 'react-native';
import React from 'react';
import {ContainerComponent, TextComponent} from '../../components';

const SearchScreen = ({navigation}: any) => {
  return (
    <ContainerComponent back isImageBackground title="Search">
      <TextComponent text="Search" />
    </ContainerComponent>
  );
};

export default SearchScreen;
