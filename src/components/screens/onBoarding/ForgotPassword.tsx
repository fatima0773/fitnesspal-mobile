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
import {InputField} from '../../common/InputField';
import {sendResetPassOtp} from '../../../services/auth.services';
import {FULL_WIDTH} from '../../../utility/Constant';

const ForgotPassword = (props: any) => {
  const [email, setEmail] = useState('fatima.z0773@gmail.com');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Please fill all the required fields',
  );
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async () => {
    try {
      // Send a request to send Reset Password OTP
      const response = sendResetPassOtp({email: email.toLowerCase()});

      // Extract message and status from the response
      const message = (await response).data.message;
      const status = (await response).status;

      if (status === 200) {
        // If sending OTP is successful
        setShowError(false);
        props.navigation.navigate('ForgotPasswordOtp', {email});
      } else {
        // If sending OTP is not successful
        setShowError(true);
        setErrorMessage(message);
      }
    } catch (error: any) {
      // Handle errors and set error-related state
      setSuccess(false);
      setShowError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: FULL_WIDTH, padding: 10}}
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
              {marginVertical: 5, width: '100%'},
            ]}>
            Email
          </Text>
          <InputField
            placeholder="Enter email"
            text={email}
            onChangeText={setEmail}
          />

          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {
                marginTop: 20,
                width: '100%',
              },
            ]}>
            An OTP will be shared with you on your email
          </Text>

          {showError && (
            <View
              style={{
                backgroundColor: AppColors.errorMsgBgc,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                padding: 10,
                marginVertical: 10,
              }}>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.errorMsgText,
                    textAlign: 'center',
                  },
                ]}>
                {errorMessage}
              </Text>
            </View>
          )}

          <CommonButton
            pressHandler={() => handleSendOtp()}
            buttonStyles={styles.button}
            title={'Send OTP'}
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
    marginTop: 15,
  },
  otpContainerStyle: {
    width: '18%',
    borderColor: AppColors.primaryText,
    marginVertical: 10,
  },
  pinCodeText: {color: AppColors.primaryText},
});

export default ForgotPassword;
