/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import {LogBox, StyleSheet, Text, View} from 'react-native';
import styleSheet from '../../../../utility/stylesheet';
import {AppColors} from '../../../../utility/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {BarChart, ProgressChart} from 'react-native-chart-kit';
import {useEffect, useState} from 'react';
import storage from '../../../../utility/Storage';
import axios from 'axios';
import {FULL_WIDTH} from '../../../../utility/Constant';
const FullProgress = () => {
  const [userId, setUserId] = useState('');
  const [calories, setCalories] = useState<number>(0);
  const [nutrients, setNutrients] = useState<any>();
  const [nutrientData, setNutrientData] = useState({
    labels: ['Carbs', 'Cholestrol', 'Fats', 'Proteins', 'Sodium'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  });
  const [water, setWater] = useState<any>();
  const [steps, setSteps] = useState<any>();
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
  const barChartConfig = {
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
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    fetchUserId();
  }, [userId]);

  useEffect(() => {
    getDailyCaloriesConsumed();
    getDailyWaterIntake();
    getDailyNutrientHistory();
  }, [userId, calories, water, nutrients]);

  // fetch user id
  const fetchUserId = async () => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    setUserId(auth.userId);
  };

  // get daily calories
  const getDailyCaloriesConsumed = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile/get-daily-calories-consumed/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.request(config);
      setCalories(response.data.caloriesConsumed);
    } catch (error) {
      console.log(error);
    }
  };

  // get daily water intake
  const getDailyWaterIntake = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile/get-daily-water-intake/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.request(config);
      setWater(parseInt(response.data.data.waterIntake, 10));
    } catch (error) {
      console.log(error);
    }
  };

  // get step count
  const getDailySteps = async () => {};

  // get daily nutrients
  const getDailyNutrientHistory = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/nutritional-profile/get-daily-nutrient-history/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.request(config);
      setNutrients(JSON.stringify(response.data.data));
      const d = Object.values(response.data.data).map((value: any) =>
        Number(value.toFixed(2)),
      );

      setNutrientData({
        labels: ['Carbs', 'Cholestrol', 'Fats', 'Proteins', 'Sodium'],
        datasets: [
          {
            data: d,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const step = {
    data: [234 / 500],
  };
  const caloriesConsumed = {
    data: [calories / 3000],
  };
  return (
    <View>
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
                data={step}
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
                <Ionicons
                  name="water-sharp"
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
                {water}/8 Cups
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
                Calories Consumed: {calories} / 3000
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.progressContainer, {flex: 0}]}>
        <View style={styleSheet.rowContainer}>
          <Text
            style={[AppFontStyle.SEMI_BOLD_12, {color: AppColors.accentText}]}>
            Nutrient History
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
        <BarChart
          data={nutrientData}
          showBarTops={false}
          style={{}}
          width={FULL_WIDTH - 70}
          height={200}
          chartConfig={barChartConfig}
          withInnerLines={true}
          verticalLabelRotation={0}
          segments={-1}
        />
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
