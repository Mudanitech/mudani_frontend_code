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
  ImageBackground,
  Alert,
  Platform
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import {SingleButtonModal} from './../../component/confirmModal';
import {hp, wp} from '../../utils/responsive';
import WheelOfFortune from 'react-native-wheel-of-fortune';
const {height, width} = Dimensions.get('window');
import {CustomStyles} from '../style/CustomStyles';
import { ButtonWithoutShadow, HeaderWithBack } from '../../component/Button'

class SpinScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      isModalVisible: false,
      isSpinnerStart : false ,
      accountType: [
        {AccountType: 'Individual', text: 'hsdfjkhksjdf'},
        {AccountType: 'Joint', text: 'hsdfjkhksjdf'},
        {AccountType: 'Retirement', text: 'hsdfjkhksjdf'},
      ],
    };
  }

  openModal = () => {
    this.setState({isModalVisible: true});
  };
  modalClose = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.navigate('SignUp');
  };
  _renderPlayButton = (play) => {
    return play
  };
  
setIsSpinner = ()=>{
  this._renderPlayButton()
  this.setState({isSpinnerStart : true})
}
  render() {
    return (
      <>
        <ImageBackground
          source={localImages.spin_background}
          //style={styles.image}
         // style={{height: height, width: width}}
         style = {CustomStyles.dashboardBoarding}
          resizeMode="stretch">
          <SafeAreaView style= {{flex :1}}>
            <HeaderWithBack
              backgroundColor={1}
              Header={' '}
              labelStyle={styles.labelStyle}
              onActionLeft={() => this.props.navigation.goBack()}
            />
            <ScrollView>
              <View style = {{flex : 1,marginBottom :1000}}>
              <Text
                numberOfLines={2}
                style={{
                  color: colors.white,
                  fontSize: 19,
                  fontFamily: fonts.bold,
                  //marginTop: 48,
                  // marginHorizontal: 40,
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: 29,
                  width: width - 10,
                  alignSelf: 'center',
                }}>
                We’re glad you’re here!Here’s a FREE stock for trusting us
              </Text>
              <View style={{alignSelf: 'center'}}>
                {/* <View>
                  <Image
                    source={localImages.spinner}
                    style={{
                      marginTop: height / 18,
                      height: hp("30.67"),
                      width: hp("30.67"),
                      alignSelf: 'center',
                      resizeMode: 'stretch',
                    }}></Image>
                </View> */}
                <View style = {{width : wp("22%"),height : wp("22"),marginTop : Platform.OS == "ios" ? 120 :100,alignSelf : "center"}}>
                <WheelOfFortune
                  rewards={[1, 2, 3, 4, 5, 6, 7, 8]}
                  knobSize={20}
                  borderWidth={3}
                  borderColor={'#FFF'}
                  winner={this.state.winnerValue}
                  backgroundColor={'#fff'}
                  // knoobSource={localImages.spinner}
                  getWinner={(value, index) =>
                    this.setState({winnerValue: value, winnerIndex: index},()=>this.openModal())
                  }
                  onPlay = {(play)=>this._renderPlayButton(play)}
                  // playButton={() => this._renderPlayButton()}
                  colors = {["red","green","red","green","red","green","red","green","red","green",]}
                  spinnerImage = {localImages.spinner2}
                  onRef = {ref => this.child = ref}
                  isStart  = {this.state.isSpinnerStart}
                />
                </View>
               
                {/* {this.state.winnerValue && (
                  <View style={{marginTop : 100}}>
                    <Text style={styles.winnerText}>
                      Winner: {this.state.winnerValue}
                    </Text>
                  </View>
                )} */}
                <View style={{marginTop: Platform.OS == "ios"?hp('42.78'):hp('35.78')}}>
                  <LinearGradient
                    colors={['transparent', '#fff']}
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
                        width={width - 100}
                        //width of the button (Optional)
                        title="Swipe to Spin"
                        //Text inside the button (Optional)
                        thumbIconImageSource={localImages.btn_arrow_color}
                        //thumbIconStyles = {{resizeMode : "contain"}}
                        //You can also set your own icon (Optional)
                        onSwipeSuccess={() => {
                          // this.openModal();
                          // this._renderPlayButton()
                          this.setIsSpinner()
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
                  </LinearGradient>
                </View>
              </View>
              <SingleButtonModal
                isModalVisible={this.state.isModalVisible}
                // headerText={'Basket Buy Execution'}
                modalClose={this.modalClose}
                submitAction={() => this.modalClose()}
                descriptionText={
                  "You'll receive a free stock when you complete your sign up journey"
                }
                nameOnSubmitButton={'Okay'}
                nameOnIgnoreButton={'Ignore'}
              />
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 166,
    alignSelf: 'center',
    marginBottom: 23,
  },
  footerText: {
    height: 27,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#72e2db',
    textAlign: 'center',
  },
  accordianPadding: {
    paddingTop: 8,
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
    marginLeft: 46,
    marginRight: 46,
    marginTop: 16,
    // alignSelf : "center",
  },
  labelStyle: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.bold,
    // marginTop: 48,
    marginHorizontal: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
  linearGradient: {
    // flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
    // borderRadius: 5,
    borderRadius: 50,
  },
});

export default SpinScreen;
