/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {LogBox, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import styleSheet from '../../../utility/stylesheet';
import {AppColors} from '../../../utility/AppColors';
import HomeHeader from './components/HomeHeader';
import {Text} from '@rneui/base';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import BlackButton from '../../common/BlackButton';
import LinearGradient from 'react-native-linear-gradient';
import FullProgress from './components/FullProgress';
import WeeklyActivity from './components/WeeklyActivity';
import GetBackToTraining from './components/GetBackToTraining';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TodaysMeals from './components/TodaysMeals';
import PopularRecipes from './components/PopularRecipes';
import {useEffect} from 'react';
const Home = (props: any) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styleSheet.container, {padding: 15}]}>
          <HomeHeader
            pressHandler={() => props.navigation.navigate('GetStarted')}
          />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_18,
              {
                marginTop: 20,
                width: '100%',
              },
            ]}>
            Let’s see 4th Feb at a glance
          </Text>

          {/* at a glance stats */}
          <View style={[styleSheet.rowContainer, {marginTop: 20}]}>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.green, AppColors.teal]}
              style={styles.gradientContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                48 kgs
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.white,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                current weight
              </Text>
            </LinearGradient>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.teal, AppColors.teal]}
              style={styles.gradientContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                18 kgs/m2
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.white,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                current BMI
              </Text>
            </LinearGradient>
            <LinearGradient
              start={{x: 0.1, y: 0.25}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.teal, AppColors.green]}
              style={styles.gradientContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.white, width: '100%', textAlign: 'center'},
                ]}>
                52 kgs
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.white,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                target weight
              </Text>
            </LinearGradient>
          </View>

          <View style={[styleSheet.rowContainer, {marginVertical: 20}]}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_12,
                {
                  width: '50%',
                },
              ]}>
              Your BMI is within the normal Range
            </Text>
            <BlackButton
              title={'See Full Progress'}
              titleStyles={[
                AppFontStyle.SEMI_BOLD_12,
                {color: AppColors.white},
              ]}
              buttonStyles={styles.fullProgressButton}
            />
          </View>
          <FullProgress />

          {/* weekly stats */}
          <View style={[styleSheet.rowContainer, {marginTop: 50}]}>
            <Text style={AppFontStyle.SEMI_BOLD_18}>Weekly Activity</Text>
            <Text
              style={[
                AppFontStyle.MEDIUM_14,
                {
                  marginEnd: 10,
                  color: AppColors.teal,
                  textDecorationLine: 'underline',
                },
              ]}>
              View all
            </Text>
          </View>
          <WeeklyActivity />

          {/* get back to training */}
          <View style={[styleSheet.rowContainer, {marginTop: 50}]}>
            <Text style={AppFontStyle.SEMI_BOLD_18}>Get Back to Training</Text>
            <AntDesign
              size={28}
              name="arrowright"
              style={{
                marginEnd: 10,
              }}
            />
          </View>
          <GetBackToTraining />

          {/* today's meals */}
          <View style={[styleSheet.rowContainer, {marginTop: 50}]}>
            <Text style={AppFontStyle.SEMI_BOLD_18}>Today’s Meals</Text>
            <AntDesign
              size={28}
              name="arrowright"
              style={{
                marginEnd: 10,
              }}
            />
          </View>
          <TodaysMeals />

          {/* popular recipes */}
          <View style={[styleSheet.rowContainer, {marginTop: 50}]}>
            <Text style={AppFontStyle.SEMI_BOLD_18}>Popular Recipes</Text>
            <AntDesign
              size={28}
              name="arrowright"
              style={{
                marginEnd: 10,
              }}
            />
          </View>
          <PopularRecipes />
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
    width: 155,
    alignSelf: 'center',
    height: 175,
  },
  button: {
    backgroundColor: AppColors.purple,
    width: '100%',
    marginTop: 30,
  },
  fullProgressButton: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 7,
  },
  gradientContainer: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginEnd: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

export default Home;
