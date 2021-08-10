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
import ShowToast from '../../component/Toast';
const {height, width} = Dimensions.get('window');
import {postAPI, getAPI} from '../../utils/Api';
import {phoneNumber} from '../../component/Validation';
import Spinner from '../../utils/Loader';
import DataManager from '../../utils/DataManager';

import OTPTextInput from '@twotalltotems/react-native-otp-input';

class LoginByPin extends Component {
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
      title: 'Unlock with PIN',
      subTitle: '',
      colorTitle: '#2b8ecd',
      isClearInput: false,
    };
  }

  componentDidMount = () => {};

  handleSubmit = async confirmCode => {
    console.log('confrom Conde', confirmCode);

    this.handleResetSubmit(confirmCode);
    //}
  };

  handleResetSubmit = async confirmCode => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    const dataToSend = {
      userId: userDetails._id,
      pin: confirmCode,
    };
    this.setState({loadingSpinner: true});

    postAPI('loginByPin', dataToSend)
      .then(response => {
        if (response.status == 200) {
          DataManager.setUserDetail(response.data);
          DataManager.setSignUpDetails(response.data);
          console.log('Response hai', JSON.stringify(response));
          this.setState({
            title: 'Unlock with PIN',
            subTitle: '',
            colorTitle: '#2b8ecd',
            loadingSpinner: false,
            isClearInput: false,
          });

          DataManager.setUserDetail(response.data);
          DataManager.setSignUpDetails(response.data);
          if (response.data.applicationId == 0) {
            if (response.data.interestedAccount == 47) {
              if (response.data.screen == 'initial_state') {
                this.props.navigation.navigate('StartYourSignUpJourney1', {
                  id: 1,
                });
              } else if (response.data.screen == 'user_basket') {
                this.props.navigation.navigate('VerifyYourIdentity', {
                  id: 1,
                });
              } else if (response.data.screen == 'identity') {
                this.props.navigation.navigate('SpinScreen3', {
                  id: 1,
                });
              }
            } else if (response.data.interestedAccount == 48) {
              if (response.data.screen == 'initial_state') {
                this.props.navigation.navigate('ManagedAccount', {
                  id: 2,
                });
              } else if (response.data.screen == 'portfolio') {
                this.props.navigation.navigate('VerifyYourIdentity', {
                  id: 2,
                });
              } else if (response.data.screen == 'identity') {
                this.props.navigation.navigate('SpinScreen3', {
                  id: 2,
                });
              }
            } else {
              if (response.data.screen == 'initial_state') {
                this.props.navigation.navigate('DualCreateBasket', {
                  id: 5,
                });
              } else if (response.data.screen == 'user_basket') {
                this.props.navigation.navigate('VerifyYourIdentity', {
                  id: 5,
                });
              }
            }
          } else if (
            response.data.applicationId != 0 &&
            response.data.screen != 'completed'
          ) {
            if (response.data.interestedAccount == 47) {
              this.props.navigation.navigate('StartYourSignUpJourney1', {
                id: 1,
              });

              if (response.data.screen == 'initial_state') {
                this.props.navigation.navigate('StartYourSignUpJourney1', {
                  id: 1,
                });
              } else if (response.data.screen == 'user_basket') {
                this.props.navigation.navigate('VerifyYourIdentity', {
                  id: 1,
                });
              } else if (response.data.screen == 'identity') {
                this.props.navigation.navigate('SpinScreen3', {
                  id: 1,
                });
              } else if (response.data.screen == 'free_stock') {
                this.props.navigation.navigate('PlaidLink', {
                  id: 1,
                });
              } else {
                this.props.navigation.navigate('Home', {
                  screen: 'Dashboard',
                  params: {
                    id: response.data.mudaniRoboUpdated === 1 ? 6 : 1,
                  },
                });
              }
            } else if (response.data.interestedAccount == 48) {
              if (response.data.screen == 'initial_state') {
                this.props.navigation.navigate('ManagedAccount', {
                  id: 2,
                });
              } else if (response.data.screen == 'portfolio') {
                this.props.navigation.navigate('VerifyYourIdentity', {
                  id: 2,
                });
              } else if (response.data.screen == 'identity') {
                this.props.navigation.navigate('SpinScreen3', {
                  id: 2,
                });
              } else if (response.data.screen == 'free_stock') {
                this.props.navigation.navigate('PlaidLink', {
                  id: 2,
                });
              } else {
                this.props.navigation.navigate('Home', {
                  screen: 'Dashboard',
                  params: {
                    id: response.data.mudaniInvestUpdated == 1 ? 5 : 2,
                  },
                });
              }
            } else {
              if (response.data.screen == 'initial_state') {
                this.props.navigation.navigate('DualCreateBasket', {
                  id: 5,
                });
              } else if (response.data.screen == 'user_basket') {
                this.props.navigation.navigate('VerifyYourIdentity', {
                  id: 5,
                });
              } else if (response.data.screen == 'identity') {
                this.props.navigation.navigate('SpinScreen3', {
                  id: 5,
                });
              } else if (response.data.screen == 'free_stock') {
                this.props.navigation.navigate('PlaidLink', {
                  id: 5,
                });
              } else if (response.data.screen == 'uncompleted') {
                this.props.navigation.navigate('TellAboutManagedAccount', {
                  id: 5,
                });
              } else if (response.data.screen == 'AddManagedFundYourAccount') {
                this.props.navigation.navigate('AddManagedFundYourAccount', {
                  id: 5,
                });
              }
            }
          } else if (
            response.result.application.custodian_completed_at == null
          ) {
            this.props.navigation.navigate('Home', {
              screen: 'Dashboard',
              params: {
                id:
                  response.data.interestedAccount == 47
                    ? 1
                    : response.data.interestedAccount == 48
                    ? 2
                    : 5,
              },
            });
          }
        } else {
          this.setState({
            title: 'Incorrect PIN Code',
            subTitle: 'Please try again',
            colorTitle: colors.red,
            loadingSpinner: false,
            isClearInput: true,
          });
        }
        console.log(response, response.message);
        this.setState({loadingSpinner: false});
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
        console.log(err);
      });
  };

  render() {
    const {title, subTitle, colorTitle, isClearInput} = this.state;
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.statusBarColor}
        />
        <SafeAreaView style={CustomStyles.containerbording}>
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

                    color: colorTitle,
                  }}>
                  {title}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 18,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    marginTop: 10,

                    color: colorTitle,
                  }}>
                  {subTitle}
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
                    textColor={colorTitle}
                    inputCellLength={1}
                    pinCount={4}
                    codeInputFieldStyle={{
                      //backgroundColor: colorTitle,
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      borderWidth: 1,

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
                      this.handleSubmit(code);
                    }}
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

export default LoginByPin;
