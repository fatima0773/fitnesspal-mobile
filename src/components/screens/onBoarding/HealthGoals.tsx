/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  LogBox,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import LogoHeader from '../../common/LogoHeader';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {AppColors} from '../../../utility/AppColors';
import {useEffect, useState} from 'react';
import styleSheet from '../../../utility/stylesheet';
import CommonButton from '../../common/CommonButton';
import StepProgressIndicator from '../../common/StepProgressIndicator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s} from 'react-native-size-matters';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {AppImages} from '../../../utility/AppImages';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  createHealthProfile,
  createNutritionalProfile,
  updateAgeAndGender,
} from '../../../services/healthProfile.services';

interface RouteParams {
  gender: string;
  age: number;
  weight: number;
  height: number;
  isPound: boolean;
  bmi: number;
  diseases: [string];
  disabilities: [string];
  subdiseases: [string];
  subdisabilities: [string];
}

const HealthGoals = (props: any) => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {
    gender,
    age,
    weight,
    height,
    isPound,
    bmi,
    diseases,
    disabilities,
    subdisabilities,
    subdiseases,
  } = route.params;

  const [targetWeight, setTargetWeight] = useState('');
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const [isTargetWeightModal, setIsTargetWeightModal] = useState(false);
  const [isShowAnalysisModal, setIsShowAnalysisModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Please fill all the required fields',
  );

  const finishRegistration = async () => {
    setIsTargetWeightModal(false);
    try {
      // Send a request to send OTP
      const healthProfileResponse = await createHealthProfile({
        weight,
        height,
        bmi,
        diseases,
        disabilities,
        subdiseases,
        subdisabilities,
        targetWeight: parseInt(targetWeight, 10),
        toningAreas: [''],
        age,
        gender,
        isPound,
      });

      const nutritionalProfileResponse = await createNutritionalProfile();

      const updateProfileResponse = await updateAgeAndGender({
        age,
        gender,
      });

      // Extract message and status from the healthProfileResponse
      const healthProfileMessage = healthProfileResponse.data.message;
      const healthProfileStatus = healthProfileResponse.status;

      if (healthProfileStatus === 200) {
        // If sending OTP is successful
        setShowError(false);
        props.navigation.navigate('Tab', {
          screen: 'Home',
        });
      } else {
        setShowError(true);
        setErrorMessage(healthProfileMessage);
      }
    } catch (error: any) {
      setShowError(true);
      setErrorMessage(error.healthProfileResponse.data.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styleSheet.container, {padding: 15}]}>
          <LogoHeader />
          <StepProgressIndicator currentStep={4} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {textAlign: 'center', marginVertical: 10, width: '100%'},
            ]}>
            What is Your Health Goal?
          </Text>
          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {marginVertical: 10, textAlign: 'center', marginBottom: 30},
            ]}>
            Define your path to better health with personalized goals,
            empowering you to achieve optimal wellness and fitness
          </Text>
          <View style={styles.currentBmiContainer}>
            <TouchableOpacity
              style={styles.showAnalysisBtn}
              onPress={() => setIsShowAnalysisModal(true)}>
              <Text
                style={[AppFontStyle.SEMI_BOLD_12, {color: AppColors.purple}]}>
                Show Analysis
              </Text>
            </TouchableOpacity>
            <Text style={[AppFontStyle.SEMI_BOLD_15, {color: AppColors.white}]}>
              Current BMI
            </Text>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_24,
                {color: AppColors.white, marginVertical: 5},
              ]}>
              {bmi} kg/m2
            </Text>
          </View>

          <TouchableOpacity
            style={styles.goalContainer}
            onPress={() => setIsTargetWeightModal(true)}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_24,
                {color: AppColors.purple, marginVertical: 5},
              ]}>
              Be healthier
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.goalContainer}
            onPress={() => setIsTargetWeightModal(true)}>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_24,
                {color: AppColors.purple, marginVertical: 5},
              ]}>
              Lose or Gain Weight
            </Text>
          </TouchableOpacity>

          <Image
            source={AppImages.DRINKING}
            style={styles.drinkingImage}
            resizeMode="contain"
          />
          <CommonButton
            buttonStyles={styles.button}
            pressHandler={() => props.navigation.navigate('Tab')}
            title={'Finish'}
          />
        </View>
      </ScrollView>
      <Modal
        onBackdropPress={() => setIsTargetWeightModal(false)}
        isVisible={isTargetWeightModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="up"
        style={{
          margin: 0,
        }}>
        <View style={styles.modalContainer}>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {textAlign: 'center', marginVertical: 30, width: '100%'},
            ]}>
            Target Weight
          </Text>

          <View style={styles.modalContentWrapper}>
            {/* <Text
              style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
              Current Weight
            </Text> */}
            {/* <View style={[styles.inputContainer]}>
              <TextInput
                style={[styles.input, AppFontStyle.REGULAR_15]}
                placeholder={'Enter Current Weight'}
                placeholderTextColor={AppColors.lightGrey}
                value={currentWeight}
                onChangeText={setCurrentWeight}
                keyboardType="number-pad"
              />
              <Text style={[AppFontStyle.REGULAR_15, {marginHorizontal: 15}]}>
                {isPound === true ? 'Pound' : 'Kg'}
              </Text>
            </View> */}
            <Text
              style={[AppFontStyle.REGULAR_15, {marginTop: 10, width: '100%'}]}>
              Target Weight
            </Text>
            <View style={[styles.inputContainer, {height: 40, zIndex: -100}]}>
              <TextInput
                onChangeText={setTargetWeight}
                style={[styles.input, AppFontStyle.REGULAR_15, {zIndex: -100}]}
                placeholder={'Enter Target Weight'}
                placeholderTextColor={AppColors.lightGrey}
                value={targetWeight}
                keyboardType="number-pad"
              />
              <Text style={[AppFontStyle.REGULAR_15, {marginHorizontal: 15}]}>
                {isPound === true ? 'Pound' : 'Kg'}
              </Text>
            </View>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_15,
                {
                  marginTop: 50,
                  width: '100%',
                  textAlign: 'center',
                  color: AppColors.primaryText,
                },
              ]}>
              New BMI according to your target currentWeight
            </Text>
            <Text
              style={[
                AppFontStyle.BOLD_30,
                {
                  marginVertical: 15,
                  width: '100%',
                  textAlign: 'center',
                  color: AppColors.primaryText,
                },
              ]}>
              {bmi} kg/m2
            </Text>
            <CommonButton
              title={'Set Goal'}
              pressHandler={finishRegistration}
            />
          </View>
        </View>
      </Modal>

      <Modal
        onBackdropPress={() => setIsShowAnalysisModal(false)}
        isVisible={isShowAnalysisModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="up"
        style={{
          margin: 0,
        }}>
        <View style={[styles.modalContainer, {height: '40%'}]}>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {textAlign: 'center', marginVertical: 30, width: '100%'},
            ]}>
            BMI Analysis
          </Text>

          <View style={styles.modalContentWrapper}>
            <View style={[styleSheet.rowContainer, {marginVertical: 10}]}>
              <Text style={[AppFontStyle.REGULAR_15, {marginTop: 10}]}>
                Current BMI
              </Text>
              <Text style={[AppFontStyle.SEMI_BOLD_15, {marginTop: 10}]}>
                {bmi} kg/m2
              </Text>
            </View>

            <View style={[styleSheet.rowContainer, {marginVertical: 10}]}>
              <Text style={[AppFontStyle.REGULAR_15, {marginTop: 10, flex: 1}]}>
                Healthy BMI Range
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_15,
                  {marginTop: 10, flex: 1, textAlign: 'right'},
                ]}>
                18.5 kg/m2 - 18.5 kg/m2
              </Text>
            </View>

            <View style={[styleSheet.rowContainer, {marginVertical: 10}]}>
              <Text style={[AppFontStyle.REGULAR_15, {marginTop: 10, flex: 1}]}>
                Healthy Weight for Height
              </Text>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_15,
                  {marginTop: 10, flex: 1, textAlign: 'right'},
                ]}>
                47.4 kg - 64 kg
              </Text>
            </View>
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
    zIndex: -10,
  },
  headerImage: {
    width: 155,
    alignSelf: 'center',
    height: 175,
    zIndex: -10,
  },
  button: {
    backgroundColor: AppColors.purple,
    width: '100%',
    marginTop: 0,
    zIndex: -1000,
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
    flex: 0.6,
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
    height: '60%',
    width: '90%',
  },
  modalHeader: {
    backgroundColor: AppColors.purple,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: s(45),
    justifyContent: 'center',
    paddingHorizontal: s(15),
  },
  modalContentWrapper: {
    padding: 15,
    backgroundColor: AppColors.white,
    justifyContent: 'space-evenly',
  },
  currentBmiContainer: {
    backgroundColor: AppColors.purple,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
  },
  showAnalysisBtn: {
    alignSelf: 'flex-end',
    backgroundColor: AppColors.white,
    padding: 8,
    borderRadius: 8,
  },
  goalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.purple,
    width: '100%',
    borderRadius: 14,
    padding: 10,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  drinkingImage: {
    width: 160,
    height: 190,
    alignSelf: 'flex-end',
    marginBottom: -15,
    marginTop: 20,
  },
});

export default HealthGoals;
