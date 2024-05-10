/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import styleSheet from '../../../../utility/stylesheet';
import {AppColors} from '../../../../utility/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const FullProgress = () => {
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(38, 50, 56, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const steps = {
    data: [234 / 500],
  };
  const caloriesBurned = {
    data: [334 / 500],
  };
  const caloriesConsumed = {
    data: [434 / 500],
  };
  return (
    <View style={[styleSheet.rowContainer]}>
      <View style={{flex: 1}}>
        <View style={styles.progressContainer}>
          <View style={styleSheet.rowContainer}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {color: AppColors.accentText},
              ]}>
              Step Count
            </Text>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.green, AppColors.teal]}
              style={styles.gradientContainer}>
              <Ionicons name="footsteps" color={AppColors.white} size={16} />
            </LinearGradient>
          </View>
          <View style={styleSheet.container}>
            <ProgressChart
              data={steps}
              width={100}
              height={100}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
            />
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {color: AppColors.accentText, marginVertical: 10},
              ]}>
              Today's Target: 234 / 500
            </Text>
          </View>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_12,
              {color: AppColors.accentText, margin: 10},
              styles.edit,
            ]}>
            Edit Target <MaterialCommunityIcons name="pencil" size={12} />
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styleSheet.rowContainer}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {color: AppColors.accentText},
              ]}>
              Activity
            </Text>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.green, AppColors.teal]}
              style={styles.gradientContainer}>
              <MaterialCommunityIcons
                name="dumbbell"
                color={AppColors.white}
                size={18}
              />
            </LinearGradient>
          </View>
          <View style={styleSheet.container}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_18,
                {
                  color: AppColors.accentText,
                  marginVertical: 10,
                  width: '100%',
                },
              ]}>
              1h 2min
            </Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styleSheet.rowContainer}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {color: AppColors.accentText},
              ]}>
              Water Intake
            </Text>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.green, AppColors.teal]}
              style={styles.gradientContainer}>
              <Ionicons name="water-sharp" color={AppColors.white} size={18} />
            </LinearGradient>
          </View>
          <View style={styleSheet.container}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_18,
                {
                  color: AppColors.accentText,
                  marginVertical: 10,
                  width: '100%',
                },
              ]}>
              6/8 Cups
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.progressContainer}>
          <View style={styleSheet.rowContainer}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {color: AppColors.accentText},
              ]}>
              Calorie Count
            </Text>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.green, AppColors.teal]}
              style={styles.gradientContainer}>
              <MaterialIcons
                name="local-fire-department"
                color={AppColors.white}
                size={16}
              />
            </LinearGradient>
          </View>
          <View style={styleSheet.container}>
            <ProgressChart
              data={caloriesBurned}
              width={100}
              height={100}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
            />
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {color: AppColors.accentText, marginVertical: 10},
              ]}>
              Calories Burned: 334 / 500
            </Text>
          </View>

          <View style={styleSheet.container}>
            <ProgressChart
              data={caloriesConsumed}
              width={100}
              height={100}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
            />
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {
                  color: AppColors.accentText,
                  marginVertical: 10,
                  textAlign: 'center',
                },
              ]}>
              Calories Consumed: 434 / 500
            </Text>
          </View>
        </View>
      </View>
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
    padding: 10,
    flex: 1,
  },
  gradientContainer: {
    borderRadius: 100,
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    width: '100%',
    alignSelf: 'flex-end',
    textAlign: 'right',
    color: AppColors.teal,
    textDecorationLine: 'underline',
  },
});

export default FullProgress;
