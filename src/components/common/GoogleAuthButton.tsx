/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AppColors} from '../../utility/AppColors';
import {AppImages} from '../../utility/AppImages';
import {AppFontStyle} from '../../styles/AppFontStyle';

const GoogleAuthButton = (props: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.pressHandler}>
      <Image
        resizeMode="contain"
        source={AppImages.GOOGLE_ICON}
        style={styles.icon}
      />
      <Text style={[AppFontStyle.MEDIUM_15, {color: AppColors.black}]}>
        Sign Up With Google
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: AppColors.white,
    padding: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderWidth: 0.7,
    borderColor: AppColors.primaryText,
    borderRadius: 10,
    width: '100%',
  },
  icon: {
    height: 30,
    marginLeft: -10,
  },
});
export default GoogleAuthButton;
