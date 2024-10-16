/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, View} from 'react-native';
import {AppImages} from '../../../../utility/AppImages';
import {Text} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import GradientButton from '../../../common/GradientButton';

const ProfileHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={AppImages.USER}
        style={styles.profilePicture}
        resizeMode="contain"
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={AppFontStyle.SEMI_BOLD_18}>Fatima Tuzzahra</Text>
        <Text
          style={[
            AppFontStyle.MEDIUM_12,
            {color: AppColors.secondaryText, marginVertical: 8},
          ]}>
          fatima.z0773@gmail.com
        </Text>
      </View>

      <GradientButton
        pressHandler={props.pressHandler}
        buttonStyle={styles.button}
        title="Reset Password"
        titleStyles={[AppFontStyle.SEMI_BOLD_13, {color: AppColors.white}]}
        gradientContainerStyles={{padding: 5}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  logout: {
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    padding: 0,
  },
});

export default ProfileHeader;
