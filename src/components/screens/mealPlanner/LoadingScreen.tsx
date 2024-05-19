/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppColors} from '../../../utility/AppColors';
import axios from 'axios';
import {useEffect} from 'react';
import storage from '../../../utility/Storage';

const LoadingScreen = (props: any) => {
  useEffect(() => {
    getMealPlan();
  }, []);

  const getMealPlan = async () => {
    const auth = await storage.load({
      key: 'authState',
      autoSync: true,
      syncInBackground: true,
    });
    const userId = auth.userId;
    console.log(userId);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/meal-plan/${userId}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response.data.status_code === 200) {
          props.navigation.navigate('MealPlan');
        } else {
          props.navigation.navigate('MealPlannerLanding');
        }
      })
      .catch(error => {
        console.log(error);
        props.navigation.navigate('MealPlanLanding');
      });
  };

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
