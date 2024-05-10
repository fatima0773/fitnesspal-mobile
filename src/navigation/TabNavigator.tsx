/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {AppColors} from '../utility/AppColors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressInsights from '../components/screens/ProgressInsights/ProgressInsights';
import Home from '../components/screens/home/Home';
import {AppImages} from '../utility/AppImages';
import MenuNavigator from './MenuNavigator';
import WorkoutPlanNavigator from './WorkoutPlanNavigator';
import MealPlanNavigator from './MealPlanNavigator';
const Tab = createBottomTabNavigator();

interface FocusedTabBarIconProps {
  tabName: number;
}

const FocusedTabBarIcon: React.FC<FocusedTabBarIconProps> = ({tabName}) => {
  return (
    <View>
      {tabName === 1 ? (
        <MaterialIcon
          name="insert-chart-outlined"
          color={AppColors.black}
          size={25}
        />
      ) : null}
      {tabName === 2 ? (
        <Image
          source={AppImages.ACTIVE_MEAL}
          style={{width: 26}}
          resizeMode="contain"
        />
      ) : null}
      {tabName === 4 ? (
        <Image
          source={AppImages.ACTIVE_GYM}
          style={{width: 26}}
          resizeMode="contain"
        />
      ) : null}
      {tabName === 5 ? (
        <EntypoIcon
          name="dots-three-horizontal"
          color={AppColors.black}
          size={25}
        />
      ) : null}
    </View>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
        padding: 0,
        margin: 0,
      }}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconComponent;
            if (route.name === 'ProgressInsights') {
              iconComponent = focused ? (
                <FocusedTabBarIcon tabName={1} />
              ) : (
                <MaterialIcon
                  name="insert-chart-outlined"
                  color={AppColors.inactiveTabColor}
                  size={25}
                />
              );
            } else if (route.name === 'MealPlanNavigator') {
              iconComponent = focused ? (
                <FocusedTabBarIcon tabName={2} />
              ) : (
                <Image
                  source={AppImages.INACTIVE_MEAL}
                  style={{width: 26}}
                  resizeMode="contain"
                />
              );
            } else if (route.name === 'Home') {
              iconComponent = focused ? (
                <Ionicons name="home" color={AppColors.black} size={25} />
              ) : (
                <Ionicons
                  name="home"
                  color={AppColors.inactiveTabColor}
                  size={25}
                />
              );
            } else if (route.name === 'WorkoutPlanNavigator') {
              iconComponent = focused ? (
                <FocusedTabBarIcon tabName={4} />
              ) : (
                <Image
                  source={AppImages.INACTIVE_GYM}
                  style={{width: 26}}
                  resizeMode="contain"
                />
              );
            } else if (route.name === 'MenuNavigator') {
              iconComponent = focused ? (
                <FocusedTabBarIcon tabName={5} />
              ) : (
                <EntypoIcon
                  name="dots-three-horizontal"
                  color={AppColors.inactiveTabColor}
                  size={25}
                />
              );
            }

            return iconComponent;
          },
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 65,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColors.white,
            shadowOpacity: 0.2,
            shadowRadius: 20,
            elevation: 5,
            margin: 10,
            borderRadius: 38,
            marginBottom: 20,
            paddingBottom: 0,
          },
        })}>
        <Tab.Screen
          name="ProgressInsights"
          component={ProgressInsights}
          options={{headerShown: false}}
        />

        <Tab.Screen
          name="MealPlanNavigator"
          component={MealPlanNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="WorkoutPlanNavigator"
          component={WorkoutPlanNavigator}
          options={{headerShown: false}}
        />

        <Tab.Screen
          name="MenuNavigator"
          component={MenuNavigator}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
