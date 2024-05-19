/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../../utility/AppColors';
import {useEffect, useState} from 'react';
import LogoHeader from '../../common/LogoHeader';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {FULL_WIDTH} from '../../../utility/Constant';
import LinearGradient from 'react-native-linear-gradient';
import {ProgressChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native';
import storage from '../../../utility/Storage';
import axios from 'axios';
const WaterIntake = () => {
  const [userId, setUserId] = useState('');
  const [dailyWaterIntake, setDailyWaterIntake] = useState(0);
  const [weeklyWaterIntake, setWeeklyWaterIntake] = useState(0);

  const [waterIntake, setWaterIntake] = useState({
    data: [6 / 8],
  });
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    fetchUserId();
    if (userId) {
      fetchDailyWaterIntake();
      fetchWeeklyWaterIntake();
    }
  }, [userId, weeklyWaterIntake, dailyWaterIntake]);
  const fetchUserId = async () => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    setUserId(auth.userId);
  };

  const fetchDailyWaterIntake = async () => {
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
        setDailyWaterIntake(parseInt(response.data.data.waterIntake, 10));
        const chartData = {
          data: [dailyWaterIntake / 8],
        };
        setWaterIntake(chartData);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  const fetchWeeklyWaterIntake = async () => {
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
        setWeeklyWaterIntake(parseInt(response.data.data.waterIntake, 10));
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(1, 120, 182, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const updateWaterIntake = async () => {
    let data = JSON.stringify({
      waterIntake: 1,
      userId: userId,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/nutritional-profile/update-water-intake-history',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        fetchDailyWaterIntake();
        fetchWeeklyWaterIntake();
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={{
          paddingHorizontal: 15,
        }}>
        <LogoHeader />
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_24,
            {
              textAlign: 'center',
              marginVertical: 20,
            },
          ]}>
          Every Sip, A Step to Health
        </Text>
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_15,
            {
              textAlign: 'center',
              color: AppColors.secondaryText,
            },
          ]}>
          Drinking enough water can boost your metabolism by up to 30% for about
          an hour, helping you feel more energized and alert throughout the day!
        </Text>
        <View
          style={{
            width: FULL_WIDTH - 20,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text
            style={[
              AppFontStyle.BOLD_18,
              {
                color: AppColors.primaryText,
                textAlign: 'center',
              },
            ]}>
            Todays Intake
          </Text>
          <View>
            {dailyWaterIntake <= 8 && (
              <>
                <ProgressChart
                  data={waterIntake}
                  width={300}
                  height={300}
                  strokeWidth={16}
                  radius={90}
                  chartConfig={chartConfig}
                  hideLegend={true}
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={[
                    AppFontStyle.BOLD_23,
                    {
                      color: '#0178B6',
                      textAlign: 'center',
                      marginTop: 20,
                      position: 'absolute',
                      left: '45%',
                      top: '39%',
                    },
                  ]}>
                  {(dailyWaterIntake / 8) * 100}%
                </Text>
              </>
            )}
          </View>
          <Text
            style={[
              AppFontStyle.BOLD_30,
              {
                color: AppColors.primaryText,
                textAlign: 'center',
                // marginTop: -20,
                marginBottom: 30,
              },
            ]}>
            {dailyWaterIntake}/8 cups
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={['#0178B6', AppColors.teal]}
              style={styles.gradientContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_15,
                  {
                    color: AppColors.white,
                    textAlign: 'center',
                  },
                ]}>
                Time To Drink
              </Text>
              <TouchableOpacity
                onPress={updateWaterIntake}
                style={{
                  backgroundColor: AppColors.white,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  width: 30,
                  height: 30,
                  marginVertical: 20,
                }}>
                <Text
                  style={[
                    AppFontStyle.BOLD_19,
                    {
                      color: '#0178B6',
                      textAlign: 'center',
                    },
                  ]}>
                  +
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  AppFontStyle.BOLD_19,
                  {
                    color: AppColors.white,
                    textAlign: 'center',
                  },
                ]}>
                A Cup
              </Text>
            </LinearGradient>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.teal, '#0178B6']}
              style={[
                styles.gradientContainer,
                {justifyContent: 'space-around'},
              ]}>
              <Text
                style={[
                  AppFontStyle.BOLD_15,
                  {
                    color: AppColors.white,
                    textAlign: 'center',
                  },
                ]}>
                Average Water Intake
              </Text>
              <Text
                style={[
                  AppFontStyle.BOLD_19,
                  {
                    color: AppColors.white,
                    textAlign: 'right',
                    marginTop: 10,
                  },
                ]}>
                {weeklyWaterIntake / 7} cups per day
              </Text>
            </LinearGradient>
          </View>
        </View>
        <View style={{marginVertical: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
    width: '100%',
  },
  gradientContainer: {
    borderRadius: 20,
    // width: 31,
    // height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // width: '100%',
    flex: 1,
    marginVertical: 10,
    margin: 5,
  },
});

export default WaterIntake;
