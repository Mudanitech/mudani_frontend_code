import React, {useState, Component, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {HomeHeader, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {TwoButtonModal} from './../../component/confirmModal';
const {height, width} = Dimensions.get('window');

export default class WatchList extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
      isModal: false,
      isModal2: false,
    };
  }

  modalOpen = () => {
    this.setState({isModal: true});
  };
  modalClose = () => {
    this.setState({isModal: false});
  };

  modalOpen2 = () => {
    this.setState({isModal2: true});
  };
  modalClose2 = () => {
    this.setState({isModal2: false});
  };

  setPositions = currentPosition => {
    this.setState({currentPosition: currentPosition});
  };
  gotoDepositScreen = () => {
    this.modalClose();
    this.props.navigation.navigate('DepositScreen', {from: ''});
  };
  gotoRecurringDeposit = () => {
    this.modalClose();
    this.props.navigation.navigate('Recurring3');
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HomeHeader
          Header=""
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => null}
          rightIcon1={'add_green_icon'}
          rightIcon2={'well_green_icon'}
          firstOnPress={() =>
            this.props.navigation.navigate('WatchListRoundIcon')
          }
          secondOnPress={() => this.props.navigation.navigate('Notifications')}
        />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View>
              <View>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <ButtonWithoutShadow
                    width={wp('40%')}
                    height={43}
                    // marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Deposit"
                    backgroundColor={colors.info_color}
                    onAction={() => this.modalOpen()}
                  />
                  <ButtonWithoutShadow
                    width={wp('40%')}
                    height={43}
                    // marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Withdraw"
                    backgroundColor={colors.black}
                    onAction={() =>
                      this.props.navigation.navigate('WithDrawal')
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 29,
                    marginBottom: 22,
                  }}>
                  <Text style={styles.transactionText}>
                    Transaction History
                  </Text>
                  <TouchableOpacity onPress={() => this.modalOpen2()}>
                    <Image
                      source={localImages.filter_blue_icon}
                      style={{height: 15, width: 15}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.startContainer}>
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_up}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Peugeot</Text>
                      <Text style={styles.text1}>To Bank of America</Text>
                      <Text style={styles.text1}>**********4156</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text]}>- $26,535.76</Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                  <View style={styles.borderSeparator} />
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_open_transfer}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Sold XRP</Text>
                      <Text style={styles.text1}>April 1, 2021</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text, {color: colors.info_color}]}>
                        $26,535.76
                      </Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                  <View style={styles.borderSeparator} />
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_open_transfer}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Sold XRP</Text>
                      <Text style={styles.text1}>April 1, 2021</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text, {color: colors.info_color}]}>
                        $26,535.76
                      </Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                  <View style={styles.borderSeparator} />
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_open_transfer}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Sold XRP</Text>
                      <Text style={styles.text1}>April 1, 2021</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text, {color: colors.info_color}]}>
                        $26,535.76
                      </Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                  <View style={styles.borderSeparator} />
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_open_transfer}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Sold XRP</Text>
                      <Text style={styles.text1}>April 1, 2021</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text, {color: colors.info_color}]}>
                        $26,535.76
                      </Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                  <View style={styles.borderSeparator} />
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_open_transfer}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Sold XRP</Text>
                      <Text style={styles.text1}>April 1, 2021</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text, {color: colors.info_color}]}>
                        $26,535.76
                      </Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                  <View style={styles.borderSeparator} />
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_open_transfer}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Sold XRP</Text>
                      <Text style={styles.text1}>April 1, 2021</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text, {color: colors.info_color}]}>
                        $26,535.76
                      </Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                  <View style={styles.borderSeparator} />
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_open_transfer}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Sold XRP</Text>
                      <Text style={styles.text1}>April 1, 2021</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text, {color: colors.info_color}]}>
                        $26,535.76
                      </Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                  <View style={styles.borderSeparator} />
                  <View style={styles.topContainer}>
                    <View style={styles.firstContainer}>
                      <Image
                        source={localImages.icon_up}
                        style={styles.icon_size}
                      />
                    </View>
                    <View style={styles.secondContainer}>
                      <Text style={styles.text}>Peugeot</Text>
                      <Text style={styles.text1}>To Bank of America</Text>
                      <Text style={styles.text1}>**********4156</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                      <Text style={[styles.text]}>- $26,535.76</Text>
                      <Text style={styles.text1}> </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <TwoButtonModal
          isModalVisible={this.state.isModal}
          modalClose={() => this.modalClose()}>
          <View style={styles.popupMainContainer}>
            <Text style={styles.popupHeading}>Select Type of Deposit</Text>
            <View style={styles.oneTimeMainContainer}>
              <TouchableOpacity
                style={styles.oneTimeContainer}
                onPress={() => this.gotoDepositScreen()}>
                <Image
                  source={localImages.unselect}
                  style={{height: 15, width: 15, resizeMode: 'contain'}}
                />
                <Text style={styles.popUpText}>One Time Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.oneTimeContainer}
                onPress={() => this.gotoRecurringDeposit()}>
                <Image
                  source={localImages.unselect}
                  style={{height: 15, width: 15, resizeMode: 'contain'}}
                />
                <Text style={styles.popUpText}>Recurring Deposit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.popupButtonContainer}>
            <ButtonWithoutShadow
              width={width - wp('65%')}
              height={43}
              // marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Continue"
              backgroundColor={colors.blue}
              onAction={() => this.modalClose()}
            />
          </View>
        </TwoButtonModal>

        <TwoButtonModal
          isModalVisible={this.state.isModal2}
          modalClose={() => this.modalClose2()}>
          <View style={styles.popupMainContainer}>
            {/* <Image source={props.image} style={styles.circleDollar} /> */}
            <Image
              source={localImages.black_filter_icon}
              style={{height: 35, width: 35}}
            />

            <Text
              style={[styles.popUpText, {fontWeight: 'bold', fontSize: 14}]}>
              Filter
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 80,
                borderWidth: Platform.OS == 'android' ? 0.5 : 0.3,
                borderColor: colors.black,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 14, color: colors.grayColor}}>
                Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.info_color,
                height: 40,
                width: 80,
                borderWidth: Platform.OS == 'android' ? 0.5 : 0.3,
                borderColor: colors.grayColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 14, color: colors.white}}>Transfers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 80,
                borderWidth: Platform.OS == 'android' ? 0.5 : 0.3,
                borderColor: colors.black,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 14, color: colors.grayColor}}>
                Dividends
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popupButtonContainer}>
            <ButtonWithoutShadow
              width={width - wp('65%')}
              height={43}
              marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Apply"
              backgroundColor={colors.blue}
              onAction={() => this.modalClose2()}
            />
          </View>
        </TwoButtonModal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  mainContainer: {
    flex: 1,
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
    marginTop: hp('2.39%'),
    marginBottom: 50,
  },
  topContainer: {
    flexDirection: 'row',
    padding: 18,
  },
  startContainer: {
    backgroundColor: colors.white,
    borderRadius: wp('1.9%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    margin: 4,
  },
  firstContainer: {
    width: wp('10%'),
    justifyContent: 'center',
  },
  secondContainer: {
    width: wp('40%'),
  },
  thirdContainer: {
    width: wp('30%'),
    alignItems: 'flex-end',
  },
  icon_size: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  text: {
    fontSize: wp('3.73%'),
    fontFamily: fonts.regular,
    lineHeight: 20,
    color: colors.black,
  },
  text1: {
    fontSize: wp('2.66%'),
    fontFamily: fonts.regular,
    lineHeight: 20,
    color: colors.grayColor,
  },
  borderSeparator: {
    borderWidth: 0.5,
    borderColor: colors.grayColor,
    width: wp('80%'),
    alignSelf: 'center',
  },
  transactionText: {
    fontSize: wp('5.33%'),
    fontFamily: fonts.bold,
    lineHeight: 27,
    color: colors.black,
  },
  circleDollar: {
    height: 40,
    width: 40,
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
    marginLeft: 10,
  },
  popupHeading: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 27,
  },
  oneTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  oneTimeMainContainer: {
    width: wp('70%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
    justifyContent: 'space-between',
  },
});
