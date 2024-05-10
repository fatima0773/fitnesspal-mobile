/* eslint-disable react/react-in-jsx-scope */
import {Text} from '@rneui/base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppColors} from '../../utility/AppColors';
import {AppFontStyle} from '../../styles/AppFontStyle';

const CommonButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.buttonStyles]}
      onPress={props.pressHandler}>
      <Text
        style={[
          AppFontStyle.BOLD_20,
          {color: AppColors.white},
          props.titleStyles,
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.purple,
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 14,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CommonButton;
