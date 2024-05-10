/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
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
import ThreeStepProgress from '../../common/ThreeStepProgress';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {AppImages} from '../../../utility/AppImages';
import {FULL_HEIGHT, FULL_WIDTH} from '../../../utility/Constant';
import BlackButton from '../../common/BlackButton';
import {Survey} from '../../../utility/mealPlanData';
import {generateMealPlan} from '../../../services/mealPlan.services';
import {RouteProp, useRoute} from '@react-navigation/native';
interface RouteParams {
  healthPreferences: any;
}

const DietOptions = (props: any) => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {healthPreferences} = route.params;
  console.log('healthPreferences: ', healthPreferences);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Please fill all the required fields',
  );
  const health: any = {};

  // Iterate over each health preference

  // const
  useEffect(() => {
    healthPreferences.forEach((pref: any) => {
      // Check if the preference exists in healthSpec
      const healthPreference: any = Survey.healthSpec.find(
        spec => spec.name === pref.name,
      );
      if (healthPreference) {
        // If the preference exists, set it to true in the health object
        health[healthPreference.name] = true;
      }
    });
    console.log(health);
  }, [health, healthPreferences]);

  const handleGeneratePlan = async () => {
    try {
      // Send a request to sign the user in
      const response = await generateMealPlan(health, selectedDiet);
      if (response) {
        const message = response.data.message;
        const status = response.status;
        if (status === 200) {
          // If sign in is successful
          console.log(message);
          console.log(status);
          setShowError(false);
          props.navigation.navigate('MealPlan');
        } else {
          // If sign in is not successful
          setSuccess(false);
          setShowError(true);
          setErrorMessage(message);
        }
      }
      // Extract message and status from the response
    } catch (error: any) {
      // Handle errors and set error-related state
      setSuccess(false);
      setShowError(true);
      setErrorMessage(error.response.data.message);
    }
  };
  const dietOption = Survey.dietSpec;
  const [selectedDiet, setSelectedDiet] = useState('');
  console.log(selectedDiet);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 15,
          alignItems: 'center',
        }}>
        <LogoHeader />
        <ThreeStepProgress currentStep={3} />
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_24,
            {
              textAlign: 'left',
              marginVertical: 20,
            },
          ]}>
          Do you follow any of these diets?{'\n'}
          {'\n'}
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {
                textAlign: 'left',
                color: AppColors.secondaryText,
              },
            ]}>
            To offer you the best tailored diet experience we need to know more
            information about you.
          </Text>
        </Text>
        {dietOption.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionContainer,
              selectedDiet === item.name && styles.selectedOptionContainer,
            ]}
            onPress={() => setSelectedDiet(item.name)}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_17,
                {marginHorizontal: 20},
                selectedDiet === 'Vegetarian' && {color: AppColors.white},
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}

        <BlackButton
          title="Next"
          pressHandler={() => {
            // const response = generateMealPlan();
            handleGeneratePlan();
          }}
        />

        <Image
          source={AppImages.STROKE_SET_TWO}
          style={styles.strokes}
          resizeMode="contain"
        />
        <Image
          source={AppImages.FOOD_SET_TWO}
          style={styles.food}
          resizeMode="contain"
        />
      </View>
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
  strokes: {
    width: FULL_WIDTH,
    marginTop: 30,
    position: 'absolute',
    top: FULL_HEIGHT / 2.2,
    zIndex: -1000,
  },
  food: {
    width: FULL_WIDTH,
    marginTop: 30,
    position: 'absolute',
    top: FULL_HEIGHT / 2.4,
    zIndex: -1000,
  },
  optionContainer: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.transparentBlack07,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    marginEnd: 10,
    padding: 10,
    width: FULL_WIDTH - 60,
    paddingVertical: 20,
    marginVertical: 10,
  },
  selectedOptionContainer: {
    backgroundColor: AppColors.teal,
    shadowColor: AppColors.transparentBlack07,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    marginEnd: 10,
    padding: 10,
    width: FULL_WIDTH - 60,
    paddingVertical: 20,
    marginVertical: 10,
  },
});

export default DietOptions;
