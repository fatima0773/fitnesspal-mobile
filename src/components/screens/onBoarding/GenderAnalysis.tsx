/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {LogBox, StyleSheet, Text, View} from 'react-native';
import LogoHeader from '../../common/LogoHeader';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {InputField} from '../../common/InputField';
import {AppColors} from '../../../utility/AppColors';
import {useEffect, useState} from 'react';
import styleSheet from '../../../utility/stylesheet';
import CommonButton from '../../common/CommonButton';
import StepProgressIndicator from '../../common/StepProgressIndicator';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native';
import {s} from 'react-native-size-matters';
import {ScrollView} from 'react-native-gesture-handler';
import {FULL_WIDTH} from '../../../utility/Constant';

const GenderAnalysis = (props: any) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(0);
  const [genderOptions, setGenderOptions] = useState([
    {label: 'Male', value: 0},
    {label: 'Female', value: 1},
    {label: 'Neutral', value: 2},
  ]);
  const [isKg, setIsKg] = useState(1);
  const [openUnitSelect, setOpenUnitSelect] = useState(false);
  const [unitSelect, setUnitSelect] = useState([
    {label: 'Kg', value: 0},
    {label: 'Pounds', value: 1},
  ]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Please fill all the required fields',
  );
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const handleNext = () => {
    if (!age || !weight || !height) {
      setShowError(true);
      setErrorMessage('Please fill all the required fields');
    } else {
      setShowError(false);
      if (weight && height) {
        let bmiValue;
        if (!isKg) {
          let heightInMeter = parseFloat(height) / 100;
          bmiValue = parseFloat(weight) / (heightInMeter * heightInMeter);
        } else {
          const weightInKilograms = parseFloat(weight) * 0.453592;
          console.log(weightInKilograms);
          let heightInMeter = parseFloat(height) * 0.3048;
          console.log(heightInMeter);
          bmiValue = weightInKilograms / (heightInMeter * heightInMeter);
        }

        props.navigation.navigate('DiseasesAndDisabilities', {
          gender: gender === 0 ? 'Male' : gender === 1 ? 'Female' : 'Neutral',
          age: parseInt(age, 10),
          weight: parseInt(weight, 10),
          height: parseInt(height, 10),
          isPound: isKg === 1 ? true : false,
          bmi: bmiValue.toFixed(2),
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: FULL_WIDTH, paddingHorizontal: 5}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styleSheet.container, {padding: 15}]}>
          <LogoHeader />
          <StepProgressIndicator currentStep={2} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {textAlign: 'center', marginVertical: 10},
            ]}>
            Personalized Health Insights
          </Text>
          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {marginVertical: 10, textAlign: 'center', marginBottom: 30},
            ]}>
            Customize your health journey by selecting diseases and disabilities
            for personalized fitness and wellness guidance
          </Text>
          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {
                marginTop: 10,
                width: '100%',
              },
            ]}>
            Gender
          </Text>
          <DropDownPicker
            open={open}
            value={gender}
            items={genderOptions}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setGenderOptions}
            style={{
              marginBottom: 15,
              backgroundColor: AppColors.white,
              borderBlockColor: AppColors.black,
              borderColor: AppColors.black,
              borderRadius: 10,
              marginVertical: 10,
              zIndex: 1000,
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
              borderWidth: 0.7,
              borderColor: AppColors.black,
              zIndex: 3,
              padding: 5,
            }}
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
              placeholder={'Enter Height'}
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
          {showError && (
            <View
              style={{
                backgroundColor: AppColors.errorMsgBgc,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                padding: 10,
                marginVertical: 10,
                width: '100%',
              }}>
              <Text
                style={[
                  AppFontStyle.SEMI_BOLD_12,
                  {
                    color: AppColors.errorMsgText,
                    textAlign: 'center',
                  },
                ]}>
                {errorMessage}
              </Text>
            </View>
          )}

          <CommonButton
            pressHandler={handleNext}
            buttonStyles={styles.button}
            title={'Next'}
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
    marginTop: 30,
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
    flex: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 0,
  },
});

export default GenderAnalysis;
