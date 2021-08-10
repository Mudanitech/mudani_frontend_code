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
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import StepIndicator from 'react-native-step-indicator';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {SingleButtonModal} from './../../component/confirmModal';
import {FlatList} from 'react-native-gesture-handler';
import DataManager from './../../utils/DataManager';


const MyComponent3 = (props) => {
  const [selectedId,setSelectedId] = useState([])
  const [list, setList] = useState([
    {
      qustion_id: props.pages[1].sections[0].questions[0].id,
      title: props.pages[1].sections[0].questions[0].translations[0].data,
      options: [
        {
          option:
            props.pages[1].sections[0].questions[0].options[0].translations[0]
              .data,
          optionId: props.pages[1].sections[0].questions[0].options[0].id,
          checked: true,
        },

        {
          option:
            props.pages[1].sections[0].questions[0].options[1].translations[0]
              .data,
          optionId: props.pages[1].sections[0].questions[0].options[1].id,
          checked: false,
        },
      ],
    },
    {
      qustion_id: props.pages[1].sections[0].questions[2].id,
      title: props.pages[1].sections[0].questions[2].translations[0].data,
      options: [
        {
          option:
            props.pages[1].sections[0].questions[2].options[0].translations[0]
              .data,
          optionId: props.pages[1].sections[0].questions[2].options[0].id,
          checked: true,
        },
        {
          option:
            props.pages[1].sections[0].questions[2].options[1].translations[0]
              .data,
          optionId: props.pages[1].sections[0].questions[2].options[1].id,
          checked: false,
        },
      ],
    },
    {
      qustion_id: props.pages[1].sections[0].questions[4].id,
      title: props.pages[1].sections[0].questions[4].translations[0].data,
      options: [
        {
          option:
            props.pages[1].sections[0].questions[4].options[0].translations[0]
              .data,
          optionId: props.pages[1].sections[0].questions[4].options[0].id,
          checked: true,
        },
        {
          option:
            props.pages[1].sections[0].questions[4].options[1].translations[0]
              .data,
          optionId: props.pages[1].sections[0].questions[4].options[1].id,
          checked: false,
        },
      ],
    },
    {
      qustion_id: props.pages[1].sections[0].questions[6].id,
      title: props.pages[1].sections[0].questions[6].translations[0].data,
      options: [
        {
          option:
            props.pages[1].sections[0].questions[6].options[0].translations[0]
              .data,
          optionId: props.pages[1].sections[0].questions[6].options[0].id,
          checked: true,
        },
        {
          option:
            props.pages[1].sections[0].questions[6].options[1].translations[0]
              .data,
          optionId: props.pages[1].sections[0].questions[6].options[1].id,
          checked: false,
        },
      ],
    },
  ]);
  const selectYesNo = (question_id, optionId) => {
    Alert.alert(String("We cannot proceed with opening your account at the moment. However, you can still play Mudani games and earn rewards."));
    let selectedQId = Object.assign([], selectedId);
    // let indexofid = selectedQId.indexOf(question_id);

    // if(indexofid == -1){
    //   selectedQId.push({id : question_id})
    // } else {
    //   selectedQId = selectedQId.filter((it) => it != id);
    // }
    // list.map(item => {
    //   if(item.id == question_id){
    //     setList(list.map(it=>{
    //       it.ite
    //     }))
    //   }
    // })
    // setSelectedId(selectedQId)
  }
useEffect(()=>{
  console.log("Selected Ids Q",selectedId);

})
  const yesNoRenderItem = ({item, index}) => {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text
            numberOfLines={4}
            style={{
              fontSize: 16,
              color: colors.black,
              fontFamily: fonts.regular,
              textAlign: 'left',
            }}>
            {item.title}
          </Text>
        </View>
        <View style={styles.yesAndNoContainer}>
          {item.options.map((el, index) => {
            return (
              <View style={styles.yesAndNoCo}>
                
                  {!el.checked ? 
                  
                    <Image
                      source={localImages.active_radio_button}
                      style={{
                        height: 20,
                        width: 20,
                        alignSelf: 'center',
                      }}></Image>
                    
                  : 
                  <TouchableOpacity
                  onPress={() => selectYesNo(item.qustion_id, el.optionId)}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        alignSelf: 'center',
                        borderColor: colors.grayColor,
                        borderWidth: 0.4,
                        borderRadius: 50,
                      }}></View>
                        </TouchableOpacity>
                  }
                
                <Text style={styles.yesAndNoText}>{el.option}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: colors.authBackGroud}}>
      <View
        style={{
          marginTop: hp('3.89%'),
          alignSelf: 'center',
          marginBottom: hp('20.64%'),
          marginLeft: 5,
        }}>
        <Text style={styles.headingText}>Do any of these apply?</Text>
        <FlatList data={list} renderItem={yesNoRenderItem} />
      </View>
      {/* <Text
        style={{
          fontSize: 12,
          color: colors.grayColor,
          fontFamily: fonts.regular,
          textAlign: 'center',
        }}>
        Lorem ipsum dolor sit amet,
      </Text> */}
    </View>
  );
};
/* Define your class */
export default class VerifyYourIdentityStep5 extends Component {
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
      HaveYouAnotherParty: true,
      AccountHolderControlPerson: false,
      AnyOneAuthorizeToTradeInYourAcccount: false,
      FormerlyPoliticallyExposedPerson: false,
    };
  }

  showSteps = () => {
    if (this.state.pages.length > 0)
      return <MyComponent3 pages={this.state.pages} />;
  };

  openModal = () => {
    if (this.state.currentPosition == 0) {
      this.setState({isModalVisible: true});
      // this.setState({countryName: ''});
    } else {
      return null;
    }
  };
  modalClose = () => {
    this.setState({isModalVisible: false});
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
  componentDidUpdate = (prevProps) => {
    console.log('country', this.props.route.params.data);
  };
  handleSubmit = () => {
    // Alert.alert(String(this.state.docType));
    // if (!this.state.bankName) {
    //   ShowToast('Please enter bank name!');
    // } else if (!this.state.bankAccountNumber.trim()) {
    //   ShowToast('Please enter bank account number!');
    // } else if (!this.state.bankCityName) {
    //   ShowToast('Please enter bank city name!');
    // } else if (!this.state.liquidNetWorth) {
    //   ShowToast('Please select liquidity networth!');
    // } else if (!this.state.investmentExp) {
    //   ShowToast('Please select investment experience!');
    // } else if (!this.state.investmentObjs) {
    //   ShowToast('Please select investment objectives!');
    // } else if (!this.state.liquidityNeeds) {
    //   ShowToast('Please select liquidity needs!');
    // } else if (!this.state.timeHorizn) {
    //   ShowToast('Please select time horizon!');
    // } else if (!this.state.docType) {
    //   ShowToast('Please select type of document for identity!');
    // } else if (!this.state.signatureImage) {
    //   ShowToast('Please select signature image!');
    // } else if (!this.state.AddressVerificationFront) {
    //   ShowToast('Please select Address verification front image!');
    // } else if (!this.state.AddressVerificationBack) {
    //   ShowToast('Please select Address verification back image!');
    // } else if (!this.state.TypeOfDocumentYouAreUploading) {
    //   ShowToast('Please select type of document you are uploading!');
    // } else if (!this.state.PancardFront) {
    //   ShowToast('Please select pancard image!');
    // } else {
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
      empolymentId: this.props.route.params.data.userDetails.empolymentId,
      nameOfEmployer: this.props.route.params.data.userDetails.nameOfEmployer,
      annualIncomeId: this.props.route.params.data.userDetails.annualIncomeId,
      bankName: this.props.route.params.data.userDetails.bankName,
      bankAccountNumber: this.props.route.params.data.userDetails
        .bankAccountNumber,
      bankCityName: this.props.route.params.data.userDetails.bankCityName,
      liquidNetWorth: this.props.route.params.data.userDetails.liquidNetWorth,
      investmentExp: this.props.route.params.data.userDetails.investmentExp,
      investmentObjs: this.props.route.params.data.userDetails.investmentObjs,
      liquidityNeeds: this.props.route.params.data.userDetails.liquidityNeeds,
      timeHorizn: this.props.route.params.data.userDetails.timeHorizn,
      signatureImage: this.props.route.params.data.userDetails.signatureImage,
      AddressVerificationFront: this.props.route.params.data.userDetails
        .AddressVerificationFront,
      AddressVerificationBack: this.props.route.params.data.userDetails
        .AddressVerificationBack,
      TypeOfDocumentYouAreUploading: this.props.route.params.data.userDetails
        .TypeOfDocumentYouAreUploading,
      PancardFront: this.props.route.params.data.userDetails.PancardFront,
      docType: this.props.route.params.data.userDetails.docType,
      HaveYouAnotherParty: this.state.HaveYouAnotherParty,
      AccountHolderControlPerson: this.state.AccountHolderControlPerson,
      AnyOneAuthorizeToTradeInYourAcccount: this.state
        .AnyOneAuthorizeToTradeInYourAcccount,
      FormerlyPoliticallyExposedPerson: this.state
        .FormerlyPoliticallyExposedPerson,
      address: this.props.route.params.data.userDetails.address,
      totalNetWorth: this.props.route.params.data.userDetails.totalNetWorth,
    };
    this.props.navigation.navigate('ChooseAPlan', {
       id: this.props.route.params.id,
      data: {
        id: this.props.route.params.data.id,
        pages: this.state.pages,
        userDetails: dataToSend,
      },
    });
    // }
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
    return (
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
    marginRight: 30,
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
