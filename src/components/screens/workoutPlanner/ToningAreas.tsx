/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  FlatList,
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../../utility/AppColors';
import {useEffect, useState} from 'react';
import LogoHeader from '../../common/LogoHeader';
import ThreeStepProgress from '../../common/ThreeStepProgress';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {FULL_HEIGHT, FULL_WIDTH} from '../../../utility/Constant';
import SkipNextButton from '../../common/SkipNextButton';
const ToningAreas = (props: any) => {
  const toningAreas = [
    'Shoulders',
    'Arms',
    'Back',
    'Chest',
    'Core',
    'Legs',
    'Glutes',
    'Full Body',
  ];
  const [selectedToningAreas, setSelectedAllergies] = useState<string[]>([]);

  const handleAllergyPress = (allergy: any) => {
    const isSelected = selectedToningAreas.includes(allergy);

    setSelectedAllergies(prevState => {
      const updatedSelection = [...prevState]; // Create a copy to avoid mutation
      if (isSelected) {
        updatedSelection.splice(updatedSelection.indexOf(allergy), 1);
      } else {
        updatedSelection.push(allergy);
      }
      return updatedSelection;
    });
  };

  const renderItem = ({item}: any) => {
    const isSelected = selectedToningAreas.includes(item);

    return (
      <TouchableOpacity
        key={item}
        style={[styles.allergyItem, isSelected && styles.allergyItemActive]}
        onPress={() => handleAllergyPress(item)}>
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_15,
            styles.allergyText,
            isSelected && {color: AppColors.white},
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            alignItems: 'center',
          }}>
          <LogoHeader />
          <ThreeStepProgress currentStep={2} />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {
                textAlign: 'left',
                marginVertical: 20,
              },
            ]}>
            Which areas are you looking to tone?
          </Text>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {
                textAlign: 'left',
                color: AppColors.secondaryText,
              },
            ]}>
            To ensure we create a workout plan that's effective and safe for
            you, we need more information about you.
          </Text>
          <View
            style={{
              width: FULL_WIDTH - 20,
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <FlatList
              key={selectedToningAreas.length}
              data={toningAreas}
              renderItem={renderItem}
              keyExtractor={item => item}
              numColumns={4}
            />
          </View>
          <SkipNextButton
            containerStyle={{marginTop: 300}}
            skipButtonHandler={() =>
              props.navigation.navigate('WorkoutPlanner')
            }
            nextButtonHandler={() =>
              props.navigation.navigate('WorkoutPlanner')
            }
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
  strokes: {
    width: FULL_WIDTH,
    marginTop: 30,
    position: 'absolute',
    top: FULL_HEIGHT / 2.2,
  },
  food: {
    width: FULL_WIDTH,
    marginTop: 30,
    position: 'absolute',
    top: FULL_HEIGHT / 2.4,
  },
  allergyItem: {
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 90,
    borderWidth: 1,
  },
  allergyItemActive: {
    backgroundColor: AppColors.teal,
    color: AppColors.white,
    borderColor: AppColors.white,
  },
  allergyText: {
    fontSize: 16,
  },
});

export default ToningAreas;
