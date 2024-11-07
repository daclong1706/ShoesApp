import {View, Text} from 'react-native';
import React from 'react';
import {ContainerComponent} from '../../components';
import ShoesCart from './ShoesCart';

const CartScreen = () => {
  return (
    <ContainerComponent title="My Cart" isImageBackground isScroll>
      <ShoesCart />
      <ShoesCart />
      <ShoesCart />
      <ShoesCart />
      <ShoesCart />
      <ShoesCart />
      <ShoesCart />
      <ShoesCart />
      <ShoesCart />
      <ShoesCart />
    </ContainerComponent>
  );
};

export default CartScreen;
