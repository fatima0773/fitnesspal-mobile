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

const CompareProgress = () => {
  const [date, setDate] = useState<DateType | undefined>();
  const [range, setRange] = React.useState<{
    startDate: DateType;
    endDate: DateType;
  }>({startDate: undefined, endDate: undefined});

  const [timePicker, setTimePicker] = useState(false);
  const [compareProgress, setCompareProgress] = useState(false);
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
            mode={'multiple'}
            date={date}
            startDate={range.startDate}
            endDate={range.endDate}
            firstDayOfWeek={1}
            displayFullDays
            timePicker={timePicker}
            onChange={params => {
              setRange(params);
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
          <Text
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
              8th Feb
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
              17th Feb
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
          </View>

          {/* WATER INTAKE */}
          <View style={styles.separator} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {
                marginVertical: 10,
                color: AppColors.accentText,
              },
            ]}>
            You had <Text style={{color: AppColors.teal}}>4 more glasses</Text>{' '}
            of water on 17th Feb
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
              8th Feb
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              8/8 Cups
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
              17th Feb
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              4/8 Cups
            </Text>
          </View>

          {/* CALORIES BURNED */}
          <View style={styles.separator} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {
                marginVertical: 10,
                color: AppColors.accentText,
              },
            ]}>
            You burned{' '}
            <Text style={{color: AppColors.teal}}>478 more calories</Text> on
            17th Feb
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
              8th Feb
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              3344 kcal
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
              17th Feb
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              3244 kcal
            </Text>
          </View>

          {/* CALORIES CONSUMED */}
          <View style={styles.separator} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {
                marginVertical: 10,
                color: AppColors.accentText,
              },
            ]}>
            You consumed{' '}
            <Text style={{color: AppColors.teal}}>478 more calories</Text> on
            17th Feb
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
              8th Feb
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              3344 kcal
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
              17th Feb
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_12,
                {
                  marginVertical: 10,
                  color: AppColors.accentText,
                },
              ]}>
              3244 kcal
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
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGrey,
    marginVertical: 10,
  },
});

export default CompareProgress;
