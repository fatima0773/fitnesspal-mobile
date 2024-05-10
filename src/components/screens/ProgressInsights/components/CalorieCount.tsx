/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {LineChart} from 'react-native-chart-kit';
import {FULL_WIDTH} from '../../../../utility/Constant';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import React, {useState} from 'react';
import styleSheet from '../../../../utility/stylesheet';

const CalorieCount = () => {
  const [selectedDate, setSelectedDate] = React.useState<{
    date: DateType;
  }>({date: undefined});

  const [timePicker, setTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
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
  const caloriesBurned = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Sn'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 49],
        color: (opacity = 1) => AppColors.teal,
        strokeWidth: 3,
      },
    ],
  };
  const caloriesConsumed = {
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
      {/* CALORIES CONSUMED */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <LinearGradient
          start={{x: 0.1, y: 0.25}}
          end={{x: 0.9, y: 1.0}}
          colors={[AppColors.green, AppColors.teal]}
          style={styles.gradientContainer}>
          <MaterialIcons
            name="local-fire-department"
            color={AppColors.white}
            size={18}
          />
        </LinearGradient>
        <View style={{marginHorizontal: 15}}>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_12,
              {
                color: AppColors.secondaryText,
              },
            ]}>
            Today’s Consumed Calories
          </Text>
          <Text style={AppFontStyle.SEMI_BOLD_15}>4578 kcal</Text>
        </View>
      </View>
      <LineChart
        data={caloriesBurned}
        width={FULL_WIDTH - 70}
        height={225}
        verticalLabelRotation={0}
        chartConfig={chartConfig}
        bezier
        segments={-1}
      />
      <View style={[styles.separator, {marginBottom: 30}]} />

      {/* CALORIES BURNED */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <LinearGradient
          start={{x: 0.1, y: 0.25}}
          end={{x: 0.9, y: 1.0}}
          colors={[AppColors.green, AppColors.teal]}
          style={styles.gradientContainer}>
          <MaterialIcons
            name="local-fire-department"
            color={AppColors.white}
            size={18}
          />
        </LinearGradient>

        <View style={{marginHorizontal: 15}}>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_12,
              {
                color: AppColors.secondaryText,
              },
            ]}>
            Today’s Burned Calories
          </Text>
          <Text style={AppFontStyle.SEMI_BOLD_15}>4578 kcal</Text>
        </View>
      </View>
      <LineChart
        data={caloriesBurned}
        width={FULL_WIDTH - 70}
        height={225}
        verticalLabelRotation={0}
        chartConfig={chartConfig}
        bezier
        segments={-1}
      />

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
              Total Calories Consumed
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              3482 kcal
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
              Total Calories Burned
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              4000 kcal
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

export default CalorieCount;
