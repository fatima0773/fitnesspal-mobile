/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {LogBox, StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../../../utility/AppColors';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {BarChart} from 'react-native-chart-kit';
import {useEffect, useState} from 'react';
import storage from '../../../../utility/Storage';
import axios from 'axios';
const WeeklyActivity = (props: any) => {
  const [userId, setUserId] = useState('');
  const [weeklyWaterIntake, setWeeklyWaterIntake] = useState(0);
  const [weeklyCalories, setWeeklyCalories] = useState(0);

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

  useEffect(() => {
    getWeeklyWaterIntake();
    getWeeklyCaloriesConsumed();
  }, [userId, weeklyWaterIntake, weeklyCalories]);

  const getWeeklyWaterIntake = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile/get-daily-water-intake/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setWeeklyWaterIntake(response.data.data.waterIntake);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  const getWeeklyCaloriesConsumed = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile/get-weekly-calories-consumed/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.request(config);
      if (response) {
        console.log(response.data.totalCaloriesConsumed.toFixed(0));
        setWeeklyCalories(response.data.data.totalCaloriesConsumed.toFixed(0));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.progressContainer}>
      <View
        style={{
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Text style={AppFontStyle.MEDIUM_14}>Calories Consumed</Text>
          <View style={styles.rowContainer}>
            <Text style={[AppFontStyle.SEMI_BOLD_18]}>Average Calories</Text>
            <Text style={[AppFontStyle.SEMI_BOLD_20, {color: AppColors.teal}]}>
              {weeklyCalories / 7} kcal
            </Text>
          </View>
        </View>

        <View style={{marginTop: 30}}>
          <Text style={AppFontStyle.MEDIUM_14}>Water Intake</Text>
          <View style={styles.rowContainer}>
            <Text style={[AppFontStyle.SEMI_BOLD_18]}>
              Average Water Intake
            </Text>
            <Text style={[AppFontStyle.SEMI_BOLD_20, {color: AppColors.teal}]}>
              {(weeklyWaterIntake / 7).toFixed(2)} cups
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
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
