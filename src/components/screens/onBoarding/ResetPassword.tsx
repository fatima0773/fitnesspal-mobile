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
import {RouteProp, useRoute} from '@react-navigation/native';
import {resetPassword, signIn} from '../../../services/auth.services';
import axios from 'axios';

interface RouteParams {
  otp: string;
  email: string;
}

const ResetPassword = (props: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Please fill all the required fields',
  );
  const [success, setSuccess] = useState(false);
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {otp, email} = route.params;

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setShowError(true);
      setErrorMessage('New Password and Confirm Password should match');
    } else {
      setShowError(false);
      try {
        // Send a request to reset the user's password
        const response = resetPassword({
          email: email,
          newPassword: password,
          otp: otp,
        });
        // Extract message and status from the response
        const message = (await response).data.message;
        const status = (await response).status;

        if (status === 200) {
          // If password reset is successful
          setShowError(false);
          setSuccess(true);
          try {
            // Send a request to sign the user in
            const response = await signIn({email: email, password: password});
            if (response) {
              const message = response.data.message;
              const status = response.status;

              if (status === 200) {
                // If sign in is successful
                console.log(message);
                console.log(status);
                setShowError(false);
                props.navigation.navigate('Tab', {screen: 'Home'});
              } else {
                // If sign in is not successful
                setSuccess(false);
                setShowError(true);
                setErrorMessage(message);
              }
            }
            // Extract message and status from the response
          } catch (error: any) {
            // Handle errors and set error-related state
            setSuccess(false);
            setShowError(true);
            setErrorMessage(error.response.data.message);
          }
        } else {
          // If password reset is not successful
          setShowError(true);
          setErrorMessage(message);
        }
      } catch (error: any) {
        // Handle errors and set error-related state
        setSuccess(false);
        setShowError(true);
        setErrorMessage(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };

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
              {marginVertical: 5, width: '100%'},
            ]}>
            New Password
          </Text>
          <InputField
            placeholder="Enter new password"
            text={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {marginVertical: 5, width: '100%'},
            ]}>
            Confirm New Password
          </Text>
          <InputField
            placeholder="Confirm password"
            text={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

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
            pressHandler={() => {
              // props.navigation.navigate('Tab');
              handleResetPassword();
            }}
            buttonStyles={styles.button}
            title={'Reset Password '}
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
    marginTop: 35,
  },
  otpContainerStyle: {
    width: '18%',
    borderColor: AppColors.primaryText,
    marginVertical: 10,
  },
  pinCodeText: {color: AppColors.primaryText},
});

export default ResetPassword;
