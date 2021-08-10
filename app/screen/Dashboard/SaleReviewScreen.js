import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {wp, hp} from '../../utils/responsive';
const {height, width} = Dimensions.get('window');
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from 'native-base';
import {ButtonWithoutShadow} from '../../component/Button';
import {TwoButtonModal} from './../../component/confirmModal';

class SaleReviewScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 'key1',
      amountText: '$0',
      addTipText: '$0',
      isModal2: false,
      title: '',
      companyName: '',
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }
  modalOpen2 = (title, companyName) => {
    this.setState({isModal2: true});
    this.setState({title: title});
    this.setState({companyName: companyName});
  };
  modalClose2 = () => {
    this.setState({isModal2: false});
  };
  viewModal = () => {
    const IsOpen = this.state.isModal2;
    return (
      <TwoButtonModal
        isModalVisible={IsOpen}
        modalClose={() => this.modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={styles.popUpText}> {this.state.companyName}</Text>
          <Text style={[styles.popUpText, {fontWeight: '100', marginTop: 10}]}>
            {' '}
            {
              'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum'
            }
          </Text>
        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Dismiss"
            backgroundColor={colors.blue}
            onAction={() => this.modalClose2()}
          />
        </View>
      </TwoButtonModal>
    );
  };
  render() {
    const {symbol} = this.props.route.params;

    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <View style={[styles.drawerHeaderWithoutCard, {width: width}]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                marginLeft: 20,
                height: 40,
                width: 40,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={localImages.cross_black}
                style={{height: 20, width: 20}}></Image>
            </TouchableOpacity>
            <View style={{width: wp('30%')}}>
              <Picker
                note
                mode="dropdown"
                value={'dollar'}
                style={{
                  width: Platform.OS == 'android' ? wp('35%') : wp('30%'),
                  height: 43,
                  borderColor: '#333333',
                  //backgroundColor: '#fff',
                  color: colors.black,
                  alignSelf: 'center',
                  transform: [{scaleX: 0.8}, {scaleY: 0.8}],
                }}
                iosIcon={
                  <Image
                    source={localImages.down}
                    style={{
                      width: 10,
                      height: 10,
                      right: 10,
                    }}
                  />
                }
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
                itemTextStyle={{color: colors.black}}
                textStyle={{color: colors.black}}>
                <Picker.Item label={'DOLLARS'} value="key1" />
                <Picker.Item label="SHARES" value="Bank of India" />
              </Picker>
            </View>
          </View>
          <ScrollView>
            <View style={styles.mainContainer}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={
                    symbol.tickerImage != ''
                      ? {uri: symbol.tickerImage}
                      : localImages.mudani_logo
                  }
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: 'contain',
                    borderRadius: 10,
                  }}></Image>
                <Text style={styles.recentReview}>{symbol.companyName}</Text>
              </View>
              <TextInput style={styles.textInput} value={'$0'} />
              <View style={styles.marketPriceContainer}>
                <View style={styles.markerSubContainer}>
                  <View style={styles.imgContainer}>
                    <Text style={styles.textFirst}>Market Price</Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.modalOpen2('Add Tip', 'Market Price')
                      }>
                      <Image
                        source={localImages.question_circle_blue}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.textSecond}>$0</Text>
                </View>
                <View style={styles.borderSeparator} />

                <View style={styles.markerSubContainer}>
                  <View style={styles.imgContainer}>
                    <Text style={styles.textFirst}>Add Tip</Text>
                    <TouchableOpacity
                      onPress={() => this.modalOpen2('Add Tip', 'Add Tip')}>
                      <Image
                        source={localImages.question_circle_blue}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.addTextInput}
                    value={this.state.addTipText}
                    onChangeText={addTipText =>
                      this.setState({addTipText: addTipText})
                    }
                  />
                </View>
                <View style={styles.borderSeparator} />
                <View style={styles.markerSubContainer}>
                  <View style={styles.imgContainer}>
                    <Text style={styles.textThird}>Estimate Cost</Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.modalOpen2('Estimated Cost', 'Estimated Cost')
                      }>
                      <Image
                        source={localImages.question_circle_blue}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.textSecond}>$0</Text>
                </View>
              </View>
              {/* <Text numberOfLines={2} style={styles.paratext}>
                $3.923.14 available to sell BABA{' '}
              </Text> */}
              <View
                style={{
                  marginBottom: 50,
                  marginTop: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <ButtonWithoutShadow
                  width={width - wp('40%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Review"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.props.navigation.navigate('SaleDetails', {
                      symbol: symbol,
                    })
                  }
                />
              </View>
            </View>
            {this.viewModal()}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.authBackGroud,
    flex: 1,
    fontSize: 50,
    width: 90,
    fontFamily: fonts.regular,
    color: colors.blue,
    borderBottomColor: colors.grayColor,
    borderBottomWidth: 2,
    alignSelf: 'center',
    marginTop: 20,
  },
  mainContainer: {
    flex: 1,
    marginLeft: 29,
    marginRight: 29,
  },

  paratext: {
    fontSize: wp('3.2%%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 16,
    marginLeft: 2,
    textAlign: 'center',
    width: 200,
    alignSelf: 'center',
    marginTop: 73,
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
    width: Platform.OS == 'ios' ? wp('72%') : wp('68%'),
    alignSelf: 'center',
  },
  drawerHeaderWithoutCard: {
    flexDirection: 'row',
    height: 60,
    width: width,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'space-between',
  },
  marketPriceContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 17,
  },
  markerSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 16,
    width: 16,
    marginLeft: 5,
  },
  textFirst: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
  },
  textSecond: {
    fontSize: 14,
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
  },
  textThird: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
  },
  borderSeparator: {
    borderBottomWidth: 0.5,
    marginTop: 16,
    marginBottom: 16,
    borderBottomColor: colors.grayColor,
  },
  recentReview: {
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  addTextInput: {
    backgroundColor: colors.white,
    fontSize: 14,
    width: 50,
    fontFamily: fonts.regular,
    color: colors.blue,
    borderBottomColor: colors.grayColor,
    borderBottomWidth: 2,
    alignSelf: 'center',
    textAlign: 'center',
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.46%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subPopupText: {
    fontSize: wp('2.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 15,
    marginLeft: 10,
  },
  totalNumber: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    textAlign: 'left',
    // marginTop: 28,
    marginBottom: 15,
  },
});

export default SaleReviewScreen;
