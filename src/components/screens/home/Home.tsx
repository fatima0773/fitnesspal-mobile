/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import styleSheet from '../../../utility/stylesheet';
import {AppColors} from '../../../utility/AppColors';
import HomeHeader from './components/HomeHeader';
import {Text} from '@rneui/base';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import BlackButton from '../../common/BlackButton';
import LinearGradient from 'react-native-linear-gradient';
import FullProgress from './components/FullProgress';
import WeeklyActivity from './components/WeeklyActivity';
import GetBackToTraining from './components/GetBackToTraining';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TodaysMeals from './components/TodaysMeals';
import PopularRecipes from './components/PopularRecipes';
import {useEffect, useState} from 'react';
import storage from '../../../utility/Storage';
import axios from 'axios';
import React from 'react';
const Home = (props: any) => {
  const [currentDate, setCurrentDate] = useState('');
  const [recipes, setRecipes] = useState<any>();
  const [userId, setUserId] = useState('');
  const [currentWeight, setCurrentWeight] = useState<any>();
  const [targetWeight, setTargetWeight] = useState<any>();
  const [bmi, setBmi] = useState<any>();

  const getFormattedDate = (date: any) => {
    const day = date.getDate();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
    const suffix =
      day === 1 || day === 21 || day === 31
        ? 'st'
        : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
        ? 'rd'
        : 'th';
    return `${day}${suffix} ${monthName}`;
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getRecipes();
    const today = new Date();
    const formattedDate = getFormattedDate(today);
    setCurrentDate(formattedDate);
    fetchUserId();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getHealthProfile();
    }
  }, [userId]);

  const getHealthProfile = async () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/health-profile/get-profile/${userId}`,
      headers: {},
      data: data,
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setTargetWeight(response.data.targetWeight);
        setCurrentWeight(response.data.weight);
        setBmi(response.data.bmi);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  const fetchUserId = async () => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    setUserId(auth.userId);
  };

  const getRecipes = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.edamam.com/api/recipes/v2?type=public&q=healthy&app_id=f2dfeeb3&app_key=e1a3d5cf81cb3d782e6d100027571564 \t&diet=balanced',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setRecipes(response.data.hits);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('StepTracker')}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 200,
          backgroundColor: AppColors.purple,
          position: 'absolute',
          bottom: 10,
          zIndex: 10000,
          right: 10,
        }}>
        <Text style={[AppFontStyle.BOLD_19, {color: AppColors.white}]}>
          Step Tracker
        </Text>
      </TouchableOpacity>

      <ScrollView
        style={{width: '100%', height: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styleSheet.container, {padding: 15}]}>
          <HomeHeader
            pressHandler={() => {
              storage.save({
                key: 'authState',
                data: {
                  userId: '',
                },
              });
              props.navigation.navigate('GetStarted');
            }}
          />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_18,
              {
                marginTop: 20,
                width: '100%',
              },
            ]}>
            Let’s see {currentDate} at a glance
          </Text>

          {/* at a glance stats */}
          <View style={[styleSheet.rowContainer, {marginTop: 20}]}>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.green, AppColors.teal]}
              style={styles.gradientContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                {currentWeight} kgs
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.white,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                current weight
              </Text>
            </LinearGradient>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.teal, AppColors.teal]}
              style={styles.gradientContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                {bmi} kgs/m2
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.white,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                current BMI
              </Text>
            </LinearGradient>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.teal, AppColors.green]}
              style={styles.gradientContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                {targetWeight} kgs
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.white,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                target weight
              </Text>
            </LinearGradient>
          </View>

          <View style={[styleSheet.rowContainer, {marginVertical: 20}]}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {
                  width: '50%',
                },
              ]}>
              Your BMI is within the normal Range
            </Text>
            <BlackButton
              title={'See Full Progress'}
              titleStyles={[
                AppFontStyle.SEMI_BOLD_12,
                {color: AppColors.white},
              ]}
              buttonStyles={styles.fullProgressButton}
            />
          </View>
          <FullProgress />

          {/* weekly stats */}
          <View style={[styleSheet.rowContainer, {marginTop: 50}]}>
            <Text style={AppFontStyle.SEMI_BOLD_18}>Weekly Activity</Text>
          </View>

          <WeeklyActivity />

          {/* get back to training */}
          <View style={[styleSheet.rowContainer, {marginTop: 50}]}>
            <Text style={AppFontStyle.SEMI_BOLD_18}>Get Back to Training</Text>
            <AntDesign
              size={28}
              name="arrowright"
              style={{
                marginEnd: 10,
              }}
            />
          </View>
          <GetBackToTraining
            pressHandler={() =>
              props.navigation.navigate('WorkoutPlanNavigator', {
                screen: 'WorkoutRoutines',
              })
            }
          />

          {/* today's meals */}
          <View style={[styleSheet.rowContainer, {marginTop: 50}]}>
            <Text style={AppFontStyle.SEMI_BOLD_18}>Today’s Meals</Text>
            <AntDesign
              size={28}
              name="arrowright"
              style={{
                marginEnd: 10,
              }}
            />
          </View>
          <TodaysMeals
            pressHandler={() =>
              props.navigation.navigate('MealPlanNavigator', {
                screen: 'MealPlan',
              })
            }
          />

          {/* popular recipes */}
          <View style={[styleSheet.rowContainer, {marginTop: 50}]}>
            <Text style={AppFontStyle.SEMI_BOLD_18}>Popular Recipes</Text>
          </View>
          <PopularRecipes data={recipes} />
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
  headerImage: {
    width: 155,
    alignSelf: 'center',
    height: 175,
  },
  button: {
    backgroundColor: AppColors.purple,
    width: '100%',
    marginTop: 30,
  },
  fullProgressButton: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 7,
  },
  gradientContainer: {
    padding: 10,
    borderRadius: 10,
    marginEnd: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

export default Home;
