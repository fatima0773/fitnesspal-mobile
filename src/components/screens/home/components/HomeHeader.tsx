/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppImages} from '../../../../utility/AppImages';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import storage from '../../../../utility/Storage';
import React from 'react';

const HomeHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={AppImages.USER}
        style={styles.profilePicture}
        resizeMode="contain"
      />
      <View style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
        <Text style={AppFontStyle.SEMI_BOLD_28}>Hey Fatima!</Text>
        <Text
          style={[
            AppFontStyle.MEDIUM_17,
            {color: AppColors.secondaryText, marginVertical: 8},
          ]}>
          Welcome back
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          storage.save({
            key: 'authState',
            data: null,
          });
          props.pressHandler();
        }}>
        <MaterialIcons
          name="logout"
          size={35}
          color={AppColors.black}
          style={styles.logout}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    marginTop: 30,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  logout: {
    marginRight: 10,
  },
});

export default HomeHeader;
