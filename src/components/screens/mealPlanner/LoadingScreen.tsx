/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppColors} from '../../../utility/AppColors';
import axios from 'axios';
import {useEffect} from 'react';

const LoadingScreen = (props: any) => {
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/meal-plan/663c0c5cdcadc714ac84e047',
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response.data.status_code) {
          props.navigation.navigate('MealPlan');
        } else {
          props.navigation.navigate('MealPlannerLanding');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={AppColors.teal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
  },
});

export default LoadingScreen;
