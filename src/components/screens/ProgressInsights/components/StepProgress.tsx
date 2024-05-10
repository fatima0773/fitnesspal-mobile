/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {LineChart} from 'react-native-chart-kit';
import {FULL_WIDTH} from '../../../../utility/Constant';

const StepProgress = () => {
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(38, 50, 56, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    propsForLabels: {
      fontFamily: 'Montserrat-Regular',
    },
  };
  const data = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Sn'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 49],
        color: (opacity = 1) => AppColors.teal,
        strokeWidth: 3,
      },
    ],
  };
  return (
    <View style={[styles.shadowContainer]}>
      <Text
        style={[
          AppFontStyle.BOLD_15,
          {
            color: AppColors.teal,
            marginTop: 20,
            marginHorizontal: 20,
          },
        ]}>
        Today you walked
      </Text>
      <Text
        style={[
          AppFontStyle.SEMI_BOLD_28,
          {
            marginVertical: 5,
            marginHorizontal: 20,
            color: AppColors.accentText,
          },
        ]}>
        3445/5000
      </Text>
      <Text
        style={[
          AppFontStyle.BOLD_15,
          {
            color: AppColors.teal,
            marginHorizontal: 20,
            marginBottom: 10,
          },
        ]}>
        steps
      </Text>
      <View style={styles.graphContainer}>
        <LineChart
          data={data}
          width={FULL_WIDTH - 70}
          height={225}
          verticalLabelRotation={0}
          chartConfig={chartConfig}
          bezier
          segments={-1}
        />
        <View
          style={{
            backgroundColor: AppColors.white,
            padding: 15,
            width: '100%',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: AppColors.teal,
              padding: 12,
              borderRadius: 10,
            }}>
            <Text style={[AppFontStyle.BOLD_12, {color: AppColors.white}]}>
              Feb
            </Text>
            <Text style={[AppFontStyle.BOLD_15, {color: AppColors.white}]}>
              05
            </Text>
          </View>
          <View style={{marginTop: 10, marginHorizontal: 20}}>
            <Text
              style={[AppFontStyle.BOLD_15, {color: AppColors.secondaryText}]}>
              Most Steps
            </Text>
            <Text style={[AppFontStyle.BOLD_18]}>Friday</Text>
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
              flex: 1,
            }}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_24,
                {textAlign: 'right', marginBottom: 10},
              ]}>
              6,782
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.transparentBlack07,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    marginTop: 15,
    flex: 1,
    width: '100%',
    marginVertical: 30,
  },
  graphContainer: {
    backgroundColor: AppColors.lightTeal,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
});

export default StepProgress;
