/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {AppImages} from '../../../../utility/AppImages';
import {FULL_HEIGHT} from '../../../../utility/Constant';

const Card = () => {
  const colorsVisa = ['rgba(156, 44, 243, 1)', 'rgba(58, 73, 249, 1)'];
  return (
    <LinearGradient
      style={styles.card}
      start={{x: 0.1, y: 0}}
      colors={colorsVisa}>
      <View style={styles.header}>
        <Text style={[AppFontStyle.BOLD_10, styles.title]}>CVV ***</Text>
        <Image style={styles.image} source={AppImages.MASTER_CARD} />
      </View>
      <View>
        <Text style={[AppFontStyle.BOLD_20, styles.title]}>
          Fatima Tuzzahra
        </Text>
        <Text style={[AppFontStyle.BOLD_20, styles.title]}>
          ***** **** *** 233
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyles: {
    paddingHorizontal: 90,
  },
  card: {
    height: FULL_HEIGHT / 5,
    width: FULL_HEIGHT / 3,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    marginBottom: 15,
    margin: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    textAlignVertical: 'center',
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Card;
