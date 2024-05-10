/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styleSheet from '../../../utility/stylesheet';
import {AppColors} from '../../../utility/AppColors';
import {useEffect} from 'react';
import CommonHeader from '../../common/CommonHeader';
import {AppFontStyle} from '../../../styles/AppFontStyle';
import LinearGradient from 'react-native-linear-gradient';
import Card from './components/Card';
const AddNewCard = (props: any) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styleSheet.container, {padding: 15}]}>
          <CommonHeader title={'Add New Card'} />
          <View style={{marginTop: 30}}>
            <Card />
            <Text>fields after stripe integration</Text>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 30,
              }}
              onPress={() => props.navigation.navigate('PremiumPlan')}>
              <LinearGradient
                start={{x: 0.19, y: 0.55}}
                end={{x: 0.9, y: 1.0}}
                colors={[AppColors.teal, AppColors.green]}
                style={{
                  padding: 10,
                  paddingHorizontal: 25,
                  borderRadius: 10,
                  width: '100%',
                }}>
                <Text
                  style={[
                    AppFontStyle.SEMI_BOLD_20,
                    {
                      color: AppColors.white,
                      width: '100%',
                      textAlign: 'center',
                    },
                  ]}>
                  Save
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
  button: {
    backgroundColor: AppColors.purple,
    width: '100%',
    marginTop: 30,
  },
  infoHeader: {
    width: '100%',
    backgroundColor: AppColors.accentText,
    padding: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginTop: 20,
  },
  infoBody: {
    width: '100%',
    backgroundColor: AppColors.white,
    padding: 10,
    borderEndStartRadius: 10,
    borderEndEndRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: AppColors.accentText,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default AddNewCard;
