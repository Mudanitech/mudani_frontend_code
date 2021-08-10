import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp, hp} from '../../utils/responsive';
import ShowToast from './../../component/Toast';
import {CheckPassword} from './../../component/Validation';

const {height, width} = Dimensions.get('window');

class ChoosePassswordScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      showPassword: true,
      showPassword2: true,
      keyboardOpen: false,
      createPassword: '',
      confirmPassword: '',
    };
    this.textInput = {};
  }

  focusNextTextInput(id) {
    this.textInput[id].focus();
  }

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
    console.log('Hddddddd', this.props.route.params.userDetails);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleSubmit = async () => {
    if (!this.state.createPassword) {
      ShowToast('Please enter create password!');
    } else if (!CheckPassword(this.state.createPassword)) {
      ShowToast(
        'Please enter create password at least 6 characters which contain at least one numeric digit, one uppercase and one lowercase letter',
      );
    } else if (!this.state.confirmPassword) {
      ShowToast('Please enter confirm password!');
    } else if (!CheckPassword(this.state.confirmPassword)) {
      ShowToast(
        'Please enter cofirm password at least 6 characters which contain at least one numeric digit, one uppercase and one lowercase letter',
      );
    } else {
      const dataToSend1 = {
        countryCode: this.props.route.params.userDetails.countryCode,
        mobileNumber: this.props.route.params.userDetails.mobileNumber,
        userName: this.props.route.params.userDetails.userName,
        email: this.props.route.params.userDetails.email,
        firstName: this.props.route.params.userDetails.firstName,
        middleName: this.props.route.params.userDetails.middleName,
        lastName: this.props.route.params.userDetails.lastName,
        otp: this.props.route.params.userDetails.otp,
        confirmPassword: this.state.confirmPassword,
      };

      if (this.state.createPassword !== this.state.confirmPassword) {
        ShowToast('Create and Confirm password did not match!');
      } else {
        this.props.navigation.navigate('WalkThrough', {
          userDetails: dataToSend1,
        });
      }
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
          <ScrollView style={{flex: 1}}>
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <View
                style={{
                  flex: 1,
                  marginLeft: 40,
                  marginRight: 30,
                }}>
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
                    Choose a Password
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={CustomStyles.subLabel}>
                    Please use a unique password to log back in at anytime.
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 25,
                  }}>
                  <PlainTextInput
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={23}
                    placeholder="Create a password"
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
                    onChangeText={createPassword =>
                      this.setState({createPassword: createPassword})
                    }
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      this.focusNextTextInput('confirmPassword')
                    }
                    value={this.state.createPassword}
                  />
                  <PlainTextInput
                    inputRef={input => {
                      this.textInput['confirmPassword'] = input;
                    }}
                    height={43}
                    backgroundColor={colors.white}
                    width={width - 90}
                    borderRadius={30}
                    marginTop={23}
                    placeholder="Confirm Password"
                    label=""
                    labelColor={colors.labelColor}
                    placeholderColor={colors.placeHolderColor}
                    inputTextColor={colors.text}
                    maxLength={50}
                    iconName={
                      this.state.showPassword2
                        ? 'visibility'
                        : 'visibilitycross'
                    }
                    onIconClick={() =>
                      this.setState({
                        showPassword2: this.state.showPassword2 ? false : true,
                      })
                    }
                    secureTextEntry={this.state.showPassword2}
                    onChangeText={confirmPassword =>
                      this.setState({confirmPassword})
                    }
                    returnKeyType="done"
                    // keyboardType={()=>Keyboard.dismiss()}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    value={this.state.confirmPassword}
                  />
                </View>
                <Text style={styles.byContinueText}>
                  By proceeding, you’re agreeing to our{' '}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('TermsAndConditions')
                  }>
                  <Text style={styles.termAndCondition}>
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
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

export default connect(mapToProp, mapDispatchToProps)(ChoosePassswordScreen);
