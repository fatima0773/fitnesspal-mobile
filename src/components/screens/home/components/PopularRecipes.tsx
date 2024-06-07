/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Image, Text, Linking} from 'react-native';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {AppColors} from '../../../../utility/AppColors';

const PopularRecipes = (props: any) => {
  const handlePress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  const renderRecipeItem = ({item}: any) => {
    return (
      <View style={{marginVertical: 20}}>
        <Image
          source={{uri: item.recipe.image}}
          style={{width: 176, height: 152, marginRight: 10, borderRadius: 20}}
        />
        <Text
          style={[AppFontStyle.MEDIUM_16, {marginVertical: 10, width: 176}]}>
          {item.recipe.label}
        </Text>
        <Text
          style={[
            AppFontStyle.MEDIUM_16,
            {color: AppColors.teal, textDecorationLine: 'underline'},
          ]}
          onPress={() => handlePress(item.recipe.url)}>
          See full recipe
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {props.data && (
        <FlatList
          horizontal
          data={props.data}
          renderItem={renderRecipeItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default PopularRecipes;
