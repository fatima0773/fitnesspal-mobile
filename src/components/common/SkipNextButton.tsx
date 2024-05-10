/* eslint-disable react/react-in-jsx-scope */
import {Text} from 'react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../../utility/AppColors';
import {AppFontStyle} from '../../styles/AppFontStyle';

const SkipNextButton = (props: any) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={props.skipButtonHandler}>
        <Text style={[AppFontStyle.SEMI_BOLD_20, {color: AppColors.black}]}>
          Skip
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={props.nextButtonHandler}>
        <Text style={[AppFontStyle.SEMI_BOLD_20, {color: AppColors.white}]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexDirection: 'row',
    width: '100%',
  },
  nextButton: {
    backgroundColor: AppColors.black,
    flex: 1,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: AppColors.white,
    flex: 1,
    borderTopStartRadius: 18,
    borderBottomLeftRadius: 18,
    padding: 15,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppColors.black,
  },
});

export default SkipNextButton;
