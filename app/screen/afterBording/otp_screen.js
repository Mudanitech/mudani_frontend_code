import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp, hp} from '../../utils/responsive';
//import OTPTextInput from 'react-native-otp-textinput';
import OTPTextInput from '@twotalltotems/react-native-otp-input';

import ShowToast from './../../component/Toast';
import {getAPI, postAPI} from './../../utils/Api';
import Spinner from './../../utils/Loader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {phoneNumber} from '../../component/Validation';

const {height, width} = Dimensions.get('window');

class otp_screen extends Component {
  constructor(props) {
    super();
    this.state = {
      showPassword: true,
      otp: '',
      loadingSpinner: false,
      serverOtp: '',
    };
  }

  componentDidMount = () => {
    const {otp} = this.props.route.params;

    this.setState({serverOtp: otp});
  };

  handleSubmit = async () => {
    const {userDetails} = this.props.route.params;
    const {otp, serverOtp} = this.state;

    if (!this.state.otp) {
      ShowToast('Please enter otp!');
    } else {
      const dataToSend1 = {
        countryCode: userDetails.countryCode,
        mobileNo: userDetails.mobileNumber,
        otp: otp,
      };

      if (otp != +serverOtp) {
        ShowToast('Please enter correct otp!');
      } else {
        this.setState({loadingSpinner: true});
        postAPI('verifyOtp', dataToSend1)
          .then(response => {
            if (response.status == 200) {
              this.setState({loadingSpinner: false});
              this.props.navigation.navigate('ChoosePasswordScreen', {
                userDetails: userDetails,
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
    }
  };

  onResendOtp = () => {
    const {userDetails} = this.props.route.params;

    if (!userDetails.mobileNumber) {
      ShowToast('Please enter Mobile number!');
    } else if (!phoneNumber(userDetails.mobileNumber)) {
      ShowToast('Please enter correct Mobile number!');
    } else {
      const dataToSend = {
        countryCode: userDetails.countryCode,
        mobileNo: userDetails.mobileNumber,
      };
      this.setState({loadingSpinner: true});

      postAPI('checkUserMobileNo', dataToSend)
        .then(response => {
          if (response.status == 200) {
            this.setState({loadingSpinner: false});
            this.setState({serverOtp: response.data.otp});
            ShowToast(response.message);
          } else {
            this.setState({loadingSpinner: false});
            ShowToast(response.message);
          }
          console.log(response, response.message);
        })
        .catch(err => {
          this.setState({loadingSpinner: false});
          console.log(err);
          //ShowToast('Something went wrong!');
        });
    }
  };

  fillOtp = code => {
    this.setState({otp: code});

    setTimeout(() => {
      this.handleSubmit();
    }, 500);
  };

  render() {
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
                <Text style={CustomStyles.subLabel}>
                  Please enter the one time verification code we sent to your
                  phone number{' '}
                  {this.props.route.params.userDetails.countryCode +
                    ' - ' +
                    this.props.route.params.userDetails.mobileNumber}
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
                  style={{color: '#000'}}
                  codeInputHighlightStyle={{
                    color: 'pink',
                  }}
                  defaultTextFieldStyle={{
                    color: 'pink',
                  }}
                  codeInputFieldStyle={{
                    backgroundColor: 'white',
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 1,
                    shadowColor: '#000',
                    color: '#000',
                    fontSize: 16,
                    titleColor: '#000',

                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                  onCodeFilled={code => this.fillOtp(code)}
                  // onCodeFilled={code => {
                  //   this.setState({otp: code});
                  //   //console.log(`Code is ${code}, you are good to go!`);
                  // }}
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
                <TouchableOpacity onPress={this.onResendOtp}>
                  <Text style={styles.termAndCondition}> Resend</Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 29,
                }}>
                <ButtonWithoutShadow
                  width={width - 147}
                  height={43}
                  marginTop={Platform.OS == 'android' ? hp('6%') : hp('6%')}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Verify"
                  backgroundColor={colors.blue}
                  onAction={
                    () => this.handleSubmit()
                    // this.props.navigation.navigate('ChoosePasswordScreen')
                  }
                />
              </View> */}
            </View>
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
    // lineHeight: 27,
    textAlign: 'center',
    fontStyle: 'normal',
    // marginBottom : hp("5%")
    //  marginTop: 51,
  },
  termAndCondition: {
    color: colors.info_color,
    fontSize: wp('3.2%'),
    fontFamily: fonts.bold,
    textAlign: 'center',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'normal',
    //  marginTop: 9,
    fontWeight: 'bold',
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

export default connect(mapToProp, mapDispatchToProps)(otp_screen);
