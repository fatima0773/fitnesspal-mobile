/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {LogBox, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {LineChart} from 'react-native-chart-kit';
import {FULL_WIDTH} from '../../../../utility/Constant';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import React, {useEffect, useState} from 'react';
import styleSheet from '../../../../utility/stylesheet';
import storage from '../../../../utility/Storage';
import axios from 'axios';

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
    color: (opacity = 1) => AppColors.teal,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    propsForLabels: {
      fontFamily: 'Montserrat-Regular',
    },
  };
  const [caloriesConsumed, setCaloriesConsumed] = useState<any>({
    labels: ['01', '02', '03', '04', '05', '06', '07'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 49],
        color: (opacity = 1) => AppColors.teal,
        strokeWidth: 3,
      },
    ],
  });
  const [userId, setUserId] = useState('');
  const [todaysCalories, setTodaysCalories] = useState<any>();
  const [calorieByDate, setCaloriesByDate] = useState<any>();

  const [waterIntake, setWaterIntake] = useState<any>();
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    fetchUserId();
  }, [userId]);

  const fetchUserId = async () => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    setUserId(auth.userId);
    getTodayCalories();
    getCalorieHistoryForSevenDays();
  };

  const formatDate = (d: any) => {
    const dateObj = new Date(d);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const getCalorieHistoryForSevenDays = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile/get-calories-past-seven-days/${userId}`,
      headers: {},
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        const caloriedData = response.data.map((entry: any) =>
          Number(entry.caloriesConsumed),
        );
        const chartData = {
          labels: ['01', '02', '03', '04', '05', '06', '07'],
          datasets: [
            {
              data: caloriedData,
            },
          ],
        };
        setCaloriesConsumed(chartData);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  const getTodayCalories = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile/get-daily-calories-consumed/${userId}`,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      if (response.data.caloriesConsumed == 0) {
        setTodaysCalories('0');
      } else {
        setTodaysCalories(response.data.caloriesConsumed);
      }
      console.log(JSON.stringify(response.data));
    } catch (error) {
      // console.log('--> ', error);
    }
  };

  const getCaloriesByDate = async (date: string) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile//get-calories-for-date/${userId}/${date}`,
      headers: {},
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        setCaloriesByDate(response.data.caloriesConsumed);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
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
        {todaysCalories && (
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
            <Text style={AppFontStyle.SEMI_BOLD_15}>
              {/* {todaysCalories.toFixed(2)} kcal */}
            </Text>
          </View>
        )}
      </View>
      <LineChart
        data={caloriesConsumed}
        width={FULL_WIDTH - 70}
        height={225}
        verticalLabelRotation={0}
        chartConfig={chartConfig}
        bezier
        segments={-1}
      />
      <View style={[styles.separator, {marginBottom: 30}]} />

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
              let d = formatDate(params.date);
              getCaloriesByDate(d);
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
              {calorieByDate && calorieByDate.toFixed(2)} kcal
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
