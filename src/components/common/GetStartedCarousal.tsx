/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native';
import {useState} from 'react';
import {Text} from '@rneui/themed';
import {AppFontStyle} from '../../styles/AppFontStyle';
import {AppColors} from '../../utility/AppColors';
import {AppImages} from '../../utility/AppImages';
const GetStartedCarousal = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderComponent = ({item}: any) => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {item === 0 && (
          <View
            style={[
              styles.componentContainer,
              {backgroundColor: AppColors.lightTeal},
            ]}>
            <Image
              source={AppImages.COOKING}
              resizeMode="contain"
              style={styles.image}
            />
            <Text
              style={[
                AppFontStyle.REGULAR_14,
                {textAlign: 'center', marginVertical: 20},
              ]}>
              Highly customized meal plans designed to meet your dietary
              preferences, health objectives, and nutritional needs for balanced
              nutrition
            </Text>
          </View>
        )}
        {item === 1 && (
          <View
            style={[
              styles.componentContainer,
              {backgroundColor: AppColors.lightOrange},
            ]}>
            <Image
              source={AppImages.EXERCISE}
              resizeMode="contain"
              style={styles.image}
            />
            <Text
              style={[
                AppFontStyle.REGULAR_14,
                {textAlign: 'center', marginVertical: 20},
              ]}>
              Personalized 30-day workout plans tailored to your fitness level
              and goals for effective and guided exercise routines
            </Text>
          </View>
        )}
        {item === 2 && (
          <View
            style={[
              styles.componentContainer,
              {backgroundColor: AppColors.lightPurple},
            ]}>
            <Image
              source={AppImages.MEDITATION}
              resizeMode="contain"
              style={styles.image}
            />
            <Text
              style={[
                AppFontStyle.REGULAR_14,
                {textAlign: 'center', marginVertical: 20},
              ]}>
              Gentle exercises tailored for women to stay active and healthy
              during their menstrual cycle, ensuring comfort and well-being.
            </Text>
          </View>
        )}
        {item === 3 && (
          <View
            style={[
              styles.componentContainer,
              {backgroundColor: AppColors.lightPink},
            ]}>
            <Image
              source={AppImages.WALING}
              resizeMode="contain"
              style={styles.image}
            />
            <Text
              style={[
                AppFontStyle.REGULAR_14,
                {textAlign: 'center', marginVertical: 20},
              ]}>
              Predict and mitigate potential health risks based on your
              lifestyle, medical history, and symptoms, empowering proactive
              health management
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderDot = (index: any) => {
    const dotStyle = [styles.dot, activeIndex === index && styles.activeDot];
    return <View style={dotStyle} key={index} />;
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={[0, 1, 2, 3]}
        renderItem={renderComponent}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / Dimensions.get('window').width);
          setActiveIndex(index);
        }}
      />
      <View style={styles.dotContainer}>
        {[0, 1, 2, 3].map((_: any, index: any) => renderDot(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '65%',
  },
  logo: {
    height: 70,
    width: 70,
    margin: 20,
  },
  componentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: '85%',
    padding: 20,
    borderRadius: 30,
  },
  image: {
    height: '60%',
  },
  dotContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: AppColors.lightTeal,
    opacity: 0.6,
  },
  activeDot: {
    backgroundColor: AppColors.teal,
    opacity: 1,
  },
});

export default GetStartedCarousal;
