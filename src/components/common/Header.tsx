/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppImages} from '../../utility/AppImages';
import {AppFontStyle} from '../../styles/AppFontStyle';
import {AppColors} from '../../utility/AppColors';

const Header = (props: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={AppImages.APP_ICON}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        style={[
          AppFontStyle.BOLD_22,
          {
            marginVertical: 10,
            color: AppColors.appThemeColor,
            textAlign: 'center',
          },
        ]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 90,
  },
});

export default Header;
