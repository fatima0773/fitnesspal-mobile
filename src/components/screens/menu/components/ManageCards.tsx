/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import BlackButton from '../../../common/BlackButton';
import {AppFontStyle} from '../../../../styles/AppFontStyle';
import {AppColors} from '../../../../utility/AppColors';
import {FULL_HEIGHT} from '../../../../utility/Constant';
import Card from './Card';

const ManageCards = (props: any) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          AppFontStyle.BOLD_20,
          {textAlign: 'left', width: '100%', marginBottom: 20},
        ]}>
        Manage Your Cards
      </Text>
      <FlatList data={[0, 1, 2]} renderItem={Card} horizontal />
      <BlackButton
        pressHandler={props.pressHandler}
        buttonStyles={styles.buttonStyles}
        title="Add Card"
        titleStyles={[AppFontStyle.SEMI_BOLD_17, {color: AppColors.white}]}
      />
    </View>
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

export default ManageCards;
