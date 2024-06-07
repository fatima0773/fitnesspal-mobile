/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {LogBox, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import styleSheet from '../../../utility/stylesheet';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {AppColors} from '../../../utility/AppColors';
import {FULL_WIDTH} from '../../../utility/Constant';
import LinearGradient from 'react-native-linear-gradient';
import StepProgress from './components/StepProgress';
import WaterIntakeProgress from './components/WaterIntakeProgress';
import CompareProgress from './components/CompareProgress';
import CalorieCount from './components/CalorieCount';
import Activity from './components/Activity';
import storage from '../../../utility/Storage';
import axios from 'axios';
import React from 'react';

const ProgressInsights = (props: any) => {
  const [userId, setUserId] = useState('');
  const [currentWeight, setCurrentWeight] = useState<any>();
  const [targetWeight, setTargetWeight] = useState<any>();
  const [bmi, setBmi] = useState<any>();
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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
  return (
    <View style={[styles.container]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_28,
              {color: AppColors.white, marginVertical: 10},
            ]}>
            Hello Fatima!
          </Text>
          <Text style={[AppFontStyle.SEMI_BOLD_18, {color: AppColors.white}]}>
            Have a look at your progress
          </Text>

          {/* Weight - BMI - Target Weight  */}
          <View
            style={[
              styleSheet.rowContainer,
              {marginTop: 20, width: '90%', alignSelf: 'center'},
            ]}>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.green, AppColors.teal]}
              style={styles.gradientContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_18,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                {currentWeight} kgs
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_10,
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
                  AppFontStyle.BOLD_18,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                {bmi} kgs/m2
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_10,
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
                  AppFontStyle.BOLD_18,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                {targetWeight} kgs
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_10,
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
          {/* BMI Details */}
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_18,
              {
                color: AppColors.white,
                width: '100%',
                textAlign: 'center',
                marginVertical: 20,
              },
            ]}>
            Your BMI is within the normal Range
          </Text>
          <View style={[styleSheet.rowContainer, {paddingHorizontal: 20}]}>
            <Text
              style={[
                AppFontStyle.MEDIUM_12,
                {
                  color: AppColors.white,
                  marginVertical: 10,
                },
              ]}>
              Current BMI
            </Text>

            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {
                  color: AppColors.white,
                  marginVertical: 10,
                },
              ]}>
              {bmi} kg/m2
            </Text>
          </View>
          <View style={[styleSheet.rowContainer, {paddingHorizontal: 20}]}>
            <Text
              style={[
                AppFontStyle.MEDIUM_12,
                {
                  color: AppColors.white,
                  marginVertical: 10,
                },
              ]}>
              Healthy BMI Range
            </Text>

            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {
                  color: AppColors.white,
                  marginVertical: 10,
                },
              ]}>
              18.5 kg/m² - 24.9 kg/m²
            </Text>
          </View>
          {/* <View style={[styleSheet.rowContainer, {paddingHorizontal: 20}]}>
            <Text
              style={[
                AppFontStyle.MEDIUM_12,
                {
                  color: AppColors.white,
                  marginVertical: 10,
                },
              ]}>
              Healthy Weight for Height
            </Text>

            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {
                  color: AppColors.white,
                  marginVertical: 10,
                },
              ]}>
              47.4 kg - 64 kg
            </Text>
          </View> */}
        </View>

        <View style={[styleSheet.container, {padding: 15}]}>
          {/* compare progres */}
          <CompareProgress />

          {/* step progress */}
          {/* <Text
            style={[
              AppFontStyle.SEMI_BOLD_20,
              {
                color: AppColors.accentText,
                textAlign: 'left',
                width: '100%',
                marginTop: 15,
                marginLeft: 10,
              },
            ]}>
            Step Progress
          </Text>
          <StepProgress /> */}

          {/* water intake progress */}
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {
                color: AppColors.accentText,
                textAlign: 'left',
                width: '100%',
                marginTop: 15,
                marginLeft: 10,
              },
            ]}>
            Water Intake Progress
          </Text>
          <WaterIntakeProgress />

          {/* water intake progress */}
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {
                color: AppColors.accentText,
                textAlign: 'left',
                width: '100%',
                marginTop: 15,
                marginLeft: 10,
              },
            ]}>
            Calorie Count
          </Text>
          <CalorieCount />

          {/* water intake progress */}
          {/* <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {
                color: AppColors.accentText,
                textAlign: 'left',
                width: '100%',
                marginTop: 15,
                marginLeft: 10,
              },
            ]}>
            Activity
          </Text>
          <Activity /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  header: {
    backgroundColor: AppColors.accentText,
    padding: 15,
    width: FULL_WIDTH,
    borderEndEndRadius: 40,
    borderEndStartRadius: 40,
    paddingTop: 100,
    paddingBottom: 50,
  },
  gradientContainer: {
    padding: 10,
    borderRadius: 10,
    marginEnd: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  shadowContainer: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.transparentBlack07,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    marginTop: 15,
    padding: 15,
    flex: 1,
    width: '100%',
    marginVertical: 30,
  },
});

export default ProgressInsights;
