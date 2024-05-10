/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import {AppFontStyle} from '../../styles/AppFontStyle';
import {AppColors} from '../../utility/AppColors';

const Comment = (props: any) => {
  return (
    <View
      style={{
        borderBottomColor: AppColors.lightGrey,
        borderBottomWidth: 1,
        borderTopColor: AppColors.lightGrey,
        width: '100%',
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 15,
          alignItems: 'center',
        }}>
        <View style={styles.profilePicture}>
          <Text
            style={[AppFontStyle.SEMI_BOLD_12, {color: AppColors.whiteColor}]}>
            {props.name}
          </Text>
        </View>
        <Text style={[AppFontStyle.MEDIUM_12, {marginRight: 50}]}>
          {props.comment}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    borderRadius: 100,
    backgroundColor: AppColors.secondaryThemeColor,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  separator: {
    width: '100%',
    borderBottomColor: AppColors.lightGrey,
    borderBottomWidth: 1,
  },
});

export default Comment;
