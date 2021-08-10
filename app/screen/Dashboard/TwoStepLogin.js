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
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {wp, hp} from '../../utils/responsive';
//import OTPTextInput from 'react-native-otp-textinput';
import ShowToast from './../../component/Toast';
const {height, width} = Dimensions.get('window');
import {postAPI, getAPI} from './../../utils/Api';
import {phoneNumber} from '../../component/Validation';
import Spinner from '../../utils/Loader';

import OTPTextInput from '@twotalltotems/react-native-otp-input';

class TwoStepLogin extends Component {
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

  componentDidMount = () => {};

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
          <View style={{flex: 1, alignItems: 'center', marginTop: width / 4}}>
            <View style={{}}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={localImages.mudani_logo}
                  style={{
                    height: 63,
                    width: 178,
                    resizeMode: 'contain',
                  }}></Image>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width,
                  marginTop: width / 10,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 24,
                    fontWeight: 'normal',
                    fontStyle: 'normal',

                    marginTop: 20,

                    color: '#2b8ecd',
                  }}>
                  1-Enter a Pin Code
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 18,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    marginTop: 10,

                    color: '#2b8ecd',
                  }}>
                  to keep your information secure
                </Text>
              </View>

              <View
                style={{width: width, height: 'auto', alignItems: 'center'}}>
                <View
                  style={{
                    height: 60,
                    width: 180,
                    marginTop: width / 10,
                  }}>
                  <OTPTextInput
                    secureTextEntry={true}
                    ref={e => (this.otpInput = e)}
                    inputCellLength={1}
                    pinCount={4}
                    textColor={'#2b8ecd'}
                    codeInputFieldStyle={{
                      //  backgroundColor: 'white',
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      borderWidth: 1,
                      shadowColor: '#000',
                      fontSize: 30,
                      padding: 0,
                    }}
                    codeInputHighlightStyle={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      borderWidth: 1,
                    }}
                    onCodeFilled={code => {
                      this.setState({otp: code});
                      this.props.navigation.navigate('TwoStepConfirmPinCode', {
                        firstCode: code,
                      });
                      //console.log(`Code is ${code}, you are good to go!`);
                    }}
                    //handleTextChange={value => this.setState({otp: value})}
                  />
                </View>
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

export default TwoStepLogin;
