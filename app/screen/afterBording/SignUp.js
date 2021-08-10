//

import React, {Component, createRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {hp, wp} from '../../utils/responsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import KeyboardListener from 'react-native-keyboard-listener';
import ShowToast from './../../component/Toast';
import {ValidateEmail} from './../../component/Validation';
import {postAPI} from './../../utils/Api';
import Spinner from './../../utils/Loader';

const {height, width} = Dimensions.get('window');
var keyboardshow = false;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      keyboardOpen: false,
      email: '',
      userName: '',
      loadingSpinner: false,
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
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    // if(this.state.keyboardOpen == false){
    //   this.setState({keyboardOpen: true});
    // }
    keyboardshow == true;
  }

  handleSubmit = async () => {
    if (!this.state.email) {
      ShowToast('Please enter email!');
    } else if (!ValidateEmail(this.state.email)) {
      ShowToast('Please enter correct email!');
    } else if (!this.state.userName.trim()) {
      ShowToast('Please enter username!');
    } else {
      this.setState({loadingSpinner: true});
      const dataToSend = {
        email: this.state.email,
        userName: this.state.userName,
      };
      postAPI('checkUserEmail', dataToSend)
        .then(response => {
          if (response.status == 200) {
            this.setState({loadingSpinner: false});
            this.props.navigation.navigate('SignUp2', {
              userDetails: dataToSend,
            });
          } else {
            this.setState({loadingSpinner: false});

            ShowToast(response.message);
          }
          console.log(response, response.message);
        })
        .catch(err => {
          this.setState({loadingSpinner: false});
          //ShowToast('Something went wrong!');
          console.log(err);
        });
    }
  };
  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.authBackGroud}
          />
          <Spinner
            visible={this.state.loadingSpinner}
            cancelable={true}
            indicatorStyle={{color: colors.red}}
          />
          <HeaderWithBack
            backgroundColor={1}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          {/* <KeyboardAwareScrollView extraHeight = {100}> */}

          <ScrollView style={{flex: 1}}>
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
                  Enter your Email
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={CustomStyles.subLabel}>
                  To get started, please enter your email and a unique username.
                </Text>
              </View>

              <PlainTextInput
                height={43}
                backgroundColor={colors.white}
                width={width - 80}
                borderRadius={30}
                marginTop={54}
                placeholder="Enter your Email"
                label=""
                labelColor={colors.labelColor}
                placeholderColor={colors.placeHolderColor}
                inputTextColor={colors.text}
                maxLength={50}
                onChangeText={email => this.setState({email: email})}
                value={this.state.email}
                keyboardType="email-address"
                // autoFocus={true}
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
                width={width - 80}
                borderRadius={30}
                marginTop={17}
                placeholder="Create username"
                label=""
                labelColor={colors.labelColor}
                placeholderColor={colors.placeHolderColor}
                inputTextColor={colors.text}
                maxLength={50}
                onChangeText={userName => this.setState({userName: userName})}
                value={this.state.userName}
                returnKeyType="done"
                // keyboardType={()=>Keyboard.dismiss()}
                onSubmitEditing={() => Keyboard.dismiss()}

                // iconName={'search_gray_icon'}
              />
            </View>
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
                // marginTop={Platform.OS == "android"?hp("56.97%") :hp("56.97%")}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
                backgroundColor={colors.blue}
                onAction={() => this.handleSubmit()}
                // onAction={() => this.props.navigation.navigate('SignUp2')}
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

export default SignUp;
