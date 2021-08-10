import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {wp, hp} from '../../utils/responsive';
//import OTPTextInput from 'react-native-otp-textinput';
import ShowToast from './../../component/Toast';
const {height, width} = Dimensions.get('window');
import {postAPI, getAPI} from './../../utils/Api';
import {phoneNumber} from '../../component/Validation';
import Spinner from '../../utils/Loader';

import OTPTextInput from '@twotalltotems/react-native-otp-input';

import {TouchableOpacity} from 'react-native-gesture-handler';

class LoginOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      otp: '',
      otpServer: '',
      mobileNo: '',
      countryCode: '',
      _id: '',
      loadingSpinner: false,
    };
  }

  componentDidMount = () => {
    console.log('Login Otp : ', this.props.route.params.userDetails);
    this.setState({
      otpServer: this.props.route.params.userDetails.otp,
      mobileNo: this.props.route.params.userDetails.mobileNumber,
      countryCode: this.props.route.params.userDetails.countyCode,
      _id: this.props.route.params.userDetails._id,
    });
  };

  handleSubmit = async () => {
    const {otpServer, mobileNo, countryCode, _id} = this.state;
    if (!this.state.otp) {
      ShowToast('Please enter otp!');
    } else {
      const dataToSend = {
        countryCode: countryCode,
        mobileNo: mobileNo,
        otp: otpServer,
        _id: _id,
      };
      if (this.state.otp != +otpServer) {
        ShowToast('Please enter correct otp!');
      } else {
        this.props.navigation.navigate('LoginResetPassword', {
          userDetails: dataToSend,
        });
      }
    }
  };

  handleResetSubmit = async () => {
    if (!this.state.mobileNo) {
      ShowToast('Please enter Mobile number!');
    } else if (!phoneNumber(this.state.mobileNo)) {
      ShowToast('Please enter correct Mobile number!');
    } else {
      const dataToSend = {
        countryCode: this.state.countryCode,
        mobileNo: this.state.mobileNo,
      };
      this.setState({loadingSpinner: true});

      postAPI('createOtp', dataToSend)
        .then(response => {
          if (response.status == 200) {
            this.setState({loadingSpinner: false});
            this.setState({otpServer: response.data.otp});
            ShowToast(response.message);
          } else {
            this.setState({loadingSpinner: false});
            ShowToast(response.message);
          }
          console.log(response, response.message);
          this.setState({loadingSpinner: false});
        })
        .catch(err => {
          this.setState({loadingSpinner: false});
          console.log(err);
          // ShowToast('Something went wrong!');
        });
    }
  };

  render() {
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
          <ScrollView>
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
                  One Time Password
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    width: width - 40,
                    height: 56,
                    fontFamily: fonts.regular,
                    fontSize: 12,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 20,
                    letterSpacing: 0,
                    marginTop: 20,
                    flex: 1,
                    flexWrap: 'wrap',
                    textAlign: 'left',
                    color: '#082b3c',
                  }}>
                  Please, enter the verification code. We sent to yourmobile
                  number{' '}
                  {this.props.route.params
                    ? this.props.route.params.userDetails.mobileNumber
                    : ''}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 54,

                  height: 60,
                }}>
                <OTPTextInput
                  ref={e => (this.otpInput = e)}
                  selectionColor={colors.black}
                  inputCellLength={1}
                  pinCount={4}
                  codeInputFieldStyle={{
                    backgroundColor: 'white',
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 1,
                    shadowColor: '#000',
                    fontSize: 16,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                  onCodeFilled={code => {
                    this.setState({otp: code});
                    //console.log(`Code is ${code}, you are good to go!`);
                  }}
                  //handleTextChange={value => this.setState({otp: value})}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: width / 8,
                }}>
                <Text style={styles.byContinueText}>Didn't get the code? </Text>

                <TouchableOpacity onPress={this.handleResetSubmit}>
                  <Text style={styles.termAndCondition}>Resend</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 29,
                }}>
                <ButtonWithoutShadow
                  width={width - 147}
                  height={43}
                  marginTop={40}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Verify"
                  backgroundColor={colors.blue}
                  onAction={() => this.handleSubmit()}
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
          </ScrollView>
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
    //lineHeight: 27,
    // textAlign: 'center',
    // fontStyle: 'normal',
    alignItems: 'center',
    // marginBottom : hp("5%")
    //  marginTop: 51,
  },
  termAndCondition: {
    color: colors.info_color,
    fontSize: wp('3.2%'),
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'normal',
    // marginTop: 9,
  },
});

export default LoginOTP;
