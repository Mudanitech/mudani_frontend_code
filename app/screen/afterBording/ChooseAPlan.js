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
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {hp, wp} from '../../utils/responsive';
import {CustomStyles} from '../style/CustomStyles';
import ShowToast from '../../component/Toast';
import Spinner from '../../utils/Loader';
import {postAPI} from './../../utils/Api';
import DataManager from './../../utils/DataManager';

const {height, width} = Dimensions.get('window');

class ChooseAPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: [
        {AccountType: 'Individual', text: 'hsdfjkhksjdf'},
        {AccountType: 'Joint', text: 'hsdfjkhksjdf'},
        {AccountType: 'Retirement', text: 'hsdfjkhksjdf'},
      ],
      userId: '',
      application_id: '',
      loadingSpinner: false,
    };
  }
  componentDidMount = async () => {
    // console.log('Choose your plan', this.props.route.params.data);
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});
  };
  handleSubmit = async () => {
    this.props.navigation.navigate('YourPlan', {
      data: this.props.route.params.data,
    });
  };

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            Header={''}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <View
              style={{
                alignSelf: 'center',
                marginTop: hp('3'),
                marginBottom: hp('5'),
              }}>
              <View>
                <Image
                  source={localImages.choose_a_plan_icon}
                  style={{
                    height: hp('30%'),
                    width: wp('35%'),
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}></Image>
              </View>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 20,
                  fontFamily: fonts.bold,
                  marginTop: hp('2%'),
                  marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Pick a plan
              </Text>

              <Text
                style={{
                  color: colors.black,
                  fontSize: 13,
                  fontFamily: fonts.bold,
                  marginTop: 13,
                  marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Select your monthly plan
              </Text>

              <View style={styles.textContainer}>
                {this.props.route.params.id == 1 ? (
                  <Text style={styles.btnText}>
                    Choose a plan that works for you. Mudani offers a variety of
                    plans ranging from free self-directed to premium
                    fully-managed accounts.
                  </Text>
                ) : this.props.route.params.id == 2 ? (
                  <Text style={styles.btnText}>
                    Choose a plan that works for you. Mudani offers a variety of
                    plans ranging from free self-directed to premium
                    fully-managed accounts.
                  </Text>
                ) : (
                  <Text style={styles.btnText}>
                    Choose a plan that works for you so we can get your
                    dual-journey account set up.
                  </Text>
                )}
              </View>
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
                width={wp('60%')}
                height={43}
                // marginTop={Platform.OS == "android"?hp("9%") :hp("14%")}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
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
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 166,
    //flex : 1,
    // height : "60%",
    alignSelf: 'center',
    marginBottom: 23,
  },
  footerText: {
    //width: width - 40,
    height: 27,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    // marginTop:50,
    //marginStart:40,
    //marginEnd:40,
    color: '#72e2db',
    textAlign: 'center',
  },
  accordianPadding: {
    paddingTop: 8,
    // paddingBottom : 4,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '100%',
    alignSelf: 'center',
  },
  createBasketBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  createBasketBtn1: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 29,
    width: '80%',
  },
  btnInsideView: {
    backgroundColor: '#e0eef8',
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  circleText: {
    fontSize: 15,
    color: '#2b8ecd',
    fontFamily: fonts.regular,
  },
  btnText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,

    textAlign: 'center',
  },
  textContainer: {
    //width : width -46,
    // alignSelf : "center",
    marginLeft: 46,
    marginRight: 46,
    marginTop: 16,
    // alignSelf : "center",
  },
});

export default ChooseAPlan;
