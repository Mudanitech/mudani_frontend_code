import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {hp, wp} from './../../utils/responsive';
const {height, width} = Dimensions.get('window');
import {CustomStyles} from '../style/CustomStyles';
import Dropdown from '../../component/Picker2';
import {HeaderWithBackWhite, ButtonWithoutShadow} from '../../component/Button';
import StepIndicator from 'react-native-step-indicator';
import {getAPI, postAPI} from './../../utils/Api';

import SignUpModel from './../../component/SignUpModel';
import ShowToast from '../../component/Toast';

export default class AddManagedAccount extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: 0,
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

      userId: '',
      flexItems: '',
      isTrueView: true,
    };

    this.currentStepIndex = 0;
    this.questionValueTotal = [];
    this.nextStep = this._nextStep.bind(this);
    this.previousStep = this._previousStep.bind(this);
    this.nextStep = this._nextStep.bind(this);
    this.previousStep = this._previousStep.bind(this);
  }

  componentDidMount = () => {
    this.getPlans();
  };

  getPlans = () => {
    const dataToSend = {
      type: this.props.route.params.id,
    };
    this.setState({loadingSpinner: true});
    getAPI(`getQuestionnaire`, null).then(response => {
      if (response.status == 200) {
        this.setState({loadingSpinner: false});
        this.setState({flexItems: response.data[0].questions});
      } else {
        this.setState({loadingSpinner: false});
        //ShowToast('Something went Wrong!');
      }
    });
  };

  setChecked = index => {
    const {flexItems} = this.state;
    var ALlData = [];
    ALlData = flexItems;
    for (var i = 0; i < ALlData[this.currentStepIndex].answers.length; i++) {
      ALlData[this.currentStepIndex].answers[i].status = 1;
    }
    ALlData[this.currentStepIndex].answers[index].status = 0;
    this.setState({flexItems: ALlData});
    this.questionValueTotal[this.currentStepIndex] =
      flexItems[this.currentStepIndex].answers[index].value;
  };

  renderItemAnswer = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.conditionContainer}
          onPress={() => this.setChecked(index)}>
          {item.status != 1 ? (
            <Image
              source={localImages.active_radio_button}
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
              }}></Image>
          ) : (
            <Image
              source={localImages.unselect}
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
              }}></Image>
          )}
          <Text
            style={
              item.status != 1
                ? [styles.yearText, {color: colors.blue, width: width / 1.3}]
                : [styles.yearText, {width: width / 1.3}]
            }>
            {item.answer}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderItemAge = ({item, index}) => {
    return (
      <View style={styles.ageContainer}>
        <View style={{width: wp('85%')}}>
          <Text numberOfLines={10} style={styles.oldText}>
            {'Q.' + (index + 1) + '. ' + item.question}
          </Text>
        </View>
        <View style={styles.ageSubContainer}>
          <FlatList
            data={item.answers}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            renderItem={this.renderItemAnswer}
            keyExtractor={item => item.type}
          />
        </View>
      </View>
    );
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {flexItems} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <HeaderWithBackWhite
          Header="Get a Customized Portfolio"
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

        <ScrollView style={{flex: 1}}>
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            scrollEnabled={false}
            initialNumToRender={1}
            initialScrollIndex={0}
            refreshing={false}
            pagingEnabled={true}
            horizontal
            getItemLayout={(data, index) => ({
              length: Dimensions.get('window').width,
              offset: Dimensions.get('window').width * index,
              index,
            })}
            data={flexItems}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            renderItem={this.renderItemAge}
            keyExtractor={item => item.type}
          />
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
            {this.state.currentPosition == 5 ? (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  // marginBottom={hp('5.84%')}
                  width={228}
                  height={43}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() =>
                    this.props.navigation.navigate(
                      'AddManagedClientAgreement',
                      {id: this.props.route.params.id},
                    )
                  }
                />
              </View>
            ) : (
              <View style={{alignSelf: 'center'}}>
                <ButtonWithoutShadow
                  // marginBottom={hp('5.84%')}
                  width={228}
                  height={43}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() => this._nextStep()}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  _nextStep() {
    console.log('next tapped...' + this.currentStepIndex);
    console.log();

    if (this.questionValueTotal[this.currentStepIndex] == undefined) {
      ShowToast('Please select a answer');
      return;
    }

    const {flexItems} = this.state;
    if (this.currentStepIndex < flexItems.length - 1) {
      this.currentStepIndex = this.currentStepIndex + 1;
      this.flatListRef.scrollToIndex({
        index: this.currentStepIndex,
        animated: false,
      });

      this.setState({
        stepIndex: this.currentStepIndex,
      });
    } else {
      const {flexItems} = this.state;
      const sum = this.questionValueTotal.reduce(
        (partial_sum, a) => +partial_sum + +a,
        0,
      );

      this.props.navigation.navigate('InvestingPortfolio', {
        id: this.props.route.params.id,
        questionnaireId: flexItems[0].answers[0].questionnaireId,
        score: sum,
        from: this.props.route.params.from,
      });
    }
  }

  _previousStep() {
    console.log('prev tapped...');
    if (this.currentStepIndex > 0) {
      this.currentStepIndex = this.currentStepIndex - 1;
      this.flatListRef.scrollToIndex({
        index: this.currentStepIndex,
        animated: true,
      });
      this.setState({
        stepIndex: this.currentStepIndex,
      });
    }
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 24,
  },
  stepperSubContainer: {
    width: width,
    height: 35,
    backgroundColor: 'white',
    position: 'relative',
  },
  portfolioContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 29,
  },
  basketImag: {
    height: 86,
    width: 86,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 21,
    marginBottom: 26,
  },
  portfolioSubContainer: {
    flex: 1,
    backgroundColor: colors.light_blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 16,
    marginRight: 16,
    padding: 12,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  ageContainer: {
    flex: 1,
    marginLeft: 29,
    marginRight: 29,
    marginTop: 36,
    marginBottom: Platform.OS == 'ios' ? 40 : -150,
  },
  oldText: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 25,
    textAlign: 'left',
  },
  ageSubContainer: {
    // flex: 1,
    paddingLeft: 19,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: 7,
    marginTop: 22,
    marginBottom: 337,
    width: wp('85%'),
  },
  conditionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    alignItems: 'center',
  },
  yearText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: 11,
  },
  mainContainer: {
    flex: 1,
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
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
  statementContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp('1.6%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: hp('1%'),
    marginTop: hp('2.9%'),
    paddingBottom: hp('.5%'),
  },

  statementSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: hp('3.59%'),
    paddingTop: hp('2.99%'),
    padding: wp('4%'),
  },
  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },
  accountNumberText: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('38.6'),
    marginRight: wp('3.3'),
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
  buttonText1: {
    fontSize: wp('3.73%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3.73%'),
    color: colors.white,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('2.53'),
  },
  heading: {
    fontSize: wp('5.33%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 27,
    // marginLeft: wp('0.7'),
    marginTop: hp('2.2'),
    // marginBottom: hp('2.24'),
  },

  borderSeperator: {
    height: 30,
    borderWidth: 0.3,
    borderColor: colors.grayColor,
  },
  rowBorder: {
    width: wp('78%'),
    borderWidth: Platform.OS == 'android' ? 0.25 : 0.5,
    borderColor: colors.grayColor,
  },
  arrowRight: {
    height: 10,
    width: 10,
    marginLeft: wp('3.46'),
  },
  arrowRight1: {
    height: 20,
    width: 20,
    marginLeft: wp('3.46'),
  },
  basket_image: {
    height: hp('14.84'),
    width: hp('14.84'),
    alignSelf: 'center',
    marginTop: hp('1.64%'),
    marginBottom: hp('3.89%'),
  },
  icon_up: {
    height: 15,
    width: 15,
  },
  itemImage: {
    height: 30,
    width: 30,
    marginLeft: wp('3.46'),
    marginTop: hp('0.4%'),
  },
  itemText1: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  itemText2: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  textContainer2: {
    flex: 1,
    // width: wp('60%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  smallContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.4%'),
  },
  smallText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    // lineHeight: 30,
    marginLeft: wp('2.08%'),
  },
  totolText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
    //  textAlign: 'left',
    //paddingLeft: wp('4.53'),
  },
  portFolioText: {
    fontSize: wp('4.53%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 24,
  },
  stocksContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // paddingTop: hp('2.99%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    paddingTop: wp('4%'),
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: hp('2.3%'),
    paddingBottom: hp('2.9%'),
  },
  textContainerWidth: {width: wp('55.9%')},
  imageWidth: {width: wp('15%')},
  basketContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: wp('1.79%'),
  },
  myPortfolioContainer: {
    flex: 1,
    marginTop: hp('1.79%'),
  },
  portFolioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.2'),
  },
  addBasketButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('5%'),
    marginTop: hp('5.09%'),
    justifyContent: 'center',
  },
  PContainer: {
    flex: 1,
    padding: wp('4%'),
  },
  investingPortfolioText: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    marginBottom: 8,
  },
  riskLevelText: {
    fontSize: wp('2.66%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  aggressiveText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginBottom: 8,
  },
  stockItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    //   paddingBottom : hp("0.7%")
  },
  widthforItem: {
    width: wp('44%'),
    paddingLeft: wp('2%'),
  },
  widthforItem1: {
    width: wp('30%'),
    alignItems: 'flex-end',
  },
  editButton: {
    height: hp('3.74%'),
    width: wp('14.13%'),
    backgroundColor: colors.grayDot,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  headingAgressive: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    textAlign: 'center',
  },
  customized: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    height: 21,
    color: colors.blue,
    textAlign: 'center',
  },
  paragraph: {
    fontFamily: fonts.regular,
    fontSize: 12,
    height: 20,
    color: colors.black,
    textAlign: 'center',
    height: 250,
    width: 282,
  },
  viewOptions: {
    marginTop: 14,
    marginBottom: 150,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
