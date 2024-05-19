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
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {FULL_HEIGHT, FULL_WIDTH} from '../../../utility/Constant';
import SkipNextButton from '../../common/SkipNextButton';
import {Switch} from '@rneui/themed';
const WorkoutRoutines = (props: any) => {
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const workoutRoutines = [
    {
      name: 'Shoulders',
      desc: 'Target the muscles in your shoulders to enhance strength and definition',
    },
    {
      name: 'Arms',
      desc: 'Focus on toning the muscles in your arms for improved definition and sculpted appearance',
    },
    {
      name: 'Back',
      desc: 'Strengthen and define your back muscles for better posture and overall upper body strength',
    },
    {
      name: 'Chest',
      desc: 'Tone and sculpt your chest muscles to enhance upper body strength and appearance',
    },
    {
      name: 'Core',
      desc: 'Work on strengthening your core muscles for improved stability, balance, and posture',
    },
    {
      name: 'Legs',
      desc: 'Target your leg muscles to improve strength, endurance, and overall lower body tone',
    },
    {
      name: 'Glutes',
      desc: 'Focus on toning and defining your glute muscles for a firmer and more sculpted appearance',
    },
    {
      name: 'Full Body',
      desc: 'Engage in a comprehensive workout targeting multiple muscle groups simultaneously for overall strength and fitness improvement',
    },
  ];
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{padding: 15, paddingHorizontal: 25}}>
        <View
          style={{
            // paddingHorizontal: 15,
            alignItems: 'center',
          }}>
          <LogoHeader />
        </View>

        {/* <ThreeStepProgress currentStep={2} /> */}

        <Text
          style={[
            AppFontStyle.SEMI_BOLD_24,
            {
              textAlign: 'left',
              width: '100%',
              marginVertical: 20,
            },
          ]}>
          Workout Routines
        </Text>
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_15,
            {
              textAlign: 'left',
              color: AppColors.secondaryText,
            },
          ]}>
          Tailored exercises for your fitness goals await!
        </Text>

        {workoutRoutines.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionContainer,
              selectedOption === index && styles.selectedOptionContainer,
            ]}
            onPress={() => setSelectedOption(index)}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_17,
                {marginHorizontal: 20},
                selectedOption === index && {color: AppColors.white},
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                AppFontStyle.MEDIUM_11,
                {
                  marginHorizontal: 20,
                  color: AppColors.secondaryText,
                  marginVertical: 2,
                },
                selectedOption === index && {color: AppColors.white},
              ]}>
              {item.desc}
            </Text>
          </TouchableOpacity>
        ))}
        <View
          style={[
            styles.optionContainer,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
              backgroundColor: AppColors.lightTeal,
            },
          ]}>
          <Text
            style={[
              AppFontStyle.MEDIUM_15,
              {
                textAlign: 'left',
              },
            ]}>
            Enable Realtime Feedback
          </Text>
          <Switch
            color={AppColors.teal}
            value={checked}
            onValueChange={value => setChecked(value)}
          />
        </View>
        <SkipNextButton
          containerStyle={{marginTop: 30}}
          skipButtonHandler={() => props.navigation.navigate('WorkoutPlanner')}
          nextButtonHandler={() => {
            props.navigation.navigate('WorkoutLanding', {
              selectedRoutine: selectedOption,
              feedbackEnabled: checked,
            });
          }}
        />
        <View style={{marginVertical: 20}} />
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
  allergyItem: {
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 90,
    borderWidth: 1,
  },
  allergyItemActive: {
    backgroundColor: AppColors.teal,
    color: AppColors.white,
    borderColor: AppColors.white,
  },
  allergyText: {
    fontSize: 16,
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
    // width: FULL_WIDTH - 60,
    paddingVertical: 20,
    marginVertical: 10,
    width: '100%',
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

export default WorkoutRoutines;
