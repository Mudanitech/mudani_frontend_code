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
import Spinner from './../../utils/Loader';
import {postAPI} from './../../utils/Api';

const {height, width} = Dimensions.get('window');

class ChoosePassswordScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      showPassword: true,
      showPassword2: true,
      createPassword: '',
      confirmPassword: '',
      loadingSpinner: false,
    };
    this.textInput = {};
  }
  focusNextTextInput(id) {
    this.textInput[id].focus();
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
      if (this.state.createPassword !== this.state.confirmPassword) {
        ShowToast('Create and Confirm password did not match!');
      } else {
        this.setState({loadingSpinner: true});
        const dataToSend = {
          // mobileNo: this.props.route.params.userDetails.mobileNo,
          password: this.state.confirmPassword,
          userId: this.props.route.params.userDetails._id,
        };

        postAPI('resetPassword', dataToSend)
          .then(response => {
            if (response.status == 200) {
              this.setState({loadingSpinner: false});
              ShowToast(response.message);
              this.props.navigation.navigate('LoginScreen');
              this.setState({createPassword: '', confirmPassword: ''});
            } else {
              this.setState({loadingSpinner: false});
              ShowToast(response.message);
            }
            console.log(response, response.message);
          })
          .catch(err => {
            this.setState({loadingSpinner: false});
            // ShowToast('Something went wrong!');
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
          <ScrollView>
            <View style={{flex: 1, marginRight: 40, marginLeft: 40}}>
              <View>
                <Text
                  style={{
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
                  Reset Password
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  rhoncus id felis non mollis. Mauris quis mattis velit.
                </Text>
              </View>

              <View style={{}}>
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 90}
                  borderRadius={30}
                  marginTop={50}
                  placeholder="New Password"
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
                    this.state.showPassword2 ? 'visibility' : 'visibilitycross'
                  }
                  onIconClick={() =>
                    this.setState({
                      showPassword2: this.state.showPassword2 ? false : true,
                    })
                  }
                  secureTextEntry={this.state.showPassword2}
                  inputRef={input => {
                    this.textInput['confirmPassword'] = input;
                  }}
                  onChangeText={confirmPassword =>
                    this.setState({confirmPassword})
                  }
                  returnKeyType="done"
                  // keyboardType={()=>Keyboard.dismiss()}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  value={this.state.confirmPassword}
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 29,
                }}>
                <ButtonWithoutShadow
                  width={width - 147}
                  height={43}
                  marginTop={68}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Reset"
                  backgroundColor={colors.blue}
                  onAction={() => this.handleSubmit()}
                />
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

export default connect(mapToProp, mapDispatchToProps)(ChoosePassswordScreen);
