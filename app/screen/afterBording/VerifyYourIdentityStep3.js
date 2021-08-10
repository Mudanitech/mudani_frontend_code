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
import {uses24HourClock} from 'react-native-localize';
import {FlatList} from 'react-native-gesture-handler';
import CountryList from './../../utils/CountryList';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DataManager from './../../utils/DataManager';
import {getAPI, postAPI} from './../../utils/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DeviceInfo from 'react-native-device-info';
import ShowToast from '../../component/Toast';

const MyComponent2 = props => {
  const [selectValue, setSelectValue] = useState(undefined);
  const [annualIncome, setAnnualIncome] = useState(undefined);
  const [nameOfEmployer, setNameOfEmployer] = useState('');

  const [employmentType, setEmployementType] = useState([
    {
      item: props.pages[0].sections[3].questions[0].options[0].id,
      value:
        props.pages[0].sections[3].questions[0].options[0].translations[0].data,
    },
    {
      item: props.pages[0].sections[3].questions[0].options[1].id,
      value:
        props.pages[0].sections[3].questions[0].options[1].translations[0].data,
    },
    {
      item: props.pages[0].sections[3].questions[0].options[2].id,
      value:
        props.pages[0].sections[3].questions[0].options[2].translations[0].data,
    },
    {
      item: props.pages[0].sections[3].questions[0].options[3].id,
      value:
        props.pages[0].sections[3].questions[0].options[3].translations[0].data,
    },
  ]);
  const [annualIncomeItem, setAnnualIncomeItem] = useState([
    {
      item: props.pages[1].sections[2].questions[0].options[0].id,
      value:
        props.pages[1].sections[2].questions[0].options[0].translations[0].data.split(
          ' ',
        )[0] +
        ' to ' +
        Number(
          props.pages[1].sections[2].questions[0].options[0].translations[0].data
            .split(' ')[1]
            .substring(1),
        )
          .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          .split('.')[0],
    },
    {
      item: props.pages[1].sections[2].questions[0].options[1].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[0].options[1].translations[0].data.substring(
          1,
        ),
      ),
    },
    {
      item: props.pages[1].sections[2].questions[0].options[2].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[0].options[2].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[0].options[3].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[0].options[3].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[0].options[4].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[0].options[4].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[0].options[5].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[0].options[5].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[0].options[6].id,
      value: convertNumber(
        props.pages[1].sections[2].questions[0].options[6].translations[0].data,
      ),
    },
    {
      item: props.pages[1].sections[2].questions[0].options[7].id,
      value:
        props.pages[1].sections[2].questions[0].options[7].translations[0].data.split(
          ' ',
        )[0] +
        ' to ' +
        Number(
          props.pages[1].sections[2].questions[0].options[7].translations[0].data.split(
            ' ',
          )[1],
        )
          .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          .split('.')[0],
    },
  ]);

  function convertNumber(number) {
    return (
      Number(number.split('to')[0])
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
        .split('.')[0] +
      ' to ' +
      Number(number.split('to')[1])
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
        .split('.')[0]
    );
  }

  const onEmployeeStatusValueChange = value => {
    setSelectValue(value.name);
    // value == 'America' ? openModal() : null;

    props.getEmploymentType(value.id);
  };
  const onAnnualIncome = value => {
    setAnnualIncome(value.name);
    props.getannualIncomeId(value.id);
  };
  const getEmployeeName = value => {
    setNameOfEmployer(value);
    props.getnameOfEmployer(value);
  };
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          marginTop: hp(9.8),
          left: 3,
          marginBottom: Platform.OS == 'android' ? hp('30%') : hp('38%'),
        }}>
        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            //placeholderText={'Select the country you live in'}
            dropdownWidth={'93%'}
            data={employmentType}
            selectedValue={selectValue}
            onValueChange={(index, value) => onEmployeeStatusValueChange(value)}
            value={props.pages[0].sections[3].questions[0].translations[0].data}
          />
        </View>

        {selectValue != 'Unemployed' ? (
          <PlainTextInput
            height={43}
            backgroundColor={colors.white}
            width={width - 35}
            borderRadius={30}
            marginTop={17}
            placeholder="Name of Employer"
            label=""
            labelColor={colors.labelColor}
            placeholderColor={colors.placeHolderColor}
            inputTextColor={colors.text}
            maxLength={50}
            onChangeText={value => getEmployeeName(value)}
            value={nameOfEmployer}
            // iconName={'search_gray_icon'}
          />
        ) : null}

        <View style={{width: wp('99%'), marginLeft: -3}}>
          <Dropdown
            dropdownWidth={'93%'}
            data={annualIncomeItem}
            selectedValue={annualIncome}
            onValueChange={(index, value) => onAnnualIncome(value)}
            pickerMarginTop={17}
            value={props.pages[1].sections[2].questions[0].translations[0].data}
          />
        </View>
      </View>
    </View>
  );
};

/* Define your class */
export default class VerifyYourIdentityStep2 extends Component {
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
      empolymentId: undefined,
      nameOfEmployer: '',
      annualIncomeId: undefined,
    };
  }

  showSteps = () => {
    if (this.state.pages.length > 0)
      return (
        <MyComponent2
          getEmploymentType={empolymentId =>
            this.getEmploymentType(empolymentId)
          }
          getnameOfEmployer={nameOfEmployer =>
            this.getnameOfEmployer(nameOfEmployer)
          }
          getannualIncomeId={annualIncomeId =>
            this.getannualIncomeId(annualIncomeId)
          }
          pages={this.state.pages}
        />
      );
  };
  handleSubmit = () => {
    // Alert.alert(String(this.state.empolymentId+this.state.nameOfEmployer+this.state.annualIncomeId));
    if (!this.state.empolymentId) {
      ShowToast('Please select employment type!');
    } else if (!this.state.annualIncomeId) {
      ShowToast('Please enter employer name!');
    } else {
      const dataToSend = {
        SSNNumber: this.props.route.params.data.userDetails.SSNNumber,
        date: this.props.route.params.data.userDetails.date,
        zipCode: this.props.route.params.data.userDetails.zipCode,
        USCitizen: this.props.route.params.data.userDetails.USCitizen,
        countryName: this.props.route.params.data.userDetails.countryName,
        stateName: this.props.route.params.data.userDetails.stateName,
        zipCode: this.props.route.params.data.userDetails.zipCode,
        isYourMailingSame: this.props.route.params.data.userDetails
          .isYourMailingSame,
        empolymentId: this.state.empolymentId,
        nameOfEmployer: this.state.nameOfEmployer,
        annualIncomeId: this.state.annualIncomeId,
        address: this.props.route.params.data.userDetails.address,
      };
      this.props.navigation.navigate('VerifyYourIdentityStep4', {
        id: this.props.route.params.id,
        data: {id: this.props.route.params.data.id, userDetails: dataToSend},
      });
    }
  };
  getEmploymentType = empolymentId => {
    this.setState({empolymentId: empolymentId});
  };
  getnameOfEmployer = nameOfEmployer => {
    this.setState({nameOfEmployer: nameOfEmployer});
  };
  getannualIncomeId = annualIncomeId => {
    this.setState({annualIncomeId: annualIncomeId});
  };
  goBack = () => {
    this.props.navigation.goBack();
  };

  componentDidMount = async () => {
    const Pages = await DataManager.getPages();
    this.setState({Pages: JSON.parse(Pages)});
    const pages = JSON.parse(Pages);
    if (this.state.pages.length == 0) {
      this.setState({pages: pages});
    }
  };
  componentDidUpdate = prevProps => {
    console.log('country', this.props.route.params.data.userDetails);
  };
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
                  ? this.goBack()
                  : this.state.currentPosition - 1,
            })
          }
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
        <ScrollView style={{flexGrow: 1}}>
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
            {this.nextButton()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
  nextButton = () => {
    return this.state.currentPosition == 4 ? (
      <View style={{alignSelf: 'center'}}>
        {this.state.currentPosition == 4 ? (
          <Text
            style={{
              fontSize: 12,
              color: colors.grayColor,
              fontFamily: fonts.regular,
              textAlign: 'center',
            }}>
            Lorem ipsum dolor sit amet,
          </Text>
        ) : null}
        <ButtonWithoutShadow
          width={wp('60%')}
          height={43}
          marginTop={22}
          borderRadius={20}
          labelColor={colors.white}
          label="Next"
          backgroundColor={colors.blue}
          onAction={() =>
            this.props.navigation.navigate('ChooseAPlan', {
              // id: this.props.route.params.id,
              data: {id: this.props.route.params.id, pages: this.state.pages},
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
          onAction={() => this.handleSubmit()}
        />
      </View>
    );
  };
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

// class MyComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectValue: undefined,
//       province: undefined,
//       streetAddress1: '',
//       streetAddress2: '',
//       zipcode: '',
//       isModalVisible: false,
//     };
//   }
//   openModal = () => {
//   this.setState({isModalVisible : true})
//   };
//   modalClose = () => {
//     this.setState({isModalVisible : false})
//   };
//   onValueChange = (value) => {
//     this.setState({selectValue :  value.name});
//     if (value.name == 'United States') {
//       this.props.getPlace(value.name);
//       return null;
//     } else if (value.name == 'India') {
//       this.props.getPlace(value.name);
//       return null;
//     } else {
//       this.props.getPlace(value.name);
//       this.openModal();
//     }
//   };
//   onProviceValue = (value) => {
//     this.setState({province : value.name});
//   };
//   render() {
//     return (
//       <View style={{backgroundColor: colors.authBackGroud}}>
//         <View
//           style={{
//             flex: 1,
//             marginTop: hp('3.89%'),
//             left: 3,
//             marginBottom: Platform.OS == 'android' ? hp('20%') : hp('33%'),
//           }}>
//           <Text style={styles.headingText}>Address</Text>
//           <View style={{width: wp('99%'), marginLeft: -3}}>
//             <Dropdown
//               //placeholderText={'Select the country you live in'}
//               dropdownWidth={'93%'}
//               data={CountryList.map((item) => {
//                 return {item: item.name, value: item.name};
//               })}
//               selectedValue={this.state.selectValue}
//               onValueChange={(index, value) => this.onValueChange(value)}
//               value={'Select the country you live in'}
//             />
//           </View>
//           <PlainTextInput
//             height={43}
//             backgroundColor={colors.white}
//             width={width - 35}
//             borderRadius={30}
//             marginTop={17}
//             placeholder="Street Address 1"
//             label=""
//             labelColor={colors.labelColor}
//             placeholderColor={colors.placeHolderColor}
//             inputTextColor={colors.text}
//             maxLength={50}
//             onChangeText={(value) => setStreetAddress1(value)}
//             value={this.state.streetAddress1}
//             // iconName={'search_gray_icon'}
//           />
//           <PlainTextInput
//             height={43}
//             backgroundColor={colors.white}
//             width={width - 35}
//             borderRadius={30}
//             marginTop={17}
//             placeholder="Street Address 2"
//             label=""
//             labelColor={colors.labelColor}
//             placeholderColor={colors.placeHolderColor}
//             inputTextColor={colors.text}
//             maxLength={50}
//             onChangeText={(value) => setStreetAddress2(value)}
//             value={this.state.streetAddress2}
//             // iconName={'search_gray_icon'}
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               flex: 1,
//               justifyContent: 'space-evenly',
//             }}>
//             <View style={{marginLeft: 3}}>
//               <PlainTextInput
//                 height={43}
//                 backgroundColor={colors.white}
//                 width={Platform.OS == 'android' ? wp('45') : wp('45')}
//                 borderRadius={30}
//                 marginTop={17}
//                 placeholder="Zip Code"
//                 label=""
//                 labelColor={colors.labelColor}
//                 placeholderColor={colors.placeHolderColor}
//                 inputTextColor={colors.text}
//                 maxLength={50}
//                 onChangeText={(value) => setZipcode(value)}
//                 value={this.state.zipcode}
//                 // iconName={'search_gray_icon'}
//               />
//             </View>
//             <View style={{marginLeft: 10}}>
//               <Dropdown
//                 value={'State'}
//                 dropdownWidth={Platform.OS == 'android' ? wp('42%') : wp('43')}
//                 data={[{item: 'New York', value: 'New York'}]}
//                 selectedValue={this.state.province}
//                 onValueChange={(index, value) => this.onProviceValue(value)}
//                 pickerMarginTop={17}
//               />
//             </View>
//           </View>
//         </View>
//         <SingleButtonModal
//           isModalVisible={this.state.isModalVisible}
//           // headerText={'Basket Buy Execution'}
//           modalClose={this.modalClose}
//           submitAction={() => this.modalClose()}
//           descriptionText={'Mudani is currently unavailable in your region.'}
//           nameOnSubmitButton={'Okay'}
//           nameOnIgnoreButton={'Ignore'}
//         />
//       </View>
//     );
//   }
// }
