import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppColors} from '../../utility/AppColors';

const ThreeStepProgress = ({currentStep}: any) => {
  return (
    <View style={styles.container}>
      <View style={[styles.step, currentStep >= 1 && styles.activeStep]}>
        <View
          style={[
            styles.circle,
            styles.outerCircle,
            currentStep >= 1 && styles.activeCircle,
          ]}>
          {currentStep >= 1 ? (
            <View style={[styles.activeInnerCircle]} />
          ) : (
            <View style={[styles.innerCircle]} />
          )}
        </View>
      </View>
      {currentStep >= 2 ? (
        <View style={styles.activeLine} />
      ) : (
        <View style={styles.line} />
      )}
      <View style={[styles.step, currentStep >= 2 && styles.activeStep]}>
        <View
          style={[
            styles.circle,
            styles.outerCircle,
            currentStep >= 2 && styles.activeCircle,
          ]}>
          {currentStep >= 2 ? (
            <View style={[styles.activeInnerCircle]} />
          ) : (
            <View style={[styles.innerCircle]} />
          )}
        </View>
      </View>
      {currentStep >= 3 ? (
        <View style={styles.activeLine} />
      ) : (
        <View style={styles.line} />
      )}
      <View style={[styles.step, currentStep >= 3 && styles.activeStep]}>
        <View
          style={[
            styles.circle,
            styles.outerCircle,
            currentStep >= 3 && styles.activeCircle,
          ]}>
          {currentStep >= 3 ? (
            <View style={[styles.activeInnerCircle]} />
          ) : (
            <View style={[styles.innerCircle]} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '70%',
  },
  step: {
    flex: 1,
    alignItems: 'center',
  },
  activeStep: {
    borderColor: AppColors.teal,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: AppColors.lightGrey,
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    borderColor: AppColors.teal,
  },
  activeInnerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: AppColors.teal,
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: AppColors.lightGrey,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: AppColors.lightGrey,
  },
  activeLine: {
    flex: 1,
    height: 2,
    backgroundColor: AppColors.teal,
  },
});

export default ThreeStepProgress;
