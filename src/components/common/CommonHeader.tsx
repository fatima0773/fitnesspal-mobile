/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppFontStyle} from '../../styles/AppFontStyle';
import {AppColors} from '../../utility/AppColors';
const CommonHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <Entypo
        name="chevron-left"
        style={styles.icon}
        size={28}
        color={AppColors.accentText}
      />
      <Text style={[AppFontStyle.SEMI_BOLD_28, {color: AppColors.accentText}]}>
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
    width: '100%',
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
});

export default CommonHeader;
