/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import {AppFontStyle} from '../../styles/AppFontStyle';
import {AppColors} from '../../utility/AppColors';

const OrSeparator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Text style={[AppFontStyle.REGULAR_14, {marginHorizontal: 10}]}>or</Text>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: AppColors.primaryText,
    height: 0,
  },
});

export default OrSeparator;
