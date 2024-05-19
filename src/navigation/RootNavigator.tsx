import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GetStarted from '../components/screens/GetStarted';
import SignIn from '../components/screens/onBoarding/SignIn';
import SignUp from '../components/screens/onBoarding/SignUp';
import AccountVerification from '../components/screens/onBoarding/AccountVerification';
import AddEmergencyContacts from '../components/screens/onBoarding/AddEmergencyContacts';
import DiseasesAndDisabilities from '../components/screens/onBoarding/DiseasesAndDisabilities';
import ForgotPassword from '../components/screens/onBoarding/ForgotPassword';
import ForgotPasswordOtp from '../components/screens/onBoarding/ForgotPasswordOtp';
import GenderAnalysis from '../components/screens/onBoarding/GenderAnalysis';
import HealthGoals from '../components/screens/onBoarding/HealthGoals';
import ResetPassword from '../components/screens/onBoarding/ResetPassword';
import TabNavigator from './TabNavigator';
import StepTracker from '../components/screens/stepTracker/StepTracker';
const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountVerification"
          component={AccountVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddEmergencyContacts"
          component={AddEmergencyContacts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiseasesAndDisabilities"
          component={DiseasesAndDisabilities}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPasswordOtp"
          component={ForgotPasswordOtp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GenderAnalysis"
          component={GenderAnalysis}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HealthGoals"
          component={HealthGoals}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StepTracker"
          component={StepTracker}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
