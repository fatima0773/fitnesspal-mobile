/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {BarChart} from 'react-native-chart-kit';
const WeeklyActivity = () => {
  const chartConfig = {
    fillShadowGradientFrom: AppColors.accentText,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientTo: AppColors.accentText,
    fillShadowGradientToOpacity: 1,
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => AppColors.accentText,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    fillShadowGradient: AppColors.accentText,
    fillShadowGradientOpacity: 10,
    barColor: AppColors.accentColor,
    barRadius: 5,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    propsForLabels: {
      fontFamily: 'Montserrat-Regular',
    },
  };
  const data = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        data: [
          19 / 100,
          45 / 100,
          28 / 100,
          80 / 100,
          99 / 100,
          43 / 100,
          34 / 100,
        ],
      },
    ],
  };
  return (
    <View style={styles.progressContainer}>
      <View
        style={{
          // alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Text style={AppFontStyle.MEDIUM_14}>Calories</Text>
          <Text style={AppFontStyle.SEMI_BOLD_20}>Calories</Text>
        </View>

        <View>
          <Text style={AppFontStyle.MEDIUM_14}>Time</Text>
          <Text style={AppFontStyle.SEMI_BOLD_20}>1:03:30</Text>
        </View>
      </View>
      <BarChart
        showBarTops={false}
        style={{}}
        data={data}
        width={300}
        height={200}
        chartConfig={chartConfig}
        withInnerLines={true}
        verticalLabelRotation={0}
        segments={-1}
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
});

export default WeeklyActivity;
