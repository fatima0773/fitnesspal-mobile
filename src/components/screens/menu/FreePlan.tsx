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
import styleSheet from '../../../utility/stylesheet';
import {AppColors} from '../../../utility/AppColors';
import {useEffect} from 'react';
import CommonHeader from '../../common/CommonHeader';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import ManageCards from './components/ManageCards';
const FreePlan = (props: any) => {
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
          <CommonHeader title={'Subscription'} />
          <Text
            style={[
              AppFontStyle.BOLD_20,
              {
                width: '100%',
                color: AppColors.lightGrey,
                textAlign: 'center',
                marginVertical: 15,
              },
            ]}>
            You currently {'\n'}have the{' '}
            <Text
              style={{
                color: AppColors.teal,
              }}>
              Free
            </Text>{' '}
            Plan
          </Text>
          <View style={styles.infoHeader}>
            <Text style={[AppFontStyle.SEMI_BOLD_20, {color: AppColors.white}]}>
              Premium
            </Text>
          </View>
          <View style={styles.infoBody}>
            <View style={styles.featureContainer}>
              <FontAwesome5
                name="dumbbell"
                size={20}
                color={AppColors.accentText}
              />
              <View style={{margin: 15}}>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_15,
                    {color: AppColors.accentText},
                  ]}>
                  Health Risk Predictor
                </Text>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_13,
                    {color: AppColors.lightGrey},
                  ]}>
                  Stay ahead of health concerns
                </Text>
              </View>
            </View>

            <View style={styles.featureContainer}>
              <FontAwesome
                name="cutlery"
                size={25}
                color={AppColors.accentText}
              />
              <View style={{margin: 15}}>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_15,
                    {color: AppColors.accentText},
                  ]}>
                  Meal Planner
                </Text>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_13,
                    {color: AppColors.lightGrey},
                  ]}>
                  Smart insights for a healthier you
                </Text>
              </View>
            </View>

            <View style={styles.featureContainer}>
              <FontAwesome5
                name="chart-bar"
                size={25}
                color={AppColors.accentText}
              />
              <View style={{margin: 15}}>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_15,
                    {color: AppColors.accentText},
                  ]}>
                  Better Health Analytics
                </Text>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_13,
                    {color: AppColors.lightGrey},
                  ]}>
                  Effortless nutrition planning
                </Text>
              </View>
            </View>

            <View style={styles.featureContainer}>
              <MaterialCommunityIcons
                name="table-heart"
                size={25}
                color={AppColors.accentText}
              />
              <View style={{margin: 15}}>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_15,
                    {color: AppColors.accentText},
                  ]}>
                  Soft Exercises (Menstrual Week)
                </Text>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_13,
                    {color: AppColors.lightGrey},
                  ]}>
                  Gentle workouts for women's wellness
                </Text>
              </View>
            </View>

            <Text
              style={[
                AppFontStyle.MEDIUM_14,
                {color: AppColors.teal, width: '100%', textAlign: 'right'},
              ]}>
              *Inclusive of Free features
            </Text>
          </View>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30,
            }}>
            <LinearGradient
              start={{x: 0.19, y: 0.55}}
              end={{x: 0.9, y: 1.0}}
              colors={[AppColors.teal, AppColors.green]}
              style={{
                padding: 10,
                paddingHorizontal: 25,
                borderRadius: 10,
              }}>
              <Text
                style={[AppFontStyle.SEMI_BOLD_20, {color: AppColors.white}]}>
                Subscribe $25/month
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <ManageCards
            pressHandler={() => props.navigation.navigate('AddNewCard')}
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
  button: {
    backgroundColor: AppColors.purple,
    width: '100%',
    marginTop: 30,
  },
  infoHeader: {
    width: '100%',
    backgroundColor: AppColors.accentText,
    padding: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginTop: 20,
  },
  infoBody: {
    width: '100%',
    backgroundColor: AppColors.white,
    padding: 10,
    borderEndStartRadius: 10,
    borderEndEndRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: AppColors.accentText,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default FreePlan;
