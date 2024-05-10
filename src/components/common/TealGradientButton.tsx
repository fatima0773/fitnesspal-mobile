/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../utility/AppColors';
import {AppFontStyle} from '../../styles/AppFontStyle';

const TealGradientButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.buttonStyle]}
      onPress={props.pressHandler}>
      <LinearGradient
        start={{x: 0.1, y: 0.25}}
        end={{x: 0.9, y: 1.0}}
        colors={[AppColors.green, AppColors.teal]}
        style={[styles.gradientButtonContainer, props.gradientContainerStyles]}>
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_24,
            {color: AppColors.white},
            props.titleStyles,
          ]}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  gradientButtonContainer: {
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  logo: {
    width: '40%',
  },
  loaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TealGradientButton;
