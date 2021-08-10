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
} from 'react-native';
import {ButtonWithoutShadow, CrossButtonHeader} from '../../component/Button';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {wp, hp} from '../../utils/responsive';
import {color} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import {TwoButtonModal} from './../../component/confirmModal';

class SellingDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      isModal: false,
    };
  }

  modalOpen = () => {
    this.setState({isModal: true});
  };
  modalClose = () => {
    this.setState({isModal: false});
    this.props.navigation.navigate('Home', {screen: 'Dashboard'});
  };
  render() {
    const {symbol} = this.props.route.params;

    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <CrossButtonHeader
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
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
              {/* <Text style={styles.orderSummary}>Order Summary</Text>
              <Text numberOfLines={2} style={styles.paratext}>
                You are buying $2.00 of BABA based on the current market price
              </Text> */}

              <View style={{marginTop: 50, marginBottom: 50}}>
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
                Your Purchase Order has been successfully placed.
              </Text>
            </View>
            <View style={styles.popupButtonContainer}>
              <ButtonWithoutShadow
                width={width - wp('60%')}
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
    width: 70,
    fontFamily: fonts.regular,
    color: colors.blue,
    borderBottomColor: colors.grayColor,
    borderBottomWidth: 2,
    alignSelf: 'center',
    marginTop: 20,
  },
  mainContainer: {
    marginLeft: 29,
    marginRight: 29,
  },

  orderSummary: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 60,
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
    width: 160,
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

export default SellingDetails;
