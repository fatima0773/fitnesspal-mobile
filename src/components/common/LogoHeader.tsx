/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet} from 'react-native';
import {AppImages} from '../../utility/AppImages';

const LogoHeader = () => {
  return (
    <Image source={AppImages.LOGO} style={styles.logo} resizeMode="contain" />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 270,
    height: 87,
  },
});
export default LogoHeader;
