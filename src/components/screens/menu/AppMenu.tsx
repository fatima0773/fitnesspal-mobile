/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import styleSheet from '../../../utility/stylesheet';
import {AppColors} from '../../../utility/AppColors';
import {Text} from '@rneui/base';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';
import MenuPageHeader from './components/MenuPageHeader';
const AppMenu = (props: any) => {
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
          <MenuPageHeader
            pressHandler={() => props.navigation.navigate('EditProfile')}
          />

          {/* stats */}
          <View style={[styleSheet.rowContainer, {marginVertical: 20}]}>
            <View style={styles.statContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.purple, width: '100%', textAlign: 'center'},
                ]}>
                48 kgs
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.primaryText,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                weight
              </Text>
            </View>
            <View style={styles.statContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.purple, width: '100%', textAlign: 'center'},
                ]}>
                180 cm
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.primaryText,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                height
              </Text>
            </View>
            <View style={styles.statContainer}>
              <Text
                style={[
                  AppFontStyle.BOLD_20,
                  {color: AppColors.purple, width: '100%', textAlign: 'center'},
                ]}>
                22 yrs
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.primaryText,
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 5,
                  },
                ]}>
                age
              </Text>
            </View>
          </View>

          {/* menu options */}
          {/* progress insights */}
          <TouchableOpacity style={styles.menuOption}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="progress-clock"
                color={AppColors.teal}
                size={20}
              />
              <Text
                style={[
                  AppFontStyle.MEDIUM_16,
                  {color: AppColors.accentText, marginHorizontal: 10},
                ]}>
                Progress Insights
              </Text>
            </View>
            <AntDesign name="right" size={20} color={AppColors.accentText} />
          </TouchableOpacity>

          {/* subscription */}
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => props.navigation.navigate('FreePlan')}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="creditcard" size={20} color={AppColors.teal} />
              <Text
                style={[
                  AppFontStyle.MEDIUM_16,
                  {color: AppColors.accentText, marginHorizontal: 10},
                ]}>
                Subscription
              </Text>
            </View>
            <AntDesign name="right" size={20} color={AppColors.accentText} />
          </TouchableOpacity>

          {/* notification */}
          <TouchableOpacity style={styles.menuOption}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="notifications" color={AppColors.teal} size={20} />
              <Text
                style={[
                  AppFontStyle.MEDIUM_16,
                  {color: AppColors.accentText, marginHorizontal: 10},
                ]}>
                Notifications
              </Text>
            </View>
            <AntDesign name="right" size={20} color={AppColors.accentText} />
          </TouchableOpacity>

          {/* delete account */}
          <TouchableOpacity style={styles.menuOption}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="delete-outline"
                color={AppColors.teal}
                size={20}
              />
              <Text
                style={[
                  AppFontStyle.MEDIUM_16,
                  {color: AppColors.accentText, marginHorizontal: 10},
                ]}>
                Delete Account
              </Text>
            </View>
            <AntDesign name="right" size={20} color={AppColors.accentText} />
          </TouchableOpacity>

          {/* contact */}
          <TouchableOpacity style={styles.menuOption}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="envelope-o" color={AppColors.teal} size={20} />
              <Text
                style={[
                  AppFontStyle.MEDIUM_16,
                  {color: AppColors.accentText, marginHorizontal: 10},
                ]}>
                Contact Us
              </Text>
            </View>
            <AntDesign name="right" size={20} color={AppColors.accentText} />
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity style={styles.menuOption}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name="privacy-tip"
                color={AppColors.teal}
                size={20}
              />
              <Text
                style={[
                  AppFontStyle.MEDIUM_16,
                  {color: AppColors.accentText, marginHorizontal: 10},
                ]}>
                Privacy Policy
              </Text>
            </View>
            <AntDesign name="right" size={20} color={AppColors.accentText} />
          </TouchableOpacity>
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
  statContainer: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.transparentBlack07,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    marginEnd: 10,
    padding: 10,
    flex: 1,
    paddingVertical: 20,
  },
  menuOption: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.transparentBlack07,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flex: 1,
    width: '100%',
    marginTop: 18,
    marginEnd: 10,
    flexDirection: 'row',
    borderRadius: 15,
    padding: 15,
  },
});

export default AppMenu;
