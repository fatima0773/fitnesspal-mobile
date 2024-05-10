/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Image,
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../../utility/AppColors';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {FULL_WIDTH} from '../../../utility/Constant';
import Modal from 'react-native-modal';
import TealGradientButton from '../../common/TealGradientButton';
import storage from '../../../utility/Storage';
import {API_URL} from '../../../config/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {chooseFile} from '../../../utility/chooseFile';
interface mealPlanTracker {
  Breakfast: number[];
  Lunch: number[];
  Dinner: number[];
}
const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState<any>();
  const [mealPlanTracker, setMealPlanTracker] = useState<mealPlanTracker>();
  const [openMealModal, setOpenMealModal] = useState(false);
  const [mealDetail, setMealDetail] = useState<any>();
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/meal-plan/663c0c5cdcadc714ac84e047',
      headers: {},
    };

    axios
      .request(config)
      .then((response: any) => {
        setMealPlan(response.data.mealPlan);
        setMealPlanTracker(response.data.mealPlanTracker);
      })
      .catch(error => {
        console.log(error);
      });
  }, [mealPlan]);

  const [selectedDay, setSelectedDay] = useState(0);
  const handleDaySelect = (day: any) => {
    setSelectedDay(day);
  };

  const onComplete = async (
    mealType: string,
    calories: number,
    cholesterol: number,
    protein: number,
    carbs: number,
    sodium: number,
    fats: number,
  ) => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    const userId = auth.userId;

    // mark the food complete
    let data = JSON.stringify({
      mealType: mealType,
      dayIndex: selectedDay,
      userId: userId,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${API_URL}meal-plan/complete-meal`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        // update nutrient history
        let nutrientHistoryData = JSON.stringify({
          userId: userId,
          cholesterol: cholesterol,
          protein: protein,
          carbs: carbs,
          sodium: sodium,
          fats: fats,
        });

        let nutrientHistoryConfig = {
          method: 'put',
          maxBodyLength: Infinity,
          url: 'http://localhost:8080/nutritional-profile/update-nutrient-history',
          headers: {
            'Content-Type': 'application/json',
          },
          data: nutrientHistoryData,
        };

        axios
          .request(nutrientHistoryConfig)
          .then(response => {
            console.log(JSON.stringify(response.data));
          })
          .catch(error => {
            console.log(error);
          });
        // update calories
        let calorieUpdateData = JSON.stringify({
          consumedCalories: calories,
          burnedCalories: 0,
          userId: userId,
        });

        let calorieUpdateConfig = {
          method: 'put',
          maxBodyLength: Infinity,
          url: `${API_URL}nutritional-profile/update-calorie-history`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: calorieUpdateData,
        };

        axios
          .request(calorieUpdateConfig)
          .then((response: any) => {
            console.log(JSON.stringify(response.data));

            setMealPlanTracker((prevMealPlanTracker: any) => {
              const updatedMealPlanTracker = {...prevMealPlanTracker};
              updatedMealPlanTracker[mealType][selectedDay] = 1;
              return updatedMealPlanTracker;
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderDay = (day: any, index: any) => (
    <TouchableOpacity
      key={index}
      style={{
        padding: 10,
        backgroundColor:
          selectedDay === day ? AppColors.lightTeal : 'transparent',
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 30,
      }}
      onPress={() => handleDaySelect(day)}>
      <Text
        style={[
          AppFontStyle.REGULAR_14,
          {marginVertical: 2, color: AppColors.primaryText},
        ]}>
        Day
      </Text>
      <Text style={[AppFontStyle.SEMI_BOLD_19]}>0{day + 1}</Text>
    </TouchableOpacity>
  );

  // Render recipes for the selected day
  const renderRecipes = () => {
    if (mealPlan && mealPlan.Lunch[selectedDay]) {
      return (
        <View>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {flex: 1, marginVertical: 10, color: AppColors.primaryText},
            ]}>
            Upcoming Meal
          </Text>
          {mealPlanTracker && mealPlanTracker.Breakfast[selectedDay] === 0 ? (
            <RenderMeal
              mealType={'Breakfast'}
              pressHandler={() =>
                setMealDetail(mealPlan.Breakfast[selectedDay].recipe)
              }
              label={mealPlan.Breakfast[selectedDay].recipe.label}
              image={mealPlan.Breakfast[selectedDay].recipe.image}
              calories={mealPlan.Breakfast[selectedDay].recipe.calories.toFixed(
                2,
              )}
              showComplete={true}
              fats={mealPlan.Breakfast[
                selectedDay
              ].recipe.totalNutrients.FAT.quantity.toFixed(2)}
              carbohydrates={mealPlan.Breakfast[
                selectedDay
              ].recipe.totalNutrients.CHOCDF.quantity.toFixed(2)}
              protein={mealPlan.Breakfast[
                selectedDay
              ].recipe.totalNutrients.PROCNT.quantity.toFixed(2)}
              cholesterol={mealPlan.Breakfast[
                selectedDay
              ].recipe.totalNutrients.CHOLE.quantity.toFixed(2)}
              sodium={mealPlan.Breakfast[
                selectedDay
              ].recipe.totalNutrients.NA.quantity.toFixed(2)}
            />
          ) : mealPlanTracker && mealPlanTracker.Lunch[selectedDay] === 0 ? (
            <RenderMeal
              mealType={'Lunch'}
              pressHandler={() =>
                setMealDetail(mealPlan.Lunch[selectedDay].recipe)
              }
              label={mealPlan.Lunch[selectedDay].recipe.label}
              image={mealPlan.Lunch[selectedDay].recipe.image}
              calories={mealPlan.Lunch[selectedDay].recipe.calories.toFixed(2)}
              showComplete={true}
              fats={mealPlan.Lunch[
                selectedDay
              ].recipe.totalNutrients.FAT.quantity.toFixed(2)}
              carbohydrates={mealPlan.Lunch[
                selectedDay
              ].recipe.totalNutrients.CHOCDF.quantity.toFixed(2)}
              protein={mealPlan.Lunch[
                selectedDay
              ].recipe.totalNutrients.PROCNT.quantity.toFixed(2)}
              cholesterol={mealPlan.Lunch[
                selectedDay
              ].recipe.totalNutrients.CHOLE.quantity.toFixed(2)}
              sodium={mealPlan.Lunch[
                selectedDay
              ].recipe.totalNutrients.NA.quantity.toFixed(2)}
            />
          ) : mealPlanTracker && mealPlanTracker.Dinner[selectedDay] === 0 ? (
            <RenderMeal
              mealType={'Dinner'}
              pressHandler={() =>
                setMealDetail(mealPlan.Dinner[selectedDay].recipe)
              }
              label={mealPlan.Dinner[selectedDay].recipe.label}
              image={mealPlan.Dinner[selectedDay].recipe.image}
              calories={mealPlan.Dinner[selectedDay].recipe.calories.toFixed(2)}
              showComplete={true}
              fats={mealPlan.Dinner[
                selectedDay
              ].recipe.totalNutrients.FAT.quantity.toFixed(2)}
              carbohydrates={mealPlan.Dinner[
                selectedDay
              ].recipe.totalNutrients.CHOCDF.quantity.toFixed(2)}
              protein={mealPlan.Dinner[
                selectedDay
              ].recipe.totalNutrients.PROCNT.quantity.toFixed(2)}
              cholesterol={mealPlan.Dinner[
                selectedDay
              ].recipe.totalNutrients.CHOLE.quantity.toFixed(2)}
              sodium={mealPlan.Dinner[
                selectedDay
              ].recipe.totalNutrients.NA.quantity.toFixed(2)}
            />
          ) : (
            <Text style={[AppFontStyle.MEDIUM_15, {color: AppColors.teal}]}>
              Good Job! Meal plan for today has been completed!
            </Text>
          )}

          <Text
            style={[
              AppFontStyle.SEMI_BOLD_24,
              {flex: 1, marginVertical: 10, color: AppColors.primaryText},
            ]}>
            All Meals
          </Text>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {flex: 1, marginVertical: 10, color: AppColors.primaryText},
            ]}>
            Breakfast
          </Text>
          <RenderMeal
            mealType={'Breakfast'}
            pressHandler={() =>
              setMealDetail(mealPlan.Breakfast[selectedDay].recipe)
            }
            label={mealPlan.Breakfast[selectedDay].recipe.label}
            image={mealPlan.Breakfast[selectedDay].recipe.image}
            calories={mealPlan.Breakfast[selectedDay].recipe.calories.toFixed(
              2,
            )}
            showComplete={false}
          />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {flex: 1, marginVertical: 10, color: AppColors.primaryText},
            ]}>
            Lunch
          </Text>
          <RenderMeal
            mealType={'Lunch'}
            pressHandler={() =>
              setMealDetail(mealPlan.Lunch[selectedDay].recipe)
            }
            label={mealPlan.Lunch[selectedDay].recipe.label}
            image={mealPlan.Lunch[selectedDay].recipe.image}
            calories={mealPlan.Lunch[selectedDay].recipe.calories.toFixed(2)}
            showComplete={false}
          />
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_15,
              {flex: 1, marginVertical: 10, color: AppColors.primaryText},
            ]}>
            Dinner
          </Text>
          <RenderMeal
            mealType={'Dinner'}
            pressHandler={() =>
              setMealDetail(mealPlan.Dinner[selectedDay].recipe)
            }
            label={mealPlan.Dinner[selectedDay].recipe.label}
            image={mealPlan.Dinner[selectedDay].recipe.image}
            calories={mealPlan.Dinner[selectedDay].recipe.calories.toFixed(2)}
            showComplete={false}
          />
        </View>
      );
    }
  };

  const RenderMeal = (props: any) => {
    return (
      <TouchableOpacity
        style={styles.mealContainer}
        onPress={() => {
          setOpenMealModal(true);
          props.pressHandler();
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            alt="Meal Image"
            source={{
              uri: props.image,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              marginRight: 10,
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={[AppFontStyle.MEDIUM_15, {flex: 1, marginRight: 80}]}>
              {props.label}
            </Text>
            <Text
              style={[
                AppFontStyle.SEMI_BOLD_15,
                {color: AppColors.secondaryText, marginVertical: 5},
              ]}>
              {props.calories} kCal
            </Text>
          </View>
        </View>
        {props.showComplete && mealPlanTracker && (
          <TealGradientButton
            pressHandler={() =>
              onComplete(
                props.mealType,
                props.calories,
                props.cholesterol,
                props.protein,
                props.carbohydrates,
                props.sodium,
                props.fats,
              )
            }
            title="Complete"
            gradientContainerStyles={{
              padding: 5,
              paddingHorizontal: 15,
              borderRadius: 5,
            }}
            titleStyles={{fontSize: 14}}
            buttonStyle={{alignSelf: 'flex-end'}}
          />
        )}
      </TouchableOpacity>
    );
  };

  const [selectedImage, setSelectedImage] = useState<any>([]);

  const [openImageScannerRes, setOpenImageScannerRes] = useState(false);

  const [scannerRes, setScannerRes] = useState<any>();
  const [count, setCount] = useState(0);

  const handleImageScanner = () => {
    let data;
    if (count === 1) {
      data = JSON.stringify({
        image_path:
          '/Users/fatima/Desktop/fitnesspal-flask-backend/image/2.jpg',
      });
    } else {
      data = JSON.stringify({
        image_path:
          '/Users/fatima/Desktop/fitnesspal-flask-backend/image/1.jpg',
      });
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:5000/extract-data',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setScannerRes(response.data);
        setOpenImageScannerRes(true);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCount(count + 1);
          chooseFile('photo', 1, (uris: string[]) => {
            setSelectedImage(uris);
            handleImageScanner();
          });
          console.log(selectedImage);
        }}
        style={{
          position: 'absolute',
          backgroundColor: AppColors.teal,
          padding: 15,
          bottom: 10,
          zIndex: 100,
          right: 10,
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesome name="camera" color={AppColors.white} size={20} />
        <Text
          style={[
            AppFontStyle.BOLD_15,
            {color: AppColors.white, marginHorizontal: 5},
          ]}>
          Calorie Counter
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={{padding: 15, width: FULL_WIDTH}}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <Text style={AppFontStyle.SEMI_BOLD_28}>Meal Planner</Text>
        <View style={{width: '100%', marginTop: 25}}>
          <Text style={AppFontStyle.SEMI_BOLD_20}>Hello Fatima</Text>
          <Text
            style={[
              AppFontStyle.SEMI_BOLD_12,
              {marginVertical: 10, color: AppColors.primaryText},
            ]}>
            Your Tailored Meal Plan Awaits! Let's Dig In
          </Text>
        </View>
        {mealPlan && (
          <>
            <ScrollView
              horizontal
              style={{alignSelf: 'center'}}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {[0, 1, 2, 3, 4, 5, 6].map(renderDay)}
            </ScrollView>
            <ScrollView>{renderRecipes()}</ScrollView>
          </>
        )}
        <View style={{marginVertical: 50}} />
      </ScrollView>
      <Modal
        onBackdropPress={() => setOpenMealModal(false)}
        isVisible={openMealModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="up"
        style={{
          margin: 0,
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentWrapper}>
            {mealDetail && (
              <>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_24,
                    {textAlign: 'center', marginVertical: 30, width: '100%'},
                  ]}>
                  {mealDetail.label}
                </Text>

                <Image
                  alt="Meal Image"
                  source={{
                    uri: mealDetail.image,
                  }}
                  style={{
                    width: 250,
                    height: 250,
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}
                  resizeMode="contain"
                />
                <View style={styles.separator} />

                {/* total calories */}
                <View style={styles.rowContainer}>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    Calories
                  </Text>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    {mealDetail.calories.toFixed(2)}
                  </Text>
                </View>

                {/* total fats */}
                <View style={styles.rowContainer}>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    Fats
                  </Text>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    {mealDetail.totalNutrients.FAT.quantity.toFixed(2)} g
                  </Text>
                </View>

                {/* carbohydrates */}
                <View style={styles.rowContainer}>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    Carbohydrates
                  </Text>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    {mealDetail.totalNutrients.CHOCDF.quantity.toFixed(2)} g
                  </Text>
                </View>

                {/* fibre */}
                <View style={styles.rowContainer}>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    Fiber
                  </Text>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    {mealDetail.totalNutrients.FIBTG.quantity.toFixed(2)} g
                  </Text>
                </View>

                {/* protein */}
                <View style={styles.rowContainer}>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    Protein
                  </Text>
                  <Text style={[AppFontStyle.MEDIUM_14, {textAlign: 'center'}]}>
                    {mealDetail.totalNutrients.PROCNT.quantity.toFixed(2)} g
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        onBackdropPress={() => setOpenImageScannerRes(false)}
        isVisible={openImageScannerRes}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="up"
        style={{
          margin: 0,
        }}>
        <View style={[styles.modalContainer, {height: '60%'}]}>
          <View style={styles.modalContentWrapper}>
            <Text style={[AppFontStyle.BOLD_24, {color: AppColors.teal}]}>
              Fantastic!
            </Text>
            <Text style={[AppFontStyle.SEMI_BOLD_14]}>
              Here are the extracted results from the nutritional table
            </Text>
            {selectedImage && selectedImage[0] && selectedImage[0].uri && (
              <Image
                source={{uri: selectedImage[0].uri}}
                resizeMode="contain"
                style={{
                  width: 300,
                  height: 300,
                  alignSelf: 'center',
                }}
              />
            )}
            {scannerRes &&
              Object.keys(scannerRes).map((key, index) => (
                <View key={index} style={styles.rowContainer}>
                  <Text style={AppFontStyle.MEDIUM_16}>{key}</Text>
                  <Text style={AppFontStyle.SEMI_BOLD_16}>
                    {scannerRes[key]}
                  </Text>
                </View>
              ))}
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
    justifyContent: 'center',
    backgroundColor: AppColors.white,
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
    height: '70%',
    width: '90%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalContentWrapper: {
    height: '100%',
    padding: 15,
    backgroundColor: AppColors.white,
    justifyContent: 'space-evenly',
    borderRadius: 10,
  },
  mealContainer: {
    width: FULL_WIDTH - 60,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    shadowColor: AppColors.transparentBlack06,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: AppColors.white,
    margin: 5,
    alignSelf: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.secondaryText,
    width: '100%',
  },
});

export default MealPlan;
