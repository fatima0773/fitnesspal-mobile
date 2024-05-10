import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WorkoutPlanner from '../components/screens/workoutPlanner/WorkoutPlanner';
import LastSession from '../components/screens/workoutPlanner/LastSession';
import ToningAreas from '../components/screens/workoutPlanner/ToningAreas';
import WorkoutLevel from '../components/screens/workoutPlanner/WorkoutLevel';
const Stack = createStackNavigator();

const WorkoutPlanNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="WorkoutPlanner"
        component={WorkoutPlanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LastSession"
        component={LastSession}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToningAreas"
        component={ToningAreas}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WorkoutLevel"
        component={WorkoutLevel}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default WorkoutPlanNavigator;
