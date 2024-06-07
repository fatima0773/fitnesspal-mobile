/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {SafeAreaView, StyleSheet} from 'react-native';
import GetStartedCarousal from '../common/GetStartedCarousal';
import LogoHeader from '../common/LogoHeader';
import BlackButton from '../common/BlackButton';
import {AppColors} from '../../utility/AppColors';
// import {useEffect, useState} from 'react';
import storage from '../../utility/Storage';
import React from 'react';

const GetStarted = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <LogoHeader />
      <GetStartedCarousal />
      <BlackButton
        pressHandler={async () => {
          // props.navigation.navigate('Tab', {screen: 'Home'});
          // props.navigation.navigate('SignIn');

          const auth = await storage.load({
            key: 'authState',
            autoSync: true,
            syncInBackground: true,
          });
          if (auth.userId === '') {
            props.navigation.navigate('SignIn');
          } else {
            props.navigation.navigate('Tab', {screen: 'Home'});
          }
        }}
        title={'Get Started'}
        buttonStyles={{
          alignSelf: 'flex-end',
          marginTop: 40,
          marginHorizontal: 25,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
});

export default GetStarted;
