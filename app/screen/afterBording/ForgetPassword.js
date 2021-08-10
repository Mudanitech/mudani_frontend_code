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
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp, hp} from '../../utils/responsive';
import Dropdown from './../../component/Picker';
import PhoneCode from './../../utils/PhoneCode';
const {height, width} = Dimensions.get('window');
import ShowToast from './../../component/Toast';
import {postAPI, getAPI} from './../../utils/Api';
import {phoneNumber} from '../../component/Validation';
import generateOTP from './../../utils/GenerateOtp';
import Spinner from './../../utils/Loader';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      keyboardOpen: false,
      countryCode: '+91',
      mobileNumber: '',
      loadingSpinner: false,
      countryList: [],
      countryIP: null,
      mobileNumber2: '',
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
  }

  componentDidUpdate = () => {
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

  handleSubmit = () => {
    if (!this.state.mobileNumber) {
      ShowToast('Please enter Mobile number!');
      return;
    } else if (!phoneNumber(this.state.mobileNumber)) {
      ShowToast('Please enter correct Mobile number!');
      return;
    } else {
      const dataToSend = {
        countryCode: this.state.countryCode,
        mobileNo: this.state.mobileNumber,
      };
      this.setState({loadingSpinner: true});
      postAPI('createOtp', dataToSend)
        .then(response => {
          if (response.status == 200) {
            ShowToast(response.message);
            console.log('Response', JSON.stringify(response));
            this.setState({loadingSpinner: false});
            this.props.navigation.navigate('LoginOTP', {
              userDetails: {
                _id: response.data._id,
                otp: response.data.otp,
                mobileNumber: this.state.mobileNumber,
                countyCode: this.state.countryCode,
              },
            });
          } else {
            this.setState({loadingSpinner: false});
            ShowToast(response.message);
          }
          console.log(response, response.message);
        })
        .catch(err => {
          this.setState({loadingSpinner: false});
          console.log(err);
          // ShowToast('Something went wrong!');
        });
    }
  };
  onTextChange = text => {
    this.setState({
      mobileNumber: text,
    });
    var cleaned = ('' + text).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '',
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
          '',
        );

      this.setState({
        mobileNumber2: number,
      });

      return;
    }
    this.setState({
      mobileNumber2: text,
    });
  };
  render() {
    const {PhoneCodeNew} = this.state;

    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.statusBarColor}
        />
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView style={{flex: 1}}>
            <KeyboardAvoidingView
              style={{flex: 1, paddingBottom: this.state.keyboardHeight + 100}}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <View style={{flex: 1, marginLeft: 40, marginRight: 30}}>
                <Image
                  source={localImages.forgot_image}
                  style={styles.lockImage}
                />
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
                    value={this.state.mobileNumber2}
                    onChangeText={value => this.onTextChange(value)}
                    keyboardType={'number-pad'}
                    // iconName={'search_gray_icon'}
                  />
                </View>
              </View>
              <Spinner
                //visibility of Overlay Loading Spinner
                visible={this.state.loadingSpinner}
                //Text with the Spinner

                //Text style of the Spinner Text

                cancelable={true}
                indicatorStyle={{color: colors.red}}
              />
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
                onAction={this.handleSubmit}
              />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  byContinueText: {
    color: colors.black,
    fontSize: wp('3.2%'),
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'center',
    fontStyle: 'normal',
    // marginBottom : hp("5%")
    marginTop: 51,
  },
  termAndCondition: {
    color: colors.info_color,
    fontSize: wp('4%'),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'normal',
    marginTop: 9,
  },
  lockImage: {
    height: 90,
    width: 90,
    alignSelf: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ForgetPassword;
