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
import GoogleAuthButton from '../../common/GoogleAuthButton';
import {InputField} from '../../common/InputField';
import {AppColors} from '../../../utility/AppColors';
import {useState} from 'react';
import OrSeparator from '../../common/OrSeparator';
import styleSheet from '../../../utility/stylesheet';
import CommonButton from '../../common/CommonButton';
import {signIn} from '../../../services/auth.services';
import {FULL_WIDTH} from '../../../utility/Constant';

const SignIn = (props: any) => {
  const [email, setEmail] = useState('fatima.z0774@gmail.com');
  const [password, setPassword] = useState('Test@123');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Please fill all the required fields',
  );
  const [success, setSuccess] = useState(false);
  const handleSignIn = async () => {
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
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: FULL_WIDTH, paddingHorizontal: 10}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styleSheet.container}>
          <LogoHeader />
          <Image
            source={AppImages.DRINKING}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_20,
              {textAlign: 'center', marginVertical: 10},
            ]}>
            Welcome Back
          </Text>

          <Text
            style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
            Email
          </Text>
          <InputField
            placeholder="Enter email"
            text={email}
            onChangeText={setEmail}
          />
          <Text
            style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
            Password
          </Text>

          <InputField
            secureTextEntry
            placeholder="Confirm password"
            text={password}
            onChangeText={setPassword}
          />
          <Text
            onPress={() => props.navigation.navigate('ForgotPassword')}
            style={[
              AppFontStyle.REGULAR_15,
              {
                marginTop: 10,
                width: '100%',
                textAlign: 'right',
                textDecorationLine: 'underline',
              },
            ]}>
            Forgot Password?
          </Text>

          <OrSeparator />
          <GoogleAuthButton />
          {showError && (
            <View
              style={{
                backgroundColor: AppColors.errorMsgBgc,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                padding: 10,
                marginVertical: 10,
                width: '100%',
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
              handleSignIn();
            }}
            buttonStyles={styles.button}
            title={'Sign In'}
          />
          <Text
            style={[
              AppFontStyle.REGULAR_14,
              {textAlign: 'center', marginVertical: 20},
            ]}>
            Don't have an account?{' '}
            <Text
              style={AppFontStyle.BOLD_14}
              onPress={() => props.navigation.navigate('SignUp')}>
              Sign Up
            </Text>
          </Text>
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
    backgroundColor: AppColors.purple,
    width: '100%',
    marginTop: 10,
  },
});

export default SignIn;
