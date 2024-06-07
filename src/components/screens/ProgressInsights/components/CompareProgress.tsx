/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {LogBox, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import React, {useEffect, useState} from 'react';
import styleSheet from '../../../../utility/stylesheet';
import storage from '../../../../utility/Storage';
import axios from 'axios';

const CompareProgress = () => {
  const [date, setDate] = useState<DateType | undefined>();
  const [userId, setUserId] = useState('');
  const [range, setRange] = React.useState<{
    startDate: DateType;
    endDate: DateType;
  }>({startDate: undefined, endDate: undefined});

  const [timePicker, setTimePicker] = useState(false);
  const [compareProgress, setCompareProgress] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startComparison, setStartComparison] = useState<any>();
  const [endComparison, setEndComparison] = useState<any>();

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
  };

  const formatDate = (d: any) => {
    const dateObj = new Date(d);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);
    return formattedDate;
  };

  const getComparison = async (start: string, end: string) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile/get-comparison/${userId}/${start}/${end}`,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setStartComparison(response.data.startDate);
      setEndComparison(response.data.endDate);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[styles.shadowContainer]}>
      <View style={styleSheet.rowContainer}>
        <View>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {
                marginVertical: 10,
                color: AppColors.accentText,
              },
            ]}>
            Compare Progress
          </Text>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_12,
              {
                color: AppColors.secondaryText,
                marginBottom: 20,
              },
            ]}>
            Track your journey over time and identify areas for improvement.
          </Text>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'flex-start', marginTop: 10}}
          onPress={() => {
            setCompareProgress(!compareProgress);
          }}>
          <Ionicons
            name={
              compareProgress ? 'chevron-up-outline' : 'chevron-down-outline'
            }
            size={30}
            color={AppColors.accentText}
          />
        </TouchableOpacity>
      </View>
      {compareProgress && (
        <>
          <DateTimePicker
            mode={'range'}
            date={date}
            startDate={range.startDate}
            endDate={range.endDate}
            firstDayOfWeek={1}
            displayFullDays
            timePicker={timePicker}
            onChange={params => {
              setRange(params);
              console.log(params);
              const start = formatDate(params.startDate);
              const end = formatDate(params.endDate);
              setStartDate(start);
              setEndDate(end);
              console.log(end, start);
              getComparison(start, end);
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
          {startDate && endDate && startComparison && endComparison && (
            <>
              {/* <Text
                style={[
                  AppFontStyle.SEMI_BOLD_15,
                  {
                    marginVertical: 10,
                    color: AppColors.accentText,
                  },
                ]}>
                You walked <Text style={{color: AppColors.teal}}>234</Text> more
                steps on 8th Feb
              </Text>
              <View style={styleSheet.rowContainer}>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  4568/5000
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
                  {endDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  4200/5000
                </Text>
              </View> */}

              {/* WATER INTAKE */}
              <View style={styles.separator} />

              {startComparison.waterIntakeHistory.waterIntake >
              endComparison.waterIntakeHistory.waterIntake ? (
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_15,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  You had{' '}
                  <Text style={{color: AppColors.teal}}>
                    {startComparison.waterIntakeHistory.waterIntake} more
                    glasses
                  </Text>{' '}
                  of water on {startDate}
                </Text>
              ) : (
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_15,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  You had{' '}
                  <Text style={{color: AppColors.teal}}>
                    {endComparison.waterIntakeHistory.waterIntake} more glasses
                  </Text>{' '}
                  of water on {endDate}
                </Text>
              )}

              <View style={styleSheet.rowContainer}>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startComparison &&
                    startComparison.waterIntakeHistory.waterIntake}
                  /8 Cups
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
                  {endDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {endComparison &&
                    endComparison.waterIntakeHistory.waterIntake}
                  /8 Cups
                </Text>
              </View>

              {/* CALORIES CONSUMED */}
              <View style={styles.separator} />
              {startComparison.waterIntakeHistory.waterIntake >
              endComparison.waterIntakeHistory.waterIntake ? (
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_15,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  You consumed{' '}
                  <Text style={{color: AppColors.teal}}>
                    {startComparison.calorieHistory.caloriesConsumed.toFixed(0)}{' '}
                    more calories
                  </Text>{' '}
                  on {startDate}
                </Text>
              ) : (
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_15,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  You consumed{' '}
                  <Text style={{color: AppColors.teal}}>
                    {endComparison.calorieHistory.caloriesConsumed.toFixed(0)}{' '}
                    more calories
                  </Text>{' '}
                  on {endDate}
                </Text>
              )}

              <View style={styleSheet.rowContainer}>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startComparison.calorieHistory.caloriesConsumed} kcal
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
                  {endDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {endComparison.calorieHistory.caloriesConsumed.toFixed(2)}{' '}
                  kcal
                </Text>
              </View>

              {/* PROTEINS */}
              <View style={styles.separator} />
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_15,
                  {
                    marginVertical: 10,
                    color: AppColors.accentText,
                  },
                ]}>
                Proteins
              </Text>
              <View style={styleSheet.rowContainer}>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startComparison.nutrientHistory.protein.toFixed(2)} g
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
                  {endDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {endComparison.nutrientHistory.protein.toFixed(2)} g
                </Text>
              </View>

              {/* CARBOHYDRATES */}
              <View style={styles.separator} />
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_15,
                  {
                    marginVertical: 10,
                    color: AppColors.accentText,
                  },
                ]}>
                Carbohydrates
              </Text>
              <View style={styleSheet.rowContainer}>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startComparison.nutrientHistory.carbs.toFixed(2)} g
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
                  {endDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {endComparison.nutrientHistory.carbs.toFixed(2)} g
                </Text>
              </View>

              {/* Fats */}
              <View style={styles.separator} />
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_15,
                  {
                    marginVertical: 10,
                    color: AppColors.accentText,
                  },
                ]}>
                Fats
              </Text>

              <View style={styleSheet.rowContainer}>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {startComparison.nutrientHistory.fats.toFixed(2)} g
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
                  {endDate}
                </Text>
                <Text
                  style={[
                    AppFontStyle.BOLD_12,
                    {
                      marginVertical: 10,
                      color: AppColors.accentText,
                    },
                  ]}>
                  {endComparison.nutrientHistory.fats.toFixed(2)} g
                </Text>
              </View>
            </>
          )}
          <View style={styles.separator} />
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
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGrey,
    marginVertical: 10,
  },
});

export default CompareProgress;
