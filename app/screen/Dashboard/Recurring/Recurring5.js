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
import {ButtonWithoutShadow, HeaderWithBack} from '../../../component/Button';
import {colors, fonts, localImages} from '../../../utils/constant';
import {CustomStyles} from '../../style/CustomStyles';
import {wp, hp} from '../../../utils/responsive';
import {color} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import {placeholder} from 'i18n-js';
import {TwoButtonModal} from '../../../component/confirmModal';

class Recurring5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      amount: '',
    };
  }

  openModal = () => {
    this.setState({isModal: true});
  };
  modalClose = () => {
    if (this.props.route.params !== undefined) {
      this.setState({isModal: false});
      this.props.navigation.navigate('Home', {
        screen: 'Dashboard',
        params: {id: this.props.route.params.id},
      });
    } else {
      this.setState({isModal: false});
      this.props.navigation.navigate('Home', {
        screen: 'Dashboard',
      });
    }
  };
  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            Header={'Deposits'}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <View>
              <TextInput
                style={styles.textInput}
                value={this.state.amount == '' ? '$25' : this.state.amount}
                onChangeText={(amount) => this.setState({amount: amount})}
              />
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.itemContainer}>
                <Text style={styles.firstText}>To</Text>
                <Text style={styles.secondText}>Mudani Wallet</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.firstText}>From</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.secondText}>Bank of America</Text>
                  <Image
                    source={localImages.down}
                    style={{height: 7, width: 10, left: 5}}
                  />
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.firstText}>Service Fees</Text>
                <Text style={styles.secondText}>$0.00</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text>Total</Text>
                <Text>$25.00</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={localImages.reload}
                  style={{height: 20, width: 20, marginLeft: 5}}
                />
                <Text style={styles.automaticallyText}>Automatic Monthly</Text>
              </View>
              <View
                style={{
                  marginTop: 100,
                  marginBottom: 50,
                  alignItems : "center"
                }}>
                {/* <LinearGradient
                  colors={['transparent', colors.blue]}
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
                      width={wp('68%')}
                      //width of the button (Optional)
                      title="Swipe to Spin"
                      //Text inside the button (Optional)
                      thumbIconImageSource={localImages.btn_arrow_color}
                      //thumbIconStyles = {{resizeMode : "contain"}}
                      //You can also set your own icon (Optional)
                      shouldResetAfterSuccess={true}
                      resetAfterSuccessAnimDelay={3000}
                      onSwipeSuccess={() => {
                        this.openModal();
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
                 <ButtonWithoutShadow
                    width={width - wp('50%')}
                    height={43}
                    // marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Confirm"
                    backgroundColor={colors.blue}
                    onAction={() => this.openModal()}
                  />
              </View>
              <TwoButtonModal
                isModalVisible={this.state.isModal}
                modalClose={() => this.modalClose()}>
                <View style={styles.popupMainContainer}>
                  <Image
                    source={localImages.like_small}
                    style={styles.circleDollar}
                  />
                  <Text style={styles.popUpText}>
                    You have deposited successfully.
                  </Text>
                </View>
                <View style={styles.popupButtonContainer}>
                  <ButtonWithoutShadow
                    width={width - wp('65%')}
                    height={43}
                    // marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Confirm"
                    backgroundColor={colors.blue}
                    onAction={() => this.modalClose()}
                  />
                </View>
              </TwoButtonModal>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  textInput: {
    backgroundColor: colors.authBackGroud,
    flex: 1,
    fontSize: 50,
    width: 100,
    fontFamily: fonts.regular,
    color: colors.blue,
    borderBottomColor: colors.grayColor,
    borderBottomWidth: 2,
    alignSelf: 'center',
    marginTop: 40,
  },
  mainContainer: {
    marginLeft: 29,
    marginRight: 29,
    marginTop: 35,
  },
  itemContainer: {
    backgroundColor: colors.white,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginBottom: 17,
  },
  firstText: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 16,
  },
  secondText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 16,
  },
  thirdText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 16,
  },
  automaticallyText: {
    fontSize: wp('3.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    marginLeft: 10,
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
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
  circleDollar: {
    height: 50,
    width: 50,
    marginBottom: 21,
    resizeMode: 'contain',
  },
});

export default Recurring5;
