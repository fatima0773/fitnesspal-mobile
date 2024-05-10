/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {LineChart} from 'react-native-chart-kit';
import {FULL_WIDTH} from '../../../../utility/Constant';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import React, {useState} from 'react';
import styleSheet from '../../../../utility/stylesheet';

const WaterIntakeProgress = () => {
  const [selectedDate, setSelectedDate] = React.useState<{
    date: DateType;
  }>({date: undefined});

  const [timePicker, setTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  return (
    <View style={[styles.shadowContainer]}>
      <View style={styleSheet.rowContainer}>
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
            <Ionicons name="water-sharp" color={AppColors.white} size={18} />
          </LinearGradient>
          <View style={{marginHorizontal: 15}}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {
                  color: AppColors.secondaryText,
                },
              ]}>
              Today’s Water Intake
            </Text>
            <Text style={AppFontStyle.SEMI_BOLD_15}>6/8 Cups</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setShowCalendar(!showCalendar);
          }}>
          <Text
            style={[
              AppFontStyle.BOLD_14,
              {
                marginVertical: 10,
                color: AppColors.accentText,
              },
            ]}>
            {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
          </Text>
        </TouchableOpacity>
      </View>
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
          {/* STEPS */}
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
              Total Water Intake
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              5/8 Cups
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

export default WaterIntakeProgress;
