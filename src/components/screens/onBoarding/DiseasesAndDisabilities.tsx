/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {LogBox, StyleSheet, Text, View} from 'react-native';
import LogoHeader from '../../common/LogoHeader';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {AppColors} from '../../../utility/AppColors';
import {useEffect, useState} from 'react';
import styleSheet from '../../../utility/stylesheet';
import CommonButton from '../../common/CommonButton';
import StepProgressIndicator from '../../common/StepProgressIndicator';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s} from 'react-native-size-matters';
import {ScrollView} from 'react-native-gesture-handler';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  disabilities,
  diseases,
  subDisabilities,
  subDiseases,
} from '../../../utility/diseasesAndDisabilities';
interface RouteParams {
  gender: string;
  age: number;
  weight: number;
  height: number;
  isPound: boolean;
  bmi: number;
}
const DiseasesAndDisabilities = (props: any) => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {gender, age, weight, height, isPound, bmi} = route.params;
  console.log(gender, age, weight, height, isPound, bmi);
  const [diseaseOpen, setDiseaseOpen] = useState(false);
  const [subDiseaseOpen, setSubDiseaseOpen] = useState(false);

  const [disabilityOpen, setDisabilityOpen] = useState(false);
  const [subDisabilityOpen, setSubDisabilityOpen] = useState(false);

  const [disease, setDisease] = useState(0);
  const [subdisease, setSubDisease] = useState(-1);

  const [disability, setDisability] = useState(0);
  const [subdisability, setSubDisability] = useState(-1);

  const [diseaseOptions, setDiseaseOptions] = useState(diseases);
  const [subDiseaseOptions, setSubDiseaseOptions] = useState(
    subDiseases[disease],
  );

  const [disabilityOptions, setDisabilityOptions] = useState(disabilities);
  const [subDisabilityOptions, setSubDisabilityOptions] = useState(
    subDisabilities[disability],
  );

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  console.log(disease, disability);
  console.log(disease, disability, subdisease, subdisability);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styleSheet.container, {padding: 15}]}>
          <LogoHeader />
          <StepProgressIndicator currentStep={3} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {textAlign: 'center', marginVertical: 10},
            ]}>
            Health Profile
          </Text>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_20,
              {marginVertical: 10, width: '100%'},
            ]}>
            Diseases
          </Text>
          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {textAlign: 'left', marginBottom: 30},
            ]}>
            Choose from a range of common and specific health conditions that
            may impact your fitness and wellness journey.
          </Text>

          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {textAlign: 'left', width: '100%'},
            ]}>
            Disease
          </Text>
          <View style={{zIndex: 10000}}>
            <DropDownPicker
              open={diseaseOpen}
              value={disease}
              items={diseaseOptions}
              setOpen={setDiseaseOpen}
              setValue={setDisease}
              setItems={setDiseaseOptions}
              style={{
                marginBottom: 15,
                backgroundColor: AppColors.white,
                borderBlockColor: AppColors.black,
                borderColor: AppColors.black,
                borderRadius: 10,
                marginVertical: 10,
                zIndex: 100,
              }}
              labelStyle={{
                color: AppColors.black,
                fontFamily: 'Montserrat-Regular',
                zIndex: 100,
              }}
              textStyle={{
                fontSize: 15,
                color: AppColors.black,
                fontFamily: 'Montserrat-Regular',
                zIndex: 100,
              }}
              dropDownContainerStyle={{
                backgroundColor: AppColors.white,
                borderWidth: 0.7,
                borderColor: AppColors.black,
                zIndex: 10000000,
                padding: 5,
              }}
            />
          </View>

          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {textAlign: 'left', width: '100%'},
            ]}>
            Associated Conditions
          </Text>

          <DropDownPicker
            open={subDiseaseOpen}
            value={subdisease}
            items={subDiseases[disease]}
            setOpen={setSubDiseaseOpen}
            setValue={setSubDisease}
            setItems={setSubDiseaseOptions}
            style={{
              marginBottom: 15,
              backgroundColor: AppColors.white,
              borderBlockColor: AppColors.black,
              borderColor: AppColors.black,
              borderRadius: 10,
              marginVertical: 10,
              zIndex: -9,
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
              zIndex: 10,
              padding: 5,
            }}
          />

          <Text
            style={[
              AppFontStyle.SEMI_BOLD_20,
              {marginVertical: 10, width: '100%'},
            ]}>
            Disabilities
          </Text>
          <Text
            style={[
              AppFontStyle.REGULAR_15,
              {textAlign: 'left', marginBottom: 30},
            ]}>
            Choose from a variety of common and specific disabilities that could
            influence your fitness and wellness journey.
          </Text>

          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {textAlign: 'left', width: '100%'},
            ]}>
            Disability
          </Text>
          <View style={{zIndex: 20000}}>
            <DropDownPicker
              open={disabilityOpen}
              value={disability}
              items={disabilityOptions}
              setOpen={setDisabilityOpen}
              setValue={setDisability}
              setItems={setDisabilityOptions}
              style={{
                marginBottom: 15,
                backgroundColor: AppColors.white,
                borderBlockColor: AppColors.black,
                borderColor: AppColors.black,
                borderRadius: 10,
                marginVertical: 10,
                zIndex: 8,
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
          </View>

          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {textAlign: 'left', width: '100%'},
            ]}>
            Associated Conditions
          </Text>

          <View style={{zIndex: 10000}}>
            <DropDownPicker
              open={subDisabilityOpen}
              value={subdisability}
              items={subDisabilities[disability]}
              setOpen={setSubDisabilityOpen}
              setValue={setSubDisability}
              setItems={setSubDisabilityOptions}
              style={{
                marginBottom: 15,
                backgroundColor: AppColors.white,
                borderBlockColor: AppColors.black,
                borderColor: AppColors.black,
                borderRadius: 10,
                marginVertical: 10,
                zIndex: 7,
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
          </View>

          <CommonButton
            pressHandler={() =>
              props.navigation.navigate('HealthGoals', {
                gender,
                age,
                weight,
                height,
                isPound,
                bmi,
                diseases: [diseases[disease].label],
                disabilities: [disabilities[disability].label],
                subdiseases: [subDiseases[disease][subdisease].label],
                subdisabilities: [
                  subDisabilities[disability][subdisability].label,
                ],
              })
            }
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

export default DiseasesAndDisabilities;
