import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp, hp} from '../../utils/responsive';
import Dropdown from './../../component/Picker';
import PhoneCode from './../../utils/PhoneCode';
const {height, width} = Dimensions.get('window');
import ShowToast from './../../component/Toast';
import {getAPI, postAPI} from './../../utils/Api';

import Spinner from './../../utils/Loader';
import {phoneNumber} from '../../component/Validation';
import generateOTP from './../../utils/GenerateOtp';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

var callingCodes = '';
class SignUp3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      keyboardOpen: false,
      countryCode: '',
      mobileNumber: '',
      loadingSpinner: false,
      countryList: [],
      countryIP: null,
      mobileNumber2: '',
      otp: '',
      PhoneCodeNew: [
        {name: 'India', dial_code: '+91', code: 'IN'},
        {name: 'United States', dial_code: '+1', code: 'US'},
      ],
    };
  }

  componentWillMount = async () => {
    getAPI('https://topups.reloadly.com/countries').then(response =>
      this.setState({countryList: response}),
    );
    getAPI('https://ipinfo.io/json').then(countryIP => {
      this.setState({countryIP: countryIP});
    });
    // this.state.countryList.map(item => item.isoName == this.state.countryIP.country?this.setState({ countryCode: item.callingCodes[0]}):null)
  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({keyboardOpen: true});
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({keyboardOpen: false});
      },
    );

    // console.log('Hddddddd', this.props.route.params.userDetails);
  }

  componentDidUpdate = () => {
    // console.log("REEEE",this.state.countryList[this.state.countryIP.country]);
    let itemYouWant = null;
    this.state.countryList.forEach(item => {
      if (item.isoName === this.state.countryIP.country) {
        if (this.state.countryCode == '') {
          this.setState({countryCode: item.callingCodes[0]});
        }
      }
    });
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleSubmit = async () => {
    // this.props.navigation.navigate('otp_screen');
    if (!this.state.mobileNumber) {
      ShowToast('Please enter Mobile number!');
    } else if (!phoneNumber(this.state.mobileNumber)) {
      ShowToast('Please enter correct Mobile number!');
    } else {
      // const otp = generateOTP(4);
      this.setState({loadingSpinner: true});
      const dataToSend1 = {
        countryCode: this.state.countryCode,
        mobileNumber: this.state.mobileNumber,
        userName: this.props.route.params.userDetails.userName,
        email: this.props.route.params.userDetails.email,
        firstName: this.props.route.params.userDetails.firstName,
        middleName: this.props.route.params.userDetails.middleName,
        lastName: this.props.route.params.userDetails.lastName,
        otp: this.state.otp,
      };

      const dataToSend = {
        countryCode: this.state.countryCode,
        mobileNo: this.state.mobileNumber,
      };

      console.log('params', JSON.stringify(dataToSend));

      postAPI('checkUserMobileNo', dataToSend)
        .then(response => {
          if (response.status == 200) {
            ShowToast(response.message);
            this.setState({loadingSpinner: false, otp: response.data.otp});
            this.props.navigation.navigate('otp_screen', {
              userDetails: dataToSend1,
              otp: response.data.otp,
            });
          } else {
            this.setState({loadingSpinner: false});
            ShowToast(response.message);
          }
          console.log(response, response.message);
        })
        .catch(err => {
          this.setState({loadingSpinner: false});
          // ShowToast('Something went wrong!');
          console.log(err);
        });
    }
  };

  onTextChange = text => {
    if (this.state.countryCode == '+1') {
      this.setState({
        mobileNumber: text,
      });

      var cleaned = ('' + text).replace(/\D/g, '');
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        var intlCode = match[1] ? '+1 ' : '',
          number = [
            intlCode,
            '(',
            match[2],
            ') ',
            match[3],
            '-',
            match[4],
          ].join('');

        this.setState({
          mobileNumber2: number,
        });

        return;
      }

      this.setState({
        mobileNumber2: text,
      });
    } else {
      this.setState({
        mobileNumber2: text,
        mobileNumber: text,
      });
    }
  };

  render() {
    console.log('ContryCode', this.state.countryCode);

    const {PhoneCodeNew} = this.state;
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.statusBarColor}
        />
        <SafeAreaView style={CustomStyles.containerbording}>
          <Spinner
            visible={this.state.loadingSpinner}
            cancelable={true}
            indicatorStyle={{color: colors.red}}
          />
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{flex: 1}}>
            <KeyboardAvoidingView
              style={{flex: 1, paddingBottom: this.state.keyboardHeight + 100}}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <View style={{flex: 1, marginLeft: 40, marginRight: 30}}>
                <View>
                  <Text
                    style={{
                      width: width - 40,
                      fontFamily: fonts.regular,
                      fontSize: 23,
                      fontWeight: '600',
                      fontStyle: 'normal',
                      lineHeight: 27,
                      letterSpacing: 0,
                      textAlign: 'left',
                      marginTop: 50,
                      color: '#2b8ecd',
                    }}>
                    What's your Mobile Number?
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={CustomStyles.subLabel}>
                    We need some basic information to help you get set up.
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 54,
                    justifyContent: 'space-between',
                  }}>
                  <Dropdown
                    //placeholderText={'Select the country you live in'}
                    dropdownWidth={Platform.OS == 'ios' ? wp('23') : wp('25')}
                    data={PhoneCodeNew.map(item => {
                      return {item: item.dial_code, value: item.dial_code};
                    })}
                    selectedValue={this.state.countryCode}
                    onValueChange={(index, item) =>
                      this.setState({countryCode: item.name})
                    }
                    pickerMarginTop={0}
                    value={this.state.countryCode}
                  />
                  <TextInput
                    height={43}
                    backgroundColor={colors.white}
                    style={{
                      width: Platform.OS == 'ios' ? wp('59') : wp('53'),
                      borderRadius: 30,
                      paddingLeft: 10,
                    }}
                    //marginTop={17}
                    placeholder="Enter your Mobile Number"
                    // label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={17}
                    onChangeText={value => this.onTextChange(value)}
                    value={this.state.mobileNumber2}
                    keyboardType={'number-pad'}
                    // iconName={'search_gray_icon'}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>

          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: hp('0%'),
              height: hp('16%'),
              width: wp('100%'),
              backgroundColor: colors.authBackGroud,
              // borderBottomWidth: 1,
              //borderTopWidth: 1,
              //borderLeftWidth: 1,
              // borderWidth: 1,
              //borderWidth: 1,
              //borderColor: colors.inputBorderColor,
              // borderRadius: 30,
            }}>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: hp('8%'),
              }}>
              <ButtonWithoutShadow
                width={width - 147}
                height={43}
                //   marginTop={366}
                // marginTop={Platform.OS == "android"?hp("37.03%") :hp("37.03")}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
                backgroundColor={colors.blue}
                onAction={() => this.handleSubmit()}
              />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInUserAuthToken: token => {
      dispatch(actions.setLoggedInUserAuthToken(token));
    },
    setMyCartProduct: mycartProduct => {
      dispatch(actions.setMyCartProduct(mycartProduct));
    },

    setLoggedInUserAuthToken: token => {
      dispatch(actions.setLoggedInUserAuthToken(token));
    },
    setLoggedInUserDetails: userDetails => {
      dispatch(actions.setLoggedInUserDetails(userDetails));
    },
    setLoggedInUserStatus: loginStatus => {
      dispatch(actions.setLoggedInUserStatus(loginStatus));
    },
    setLoggedInUserType: loginType => {
      dispatch(actions.setLoggedInUserType(loginType));
    },
  };
};
const mapToProp = state => {
  return {
    loginUserType: state.localStates.loginUserType,
    mycartProduct: state.localStates.mycartProduct,
    // loading: state.auth.loading
  };
};

//export default connect (SignUp)

export default connect(mapToProp, mapDispatchToProps)(SignUp3);
