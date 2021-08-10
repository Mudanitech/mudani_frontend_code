import React, {useState, Component} from 'react';
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
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBackWhite} from '../../component/Button';
import {SearchTextInput} from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import StepIndicator from 'react-native-step-indicator';
import {hp, wp} from '../../utils/responsive';
import ImageSlider from 'react-native-image-slider';
import {TwoButtonModal} from './../../component/confirmModal';

const MyComponent = (props) => {
  const [isModal2, setState2] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState([
    {title: 'Amazon', image: localImages.amazon},
    {title: 'Microsoft', image: localImages.microsoft},
    {title: 'Starbuck', image: localImages.starbucks},
    {title: 'Google', image: localImages.amazon},
  ]);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const modalOpen2 = (title,companyName) => {
    setState2(true);
    setHeading(title);
    setDescription(companyName)
  };
  const modalClose2 = () => {
    setState2(false);
  };

  const viewModal = () => {
    const IsOpen = isModal2;
    return (
      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={styles.popUpText}> {heading}</Text>
          <Text style={[styles.popUpText,{fontWeight : "100",marginTop : 10}]}> {"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum"}</Text>

        </View>
        <View style={styles.popupButtonContainer}>
          <ButtonWithoutShadow
            width={width - wp('65%')}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Dismiss"
            backgroundColor={colors.blue}
            onAction={() => modalClose2()}
          />
        </View>
      </TwoButtonModal>
    );
  };
  const _renderItem = ({index, item}) => {
    return (
      <View
        key={index}
        style={{
          width: 94,
          height: 94,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          style={{
            height: 13,
            width: 13,
            position: 'absolute',
            top: 3,
            right: 3,
          }}
          onPress={() => null}>
          <Image
            source={localImages.add_icon}
            style={{
              height: 13,
              width: 13,
              position: 'absolute',
              right: 2,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <Image
          source={item.image}
          style={{height: 40, width: 50, marginTop: 6}}
          resizeMode="stretch"
        />
        <Text style={{marginTop: 10}}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors.authBackGroud,
        marginBottom: hp('20%'),
      }}>
      <View>
        <SearchTextInput
          height={38}
          backgroundColor={colors.white}
          width={width - 30}
          borderRadius={30}
          // marginTop={30}
          placeholder="Search 6000+ Stocks & Funds..."
          //  label="Password"
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          iconName={'search_gray_icon'}
        />
        <View>
          <Text style={styles.heading}>Popular Stocks</Text>
          <ImageSlider
            loopBothSides
            autoPlayWithInterval={0}
            images={entries}
            customSlide={_renderItem}
            style={{backgroundColor: colors.authBackGroud}}
            dotStyle={{top: 50}}
            customButtons={(position, move) => (
              <View style={styles.buttons}>
                {entries.map((image, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      underlayColor="#ccc"
                      onPress={() => this._move(index)}
                      style={[
                        styles.button,
                        position === index && styles.buttonSelected,
                      ]}>
                      <View />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          />
        </View>
        <View>
          <Text style={styles.heading}>Popular ETFs</Text>
          <ImageSlider
            loopBothSides
            autoPlayWithInterval={0}
            images={entries}
            customSlide={_renderItem}
            style={{backgroundColor: colors.authBackGroud}}
            dotStyle={{top: 50}}
            customButtons={(position, move) => (
              <View style={styles.buttons}>
                {entries.map((image, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      underlayColor="#ccc"
                      onPress={() => this._move(index)}
                      style={[
                        styles.button,
                        position === index && styles.buttonSelected,
                      ]}>
                      <View />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          />
        </View>
        <View>
          <View style={styles.popularThemesContainer}>
            <Text style={styles.heading}>Popular Crypto</Text>
            <View>
              
               <TouchableOpacity onPress = {()=> modalOpen2("Popular Crypto","Popular Crypto",)} >
               <Image
                source={localImages.info_blue_circle}
                style={{height: 15, width: 15, resizeMode: 'contain', marginTop: hp('2%'),marginLeft : wp("3")}}
              />
           </TouchableOpacity>
              {/* <Text style={styles.infoIcon}>i</Text> */}
            </View>
          </View>
          <ImageSlider
            loopBothSides
            autoPlayWithInterval={0}
            images={entries}
            customSlide={_renderItem}
            style={{backgroundColor: colors.authBackGroud}}
            customButtons={(position, move) => (
              <View style={styles.buttons}>
                {entries.map((image, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      underlayColor="#ccc"
                      onPress={() => this._move(index)}
                      style={[
                        styles.button,
                        position === index && styles.buttonSelected,
                      ]}>
                      <View />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          />
        </View>
      </View>
      {viewModal()}
    </View>
  );
};

const MyComponent1 = (props) => {
  const [entries, setEntries] = useState([
    {title: 'Amazon', image: localImages.amazon},
    {title: 'Microsoft', image: localImages.microsoft},
    {title: 'Starbuck', image: localImages.starbucks},
    {title: 'Google', image: localImages.amazon},
  ]);

  const _renderItem = ({index, item}) => {
    return (
      <View
        style={{width: wp('100%'), alignItems: 'center', marginTop: hp('3%')}}>
        <View style={styles.itemContainer}>
          <View style={styles.textContainer1}>
            <Image
              source={localImages.amazon}
              style={styles.microsoftIcon}></Image>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.plusBtn}>
                <Image
                  source={localImages.minus_light_blue}
                  style={styles.minusImage}></Image>
              </TouchableOpacity>
             
            </View>
          </View>
          <View style={styles.viewSeparator} />
          <View style={styles.textContainer1}>
            <Image
              source={localImages.microsoft}
              style={styles.microsoftIcon}></Image>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.plusBtn}>
                <Image
                  source={localImages.minus_light_blue}
                  style={styles.minusImage}></Image>
              </TouchableOpacity>
             
            </View>
          </View>
          <View style={styles.viewSeparator} />
          <View style={styles.textContainer1}>
            <Image
              source={localImages.amazon}
              style={styles.microsoftIcon}></Image>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.plusBtn}>
                <Image
                  source={localImages.minus_light_blue}
                  style={styles.minusImage}></Image>
              </TouchableOpacity>
             
            </View>
          </View>
          <View style={styles.viewSeparator} />
          <View style={styles.textContainer1}>
            <Image
              source={localImages.microsoft}
              style={styles.microsoftIcon}></Image>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.plusBtn}>
                <Image
                  source={localImages.minus_light_blue}
                  style={styles.minusImage}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewSeparator} />
          <View style={styles.textContainer1}>
            <Image
              source={localImages.microsoft}
              style={styles.microsoftIcon}></Image>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.plusBtn}>
                <Image
                  source={localImages.minus_light_blue}
                  style={styles.minusImage}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={CustomStyles.containerbording}>
        {/* <SafeAreaView>
          <ScrollView style={{flexGrow: 1}}> */}
        <View
          style={{
            alignSelf: 'center',
            marginBottom: hp('20%'),
            marginTop: hp('1.8%'),
          }}>
         
          <View style={{width: wp('100%'), alignSelf: 'center'}}>
            <ImageSlider
              loopBothSides
              autoPlayWithInterval={0}
              images={entries}
              customSlide={_renderItem}
              style={{backgroundColor: colors.authBackGroud}}
              dotStyle={{top: 50}}
              customButtons={(position, move) => (
                <View style={styles.buttons}>
                  {entries.map((image, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        underlayColor="#ccc"
                        onPress={() => this._move(index)}
                        style={[
                          styles.button,
                          position === index && styles.buttonSelected,
                        ]}>
                        <View />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            />
          </View>
        </View>
        {/* </ScrollView>
        </SafeAreaView> */}
      </View>
    </View>
  );
};

const MyComponent2 = (props) => {
  return (
    <View>
      <View style={CustomStyles.containerbording}>
        <SafeAreaView>
          <ScrollView style={{flexGrow: 1}}>
            <View style={{flexDirection: 'row'}}></View>

            <View style={{alignSelf: 'center'}}>
              <View>
                <Image
                  source={localImages.ok}
                  style={{
                    borderRadius: 50,
                    marginTop: hp('20.7'),
                    height: 101,
                    width: 101,
                    alignSelf: 'center',
                  }}></Image>
              </View>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 14,
                  fontFamily: fonts.regular,
                  marginTop: hp('6.8%'),
                  marginBottom: hp('15.8%'),
                  marginHorizontal: 40,
                  textAlign: 'center',
                  lineHeight: 20,
                }}>
                Your basket has been created successfully. You’ll be able to
                execute the trades after you finish your sign up journey.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

/* Define your class */
export default class StartYourSignUpJourney1 extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: 0,
      labels: ['Cart', 'Delivery Address', 'Order Summary', 'Payment Method'],
      customStyles: {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: colors.blue,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: colors.blue,
        stepStrokeUnFinishedColor: colors.light_blue,
        separatorFinishedColor: colors.blue,
        separatorUnFinishedColor: colors.light_blue,
        stepIndicatorFinishedColor: colors.blue,
        stepIndicatorUnFinishedColor: colors.light_blue,
        stepIndicatorCurrentColor: colors.blue,
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: colors.white,
        stepIndicatorLabelFinishedColor: colors.white,
        stepIndicatorLabelUnFinishedColor: colors.blue,
        labelColor: colors.white,
        labelSize: 13,
        currentStepLabelColor: colors.white,
      },
    };
  }

  // putTickIndicator = (state)=> {
  //   console.log(state)
  //   return <Image source={{uri : localImages.add_icon}} style={{height: 10, width:10}} resizeMode = "contain" />
  // }
  // componentDidMount = () => {
  //   console.log('props', this.props.route.params.id);
  // };

  showSteps = () => {
    this.state.currentPosition + 1;
    if (this.state.currentPosition == 0) {
      return <MyComponent />;
    } else if (this.state.currentPosition == 1) {
      return <MyComponent1 />;
    } else if (this.state.currentPosition == 2) {
      return <MyComponent2 />;
    }
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      // <View style={[CustomStyles.containerbording]}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.authBackGroud}}>
        <HeaderWithBackWhite
          Header="Create your Basket"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() =>
            this.setState({
              currentPosition:
                this.state.currentPosition == 0
                  ? this.goBack()
                  : this.state.currentPosition - 1,
            })
          }
        />

        <View style={styles.stepperSubContainer}>
          <StepIndicator
            style={{flex: 1}}
            customStyles={this.state.customStyles}
            currentPosition={0}
            // labels={this.state.labels}
            stepCount={4}
            //renderStepIndicator={(state)=>{this.putTickIndicator(state)}}
          />
        </View>
        <ScrollView style={{width: wp('100%'), height: hp('100%')}}>
          <View style={{flex: 1, width: width - 30, alignSelf: 'center'}}>
            {this.showSteps()}
          </View>
        </ScrollView>
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: hp('0%'),
            height: hp('18%'),
            width: wp('100%'),
            backgroundColor: colors.authBackGroud,
          }}>
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: this.state.currentPosition == 0 ? hp('4%') : hp('8%'),
            }}>
            {this.state.currentPosition == 0 ? (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.setState({
                      currentPosition:
                        this.state.currentPosition == 2
                          ? (this.state.currentPosition = 2)
                          : this.state.currentPosition + 1,
                    })
                  }
                />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('VerifyYourIdentity', {
                      id: this.props.route.params.id,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      color: '#a8a8a8',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontFamily: fonts.bold,
                    }}>
                    <Text style={styles.footerText}>Skip</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            ) : this.state.currentPosition == 2 ? (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.props.navigation.navigate('VerifyYourIdentity', {
                      id: this.props.route.params.id,
                    })
                  }
                />
              </View>
            ) : (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={wp('60%')}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.setState({
                      currentPosition:
                        this.state.currentPosition == 2
                          ? (this.state.currentPosition = 2)
                          : this.state.currentPosition + 1,
                    })
                  }
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  // accordianTextContainer: {
  //   marginTop: 166,
  //   //flex : 1,
  //   // height : "60%",
  //   alignSelf: 'center',
  //   marginBottom: 23,
  // },
  footerText: {
    //width: width - 40,
    fontFamily: fonts.regular,
    fontSize: 16,
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
    borderWidth: 0.5,
    width: '90%',
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
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 16,
    marginLeft: 16,
  },
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  textContainer: {
    marginLeft: 46,
    marginRight: 46,
    marginTop: 8,
    width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    // marginTop: hp('4.19'),
    // // marginLeft: 46,
    // marginRight: 24,
    // marginLeft: 7,
    // marginLeft : 10,
    backgroundColor: colors.white,
    // padding : 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: wp('80%'),
    borderRadius: 10,
    // alignItems : "center",
    // marginRight : 20
  },
  smallCircle: {
    width: 13,
    height: 13,
    backgroundColor: colors.blue,
    borderRadius: 50,
  },
  plusBtn: {
    // height: 24,
    // width: 29,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.light_blue,
    borderWidth: 1,
    backgroundColor: colors.light_blue,
    marginRight: 20,
    borderRadius : 50
  },
  plusBtnText: {
    fontSize: 18,
    color: colors.blue,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  percentCountContainer: {
    height: 24,
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.grayColor,
    borderWidth: 0.5,
    backgroundColor: colors.white,
    marginLeft: 5,
    borderRadius: 4,
  },
  percentCountText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  stepperBtn: {
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
    backgroundColor: colors.blue,
    width: 120,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 40,
  },
  stepStyle: {
    backgroundColor: colors.light_blue,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  stepperMainContainer: {
    width: width,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
  },
  stepperSubContainer: {
    width: width,
    height: 35,
    backgroundColor: 'white',
  },
  selectAllocationImage: {
    borderRadius: 50,
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginBottom: hp('4.04%'),
  },
  button: {
    margin: 3,
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: '#ccc',
    opacity: 0.9,
  },
  buttonSelected: {
    opacity: 1,
    backgroundColor: colors.blue,
  },
  buttons: {
    //height: 10,
    marginTop: 20,
    // marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  popularThemesContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems : "center"
  },
  heading: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.bold,
    marginTop: hp('3.7%'),
    marginHorizontal: 0,
    // fontWeight: "600",
    textAlign: 'left',
    marginBottom: hp('2.2%'),
    marginLeft: 5,
  },
  infoIcon: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.bold,
    marginHorizontal: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoContainer: {
    height: 16.5,
    width: 16.5,
    marginTop: hp('4%'),
    marginLeft: wp('2.4'),
    // backgroundColor: colors.info_color,
    borderRadius: wp('50%'),
  },
  microsoftIcon: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginBottom: 15,
  },
  minusImage : {
    height: 29,
    width: 29,
    alignSelf: 'center',
    resizeMode: 'contain',
  borderRadius : 50
  },
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.46%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subPopupText: {
    fontSize: wp('2.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 15,
    marginLeft: 10,
  },
  totalNumber: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 21,
    textAlign: 'left',
    // marginTop: 28,
    marginBottom: 15,
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},

});

// export default StartYourSignUpJourney1
