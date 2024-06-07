/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, View} from 'react-native';
import {AppImages} from '../../../../utility/AppImages';
import {Text} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import GradientButton from '../../../common/GradientButton';

const MenuPageHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={AppImages.USER}
        style={styles.profilePicture}
        resizeMode="contain"
      />
      <View style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
        <Text style={AppFontStyle.SEMI_BOLD_18}>{props.name}</Text>
        <Text
          style={[
            AppFontStyle.MEDIUM_12,
            {color: AppColors.secondaryText, marginVertical: 8},
          ]}>
          {props.email}
        </Text>
      </View>

      <GradientButton
        pressHandler={props.pressHandler}
        buttonStyle={styles.button}
        title="Edit"
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
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
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
    margin: 0,
    padding: 0,
  },
});

export default MenuPageHeader;
