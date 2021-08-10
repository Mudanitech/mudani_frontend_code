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

class BuyDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      isModal: false,
      selected: 'key1',
      isModal2: false,
      title: '',
      companyName: '',
    };
  }

  modalOpen = () => {
    this.setState({isModal: true});
  };
  modalClose = () => {
    this.setState({isModal: false});
    this.props.navigation.navigate('Home', {screen: 'Dashboard'});
  };

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
          <Text style={[styles.popUpText, {marginBottom: 10}]}>
            {' '}
            {this.state.companyName}
          </Text>
          <Text
            style={[styles.popUpText, {fontWeight: '100', marginBottom: 10}]}>
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
                value={'DOLLARS'}
                style={{
                  width: Platform.OS == 'android' ? wp('30%') : wp('25%'),
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
                <Picker.Item label={'SHARES'} value="key1" />
                <Picker.Item label="DOLLARS" value="Bank of India" />
              </Picker>
            </View>
          </View>
          <ScrollView>
            <View style={styles.mainContainer}>
              <View style={{alignItems: 'center'}}>
                <Image
                  //source={localImages.amazon}
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
              <View style={styles.marketPriceContainer}>
                {/* <View style={styles.markerSubContainer}>
                  <View>
                    <Text style={[styles.textThird,{textAlign : "left"}]}>Buy BABA</Text>
                    <Text style={styles.paratext}>$3.923| 4 available</Text>
                  </View>
                </View> */}
                <View style={styles.markerSubContainer}>
                  <View style={styles.imgContainer}>
                    <Text style={styles.textFirst}>Number of Shares</Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.modalOpen2('Estimated Cost', 'Number of Shares')
                      }>
                      <Image
                        source={localImages.question_circle_blue}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.textSecond}>0%</Text>
                </View>
                <View style={styles.borderSeparator} />
                <View style={styles.markerSubContainer}>
                  <View style={styles.imgContainer}>
                    <Text style={styles.textFirst}>Market Price</Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.modalOpen2('Estimated Cost', 'Market Price')
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
              <View style={{marginTop: 50, marginBottom: 50}}>
                {/* <LinearGradient
            colors={['transparent', colors.blue]}
            start={{x: 1.3, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.linearGradient}>
            <View>
              <SwipeButton
                disabled={false}
                //disable the button by doing true (Optional)
                swipeSuccessThreshold={50}
                height={45}
                //height of the button (Optional)
                width={wp("69%")}
                //width of the button (Optional)
                title="swipe right to confirm"
                //Text inside the button (Optional)
                thumbIconImageSource={localImages.btn_arrow_color}
                //thumbIconStyles = {{resizeMode : "contain"}}
                //You can also set your own icon (Optional)
                onSwipeSuccess={() => {
                    this.modalOpen();
                  }}
                //After the completion of swipe (Optional)
                railFillBackgroundColor={colors.transparent} //(Optional)
                railFillBorderColor={colors.transparent} //(Optional)
                thumbIconBackgroundColor={colors.white} //(Optional)
                thumbIconBorderColor={colors.white} //(Optional)
                railBackgroundColor={colors.transparent} //(Optional)
                railBorderColor={colors.transparent} //(Optional)
                titleStyles={{
                  fontSize: 13,
                  color: colors.white,
                  fontWeight: 'bold',
                }}></SwipeButton>
            </View>
          </LinearGradient> */}
                <LinearGradient
                  colors={[colors.blue, '#fff']}
                  start={{x: 1.3, y: 0}}
                  end={{x: 0, y: 0}}
                  style={styles.linearGradient}>
                  <View>
                    <SwipeButton
                      disabled={false}
                      //disable the button by doing true (Optional)
                      swipeSuccessThreshold={70}
                      height={45}
                      //height of the button (Optional)
                      width={wp('69%')}
                      //width of the button (Optional)
                      title="Swipe to Spin"
                      //Text inside the button (Optional)
                      thumbIconImageSource={localImages.btn_arrow_color}
                      //thumbIconStyles = {{resizeMode : "contain"}}
                      //You can also set your own icon (Optional)
                      onSwipeSuccess={() => {
                        this.modalOpen();
                      }}
                      // forceReset={(reset) => {
                      //   forceResetLastButton = reset;
                      // }}
                      shouldResetAfterSuccess={true}
                      resetAfterSuccessAnimDelay={5000}
                      //After the completion of swipe (Optional)
                      railFillBackgroundColor={colors.transparent} //(Optional)
                      railFillBorderColor={colors.transparent} //(Optional)
                      thumbIconBackgroundColor={colors.white} //(Optional)
                      thumbIconBorderColor={colors.white} //(Optional)
                      railBackgroundColor={colors.transparent} //(Optional)
                      railBorderColor={colors.transparent} //(Optional)
                      titleStyles={{
                        fontSize: 16,
                        color: colors.blue,
                        fontWeight: 'bold',
                      }}></SwipeButton>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </ScrollView>
          <TwoButtonModal
            isModalVisible={this.state.isModal}
            modalClose={() => this.modalClose()}>
            <View style={styles.popupMainContainer}>
              <Image
                source={localImages.like_small}
                style={styles.circleDollar}
              />
              <Text style={styles.popUpText}>
                Your Buy Order has been successfully placed.
              </Text>
            </View>
            <View style={styles.popupButtonContainer}>
              <ButtonWithoutShadow
                width={width - wp('65%')}
                height={43}
                // marginTop={22}
                borderRadius={20}
                labelColor={colors.white}
                label="Okay"
                backgroundColor={colors.blue}
                onAction={() => this.modalClose()}
              />
            </View>
          </TwoButtonModal>
          {this.viewModal()}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 29,
    marginRight: 29,
  },
  paratext: {
    fontSize: wp('3.2%%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 16,
    textAlign: 'left',
    marginBottom: 14,
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
    marginTop: 30,
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
  circleDollar: {
    height: 50,
    width: 50,
    marginBottom: 21,
    resizeMode: 'contain',
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 27,
    // width : 160,
  },
  recentReview: {
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    marginTop: 30,
    textAlign: 'center',
  },
});

export default BuyDetails;
