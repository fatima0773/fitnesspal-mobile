/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  isSensorWorking,
  isStepCountingSupported,
  parseStepData,
  startStepCounterUpdate,
  stopStepCounterUpdate,
  type ParsedStepCountData,
} from '@dongminyu/react-native-step-counter';
import {getBodySensorPermission, getStepCounterPermission} from './permission';
import CircularProgress from 'react-native-circular-progress-indicator';
import LogCat from './LogCat';
import {AppColors} from '../../../utility/AppColors';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import LogoHeader from '../../common/LogoHeader';
import {FULL_HEIGHT} from '../../../utility/Constant';

type SensorType<T = typeof Platform.OS> = T extends 'ios'
  ? 'CMPedometer'
  : T extends 'android'
  ? 'Step Counter' | 'Accelerometer'
  : 'NONE';

type SensorName = SensorType<Platform['OS']>;

/* Setting the initial state of the additionalInfo object. */
const initState = {
  dailyGoal: '0/10000 steps',
  stepsString: '0 steps',
  calories: '0.0 kCal',
  distance: '0.0 m',
};

type AdditionalInfo = Partial<ParsedStepCountData>;

/**
 * This module represents the root component of the app.
 * 1. It imports the necessary components and libraries.
 * 2. It defines the initial state of the additionalInfo state.
 * 3. It defines the functions that will be used in the app.
 * 4. It uses the useState hook to define the states that will be used in the app.
 * 5. It uses the useEffect hook to run the isPedometerSupported function when the component mounts.
 * 6. It uses the useEffect hook to call the startStepCounter function when the component mounts.
 * 7. It returns the JSX code for the app.
 *
 * @module App
 * @requires react
 * @requires react-native
 * @requires react-native-permissions
 * @requires react-native-svg
 * @requires react-native-reanimated
 * @requires react-native-gesture-handler
 * @requires react-native-circular-progress-indicator
 * @returns {React.ReactComponentElement} - Returns Application Component.
 * @example
 */
export default function StepTracker(props: any): JSX.Element {
  const [loaded, setLoaded] = React.useState(false);
  const [supported, setSupported] = React.useState(false);
  const [granted, setGranted] = React.useState(false);
  const [sensorType, setSensorType] = React.useState<SensorName>('NONE');
  const [stepCount, setStepCount] = React.useState(0);
  const [additionalInfo, setAdditionalInfo] =
    React.useState<AdditionalInfo>(initState);

  /**
   * Get user's motion permission and check pedometer is available.
   * This function checks if the step counting is supported by the device
   * and if the user has granted the app the permission to use it.
   * It sets the state variables 'granted' and 'supported' accordingly.
   */
  const isPedometerSupported = () => {
    isStepCountingSupported().then(result => {
      setGranted(result.granted === true);
      setSupported(result.supported === true);
    });
  };

  /**
   * It starts the step counter and sets the sensor type, step count, and additional info.
   * The function startStepCounter is called when the user clicks the "Start" button.
   * It starts the step counter.
   */
  const startStepCounter = () => {
    startStepCounterUpdate(new Date(), data => {
      setSensorType(data.counterType as SensorName);
      const parsedData = parseStepData(data);
      setStepCount(parsedData.steps);
      setAdditionalInfo({
        ...parsedData,
      });
    });
    setLoaded(true);
  };

  /**
   * It sets the state of the additionalInfo object to its initial state, stops the step counter update,
   * and sets the loaded state to false.
   * This function is used to stop the step counter.
   */
  const stopStepCounter = () => {
    setAdditionalInfo(initState);
    stopStepCounterUpdate();
    setLoaded(false);
    console.log(initState);
  };

  /**
   * If the sensor is working, stop it. If it's not working,
   * Get permission for the other sensor and start it.
   * This function is used to force the use of another sensor.
   */
  const forceUseAnotherSensor = () => {
    if (isSensorWorking) {
      stopStepCounter();
    } else {
      if (sensorType === 'Step Counter') {
        getBodySensorPermission().then(setGranted);
      } else {
        getStepCounterPermission().then(setGranted);
      }
    }
    startStepCounter();
  };

  /**
   * A hook that runs when the component mounts. It calls the isPedometerSupported function
   * and returns a function that stops the step counter.
   * This effect runs when the component is first mounted
   * and then runs again when the `count` variable changes.
   */
  useEffect(() => {
    isPedometerSupported();
    return () => {
      stopStepCounter();
    };
  }, []);

  /**
   * A hook that runs when the component mounts.
   * It calls the isPedometerSupported function and returns a
   * function that stops the step counter.
   */
  useEffect(() => {
    console.debug(`🚀 stepCounter ${supported ? '' : 'not'} supported`);
    console.debug(`🚀 user ${granted ? 'granted' : 'denied'} stepCounter`);
    startStepCounter();
  }, [granted, supported]);

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        <LogoHeader />
        <Text style={[AppFontStyle.SEMI_BOLD_28, {marginBottom: 20}]}>
          Step Tracker
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: 20,
            marginTop: 10,
          }}>
          <View>
            <Text style={[AppFontStyle.SEMI_BOLD_20]}>Good day!</Text>
            <Text
              style={[
                AppFontStyle.MEDIUM_15,
                {color: AppColors.secondaryText},
              ]}>
              Are we ready to get going?
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Tab')}
            style={{
              backgroundColor: AppColors.black,
              padding: 10,
              borderRadius: 10,
            }}>
            <Text style={[AppFontStyle.BOLD_14, {color: AppColors.white}]}>
              View Insights
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.indicator}>
          <CircularProgress
            value={stepCount}
            maxValue={10000}
            valueSuffix=" Steps"
            progressValueFontSize={42}
            radius={165}
            activeStrokeColor={AppColors.purple}
            inActiveStrokeColor={AppColors.lightPurple}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={40}
            // subtitle={
            //   additionalInfo.calories === '0 kCal'
            //     ? ''
            //     : additionalInfo.calories
            // }
            activeStrokeWidth={40}
            title="Step Count"
            titleColor="#555"
            titleFontSize={20}
            titleStyle={AppFontStyle.BOLD_18}
          />
        </View>
        <View style={styles.bGroup}>
          <TouchableOpacity
            onPress={startStepCounter}
            style={{
              backgroundColor: AppColors.black,
              padding: 10,
              borderRadius: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text style={[AppFontStyle.BOLD_14, {color: AppColors.white}]}>
              Start
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={forceUseAnotherSensor}
            style={{
              backgroundColor: AppColors.black,
              padding: 10,
              borderRadius: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text style={[AppFontStyle.BOLD_14, {color: AppColors.white}]}>
              Restart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={stopStepCounter}
            style={{
              backgroundColor: AppColors.black,
              padding: 10,
              borderRadius: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text style={[AppFontStyle.BOLD_14, {color: AppColors.white}]}>
              Stop
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.shadowContainer}>
          <View>
            <Text
              style={[
                AppFontStyle.MEDIUM_16,
                {color: AppColors.primaryText, marginBottom: 10},
              ]}>
              Your Daily Target
            </Text>
            <Text style={[AppFontStyle.BOLD_20, {color: AppColors.purple}]}>
              10000
            </Text>
          </View>
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('Tab')}
            style={{
              backgroundColor: AppColors.purple,
              paddingHorizontal: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[AppFontStyle.BOLD_15, {color: AppColors.white}]}>
              Set Step Goal
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <LogCat triggered={loaded} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {backgroundColor: 'red'},
  container: {
    height: '100%',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: AppColors.white,
    minHeight: FULL_HEIGHT,
  },
  /** Styling the circular indicator. */
  indicator: {
    marginTop: 10,
    marginBottom: 20,
  },
  /** Styling the button group. */
  bGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    display: 'flex',
    marginVertical: 8,
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
    marginEnd: 10,
    padding: 15,
    flex: 1,
    width: '100%',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
