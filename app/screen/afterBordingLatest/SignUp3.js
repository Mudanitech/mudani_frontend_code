import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View, Text, Dimensions,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {PlainTextInput} from '../../component/InputBox';
import {wp} from '../../utils/responsive';

const {height, width} = Dimensions.get('window');

class SignUp3 extends Component {
  constructor(props) {
    super(props);
  }

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
                  What's your Mobile Number?
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
                  flexDirection: 'row',
                  marginTop: 54,
                  justifyContent: 'space-between',
                }}>
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - wp('82')}
                  borderRadius={30}
                  //  marginTop={54}
                  placeholder="+1"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={50}
                  onChangeText={() => null}
                  // iconName={'search_gray_icon'}
                />
                <PlainTextInput
                  height={43}
                  backgroundColor={colors.white}
                  width={width - wp('40%')}
                  borderRadius={30}
                  //marginTop={17}
                  placeholder="Enter your Mobile Number"
                  label=""
                  labelColor={colors.labelColor}
                  placeholderColor={colors.placeHolderColor}
                  inputTextColor={colors.text}
                  maxLength={17}
                  onChangeText={() => null}
                  // iconName={'search_gray_icon'}
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
                  marginTop={366}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Continue"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.props.navigation.navigate('ChoosePasswordScreen')
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

export default connect(mapToProp, mapDispatchToProps)(SignUp3);
