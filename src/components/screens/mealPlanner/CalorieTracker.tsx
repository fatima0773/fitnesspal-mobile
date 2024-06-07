/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../../utility/AppColors';
import {useEffect, useState} from 'react';
import LogoHeader from '../../common/LogoHeader';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import {ScrollView} from 'react-native';
import storage from '../../../utility/Storage';
import TealGradientButton from '../../common/TealGradientButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import axios from 'axios';
import {API_URL} from '../../../config/config';
import {InputField} from '../../common/InputField';
import BlackButton from '../../common/BlackButton';
import {FULL_WIDTH} from '../../../utility/Constant';
const CalorieTracker = (props: any) => {
  const [userId, setUserId] = useState('');
  const [openImageScannerRes, setOpenImageScannerRes] = useState(false);
  const [query, setQuery] = useState('');
  const [searchRes, setSearchRes] = useState<any>();
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>();
  let options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 300,
    quality: 1,
    presentationStyle: 'popover',
    selection: 1,
    selectionLimit: 1,
  };
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>();
  const [scannerRes, setScannerRes] = useState<any>();
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
  };

  const handleImageScanner = async (imageUri: any) => {
    try {
      const uploadedImage = await uploadToCloudinary(imageUri);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const uploadToCloudinary = async (image: any) => {
    const data = new FormData();
    data.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', 'dzhnq0tli');
    await fetch('https://api.cloudinary.com/v1_1/dzhnq0tli/upload', {
      method: 'POST',
      body: data,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then(res => {
        return res.json();
      })
      .then((data: any) => {
        let ocrData = JSON.stringify({
          image_path: data.secure_url,
        });
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:5000/extract-data',
          headers: {
            'Content-Type': 'application/json',
          },
          data: ocrData,
        };
        makeRequest(config);
        setUploadedImageUrl(data.secure_url);
        return data.secure_url;
      })
      .catch(error => {
        console.error('Error uploading image to Cloudinary:', error);
      });
  };

  const makeRequest = async (config: any) => {
    try {
      const response = await axios.request(config);
      setScannerRes(response.data);
      setOpenImageScannerRes(true);
      console.log(response.data);
      processExtractedData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const processExtractedData = (data: any) => {
    const processedData: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        processedData[key] = extractNumber(data[key]);
      }
    }
    console.log(processedData);
    saveNutritionalProfile(processedData);
    return processedData;
  };

  const extractNumber = (value: string) => {
    const number = parseFloat(value.replace(/[^\d.]/g, '')); // Extract number from the string
    return isNaN(number) ? null : number; // Return null if NaN
  };

  const saveNutritionalProfile = async (extractedData: any) => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    const userId = auth.userId;
    const hasCalories = 'calories' in extractedData;
    const hasFats = 'fats' in extractedData;
    const hasCarbohydrates = 'carbohydrates' in extractedData;
    const hasProteins = 'proteins' in extractedData;

    if (hasCalories) {
      let calorieUpdateData = JSON.stringify({
        consumedCalories: extractedData.calories || 0,
        burnedCalories: 0,
        userId: userId,
      });
      console.log(calorieUpdateData);
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
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (hasCalories || hasFats || hasCarbohydrates || hasProteins) {
      let nutrientHistoryData = JSON.stringify({
        userId: userId,
        fats: 'fats' in extractedData ? extractedData.fats : 0,
        carbs:
          'carbohydrates' in extractedData ? extractedData.carbohydrates : 0,
        protein: 'proteins' in extractedData ? extractedData.proteins : 0,
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
    }
  };

  const searchFood = async () => {
    let data = JSON.stringify({
      isActive: 'true',
    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.edamam.com/api/food-database/v2/parser?app_id=e1363373&app_key=d67380dc757804fcdd8465330d4a25a7&ingr=${query}&nutrition-type=cooking`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(config);

    async function makeSearchRequest() {
      try {
        const response = await axios.request(config);
        setSearchRes(response.data.hints);
      } catch (error) {
        console.log(error);
      }
    }

    makeSearchRequest();
  };

  const saveManualItem = async (
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
  ) => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    const userId = auth.userId;
    let nutrientHistoryData = JSON.stringify({
      userId: userId,
      protein: protein,
      carbs: carbs,
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
        setQuery('');
        setSearchRes('');
        setSuccessMessage('Item Added Successfully!');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={{
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Ionicons
            name="chevron-back"
            size={30}
            onPress={() => props.navigation.navigate('MealPlan')}
          />
          <LogoHeader />
        </View>
        <Text
          style={[
            AppFontStyle.SEMI_BOLD_24,
            {
              textAlign: 'center',
              marginVertical: 20,
            },
          ]}>
          Track Your Calories
        </Text>
        <Text style={[AppFontStyle.MEDIUM_14, {marginVertical: 10}]}>
          Easily Track Your Calories: Scan, Snap, or Add
        </Text>
        <TealGradientButton
          title="Open Camera"
          pressHandler={() => {
            launchCamera(options, (response: ImagePickerResponse) => {
              if (response.didCancel) {
                console.log('User cancelled camera picker');
              } else if (response.errorCode === 'camera_unavailable') {
                console.log('Camera not available on device');
              } else if (response.errorCode === 'permission') {
                console.log('Permission not satisfied');
              } else if (response.errorCode === 'others') {
                console.log(response.errorMessage);
              } else if (response.assets !== undefined) {
                setSelectedImage(response.assets[0]);
                handleImageScanner(response.assets[0]);
              }
            });
          }}
        />
        <TealGradientButton
          title="Open Gallery"
          pressHandler={() => {
            launchImageLibrary(options, (response: ImagePickerResponse) => {
              if (response.didCancel) {
                console.log('User cancelled camera picker');
              } else if (response.errorCode === 'camera_unavailable') {
                console.log('Camera not available on device');
              } else if (response.errorCode === 'permission') {
                console.log('Permission not satisfied');
              } else if (response.errorCode === 'others') {
                console.log(response.errorMessage);
              } else if (response.assets !== undefined) {
                setSelectedImage(response.assets[0]);
                handleImageScanner(response.assets[0]);
                // setOpenImagePicker(false);
              }
            });
          }}
        />
        <Text
          style={[
            AppFontStyle.BOLD_24,
            {color: AppColors.teal, marginTop: 30},
          ]}>
          OR
        </Text>
        <Text
          style={[
            AppFontStyle.MEDIUM_14,
            {marginVertical: 10, textAlign: 'center', marginTop: 40},
          ]}>
          Take Control of Your Nutrition: Input, Explore, Add
        </Text>
        <View style={styles.rowContainer}>
          <View style={{flex: 1}}>
            <InputField
              text={query}
              onChangeText={setQuery}
              placeholder="Search..."
            />
          </View>
          <TouchableOpacity
            onPress={searchFood}
            style={{
              backgroundColor: AppColors.black,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              margin: 5,
            }}>
            <Text style={[AppFontStyle.BOLD_15, {color: AppColors.white}]}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        {searchRes ? (
          searchRes.map((item: any, index: number) => (
            <TouchableOpacity
              style={styles.mealContainer}
              onPress={() => {
                saveManualItem(
                  item.food.nutrients.ENERC_KCAL.toFixed(0),
                  item.food.nutrients.PROCNT.toFixed(0),
                  item.food.nutrients.CHOCDF.toFixed(0),
                  item.food.nutrients.FAT.toFixed(0),
                );
              }}>
              <View style={styles.rowContainer}>
                <Text style={AppFontStyle.MEDIUM_16}>{item.food.label}</Text>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_14,
                    {color: AppColors.primaryText},
                  ]}>
                  Serving: {item.measures[1].weight.toFixed(0)} g
                </Text>
              </View>
              <Text
                style={[
                  AppFontStyle.REGULAR_14,
                  {marginVertical: 10, color: AppColors.secondaryText},
                ]}>
                {item.food.foodContentsLabel}
              </Text>
              <Text
                style={[
                  AppFontStyle.BOLD_15,
                  {marginVertical: 10, color: AppColors.teal},
                ]}>
                Calories: {item.food.nutrients.ENERC_KCAL.toFixed(0)}
              </Text>
              <View style={styles.rowContainer}>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_14,
                    {marginVertical: 5, color: AppColors.teal},
                  ]}>
                  Proteins: {item.food.nutrients.PROCNT.toFixed(0)}
                </Text>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_14,
                    {marginVertical: 5, color: AppColors.teal},
                  ]}>
                  Fats: {item.food.nutrients.FAT.toFixed(0)}
                </Text>
                <Text
                  style={[
                    AppFontStyle.MEDIUM_14,
                    {marginVertical: 5, color: AppColors.teal},
                  ]}>
                  Carbs: {item.food.nutrients.CHOCDF.toFixed(0)}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={[
              AppFontStyle.BOLD_15,
              {marginVertical: 10, color: AppColors.teal},
            ]}>
            {successMessage}
          </Text>
        )}

        <View style={{marginVertical: 50}} />
      </ScrollView>
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
            {selectedImage && selectedImage && selectedImage.uri && (
              <Image
                source={{uri: selectedImage.uri}}
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  mealContainer: {
    // width: FULL_WIDTH - 60,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 15,
    shadowColor: AppColors.transparentBlack06,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: AppColors.white,
    margin: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
    width: '100%',
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
  gradientContainer: {
    borderRadius: 20,
    // width: 31,
    // height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // width: '100%',
    flex: 1,
    marginVertical: 10,
    margin: 5,
  },
  modalContentWrapper: {
    height: '100%',
    padding: 15,
    backgroundColor: AppColors.white,
    justifyContent: 'space-evenly',
    borderRadius: 10,
  },
});

export default CalorieTracker;
