import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WorkoutPlanner from '../components/screens/workoutPlanner/WorkoutPlanner';
import LastSession from '../components/screens/workoutPlanner/LastSession';
import ToningAreas from '../components/screens/workoutPlanner/ToningAreas';
import WorkoutLevel from '../components/screens/workoutPlanner/WorkoutLevel';
import WorkoutRoutines from '../components/screens/workoutPlanner/WorkoutRoutines';
import WorkoutLanding from '../components/screens/workoutPlanner/WorkoutLanding';
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
        name="WorkoutRoutines"
        component={WorkoutRoutines}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WorkoutLanding"
        component={WorkoutLanding}
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
