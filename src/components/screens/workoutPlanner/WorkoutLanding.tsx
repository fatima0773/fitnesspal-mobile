/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {AppColors} from '../../../utility/AppColors';
import {useEffect, useState} from 'react';
import {
  arms,
  back,
  chest,
  core,
  full_body,
  glutes,
  legs,
  shoulder,
} from '../../../utility/workoutPlan';
import {FULL_WIDTH} from '../../../utility/Constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface RouteParams {
  selectedRoutine: any;
  feedbackEnabled: boolean;
}

const WorkoutLanding = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {selectedRoutine, feedbackEnabled} = route.params;
  const [routine, setRoutine] = useState<any>(shoulder);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedRoutineName, setSelectedRoutineName] = useState('Shoulder');
  const handleDaySelect = (day: any) => {
    setSelectedDay(day);
  };
  const renderDay = (day: any, index: any) => (
    <TouchableOpacity
      key={index}
      style={{
        padding: 10,
        backgroundColor:
          selectedDay === day ? AppColors.lightTeal : 'transparent',
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 30,
      }}
      onPress={() => handleDaySelect(day)}>
      <Text
        style={[
          AppFontStyle.REGULAR_14,
          {marginVertical: 2, color: AppColors.primaryText},
        ]}>
        Day
      </Text>
      <Text style={[AppFontStyle.SEMI_BOLD_19]}>0{day}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (selectedRoutine === 0) {
      setRoutine(shoulder);
      setSelectedRoutineName('Shoulder');
    } else if (selectedRoutine === 1) {
      setRoutine(arms);
      setSelectedRoutineName('Arms');
    } else if (selectedRoutine === 2) {
      setRoutine(back);
      setSelectedRoutineName('Back');
    } else if (selectedRoutine === 3) {
      setRoutine(chest);
      setSelectedRoutineName('Chest');
    } else if (selectedRoutine === 4) {
      setRoutine(core);
      setSelectedRoutineName('Core');
    } else if (selectedRoutine === 5) {
      setRoutine(legs);
      setSelectedRoutineName('Legs');
    } else if (selectedRoutine === 6) {
      setRoutine(glutes);
      setSelectedRoutineName('Glutes');
    } else if (selectedRoutine === 7) {
      setRoutine(full_body);
      setSelectedRoutineName('Full Body');
    }
    console.log();
  }, [selectedRoutine]);

  const renderRoutine = () => {
    return (
      <View>
        {routine[selectedDay].exercises.map((item: any, index: any) => (
          <View style={styles.optionContainer} key={index}>
            <View style={styles.rowContainer}>
              <View>
                <Text
                  style={[
                    AppFontStyle.BOLD_20,
                    {color: AppColors.primaryText, marginBottom: 5},
                  ]}>
                  {item.exercise}
                </Text>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_14,
                    {color: AppColors.secondaryText},
                  ]}>
                  Sets: {item.sets},{' '}
                  <Text
                    style={[
                      AppFontStyle.MEDIUM_14,
                      {color: AppColors.secondaryText},
                    ]}>
                    Reps: {item.reps}
                  </Text>
                </Text>
              </View>
              <AntDesign
                name="rightcircleo"
                size={25}
                color={AppColors.lightText}
              />
              {/* <View>
                <Text style={AppFontStyle.MEDIUM_14}>Sets: {item.sets}</Text>
                <Text style={AppFontStyle.MEDIUM_14}>Reps: {item.reps}</Text>
              </View> */}
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={AppFontStyle.SEMI_BOLD_28}>Workout Plan</Text>
      <View style={{width: '90%', marginTop: 25}}>
        <Text style={AppFontStyle.SEMI_BOLD_20}>Hello Fatima</Text>
        {/* <Text
          style={[
            AppFontStyle.SEMI_BOLD_12,
            {marginVertical: 10, color: AppColors.primaryText},
          ]}>
          Your Tailored Workout Plan Awaits! Let's Dig In
        </Text> */}
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_16,
            {color: AppColors.teal, marginVertical: 10},
          ]}>
          {selectedRoutineName} Workout Routine Awaits!
        </Text>
      </View>
      <ScrollView
        style={{padding: 15, width: FULL_WIDTH}}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <ScrollView
          horizontal
          style={{alignSelf: 'center'}}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {[1, 2, 3, 4, 5, 6, 7].map(renderDay)}
        </ScrollView>
        <ScrollView style={{flex: 1, width: '100%'}}>
          {renderRoutine()}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
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
    paddingVertical: 20,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default WorkoutLanding;
