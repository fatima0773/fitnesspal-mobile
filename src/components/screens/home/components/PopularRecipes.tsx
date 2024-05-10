/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import {AppImages} from '../../../../utility/AppImages';
import {AppFontStyle} from '../../../../styles/AppFontStyle';

const PopularRecipes = () => {
  const recipes = [
    {
      image: AppImages.FOOD,
      name: 'Egg Ceaser Salad',
    },
    {
      image: AppImages.FOOD,
      name: 'Egg Ceaser Salad',
    },
    {
      image: AppImages.FOOD,
      name: 'Egg Ceaser Salad',
    },
    {
      image: AppImages.FOOD,
      name: 'Egg Ceaser Salad',
    },
  ];

  const renderRecipeItem = ({item}: any) => {
    return (
      <View style={{marginVertical: 20}}>
        <Image
          source={item.image}
          style={{width: 176, height: 152, marginRight: 10}}
        />
        <Text style={[AppFontStyle.MEDIUM_16, {marginVertical: 10}]}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        horizontal
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PopularRecipes;
