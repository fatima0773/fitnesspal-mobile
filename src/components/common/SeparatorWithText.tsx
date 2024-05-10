/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../utility/AppColors';
import {AppFontStyle} from '../../styles/AppFontStyle';

const SeparatorWithText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Text
        style={[
          AppFontStyle.BOLD_15,
          {color: AppColors.whiteColor, paddingHorizontal: 5},
        ]}>
        OR
      </Text>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    padding: 5,
  },
  separator: {
    borderBottomColor: AppColors.whiteColor,
    borderBottomWidth: 2,
    flex: 1,
  },
});

export default SeparatorWithText;
