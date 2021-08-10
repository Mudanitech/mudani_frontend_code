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
import DataManager from './../../utils/DataManager';
import {getAPI, postAPI} from './../../utils/Api';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ShowToast from '../../component/Toast';
// import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoder-reborn';

Geocoder.fallbackToGoogle('AIzaSyCDGoegJx6XB3mnULKaaRQ7RtcG72MUFe4');

// Add next line if you also want to use Google Maps api on iOS.
Geocoder.forceGoogleOnIos(true);

const MyComponent = props => {
  const [checked, setChecked] = useState(true);
  const [selectValue, setSelectValue] = useState(undefined);
  const [province, setProvince] = useState(undefined);
  const [streetAddress1, setStreetAddress1] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countries, setContries] = useState('');
  const [states, setStates] = useState('');
  const [USCitizen, setUSCitizen] = useState({
    qustion_id: props.pages[0].sections[2].questions[9].id,
    title: props.pages[0].sections[2].questions[9].translations[0].data,
    option1:
      props.pages[0].sections[2].questions[9].options[0].translations[0].data,
    option1Id: props.pages[0].sections[2].questions[9].options[0].id,
    option2:
      props.pages[0].sections[2].questions[9].options[1].translations[0].data,
    option2Id: props.pages[0].sections[2].questions[9].options[1].id,
    yes: false,
    no: false,
  });
  useEffect(() => {
    if (props.userId) {
      getCountriesList();
    }
    if (checked) {
      props.isYourMailingSame(true);
    } else {
      props.isYourMailingSame(false);
    }
  }, [props.userId, checked]);
  const getCountriesList = () => {
    const dataToSend = {
      userId: props.userId,
    };

    //  console.log("UserId,useEFfect",props.userId);
    postAPI('getCountryList', dataToSend)
      .then(response => {
        setContries(response.data.countries);
        getStateList();
      })
      .catch(error => console.log(error));
  };
  const getStateList = () => {
    const dataToSend = {
      userId: props.userId,
    };

    postAPI('getStateList', dataToSend)
      .then(response => setStates(response.data.states))
      .catch(error => console.log(error));
  };
  const openModal = () => {
    setIsModalVisible(true);
  };
  const modalClose = () => {
    setIsModalVisible(false);
  };
  const getCountryName = value => {
    setCountryName(value);
    props.getCountryName(value);
  };
  const getStateName = value => {
    setStateName(value);
    props.getStateName(value);
  };

  const getAddress1 = value => {
    setStreetAddress1(value);
  };
  const getAddress2 = value => {
    setStreetAddress2(value);
  };
  const getZipcode = value => {
    setZipcode(value);
    props.getZipcode(value);
  };

  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          flex: 1,
          marginTop: hp('3.89%'),
          left: 3,
          marginBottom: Platform.OS == 'android' ? hp('20%') : hp('33%'),
        }}>
        <Text style={styles.headingText}>Address</Text>
        {/* <View style={{height : "5%",marginTop : 20,marginBottom : 50}}> */}
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          styles={{
            textInputContainer: {
              backgroundColor: colors.white,
              width: wp('90%'),
              borderRadius: 30,
              marginBottom: 20,
            },
            textInput: {
              height: 38,
              borderRadius: 30,
            },
            listView: {
              width: 300,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          placeholder="Search"
          style={{width: '100%'}}
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            props.getAddress(data.description);
            const zipCode = details?.address_components.find(addressComponent =>
              addressComponent.types.includes('postal_code'),
            )?.short_name;

            const countryName = details?.address_components.find(
              addressComponent => addressComponent.types.includes('country'),
            )?.long_name;

            const cityName = details?.address_components.find(
              addressComponent =>
                addressComponent.types.includes('administrative_area_level_1'),
            )?.long_name;
            console.log('Google place data', countryName);
            setZipcode(zipCode);
            setCountryName(countryName);
            setStateName(cityName);
            props.getZipcode(zipCode);
            props.getCountryName(countryName);
            props.getStateName(cityName);
          }}
          onFail={error => console.error(error)}
          fetchDetails={true}
          query={{
            key: 'AIzaSyCDGoegJx6XB3mnULKaaRQ7RtcG72MUFe4',
            // key : 'AIzaSyACQubkoAABJbvWiEDym3mGETypPTjhhiE',//Mudani client
            language: 'en',
            ///types: "(regions)",
            //types: '(cities)'
          }}
        />
        {/* </View> */}
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <PlainTextInput
            height={43}
            backgroundColor={colors.white}
            width={Platform.OS == 'android' ? wp('90') : wp('90')}
            borderRadius={30}
            placeholder="Select the country you live in"
            label=""
            labelColor={colors.labelColor}
            placeholderColor={colors.placeHolderColor}
            inputTextColor={colors.text}
            maxLength={50}
            onChangeText={value => getCountryName(value)}
            value={countryName}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',
          }}>
          <View style={{marginLeft: 3}}>
            <PlainTextInput
              height={43}
              backgroundColor={colors.white}
              width={Platform.OS == 'android' ? wp('45') : wp('45')}
              borderRadius={30}
              marginTop={17}
              placeholder="Zip Code"
              label=""
              labelColor={colors.labelColor}
              placeholderColor={colors.placeHolderColor}
              inputTextColor={colors.text}
              maxLength={50}
              onChangeText={value => getZipcode(value)}
              value={zipcode}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <PlainTextInput
              height={43}
              backgroundColor={colors.white}
              width={Platform.OS == 'android' ? wp('45') : wp('45')}
              borderRadius={30}
              marginTop={17}
              placeholder="State"
              label=""
              labelColor={colors.labelColor}
              placeholderColor={colors.placeHolderColor}
              inputTextColor={colors.text}
              maxLength={50}
              onChangeText={value => getStateName(value)}
              value={stateName}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 35,
            marginLeft: 10,
            // marginBottom: Platform.OS == 'android' ? hp('28%') : hp('36%'),
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
          <Text style={styles.btnText}>{USCitizen.title}</Text>
        </View>
      </View>
      <SingleButtonModal
        isModalVisible={isModalVisible}
        // headerText={'Basket Buy Execution'}
        modalClose={modalClose}
        submitAction={() => modalClose()}
        descriptionText={'Mudani is currently unavailable in your region.'}
        nameOnSubmitButton={'Okay'}
        nameOnIgnoreButton={'Ignore'}
      />
    </View>
  );
};

export default class VerifyYourIdentiyStep1 extends Component {
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
      countryName: undefined,
      streetAddress1: '',
      pages: [],
      userId: '',
      zipCode: '',
      stateName: undefined,
      isYourMailingSame: false,
      address: 'California America',
    };
  }

  getCountryName = countryName => {
    this.setState({countryName: countryName});
  };
  getZipcode = zipCode => {
    this.setState({zipCode: zipCode});
  };
  getStateName = stateName => {
    this.setState({stateName: stateName});
  };
  getIsYourMailingSame = isYourMailingSame => {
    this.setState({isYourMailingSame: isYourMailingSame});
  };
  getAddress = address => {
    this.setState({address: address});
  };
  showSteps = () => {
    if (this.state.pages.length > 0)
      return (
        <MyComponent
          {...this.props}
          getAddress={address => this.getAddress(address)}
          userId={this.state.userId}
          countryName={this.state.countryName}
          streetAddress1={this.state.streetAddress1}
          getStateName={stateName => this.getStateName(stateName)}
          getZipcode={zipCode => this.getZipcode(zipCode)}
          getCountryName={countryName => this.getCountryName(countryName)}
          isYourMailingSame={checked => this.getIsYourMailingSame(checked)}
          pages={this.state.pages}
        />
      );
  };

  handleSubmit = () => {
    // Alert.alert(String(this.state.isYourMailingSame));
    if (!this.state.address) {
      ShowToast('Please enter address!');
    } else if (!this.state.countryName) {
      ShowToast('Please select country Name');
    } else if (!this.state.zipCode) {
      ShowToast('Please select zip code!');
    } else if (!this.state.stateName) {
      ShowToast('Please select state Name');
    } else {
      const dataToSend = {
        address: this.state.address,
        countryName: this.state.countryName,
        stateName: this.state.stateName,
        zipCode: this.state.zipCode,
        isYourMailingSame: this.state.isYourMailingSame,
      };
      this.props.navigation.navigate('VerifyYourIdentityStep2', {
        id: this.props.route.params.id,
        data: {id: this.props.route.params.id, userDetails: dataToSend},
      });
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  componentDidMount = async () => {
  //  const location = await Geocoder.geocodeAddress('Adelaide SA, Australia');
    //console.log('dfdfd', location);

    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});
    const Pages = await DataManager.getPages();
    // Pages = JSON.parse(Pages)
    this.setState({Pages: JSON.parse(Pages)});
    console.log('Pagess hai', JSON.stringify(JSON.parse(Pages)));

    const pages = JSON.parse(Pages);
    if (this.state.pages.length == 0) {
      this.setState({pages: pages});
    }
  };
  componentDidUpdate = prevProps => {
    console.log('country', this.state.address);
  };

  render() {
    return (
      <SafeAreaView style={[CustomStyles.containerbording]}>
        <HeaderWithBackWhite
          Header="Verify Your Identity"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.goBack()}
        />

        <View style={styles.stepperSubContainer}>
          <StepIndicator
            style={{flex: 1}}
            customStyles={this.state.customStyles}
            currentPosition={1}
            // labels={this.state.labels}
            stepCount={4}
          />
        </View>

        <ScrollView style={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, width: width - 30, alignSelf: 'center'}}>
            {this.showSteps()}
          </View>

          <SingleButtonModal
            isModalVisible={this.state.isModalVisible}
            // headerText={'Basket Buy Execution'}
            modalClose={this.modalClose}
            submitAction={() => this.modalClose()}
            descriptionText={'Mudani is currently unavailable in your region.'}
            nameOnSubmitButton={'Okay'}
            nameOnIgnoreButton={'Ignore'}
          />
        </ScrollView>
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: hp('0%'),
            height: hp('21%'),
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
              marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Next"
              backgroundColor={colors.blue}
              onAction={() => {
                this.handleSubmit();
                //   if (
                //     this.state.countryName == 'India' ||
                //     this.state.countryName == 'United States of America'
                //   ) {
                // this.props.navigation.navigate('VerifyYourIndentityStep', {
                //   // id: this.props.route.params.id,
                //   data: {id: this.props.route.params.id, pages: this.state.pages},
                // });
                //   }
              }}
            />
          </View>
        </View>
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
  faqTextQuest: {
    color: colors.black,
    fontSize: 13,
    fontFamily: fonts.bold,
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 5,
  },
  faqTextAns: {
    color: colors.black,
    fontSize: 13,
    fontFamily: fonts.regular,
    textAlign: 'left',
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
    marginTop: 16,
  },
  yesAndNoCo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 7,
    width: '98%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

    marginBottom: 15,
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
  documentContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  documentText: {fontSize: 16, fontFamily: fonts.bold},
  documentImag: {height: 20, width: 20},
  documentImageContainer: {
    height: 100,
    width: 275,
    borderWidth: 0.6,
    borderColor: colors.black,
    borderRadius: 5,
  },
});
