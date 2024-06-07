import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppMenu from '../components/screens/menu/AppMenu';
import EditProfile from '../components/screens/menu/EditProfile';
import FreePlan from '../components/screens/menu/FreePlan';
import PremiumPlan from '../components/screens/menu/PremiumPlan';
import AddNewCard from '../components/screens/menu/AddNewCard';
import WellnessFacilityLocator from '../components/screens/wellnessFacilityLocator/WellnessFacilityLocator';
const Stack = createStackNavigator();

const MenuNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="AppMenu"
        component={AppMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FreePlan"
        component={FreePlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PremiumPlan"
        component={PremiumPlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WellnessFacilityLocator"
        component={WellnessFacilityLocator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
