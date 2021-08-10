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
const {height, width} = Dimensions.get('window');
import {HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';

export default class LinkedAccount extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="Linked Accounts"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{flex: 1}}>
          <View style={{width: wp('100%')}}>
            <View style={styles.topContainer}>
              <TouchableOpacity style={styles.buttons1} onPress={() => null}>
                <Image
                  source={localImages.add_blue}
                  style={{height: 11.8, width: 11.8}}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText1}>Add Account</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
              <Text style={styles.heading}>Saved Bank Accounts</Text>
            </View>

            <View style={styles.mainContainer}>
              <View style={styles.buttons}>
                <View style={{width: wp('74.2%')}}>
                  <Text style={styles.buttonText}>Bank of America</Text>
                  <Text style={styles.accountNumberText}>
                    **** **** **** 6224
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={localImages.delete_red}
                    style={{height: 21, width: 21, right: 5}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={localImages.edit_gray}
                    style={{height: 21, width: 21}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttons}>
                <View style={{width: wp('74.2%')}}>
                  <Text style={styles.buttonText}>Bank of America</Text>
                  <Text style={styles.accountNumberText}>
                    **** **** **** 6224
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={localImages.delete_red}
                    style={{height: 21, width: 21, right: 5}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={localImages.edit_gray}
                    style={{height: 21, width: 21}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.mainContainer}>
                <Text
                  style={[styles.heading, {marginBottom: 20, marginLeft: -20}]}>
                  Billing Account
                </Text>
              </View>
              <View style={styles.buttons}>
                <View style={{width: wp('74.2%')}}>
                  <Text style={styles.buttonText}>Bank of America</Text>
                  <Text style={styles.accountNumberText}>
                    **** **** **** 6224
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={localImages.delete_red}
                    style={{height: 21, width: 21, right: 5}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={localImages.edit_gray}
                    style={{height: 21, width: 21}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.buttons}>
                <View style={{width: wp('74.2%')}}>
                  <Text style={styles.buttonText}>Bank of America</Text>
                  <Text style={styles.accountNumberText}>
                    **** **** **** 6224
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={localImages.delete_red}
                    style={{height: 21, width: 21, right: 5}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={localImages.edit_gray}
                    style={{height: 21, width: 21}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttons}>
                <View style={{width: wp('74.2%')}}>
                  <Text style={styles.buttonText}>Bank of America</Text>
                  <Text style={styles.accountNumberText}>
                    **** **** **** 6224
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={localImages.delete_red}
                    style={{height: 21, width: 21, right: 5}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={localImages.edit_gray}
                    style={{height: 21, width: 21}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
    marginTop: hp('2.39%'),
  },
  buttons: {
    height: hp('10.94%'),
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('1.9%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: hp('1.64%'),
  },
  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('4.53'),
  },
  accountNumberText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('4.53'),
  },
  topContainer: {
    alignItems: 'center',
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
    marginTop: hp('2.39%'),
  },
  buttons1: {
    width: wp('88%'),
    height: hp('8.84%'),
    backgroundColor: colors.white,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('1.9%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: hp('1.64%'),
  },
  buttonText1: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  heading: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
});

// // export default StartYourSignUpJourney1
