/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  LogBox,
  SafeAreaView,
  ScrollView,
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
import {FULL_HEIGHT, FULL_WIDTH} from '../../../utility/Constant';
import BlackButton from '../../common/BlackButton';
const WorkoutLevel = (props: any) => {
  const workoutLevelOptions = [
    {label: 'Beginner', value: 1},
    {label: 'Intermediate', value: 2},
    {label: 'Advanced', value: 3},
  ];
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const [selectedOption, setSelectedOption] = useState(0);
  console.log(selectedOption);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
            What is your workout level?{'\n'}
            {'\n'}
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_15,
                {
                  textAlign: 'left',
                  color: AppColors.secondaryText,
                },
              ]}>
              To ensure we create a workout plan that's effective and safe for
              you, we need more information about you.
            </Text>
          </Text>
          {workoutLevelOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionContainer,
                selectedOption === item.value && styles.selectedOptionContainer,
              ]}
              onPress={() => setSelectedOption(item.value)}>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_17,
                  {marginHorizontal: 20},
                  selectedOption === item.value && {color: AppColors.white},
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          <BlackButton
            title="Next"
            pressHandler={() => props.navigation.navigate('ToningAreas')}
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
  strokes: {
    width: FULL_WIDTH,
    marginTop: 30,
    position: 'absolute',
    top: FULL_HEIGHT / 2.2,
  },
  food: {
    width: FULL_WIDTH,
    marginTop: 30,
    position: 'absolute',
    top: FULL_HEIGHT / 2.4,
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

export default WorkoutLevel;
