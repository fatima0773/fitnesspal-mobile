/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styleSheet from '../../../utility/stylesheet';
import {AppColors} from '../../../utility/AppColors';
import {useEffect} from 'react';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import TealGradientButton from '../../common/TealGradientButton';
import {AppImages} from '../../../utility/AppImages';
import {FULL_WIDTH} from '../../../utility/Constant';
const WorkoutPlanner = (props: any) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={AppImages.WORKOUT_LANDING_HEADER}
        style={{width: FULL_WIDTH, height: 492, position: 'absolute'}}
        resizeMode="contain"
      />
      <View
        style={[styleSheet.container, {paddingHorizontal: 15, marginTop: 400}]}>
        <Text style={[AppFontStyle.SEMI_BOLD_24, {textAlign: 'center'}]}>
          Best workouts for you
        </Text>
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_15,
            {
              color: AppColors.secondaryText,
              textAlign: 'center',
              marginVertical: 20,
            },
          ]}>
          You will have everything you need to reach your personal fitness goals
          - for free!
        </Text>
        <TealGradientButton
          title="Get Workout Plan"
          pressHandler={() => props.navigation.navigate('LastSession')}
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
  headerImage: {
    width: FULL_WIDTH,
    height: 342,
    marginTop: 30,
  },
});

export default WorkoutPlanner;
