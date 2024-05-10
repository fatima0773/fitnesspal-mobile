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
import {sendOtp} from '../../../services/auth.services';
import {FULL_WIDTH} from '../../../utility/Constant';

const SignUp = (props: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Please fill all the required fields',
  );
  const isValidEmail = (email: string) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState(false);
  const handleSendOtp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setShowError(true);
      setErrorMessage('Please fill all the required fields');
    } else if (!isValidEmail(email)) {
      setShowError(true);
      setErrorMessage('Please enter a valid email address');
    } else if (!isValidPassword(password)) {
      setShowError(true);
      setErrorMessage(
        'Password must be at least 8 characters, have one uppercase and lowercase letter, one special character, and one digit',
      );
    } else if (password !== confirmPassword) {
      setShowError(true);
      setErrorMessage('New Password and Confirm Password should match');
    } else {
      try {
        // Send a request to send OTP
        const response = await sendOtp({email: email.toLowerCase()});

        // Extract message and status from the response
        const message = response.data.message;
        const status = response.status;

        if (status === 200) {
          // If sending OTP is successful
          setShowError(false);
          setSuccess(false);
          props.navigation.navigate('AccountVerification', {
            email: email.toLowerCase(),
            password,
            name,
          });
        } else {
          // If sending OTP is not successful
          setSuccess(false);
          setShowError(true);
          setErrorMessage(message);
        }
      } catch (error: any) {
        setShowError(true);
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const isValidPassword = (password: string) => {
    // Regular expressions for password validation
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const digitRegex = /[0-9]/;

    return (
      lengthRegex.test(password) &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      specialCharRegex.test(password) &&
      digitRegex.test(password)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: FULL_WIDTH, paddingHorizontal: 20}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styleSheet.container}>
          <LogoHeader />
          <Image
            source={AppImages.RUNNING}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_20,
              {textAlign: 'center', marginVertical: 10},
            ]}>
            Let’s Get You Signed Up
          </Text>
          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {
                marginTop: 10,
                width: '100%',
              },
            ]}>
            Name
          </Text>
          <InputField
            placeholder="Enter name"
            text={name}
            onChangeText={setName}
          />
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
            placeholder="Enter password"
            text={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Text
            style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
            Confirm Password
          </Text>
          <InputField
            placeholder="Confirm password"
            text={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
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
            pressHandler={() => handleSendOtp()}
            buttonStyles={styles.button}
            title={'Sign Up'}
          />
          <Text
            style={[
              AppFontStyle.REGULAR_14,
              {textAlign: 'center', marginVertical: 20},
            ]}>
            Already have an account?{' '}
            <Text
              style={AppFontStyle.BOLD_14}
              onPress={() => props.navigation.navigate('SignIn')}>
              Sign In{' '}
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
    marginTop: 30,
  },
});

export default SignUp;
