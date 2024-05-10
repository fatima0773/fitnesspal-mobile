/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {AppImages} from '../../../../utility/AppImages';
const TodaysMeals = () => {
  return (
    <View style={styles.progressContainer}>
      <View
        style={{
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Text style={AppFontStyle.MEDIUM_16}>Next Up</Text>
        </View>
        <View>
          <Text
            style={[
              AppFontStyle.MEDIUM_14,
              {marginTop: 20, marginBottom: 5, color: AppColors.lightGrey},
            ]}>
            Lunch
          </Text>
          <Text style={AppFontStyle.SEMI_BOLD_20}>Club Sandwich</Text>
        </View>
      </View>
      <Image
        source={AppImages.COOKING}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
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
  },
});

export default TodaysMeals;
