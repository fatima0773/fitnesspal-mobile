/* eslint-disable react-hooks/exhaustive-deps */
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import MenuPageHeader from './components/MenuPageHeader';
import storage from '../../../utility/Storage';
import axios from 'axios';
const AppMenu = (props: any) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    fetchUserId();
  }, [userId]);

  const fetchUserId = async () => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    setUserId(auth.userId);
    getUser();
    getHealthProfile();
  };

  const getUser = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/user/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data.user.age));
        setAge(response.data.user.age);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  const getHealthProfile = async () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/health-profile/get-profile/${userId}`,
      headers: {},
      data: data,
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setWeight(response.data.weight);
        setHeight(response.data.height);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styleSheet.container, {padding: 15}]}>
          <MenuPageHeader
            email={email}
            name={name}
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
                {weight} kgs
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
                {height} cm
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
                {age} yrs
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
          {/* wellness facility locator */}
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => {
              props.navigation.navigate('WellnessFacilityLocator');
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="google-maps"
                color={AppColors.teal}
                size={20}
              />
              <Text
                style={[
                  AppFontStyle.MEDIUM_16,
                  {color: AppColors.accentText, marginHorizontal: 10},
                ]}>
                Wellness Facility Locator
              </Text>
            </View>
            <AntDesign name="right" size={20} color={AppColors.accentText} />
          </TouchableOpacity>

          {/* progress insights */}
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => props.navigation.navigate('ProgressInsights')}>
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
