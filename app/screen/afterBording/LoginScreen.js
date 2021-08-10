import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import {PlainTextInput} from '../../component/InputBox';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {hp, wp} from '../../utils/responsive';
import ShowToast from './../../component/Toast';
import {ValidateEmail, CheckPassword} from './../../component/Validation';
import {postAPI} from './../../utils/Api';
const {height, width} = Dimensions.get('window');
import DataManager from './../../utils/DataManager';
import Spinner from '../../utils/Loader';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      email: '',
      password: '',
      loadingSpinner: false,
      isRememberMe: false,
    };
    this.textInput = {};
  }
  focusNextTextInput(id) {
    this.textInput[id].focus();
  }

  componentDidMount = async () => {
    var userRememberMe = await DataManager.getRememberMe();
    userRememberMe = JSON.parse(userRememberMe);
    console.log('userDeatils', userRememberMe);

    if (userRememberMe == null) {
      this.setState({isRememberMe: false});
      this.setState({
        email: '',
        password: '',
      });
    } else {
      this.setState({isRememberMe: true});

      this.setState({
        email: userRememberMe.email,
        password: userRememberMe.password,
      });
    }
  };

  handleSubmit = async () => {
    if (!this.state.email) {
      ShowToast('Please enter email!');
    } else if (!ValidateEmail(this.state.email)) {
      ShowToast('Please enter correct email!');
    }
    if (!this.state.password) {
      ShowToast('Please enter password!');
    } else if (!CheckPassword(this.state.password)) {
      ShowToast(
        'Please enter password at least 6 characters which contain at least one numeric digit, one uppercase and one lowercase letter',
      );
    } else {
      // ShowToast('Complete');
      this.setState({loadingSpinner: true});
      const dataToSend = {
        email: this.state.email,
        password: this.state.password,
      };
      postAPI('login', dataToSend)
        .then(response => {
          if (response.status == 200) {
            this.setState({loadingSpinner: false});
            DataManager.setUserDetail(response.data);
            DataManager.setSignUpDetails(response.data);
            // if(response.data.screen==100){
            console.log('Dadda' + JSON.stringify(response));

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
                } else if (
                  response.data.screen == 'AddManagedFundYourAccount'
                ) {
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
                  id: response.data.interestedAccount == 47 ? 5 : 6,
                },
              });
            }
            //   if (response.data.interestedAccount == 47) {
            //     this.props.navigation.navigate('VerifyYourIdentity', {
            //       id: 1,
            //     });
            //   } else if (response.data.interestedAccount == 48) {
            //     this.props.navigation.navigate('VerifyYourIdentity', {
            //       id: 2,
            //     });
            //   } else {
            //     this.props.navigation.navigate('VerifyYourIdentity', {
            //       id: 5,
            //     });
            //   }
            // } else {
            //   this.props.navigation.navigate('Home', {
            //     screen: 'Dashboard',
            //     params: {
            //       id: response.data.interestedAccount == 47 ? 6 : 6,
            //     },
            //   });
            // }
          } else {
            this.setState({loadingSpinner: false});
            ShowToast(response.message);
          }
          console.log(response, response.message);
        })
        .catch(err => {
          this.setState({loadingSpinner: false});
          console.log(err);
        });
    }
  };

  rememberMe = async () => {
    const {isRememberMe, email, password} = this.state;
    var userDetails = await DataManager.getRememberMe();
    if (isRememberMe) {
      this.setState({isRememberMe: false});
      DataManager.setRememberMe(null);
    } else {
      this.setState({isRememberMe: true});
      var userData = {
        email: email,
        password: password,
      };
      DataManager.setRememberMe(userData);
    }
    //alert('fkdhj');
  };
  render() {
    const {isRememberMe} = this.state;
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={this.state.loadingSpinner}
            textStyle={styles.spinnerTextStyle}
            cancelable={true}
            indicatorStyle={{color: colors.red}}
          />
          <ScrollView>
            <View style={{alignSelf: 'center'}}>
              <Image
                source={localImages.mudani_logo}
                style={{
                  height: 63,
                  width: 178,
                  resizeMode: 'contain',
                }}></Image>
            </View>
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Login</Text>
              <View>
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 100}
                  borderRadius={30}
                  //   marginTop={17}
                  placeholder="Enter your email"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  value={this.state.email}
                  onChangeText={email => this.setState({email: email})}
                  // iconName={'search_gray_icon'}
                  returnKeyType="next"
                  // blurOnSubmit={false}
                  onSubmitEditing={() => this.focusNextTextInput('two')}
                  autoCapitalize="none"
                />
                <PlainTextInput
                  inputRef={input => {
                    this.textInput['two'] = input;
                  }}
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 100}
                  borderRadius={30}
                  marginTop={23}
                  placeholder="Enter Password"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  iconName={
                    this.state.showPassword ? 'visibility' : 'visibilitycross'
                  }
                  onIconClick={() =>
                    this.setState({
                      showPassword: this.state.showPassword ? false : true,
                    })
                  }
                  secureTextEntry={this.state.showPassword}
                  value={this.state.password}
                  onChangeText={password => this.setState({password: password})}
                  returnKeyType="done"
                  // keyboardType={()=>Keyboard.dismiss()}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity onPress={this.rememberMe}>
                    {isRememberMe ? (
                      <Image
                        source={localImages.check_blue}
                        style={{
                          height: 25,
                          width: 25,
                          marginRight: 10,
                          resizeMode: 'contain',
                        }}></Image>
                    ) : (
                      <View
                        style={{
                          height: 25,
                          width: 25,
                          alignSelf: 'center',
                          marginRight: 10,
                          borderColor: colors.grayColor,
                          borderWidth: 0.4,
                          borderRadius: 4,
                        }}></View>
                    )}
                  </TouchableOpacity>
                  <Text>Remember me</Text>
                </View>
              </View>

              <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 29,
                }}>
                <ButtonWithoutShadow
                  width={width - 147}
                  height={43}
                  marginTop={58}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Login"
                  backgroundColor={colors.blue}
                  onAction={() => this.handleSubmit()}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgetPassword')}
                style={{
                  marginBottom: Platform.OS == 'ios' ? hp('30%') : hp('13%'),
                }}>
                <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: hp('0%'),
              height: hp('11%'),
              width: wp('100%'),
              backgroundColor: colors.authBackGroud,
            }}>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: hp('2%'),
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>
                  Don't have an account?{' '}
                  <Text style={{color: colors.info_color}}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    color: colors.blue,
    fontSize: 23,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'left',
    marginTop: hp('5.84%'),
    marginBottom: hp('5.84%'),
  },
  loginContainer: {
    flex: 1,
    marginLeft: 50,
    marginRight: 40,
  },
  forgetPasswordText: {
    color: colors.black,
    fontSize: wp('3.2%'),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'center',
    fontStyle: 'italic',
    // marginTop : hp("5.84%"),
  },
  signUpText: {
    color: colors.black,
    fontSize: wp('3.2%'),
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 27,
    textAlign: 'center',
    fontStyle: 'normal',
    marginBottom: hp('5%'),
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default LoginScreen;
