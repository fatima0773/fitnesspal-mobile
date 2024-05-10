/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import styleSheet from '../../../utility/stylesheet';
import {AppColors} from '../../../utility/AppColors';
import {Text} from '@rneui/base';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import Modal from 'react-native-modal';
import {useEffect, useState} from 'react';
import ProfileHeader from './components/ProfileHeader';
import CommonButton from '../../common/CommonButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {InputField} from '../../common/InputField';
import {s} from 'react-native-size-matters';
const EditProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isKg, setIsKg] = useState(1);
  const [openUnitSelect, setOpenUnitSelect] = useState(false);
  const [unitSelect, setUnitSelect] = useState([
    {label: 'Kg', value: 0},
    {label: 'Pounds', value: 1},
  ]);
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
          <ProfileHeader pressHandler={() => setIsVisible(true)} />

          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {
                marginTop: 10,
                width: '100%',
              },
            ]}>
            Name
          </Text>
          <InputField
            placeholder="Enter Age"
            text={name}
            onChangeText={setName}
            keyboardType="number-pad"
          />
          <Text
            style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
            Age
          </Text>
          <InputField
            placeholder="Enter Age"
            text={age}
            onChangeText={setAge}
            keyboardType="number-pad"
          />
          <Text
            style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
            Weight
          </Text>
          <View style={[styles.inputContainer]}>
            <TextInput
              style={[styles.input, AppFontStyle.REGULAR_15]}
              placeholder={'Enter Weight'}
              placeholderTextColor={AppColors.lightGrey}
              defaultValue={weight}
              onChangeText={setWeight}
              keyboardType="number-pad"
            />
            <View style={styles.dropDownContainer}>
              <DropDownPicker
                open={openUnitSelect}
                value={isKg}
                items={unitSelect}
                setOpen={setOpenUnitSelect}
                setValue={setIsKg}
                setItems={setUnitSelect}
                style={{
                  marginBottom: 10,
                  backgroundColor: AppColors.white,
                  marginVertical: 5,
                  zIndex: 1000,
                  width: '100%',
                  borderWidth: 0,
                  height: 40,
                  margin: 0,
                }}
                labelStyle={{
                  color: AppColors.black,
                  fontFamily: 'Montserrat-Regular',
                }}
                textStyle={{
                  fontSize: 15,
                  color: AppColors.black,
                  fontFamily: 'Montserrat-Regular',
                }}
                dropDownContainerStyle={{
                  backgroundColor: AppColors.white,
                  borderWidth: 0.3,
                  borderColor: AppColors.lightGrey,
                }}
              />
            </View>
          </View>
          <Text
            style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
            Height
          </Text>
          <View style={[styles.inputContainer, {height: 40, zIndex: -100}]}>
            <TextInput
              style={[styles.input, AppFontStyle.REGULAR_15, {zIndex: -100}]}
              placeholder={'Enter Weight'}
              placeholderTextColor={AppColors.lightGrey}
              defaultValue={height}
              onChangeText={setHeight}
              keyboardType="number-pad"
            />
            {isKg === 0 ? (
              <Text style={[AppFontStyle.REGULAR_15, {marginHorizontal: 15}]}>
                cm{' '}
              </Text>
            ) : (
              <Text style={[AppFontStyle.REGULAR_15, {marginHorizontal: 15}]}>
                ft{' '}
              </Text>
            )}
          </View>

          <CommonButton
            // pressHandler={() =>
            //   props.navigation.navigate('DiseasesAndDisabilities')
            // }
            buttonStyles={styles.button}
            title={'Update Profile'}
          />
        </View>
      </ScrollView>
      <Modal
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="up"
        style={{
          margin: 0,
        }}>
        <View style={[styles.modalContainer, {height: '50%'}]}>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {textAlign: 'center', marginVertical: 30, width: '100%'},
            ]}>
            Reset Password
          </Text>

          <View style={styles.modalContentWrapper}>
            <Text
              style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
              Current Password
            </Text>
            <InputField
              placeholder="Enter Current Password"
              text={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={true}
            />

            <Text
              style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
              New Password
            </Text>
            <InputField
              placeholder="Enter New Password"
              text={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true}
            />
            <Text
              style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
              Confirm New Password
            </Text>
            <InputField
              placeholder="Confirm New Password"
              text={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry={true}
            />

            <CommonButton
              pressHandler={() => setIsVisible(false)}
              title={'Reset Password'}
              buttonStyles={{width: '100%', margin: 0, marginTop: 30}}
            />
          </View>
        </View>
      </Modal>
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
  inputContainer: {
    color: AppColors.primaryText,
    borderColor: AppColors.black,
    borderWidth: 0.7,
    paddingLeft: 10,
    borderRadius: 10,
    height: 60,
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    zIndex: -10,
    padding: 0,
    margin: 0,
  },
  input: {
    paddingHorizontal: s(5),
    flex: 1,
    zIndex: -10,
  },
  dropDownContainer: {
    flex: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.transparentBlack07,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 20,
    width: '90%',
    // backgroundColor: 'red',
  },
  modalContentWrapper: {
    padding: 15,
    backgroundColor: AppColors.white,
    justifyContent: 'space-evenly',
  },
});

export default EditProfile;
