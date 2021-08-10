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
import {HeaderWithBackWhite} from '../../component/Button';
import {PlainTextInput} from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import Dropdown from './../../component/Picker';
import StepIndicator from 'react-native-step-indicator';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {SingleButtonModal} from './../../component/confirmModal';

const MyComponent = (props) => {
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          flex: 1,
          marginTop: hp('3.89%'),
          left: 3,
          marginBottom: hp('29%'),
        }}>
        <Text style={styles.headingText}>Address</Text>
        <Dropdown
          //placeholderText={'Select the country you live in'}
          dropdownWidth={'98%'}
          data={[]}
          selectedValue={() => null}
          onValueChange={() => null}
          value={'Select the country you live in'}
        />
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="Street Address 1"
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
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="Street Address 2"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          // iconName={'search_gray_icon'}
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',
            left: -2,
          }}>
          <PlainTextInput
            height={43}
            backgroundColor={colors.white}
            width={Platform.OS == "android" ?width - 200 : width - 220}
            borderRadius={30}
            marginTop={17}
            placeholder="Zipcode"
            label=""
            labelColor={colors.labelColor}
            placeholderColor={colors.placeHolderColor}
            inputTextColor={colors.text}
            maxLength={50}
            // iconName={'search_gray_icon'}
          />
          <Dropdown
            value={'State'}
            dropdownWidth={'46%'}
            data={[]}
            selectedValue={() => null}
            onValueChange={() => null}
            pickerMarginTop={17}
          />
        </View>
      </View>
    </View>
  );
};
const MyComponent1 = (props) => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View style={{width: width - 25, marginTop: hp(9.8), left: 3}}>
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="SSN *Social Security Number"
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
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="Date Of Birth"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          iconName={'calendar'}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
           marginTop: 35,
           marginLeft : 10,
          marginBottom: hp("29.98"),
        }}>
        <TouchableOpacity onPress={() => setChecked(checked ? false : true)}>
          {checked ? (
            <Image
              source={localImages.check_blue}
              style={{
                height: 25,
                width: 25,
                alignSelf: 'center',
              }}></Image>
          ) : (
            <View
              style={{
                height: 25,
                width: 25,
                alignSelf: 'center',
                borderColor: colors.grayColor,
                borderWidth: 0.4,
                borderRadius: 4,
              }}></View>
          )}
        </TouchableOpacity>
        <Text style={styles.btnText}>Are you a citizen or US resident?</Text>
      </View>
    </View>
  );
};

const MyComponent2 = (props) => {
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View style={{marginTop: hp(9.8), left: 3, marginBottom: hp('30%')}}>
        <Dropdown
          //placeholderText={'Select the country you live in'}
          dropdownWidth={'98%'}
          data={[]}
          selectedValue={() => null}
          onValueChange={() => null}
          value={'Select your Employment Status'}
        />
        <PlainTextInput
          height={43}
          backgroundColor={colors.white}
          width={width - 35}
          borderRadius={30}
          marginTop={17}
          placeholder="Enter Name of your Employer"
          label=""
          labelColor={colors.labelColor}
          placeholderColor={colors.placeHolderColor}
          inputTextColor={colors.text}
          maxLength={50}
          // iconName={'search_gray_icon'}
        />
        <Dropdown
          //placeholderText={'Select the country you live in'}
          dropdownWidth={'98%'}
          data={[]}
          selectedValue={() => null}
          onValueChange={() => null}
          pickerMarginTop={17}
          value={'Annual Income'}
        />
      </View>
    </View>
  );
};

const MyComponent3 = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          marginTop: hp('3.89%'),
          alignSelf: 'center',
          marginBottom: hp('10.64%'),
        }}>
        <Text style={styles.headingText}>Do any of these apply?</Text>

        <View style={styles.mainContainer}>
          <View>
            <Text numberOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              interdum neque.
            </Text>
          </View>
          <View style={styles.yesAndNoContainer}>
            <View style={styles.yesAndNoCo}>
              <TouchableOpacity
                onPress={() => setChecked(checked ? false : true)}>
                {checked ? (
                  <Image
                    source={localImages.active_radio_button}
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                    }}></Image>
                ) : (
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                      borderColor: colors.grayColor,
                      borderWidth: 0.4,
                      borderRadius: 50,
                    }}></View>
                )}
              </TouchableOpacity>
              <Text style={styles.yesAndNoText}>Yes</Text>
            </View>

            <View style={[styles.yesAndNoCo, {marginLeft: 10}]}>
              <TouchableOpacity
                onPress={() => setChecked(checked ? false : true)}>
                {checked ? (
                  <Image
                    source={localImages.active_radio_button}
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                    }}></Image>
                ) : (
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                      borderColor: colors.grayColor,
                      borderWidth: 0.4,
                      borderRadius: 50,
                    }}></View>
                )}
              </TouchableOpacity>
              <Text style={styles.yesAndNoText}>No</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View>
            <Text numberOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              interdum neque.
            </Text>
          </View>
          <View style={styles.yesAndNoContainer}>
            <View style={styles.yesAndNoCo}>
              <TouchableOpacity
                onPress={() => setChecked(checked ? false : true)}>
                {checked ? (
                  <Image
                    source={localImages.active_radio_button}
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                    }}></Image>
                ) : (
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                      borderColor: colors.grayColor,
                      borderWidth: 0.4,
                      borderRadius: 50,
                    }}></View>
                )}
              </TouchableOpacity>
              <Text style={styles.yesAndNoText}>Yes</Text>
            </View>

            <View style={[styles.yesAndNoCo, {marginLeft: 10}]}>
              <TouchableOpacity
                onPress={() => setChecked(checked ? false : true)}>
                {checked ? (
                  <Image
                    source={localImages.active_radio_button}
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                    }}></Image>
                ) : (
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                      borderColor: colors.grayColor,
                      borderWidth: 0.4,
                      borderRadius: 50,
                    }}></View>
                )}
              </TouchableOpacity>
              <Text style={styles.yesAndNoText}>No</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
/* Define your class */
export default class VerifyYourIdentiyStep extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
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

  showSteps = () => {
    this.state.currentPosition + 1;
    if (this.state.currentPosition == 0) {
      // this.openModal()
      return <MyComponent />;
    } else if (this.state.currentPosition == 1) {
      return <MyComponent1 />;
    } else if (this.state.currentPosition == 2) {
      return <MyComponent2 />;
    } else if (this.state.currentPosition == 3) {
      return <MyComponent3 />;
    }
  };

  openModal = () => {
    this.state.currentPosition == 0
      ? this.setState({isModalVisible: true})
      : null;
  };
  modalClose = () => {
    this.setState({isModalVisible: false});
  };

  async componentDidMount() {
    this.openModal();
  }
  render() {
    return (
        <SafeAreaView style={[CustomStyles.containerbording]}>
          <HeaderWithBackWhite
            Header="Verify Your Identity"
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            onActionLeft={() =>
              this.setState({
                currentPosition:
                  this.state.currentPosition == 0
                    ? (this.state.currentPosition = 0)
                    : this.state.currentPosition - 1,
              })
            }
          />

          <View style={styles.stepperSubContainer}>
            <StepIndicator
              style={{flex: 1}}
              customStyles={this.state.customStyles}
              currentPosition={this.state.currentPosition}
              // labels={this.state.labels}
              stepCount={4}
            />
          </View>
          <ScrollView style={{flexGrow: 1}}>
            <View style={{flex: 1, width: width - 30, alignSelf: 'center'}}>
              {this.showSteps()}
            </View>
            {this.state.currentPosition == 3 ? (
              <View style={{marginBottom: 50, alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={width - 110}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Submit"
                  backgroundColor={colors.blue}
                  onAction={() => this.props.navigation.navigate("StartYourSignUpJourney1",{id:this.props.route.params.id})}
                />
              </View>
            ) : (
              <View style={{marginBottom: 50, alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  width={width - 110}
                  height={43}
                  marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.setState({
                      currentPosition:
                        this.state.currentPosition == 3
                          ? (this.state.currentPosition = 3)
                          : this.state.currentPosition + 1,
                    })
                  }
                />
              </View>
            )}

            <SingleButtonModal
              isModalVisible={this.state.isModalVisible}
              // headerText={'Basket Buy Execution'}
              modalClose={this.modalClose}
              submitAction={() => this.modalClose()}
              descriptionText={
                "Mudani is currently unavailable in your region."
              }
              nameOnSubmitButton={'Okay'}
              nameOnIgnoreButton={'Ignore'}
            />
          </ScrollView>
        </SafeAreaView>
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
    color: colors.black,
    fontSize: 13,
    fontFamily: fonts.regular,
    marginHorizontal: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
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
    // marginLeft: 46,
    // marginRight: 46,
    //marginTop: 8,
    // width: width - 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    marginTop: 28,
    marginLeft: 46,
    marginRight: 46,
    backgroundColor: colors.white,
    // padding : 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: width - 70,
    elevation: 5,
  },
  smallCircle: {
    width: 13,
    height: 13,
    backgroundColor: colors.blue,
    borderRadius: 50,
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
    alignSelf: 'center',
  },
  stepStyle: {
    backgroundColor: colors.blue,
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
    // paddingBottom: 50,
  },
  headingText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 20,
  },
  dollarText: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  dollarText1: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 15,
  },
  descriptionText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
    marginHorizontal: 0,
    textAlign: 'left',
    lineHeight: 20,
    marginTop: 4,
  },
  yesAndNoText: {
    marginLeft: 11,
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
  },
  yesAndNoText1: {
    marginLeft: 11,
    fontSize: 14,
    color: colors.blue,
    fontFamily: fonts.regular,
  },
  yesAndNoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginTop: 16,
  },
  yesAndNoCo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '98%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 10,
  },
  basicPlanContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.blue,
  },
  basicPlanContainer2: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  basicPlanSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  basicPlanText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  roundUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 47,
  },
  roundUpText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
    // fontWeight: 'bold',
    marginLeft: 15,
  },
  roundUpTextContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginTop: 55,
  },
  stepperSubContainer: {
    width: width,
    height: 35,
    backgroundColor: 'white',
  },
});
