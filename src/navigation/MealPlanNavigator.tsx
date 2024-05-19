import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MealPlanLanding from '../components/screens/mealPlanner/MealPlannerLanding';
import DietOptions from '../components/screens/mealPlanner/DietOptions';
import Allergies from '../components/screens/mealPlanner/Allergies';
import MealPlan from '../components/screens/mealPlanner/MealPlan';
import LoadingScreen from '../components/screens/mealPlanner/LoadingScreen';
import WaterIntake from '../components/screens/mealPlanner/WaterIntake';
const Stack = createStackNavigator();

const MealPlanNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoadingScreen">
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MealPlanLanding"
        component={MealPlanLanding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DietOptions"
        component={DietOptions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Allergies"
        component={Allergies}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MealPlan"
        component={MealPlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WaterIntake"
        component={WaterIntake}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MealPlanNavigator;
