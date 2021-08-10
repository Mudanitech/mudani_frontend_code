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
import DataManager from './../../utils/DataManager';
import {getAPI, postAPI} from './../../utils/Api';
import Spinner from './../../utils/Loader';

import {t} from 'i18n-js';

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
      currentPosition: 0,
      userId: '',
      loadingSpinner: false,
      notificationList: '',
    };
  }

  componentDidMount = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});
    this.getNotification();
  };
  getNotification = () => {
    this.setState({loadingSpinner: true});
    getAPI(`userNotification/` + '6062ebe13958a80f3a639147', null)
      .then(response => {
        if (response.status == 200) {
          this.setState({
            loadingSpinner: false,
            notificationList: response.data,
          });

          console.log('my portfolio', response);
        } else {
          this.setState({loadingSpinner: false});
          //ShowToast(response.message);
        }
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
        // ShowToast('Something went Wrong!');
      });
  };

  setPositions = currentPosition => {
    this.setState({currentPosition: currentPosition});
  };

  render() {
    const {loadingSpinner, notificationList} = this.state;
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="Notifications"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <Spinner
          visible={loadingSpinner}
          cancelable={true}
          indicatorStyle={{color: colors.red}}
        />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.statementContainer}>
              <TouchableOpacity style={styles.statementSubContainer}>
                <Image
                  source={localImages.home_screen_logo}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>
                    Lorem ipsum dolor sit amet
                  </Text>
                  <Text style={styles.buttonText1}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <Text style={styles.accountNumberText}>yesterday</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statementContainer}>
              <TouchableOpacity style={styles.statementSubContainer}>
                <Image
                  source={localImages.home_screen_logo}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>
                    Lorem ipsum dolor sit amet
                  </Text>
                  <Text style={styles.buttonText1}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <Text style={styles.accountNumberText}>yesterday</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statementContainer}>
              <TouchableOpacity style={styles.statementSubContainer}>
                <Image
                  source={localImages.home_screen_logo}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>
                    Lorem ipsum dolor sit amet
                  </Text>
                  <Text style={styles.buttonText1}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <Text style={styles.accountNumberText}>yesterday</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statementContainer}>
              <TouchableOpacity style={styles.statementSubContainer}>
                <Image
                  source={localImages.home_screen_logo}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>
                    Lorem ipsum dolor sit amet
                  </Text>
                  <Text style={styles.buttonText1}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
                <Text style={styles.accountNumberText}>yesterday</Text>
              </TouchableOpacity>
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
    flex: 1,
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
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: hp('1.64%'),
  },
  statementContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: hp('1.4%'),
  },
  statementSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: hp('1.5%'),
    paddingTop: hp('1.5%'),
  },
  buttonText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'left',
    marginLeft: wp('5.33%'),
    fontWeight: 'bold',
  },
  accountNumberText: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    alignSelf: 'flex-end',
  },

  buttonText1: {
    fontSize: wp('2.66%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 14,
    textAlign: 'left',
    marginLeft: wp('5.33%'),
  },

  arrowRight: {
    height: hp('5.09%'),
    width: wp('9.86%'),
  },
  textContainer: {
    width: wp('60%'),
  },
});
