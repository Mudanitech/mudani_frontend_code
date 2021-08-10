import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View, Text, Dimensions,StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp,hp} from '../../utils/responsive';

const {height, width} = Dimensions.get('window');

class ForgetPassword extends Component {
    constructor(props) {
        super();
        this.state = {
          showPassword : true,
        };
      }

  render() {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.statusBarColor}
        />
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack backgroundColor={1} 
          onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView>
              <Image source = {localImages.forgot_image} style = {styles.lockImage} />
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
                  }}>Forgot Password?
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
                 Enter your registered Cell number to reset yourpassword.
                </Text>
              </View>

              <View
                style={{
                  marginTop: 40,
                }}>
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - 90}
                  borderRadius={30}
                //   marginTop={23}
                  placeholder="Enter your Cell number"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  onChangeText = {()=>null}
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
                  label="Send OTP"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.props.navigation.navigate('ResetPassword')
                  }
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
    byContinueText : {
        color: colors.black,
        fontSize: wp('3.2%'),
        fontFamily: fonts.regular,
        textAlign: 'center',
        lineHeight: 27,
        textAlign: 'center',
        fontStyle: 'normal',
        // marginBottom : hp("5%")
        marginTop : 51,
      },
      termAndCondition : {
        color: colors.info_color,
        fontSize: wp('4%'),
        fontFamily: fonts.semiBold,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        marginTop : 9,

      },
      lockImage : {
          height : 90,
          width : 90,
          alignSelf : "center"
      }
})
const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedInUserAuthToken: (token) => {
      dispatch(actions.setLoggedInUserAuthToken(token));
    },
    setMyCartProduct: (mycartProduct) => {
      dispatch(actions.setMyCartProduct(mycartProduct));
    },

    setLoggedInUserAuthToken: (token) => {
      dispatch(actions.setLoggedInUserAuthToken(token));
    },
    setLoggedInUserDetails: (userDetails) => {
      dispatch(actions.setLoggedInUserDetails(userDetails));
    },
    setLoggedInUserStatus: (loginStatus) => {
      dispatch(actions.setLoggedInUserStatus(loginStatus));
    },
    setLoggedInUserType: (loginType) => {
      dispatch(actions.setLoggedInUserType(loginType));
    },
  };
};
const mapToProp = (state) => {
  return {
    loginUserType: state.localStates.loginUserType,
    mycartProduct: state.localStates.mycartProduct,
    // loading: state.auth.loading
  };
};

//export default connect (SignUp)

export default connect(mapToProp, mapDispatchToProps)(ForgetPassword);
