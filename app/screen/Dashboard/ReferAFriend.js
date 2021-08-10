import React, {useState, Component, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Platform,
  ImageBackground,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {PlainTextInput} from './../../component/InputBox';
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import WheelOfFortune from 'react-native-wheel-of-fortune';


const participants = [
  'apple',
  'nokia',
  'uber',
  'snapchat',
  'king',
  'jetblue',
  'ford',
  'amc',
];


class ReferAFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
      isSpinnerStart : false ,
    };
  }
  _renderPlayButton = (play) => {
    return play
  };
  
setIsSpinner = ()=>{
  this._renderPlayButton()
  this.setState({isSpinnerStart : true})
}

  render() {


    const wheelOptions = {
      rewards: participants,
      knobSize: 10,
      borderWidth: 3,
      borderColor: 'transparent',
      innerRadius: 30,
      duration: 15000,
      winner: this.state.winnerIndex,
      textAngle: 'vertical',
      backgroundColor: 'transparent',
      onRef: ref => (this.child = ref),
    };
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="Refer a Friend"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView>
        <View style={styles.mainContainer}>
      <View>
      <View style = {{width : wp("22%"),height : wp("22"),marginTop : Platform.OS == "ios" ? 120 :100,alignSelf : "center"}}>
                <WheelOfFortune
                 options={wheelOptions}
                      knobSize={10}
                      borderWidth={3}
                      getWinner={(value, index) =>
                        this.getWinnerName(value, index)
                      }
                      spinnerImage={localImages.spinner2}
                      onPlay={play => this._renderPlayButton(play)}
                />
                </View>
        {/* <Image source={localImages.spinner} style={styles.spinImage} /> */}
      </View>
      <View>
        <Text style={styles.paratext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          interdum neque sed diam imperdiet mollis. Sed ornare imperdiet erat
          sit amet elementum.
        </Text>
      </View>
      <View style={{alignSelf: 'center'}}>
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 100}
          borderRadius={30}
          marginTop={27}
          placeholder="Enter your email"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          // iconName={'search_gray_icon'}
        />
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 100}
          borderRadius={30}
          marginTop={22}
          placeholder="Friend's Referral email"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          // iconName={'search_gray_icon'}
        />
      </View>
      <View>
        <View style={{marginTop: hp('5.29'),width : wp("70%"),alignSelf : "center"}}>
        <LinearGradient
                  colors={[colors.blue, '#fff']}
                  start={{x: 1.3, y: 0}}
                  end={{x: 0, y: 0}}
                  style={styles.linearGradient}>
                  <View>
                    <SwipeButton
                      disabled={false}
                      //disable the button by doing true (Optional)
                      swipeSuccessThreshold={70}
                      height={45}
                      //height of the button (Optional)
                      width={wp("69%")}
                      //width of the button (Optional)
                      title="Swipe to Spin"
                      //Text inside the button (Optional)
                      thumbIconImageSource={localImages.btn_arrow_color}
                      //thumbIconStyles = {{resizeMode : "contain"}}
                      //You can also set your own icon (Optional)
                      onSwipeSuccess={() => {
                        this.setIsSpinner();
                      }}
                      // forceReset={(reset) => {
                      //   forceResetLastButton = reset;
                      // }}
                      shouldResetAfterSuccess={true}
                      resetAfterSuccessAnimDelay={5000}
                      //After the completion of swipe (Optional)
                      railFillBackgroundColor={colors.transparent} //(Optional)
                      railFillBorderColor={colors.transparent} //(Optional)
                      thumbIconBackgroundColor={colors.white} //(Optional)
                      thumbIconBorderColor={colors.white} //(Optional)
                      railBackgroundColor={colors.transparent} //(Optional)
                      railBorderColor={colors.transparent} //(Optional)
                      titleStyles={{
                        fontSize: 16,
                        color: colors.blue,
                        fontWeight: 'bold',
                      }}></SwipeButton>
                  </View>
                </LinearGradient>
          {/* <LinearGradient
            colors={['transparent', colors.blue]}
            start={{x: 2, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.linearGradient}>
            <View>
              <SwipeButton
                disabled={false}
                //disable the button by doing true (Optional)
                swipeSuccessThreshold={70}
                height={45}
                //height of the button (Optional)
                width={width - wp("32%")}
                //width of the button (Optional)
                title="Swipe to Spin"
                //Text inside the button (Optional)
                thumbIconImageSource={localImages.btn_arrow_color}
                //thumbIconStyles = {{resizeMode : "contain"}}
                //You can also set your own icon (Optional)
                onSwipeSuccess={() => {
                  this.setIsSpinner();
                }}
                shouldResetAfterSuccess={true}
                        resetAfterSuccessAnimDelay={5000}
                //After the completion of swipe (Optional)
                railFillBackgroundColor={colors.transparent} //(Optional)
                railFillBorderColor={colors.transparent} //(Optional)
                thumbIconBackgroundColor={colors.white} //(Optional)
                thumbIconBorderColor={colors.white} //(Optional)
                railBackgroundColor={colors.transparent} //(Optional)
                railBorderColor={colors.transparent} //(Optional)
                titleStyles={{
                  fontSize: 13,
                  color: colors.white,
                  fontWeight: 'bold',
                }}></SwipeButton>
            </View>
          </LinearGradient> */}
           {/* <LinearGradient
                  colors={[colors.blue, '#fff']}
                  start={{x: 1.3, y: 0}}
                  end={{x: 0, y: 0}}
                  style={styles.linearGradient}>
                  <View>
                    <SwipeButton
                      disabled={false}
                      //disable the button by doing true (Optional)
                      swipeSuccessThreshold={70}
                      height={45}
                      //height of the button (Optional)
                      width={wp("67%")}
                      //width of the button (Optional)
                      title="Swipe to Spin"
                      //Text inside the button (Optional)
                      thumbIconImageSource={localImages.btn_arrow_color}
                      //thumbIconStyles = {{resizeMode : "contain"}}
                      //You can also set your own icon (Optional)
                      onSwipeSuccess={() => {
                        // this.openModal();
                        // this._renderPlayButton()
                        this.setIsSpinner();
                        // Alert.alert("Hello")
                      }}
                      forceReset={(reset) => {
                        forceResetLastButton = reset;
                      }}
                      shouldResetAfterSuccess={true}
                      resetAfterSuccessAnimDelay={5000}
                      //After the completion of swipe (Optional)
                      railFillBackgroundColor={colors.transparent} //(Optional)
                      railFillBorderColor={colors.transparent} //(Optional)
                      thumbIconBackgroundColor={colors.white} //(Optional)
                      thumbIconBorderColor={colors.white} //(Optional)
                      railBackgroundColor={colors.transparent} //(Optional)
                      railBorderColor={colors.transparent} //(Optional)
                      titleStyles={{
                        fontSize: 16,
                        color: colors.blue,
                        fontWeight: 'bold',
                      }}
                      ></SwipeButton>
                  </View>
                </LinearGradient> */}
        </View>
       </View>
    </View>
 
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  mainContainer: {
    flex: 1,
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    marginBottom: hp('5%'),
  },
  buttons: {
    height: hp('10.94%'),
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: hp('1.64%'),
  },

  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    borderRadius: wp('2%'),
    borderColor: colors.grayColor,
    borderWidth: 0.4,
    backgroundColor: colors.white,
  },
  buttons1: {
    //   width: wp('45%'),
    height: hp('5.84%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttons2: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: wp('2%'),
    borderBottomLeftRadius: wp('2%'),

    // marginBottom: hp('1.64%'),
  },
  buttons3: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
  },
  buttons4: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopRightRadius: wp('2%'),
    // borderBottomRightRadius: wp('2%'),
  },
  buttonText1: {
    fontSize: wp('3%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3%'),
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  borderSeperator: {
    height: 30,
    borderWidth: Platform.OS == 'android' ? 0.3 : 0.5,
    borderColor: colors.grayColor,
  },
  iconImage: {
    height: 34,
    width: 34,
  },
  earnedContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    padding: 14,
    borderRadius: 10,
    marginBottom: 11,
  },
  firstContainer: {width: wp('13%')},
  secondContainer: {width: wp('30%')},
  thirdContainer: {
    flex: 1,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  itemText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  itemText1: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  paratext: {
    fontSize: wp('3.73%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 10,
    // marginLeft: wp('2.53'),
    marginTop : 150
  },
  spinImage: {
    height: hp('41'),
    width: hp('41'),
    alignSelf: 'center',
    marginTop: 38,
  },
  totalNumber : {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    textAlign: 'left',
    marginTop: 28,
    marginBottom : 15,
  },
  linearGradient: {
    // flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
  },
  referralText1: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  referralText2: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  levelContainer : {
    backgroundColor: colors.white,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  levelFirstContainer : {
      flexDirection : "row",
      flex : 1,
    //   alignItems : "flex-start",
      justifyContent : "space-between",
      marginBottom : 8,
  },
  levelTwoContainer : {
    flexDirection : "row",
    flex : 1,
    alignItems : "flex-end",
    justifyContent : "flex-end",
    marginTop : 10
},
textLevel1 : {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
},
textLevel2: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
},
riskLevelText :{
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  aggressiveText :{
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
});
export default ReferAFriend;
