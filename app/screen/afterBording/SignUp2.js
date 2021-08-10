import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {hp, wp} from '../../utils/responsive';
import ShowToast from './../../component/Toast';
const {height, width} = Dimensions.get('window');
class SignUp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      keyboardOpen: false,
      firstName: '',
      middleName: '',
      lastName: '',
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
    // console.log("Hddddddd",this.props.route.params.userDetails);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleSubmit = async () => {
    if (!this.state.firstName.trim()) {
      ShowToast('Please enter first name!');
    } else if (this.state.firstName.length < 1) {
      ShowToast('First name character length should be 1 at least character.!');
    } else if (!this.state.lastName.trim()) {
      ShowToast('Please enter last name!');
    } else if (this.state.lastName.length < 1) {
      ShowToast('Last name character length should be 1 at least character.!');
    } else {
      const dataToSend = {
        userName: this.props.route.params.userDetails.userName,
        email: this.props.route.params.userDetails.email,
        firstName: this.state.firstName,
        middleName: this.state.middleName ? this.state.middleName : '',
        lastName: this.state.lastName,
      };
      this.props.navigation.navigate('SignUp3', {userDetails: dataToSend});
    }
  };
  render() {
    return (
      <>
        {/* <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.statusBarColor}
        /> */}
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS == 'ios' ? 'padding' : ''}>
            <ScrollView>
              <View style={{flex: 1, marginLeft: 40, marginRight: 30}}>
                <View>
                  <Text
                    numberOfLines={5}
                    style={{
                      width: width - 80,
                      // height: 27,
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
                    Great! What's your Legal Name?
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={CustomStyles.subLabel}>
                    We need some basic information to help you get set up.
                  </Text>
                </View>
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 80}
                  borderRadius={30}
                  marginTop={54}
                  placeholder="First Name"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  onChangeText={firstName =>
                    this.setState({firstName: firstName})
                  }
                  value={this.state.firstName}
                  returnKeyType="next"
                  onSubmitEditing={() => this.focusNextTextInput('middleName')}
                  // iconName={'search_gray_icon'}
                />
                <PlainTextInput
                  inputRef={input => {
                    this.textInput['middleName'] = input;
                  }}
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 80}
                  borderRadius={30}
                  marginTop={17}
                  placeholder="Middle Name (Optional)"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={17}
                  onChangeText={middleName =>
                    this.setState({middleName: middleName})
                  }
                  value={this.state.middleName}
                  onSubmitEditing={() => this.focusNextTextInput('lastName')}
                  returnKeyType="next"
                  // iconName={'search_gray_icon'}
                />
                <PlainTextInput
                  inputRef={input => {
                    this.textInput['lastName'] = input;
                  }}
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 80}
                  borderRadius={30}
                  marginTop={17}
                  placeholder="Last Name"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  onChangeText={lastName => this.setState({lastName: lastName})}
                  value={this.state.lastName}
                  returnKeyType="done"
                  // keyboardType={()=>Keyboard.dismiss()}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  // iconName={'search_gray_icon'}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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

export default connect(mapToProp, mapDispatchToProps)(SignUp2);
