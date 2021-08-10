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
  Platform,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp, hp} from '../../utils/responsive';
import DataManager from './../../utils/DataManager';
import ShowToast from './../../component/Toast';
import {CheckPassword} from './../../component/Validation';
import Spinner from './../../utils/Loader';
import {postAPI} from './../../utils/Api';
const {height, width} = Dimensions.get('window');

class ResetPassword extends Component {
  constructor(props) {
    super();
    this.state = {
      showPassword: true,
      showPassword2: true,
      showPassword3: true,
      userId: '',
      createPassword: '',
      confirmPassword: '',
      oldPassword: '',
    };
    this.textInput = {};
  }
  focusNextTextInput(id) {
    this.textInput[id].focus();
  }
  componentDidMount = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});
  };
  handleSubmit = async () => {
    if (!this.state.oldPassword) {
      ShowToast('Please enter old password!');
    } else if (!CheckPassword(this.state.oldPassword)) {
      ShowToast(
        'Please enter old password at least 6 characters which contain at least one numeric digit, one uppercase and one lowercase letter',
      );
    } else if (!this.state.createPassword) {
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
          userId: this.state.userId,
          oldPassword: this.state.oldPassword,
          newPassword: this.state.confirmPassword,
        };

        postAPI('changePassword', dataToSend)
          .then(response => {
            if (response.status == 200) {
              this.setState({loadingSpinner: false});
              ShowToast(response.message);
              this.props.navigation.navigate('Home', {screen: 'Dashboard'});
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
            <View style={{flex: 1, marginLeft: 40, marginRight: 30}}>
              <View>
                <Text
                  style={{
                    width: width - 40,
                    height: 27,
                    fontFamily: fonts.regular,
                    fontSize: 20,
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  rhoncus id felis non mollis. Mauris quis mattis velit.
                </Text>
              </View>

              <View
                style={{
                  marginTop: 54,
                }}>
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 90}
                  borderRadius={30}
                  marginTop={0}
                  placeholder="Old Password"
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
                  onChangeText={oldPassword =>
                    this.setState({oldPassword: oldPassword})
                  }
                  returnKeyType="next"
                  onSubmitEditing={() => this.focusNextTextInput('newPassord')}
                  value={this.state.oldPassword}
                />
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 90}
                  borderRadius={30}
                  marginTop={17}
                  placeholder="New Password"
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
                  onChangeText={createPassword =>
                    this.setState({createPassword: createPassword})
                  }
                  inputRef={input => {
                    this.textInput['newPassord'] = input;
                  }}
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
                  marginTop={17}
                  placeholder="Confirm Password"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  iconName={
                    this.state.showPassword3 ? 'visibility' : 'visibilitycross'
                  }
                  onIconClick={() =>
                    this.setState({
                      showPassword3: this.state.showPassword3 ? false : true,
                    })
                  }
                  secureTextEntry={this.state.showPassword3}
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
                  marginTop={Platform.OS == 'ios' ? hp('30%') : hp('14%')}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Save"
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
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    lineHeight: 24,
  },
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

export default ResetPassword;
