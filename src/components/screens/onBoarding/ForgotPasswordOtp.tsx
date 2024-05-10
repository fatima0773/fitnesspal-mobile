/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LogoHeader from '../../common/LogoHeader';
import {AppImages} from '../../../utility/AppImages';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {AppColors} from '../../../utility/AppColors';
import {useState} from 'react';
import styleSheet from '../../../utility/stylesheet';
import CommonButton from '../../common/CommonButton';
import {OtpInput} from 'react-native-otp-entry';
import {RouteProp, useRoute} from '@react-navigation/native';
interface RouteParams {
  email: string;
}

const ForgotPasswordOtp = (props: any) => {
  const [otp, setOtp] = useState('');
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {email} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styleSheet.container}>
          <LogoHeader />
          <Image
            source={AppImages.ORANGE_CHAT}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_20,
              {textAlign: 'center', marginVertical: 15},
            ]}>
            Forgot Your Password?
          </Text>
          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {textAlign: 'center', marginVertical: 5},
            ]}>
            Please check your email and enter the OTP
          </Text>
          <OtpInput
            numberOfDigits={6}
            focusColor={AppColors.black}
            focusStickBlinkingDuration={500}
            onFilled={(val: string) => {
              setOtp(val);
            }}
            theme={{
              pinCodeContainerStyle: styles.otpContainerStyle,
              pinCodeTextStyle: styles.pinCodeText,
            }}
          />
          <Text
            style={[
              AppFontStyle.BOLD_15,
              {
                marginTop: 10,
                width: '100%',
                textAlign: 'right',
                textDecorationLine: 'underline',
              },
            ]}>
            Resend OTP
          </Text>
          <CommonButton
            pressHandler={() => {
              props.navigation.navigate('ResetPassword', {otp, email});
            }}
            buttonStyles={styles.button}
            title={'Next'}
          />
        </View>
      </ScrollView>
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
    backgroundColor: AppColors.orange,
    width: '100%',
    marginTop: 30,
  },
  otpContainerStyle: {
    width: '15%',
    borderColor: AppColors.primaryText,
    marginVertical: 10,
  },
  pinCodeText: {color: AppColors.primaryText},
});

export default ForgotPasswordOtp;
