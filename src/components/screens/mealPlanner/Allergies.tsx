/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  FlatList,
  Image,
  LogBox,
  SafeAreaView,
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
import {AppImages} from '../../../utility/AppImages';
import {FULL_HEIGHT, FULL_WIDTH} from '../../../utility/Constant';
import BlackButton from '../../common/BlackButton';
import {Survey} from '../../../utility/mealPlanData';
const Allergies = (props: any) => {
  const allergyOptions = Survey.healthSpec;
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const handleAllergyPress = (allergy: any) => {
    const isSelected = selectedAllergies.includes(allergy);

    setSelectedAllergies(prevState => {
      const updatedSelection = [...prevState];
      if (isSelected) {
        updatedSelection.splice(updatedSelection.indexOf(allergy), 1);
      } else {
        updatedSelection.push(allergy);
      }
      return updatedSelection;
    });
  };

  const renderItem = ({item}: any) => {
    const isSelected = selectedAllergies.includes(item);

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
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
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
          Before we get started, do you have any health preferences?
        </Text>
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_15,
            {
              textAlign: 'left',
              color: AppColors.secondaryText,
            },
          ]}>
          To offer you the best tailored diet experience we need to know more
          information about you.
        </Text>
        <View
          style={{
            width: FULL_WIDTH - 20,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <FlatList
            key={selectedAllergies.length}
            data={allergyOptions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>

        <Image
          source={AppImages.STROKE_SET_ONE}
          style={styles.strokes}
          resizeMode="contain"
        />
        <Image
          source={AppImages.FOOD_SET_ONE}
          style={styles.food}
          resizeMode="contain"
        />
        <BlackButton
          title="Next"
          pressHandler={() =>
            props.navigation.navigate('DietOptions', {
              healthPreferences: selectedAllergies,
            })
          }
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

export default Allergies;
