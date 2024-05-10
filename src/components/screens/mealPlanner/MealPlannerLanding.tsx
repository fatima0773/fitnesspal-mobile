/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styleSheet from '../../../utility/stylesheet';
import {AppColors} from '../../../utility/AppColors';
import {useEffect} from 'react';
import LogoHeader from '../../common/LogoHeader';
import ThreeStepProgress from '../../common/ThreeStepProgress';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import TealGradientButton from '../../common/TealGradientButton';
import {AppImages} from '../../../utility/AppImages';
import {FULL_WIDTH} from '../../../utility/Constant';
import axios from 'axios';
const MealPlanLanding = (props: any) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/meal-plan/663c0c5cdcadc714ac84e047',
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response.data.status_code) {
          props.navigation.navigate('MealPlan');
        } else {
          props.navigation.navigate('MealPlannerLanding');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styleSheet.container, {paddingHorizontal: 15}]}>
          <LogoHeader />
          <ThreeStepProgress currentStep={1} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {textAlign: 'center', marginVertical: 20},
            ]}>
            Your Taste, Your Needs{'\n'} Your{' '}
            <Text style={[AppFontStyle.SEMI_BOLD_24, {color: AppColors.teal}]}>
              Perfect{' '}
            </Text>
            Plan
          </Text>
          <TealGradientButton
            title="Get Meal Plan"
            pressHandler={() => props.navigation.navigate('Allergies')}
          />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {
                color: AppColors.secondaryText,
                textAlign: 'center',
                marginVertical: 20,
              },
            ]}>
            Discover Personalized Meal Plans, Tailored to Your Unique Tastes and
            Nutritional Needs
          </Text>
          <Image
            source={AppImages.MEAL_PLANNER_LANDING}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
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
    width: FULL_WIDTH,
    height: 342,
    marginTop: 30,
  },
});

export default MealPlanLanding;
