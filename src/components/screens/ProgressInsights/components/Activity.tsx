/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {FULL_WIDTH} from '../../../../utility/Constant';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import React, {useState} from 'react';
import styleSheet from '../../../../utility/stylesheet';

const Activity = () => {
  const [selectedDate, setSelectedDate] = React.useState<{
    date: DateType;
  }>({date: undefined});

  const [timePicker, setTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
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
    <View style={[styles.shadowContainer]}>
      {/* <View style={styleSheet.rowContainer}> */}
      <View
        style={{
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Text style={[AppFontStyle.MEDIUM_14, {marginVertical: 10}]}>
            Calories
          </Text>
          <Text style={AppFontStyle.SEMI_BOLD_20}>Calories</Text>
        </View>

        <View>
          <Text style={[AppFontStyle.MEDIUM_14, {marginVertical: 10}]}>
            Time
          </Text>
          <Text style={AppFontStyle.SEMI_BOLD_20}>1:03:30</Text>
        </View>
      </View>
      <BarChart
        showBarTops={false}
        style={{}}
        data={data}
        width={350}
        height={200}
        chartConfig={chartConfig}
        withInnerLines={true}
        verticalLabelRotation={0}
        segments={-1}
      />
      {/* </View> */}

      <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
        }}
        onPress={() => {
          setShowCalendar(!showCalendar);
        }}>
        <Text
          style={[
            AppFontStyle.BOLD_14,
            {
              marginVertical: 10,
              textDecorationLine: 'underline',
              color: AppColors.accentText,
            },
          ]}>
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </Text>
      </TouchableOpacity>
      {showCalendar && (
        <>
          <DateTimePicker
            mode={'single'}
            date={selectedDate.date}
            firstDayOfWeek={1}
            displayFullDays
            timePicker={timePicker}
            onChange={params => {
              setSelectedDate(params);
            }}
            headerButtonColor={AppColors.teal}
            selectedItemColor={AppColors.teal}
            selectedTextStyle={{
              fontWeight: 'bold',
              color: AppColors.white,
            }}
            todayContainerStyle={{
              borderWidth: 1,
            }}
          />
          <View style={styles.separator} />

          <View style={styleSheet.rowContainer}>
            <Text
              style={[
                AppFontStyle.MEDIUM_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              Calories Burned
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              348 kcal
            </Text>
          </View>

          <View style={styleSheet.rowContainer}>
            <Text
              style={[
                AppFontStyle.MEDIUM_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              Time Spent
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              1:45:00
            </Text>
          </View>
        </>
      )}
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
    padding: 20,
  },
  graphContainer: {
    backgroundColor: AppColors.lightTeal,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  gradientContainer: {
    borderRadius: 100,
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGrey,
    marginVertical: 10,
  },
});

export default Activity;
