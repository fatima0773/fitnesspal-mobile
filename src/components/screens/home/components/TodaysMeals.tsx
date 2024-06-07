/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {AppImages} from '../../../../utility/AppImages';
const TodaysMeals = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.progressContainer}
      onPress={props.pressHandler}>
      <View
        style={{
          justifyContent: 'space-evenly',
          flex: 1,
        }}>
        <View>
          <Text
            style={[AppFontStyle.MEDIUM_14, {color: AppColors.primaryText}]}>
            Plan Smart, Eat Healthy:
          </Text>
        </View>
        <View>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {color: AppColors.teal, marginTop: 10},
            ]}>
            Your Personal Meal Planner for a Balanced Life
          </Text>
        </View>
      </View>
      <Image
        source={AppImages.COOKING}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.transparentBlack07,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    marginTop: 15,
    marginEnd: 10,
    padding: 15,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 90,
    marginLeft: 10,
  },
});

export default TodaysMeals;
