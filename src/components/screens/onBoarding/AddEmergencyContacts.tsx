/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LogoHeader from '../../common/LogoHeader';
import {AppImages} from '../../../utility/AppImages';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import GoogleAuthButton from '../../common/GoogleAuthButton';
import {InputField} from '../../common/InputField';
import {AppColors} from '../../../utility/AppColors';
import {useEffect, useState} from 'react';
import OrSeparator from '../../common/OrSeparator';
import styleSheet from '../../../utility/stylesheet';
import CommonButton from '../../common/CommonButton';
import Contacts from 'react-native-contacts';
import BlackButton from '../../common/BlackButton';
import SkipNextButton from '../../common/SkipNextButton';
import {FULL_HEIGHT} from '../../../utility/Constant';
import StepProgressIndicator from '../../common/StepProgressIndicator';

const AddEmergencyContacts = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styleSheet.container,
            {
              padding: 15,
            },
          ]}>
          <LogoHeader />
          <StepProgressIndicator currentStep={1} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {textAlign: 'center', marginVertical: 10},
            ]}>
            Add Emergency Contacts
          </Text>
          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {marginVertical: 10, textAlign: 'center'},
            ]}>
            Instantly reach out for medical assistance with our emergency
            contact screen, ensuring peace of mind during critical moments
          </Text>
          <BlackButton
            title="Add Emergency Contact"
            buttonStyles={styles.button}
            titleStyles={[AppFontStyle.SEMI_BOLD_15, {color: AppColors.white}]}
          />
        </View>
      </ScrollView>
      <SkipNextButton
        containerStyle={styles.buttonContainer}
        nextButtonHandler={() => props.navigation.navigate('GenderAnalysis')}
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
  headerImage: {
    width: 155,
    alignSelf: 'center',
    height: 175,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    padding: 15,
  },
});

export default AddEmergencyContacts;
