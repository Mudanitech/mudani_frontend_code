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
import {HeaderWithBackWhite, ButtonWithoutShadow} from '../../component/Button';
import StepIndicator from 'react-native-step-indicator';
import SignUpModel from './../../component/SignUpModel';
import DataManager from './../../utils/DataManager';
import {getAPI, postAPI} from './../../utils/Api';
import Spinner from './../../utils/Loader';

import ShowToast from '../../component/Toast';
export default class investingPortfolio extends Component {
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
      portFolioData: '',
    };
  }

  componentDidMount = () => {
    const {questionnaireId, score} = this.props.route.params;
    this.getPortFolio(questionnaireId, score);
    console.log('props hai final', this.props.route.params);
  };

  getPortFolio = (questionnaireId, score) => {
    const dataToSend = {
      questionnaireId: questionnaireId,
      score: score,
    };
    postAPI('getSuggestedPortfolio', dataToSend)
      .then(response => {
        if (response.status == 200) {
          console.log('Yessss' + JSON.stringify(response));

          this.setState({
            portFolioData: response.data[0],
          });
        } else {
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        //ShowToast('Something went wrong!');
        console.log(err);
      });
  };

  getAlert = () => {
    const {portFolioData} = this.state;
    this.onCreatePortfolio(portFolioData.portfolioId);
  };

  onCreatePortfolio = async portfolioId => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);

    const dataToSend = {
      userId: userDetails._id,
      portfolioId: portfolioId,
    };
    postAPI('createPortfolio', dataToSend)
      .then(response => {
        if (response.status == 200) {
          if (this.props.route.params.from == 'dashBord') {
            this.update();
          } else {
            if (this.props.route.params.id == 5) {
              this.props.navigation.navigate('AddManagedClientAgreement', {
                id: this.props.route.params.id,
              });
            } else {
              this.props.navigation.navigate('VerifyYourIdentity', {
                id: this.props.route.params.id,
              });
            }
          }
        } else {
          this.setState({loadingSpinner: false});
          ShowToast(response.message);
        }
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
        // ShowToast('Something went wrong!');
        console.log(err);
      });
  };

  update = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    const dataToSend = {
      userId: userDetails._id,
      status:
        this.props.route.params.id == 1
          ? 1
          : this.props.route.params.id == 2
          ? 2
          : 3,
    };

    postAPI('updateJourneyStatus', dataToSend)
      .then(response => {
        if (response.status == 200) {
          this.props.navigation.navigate('Home', {
            screen: 'Dashboard',
            params: {id: 6},
          });
        } else {
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onNewClick = () => {
    alert('dsdbkj');
  };

  showSteps = () => {
    return <MyComponent6 {...this.props} />;
  };
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
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
        <View style={styles.stepperSubContainer}>
          <StepIndicator
            style={{flex: 1}}
            customStyles={this.state.customStyles}
            currentPosition={0}
            stepCount={4}
          />
        </View>
        <ScrollView>
          <View style={{flex: 1, width: '100%'}}>{this.showSteps()}</View>
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
            {/* <View style={{alignSelf: 'center'}}>
              <ButtonWithoutShadow
                // marginBottom={hp('5.84%')}
                width={228}
                height={43}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
                backgroundColor={colors.blue}
                onAction={this.getAlert}
              />
            </View> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const MyComponent6 = props => {
  const [allSugestedData, setAllSugestedData] = useState(null);
  const [portFolioData, setPortFolioData] = useState('');
  const [stockList, setStockList] = useState(null);
  const [isModal, setState] = useState(false);
  const [isSelect, setSelect] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const onSelectIndex = index => {
    var localData = '';
    setState(false);
    localData = allSugestedData;
    for (var i = 0; i < localData.length; i++) {
      localData[i].isSelected = true;
    }
    localData[index].isSelected = false;
    setAllSugestedData(localData);
    setTimeout(() => {
      setState(true);
    }, 100);

    // this.onCreatePortfolio(allSugestedData[index].portfolioId);
  };

  useEffect(() => {
    const {questionnaireId, score} = props.route.params;
    this.getPortFolio(questionnaireId, score);
  }, []);

  getPortFolio = (questionnaireId, score) => {
    setLoadingSpinner(true);
    const dataToSend = {
      questionnaireId: questionnaireId,
      score: score,
    };
    postAPI('getSuggestedPortfolio', dataToSend)
      .then(response => {
        setLoadingSpinner(false);

        if (response.status == 200) {
          setPortFolioData(response.data[0].portfolioDetail[0]);
          //setStockList(response.data[0].modelDetail[0].models);
          console.log(response, response.message);

          this.getAllSuggestedPortfolio();
        } else {
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        setLoadingSpinner(false);

        //ShowToast('Something went wrong!');
        console.log(err);
      });
  };

  getAllSuggestedPortfolio = () => {
    getAPI(`getAllSuggestedPortfolio`, null).then(response => {
      if (response.status == 200) {
        console.log('Arrrea', JSON.stringify(response));
        const newArr2 = response.data.map(v =>
          Object.assign(v, {isSelected: true}),
        );

        setAllSugestedData(newArr2);
      }
    });
  };

  const update = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    const dataToSend = {
      userId: userDetails._id,
      status:
        props.route.params.id == 1 ? 1 : props.route.params.id == 2 ? 2 : 3,
    };

    postAPI('updateJourneyStatus', dataToSend)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);

          props.navigation.navigate('Home', {
            screen: 'Dashboard',
            params: {id: 6},
          });
        } else {
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        setLoadingSpinner(false);

        console.log(err);
      });
  };

  onCreatePortfolio = async portfolioId => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);

    const dataToSend = {
      userId: userDetails._id,
      portfolioId: portfolioId,
    };
    setLoadingSpinner(true);

    postAPI('createPortfolio', dataToSend)
      .then(response => {
        if (response.status == 200) {
          setState(false);
          if (props.route.params.from == 'dashBord') {
            update();
          } else {
            setLoadingSpinner(false);

            if (props.route.params.id == 5) {
              props.navigation.navigate('AddManagedClientAgreement', {
                id: props.route.params.id,
              });
            } else {
              props.navigation.navigate('VerifyYourIdentity', {
                id: props.route.params.id,
              });
            }
          }
        } else {
          setState(false);
          setLoadingSpinner(false);

          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        this.setState({loadingSpinner: false});
        //  ShowToast('Something went wrong!');
        console.log(err);
      });
  };

  onClickPortFolioItem = () => {
    if (allSugestedData != null) {
      setSelect(true);
      this.onCreatePortfolio(allSugestedData[0].portfolioId);
    }

    //alert('dnkjs')
  };

  const renderPopupItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.statementContainer,
          {width: wp('82%'), alignSelf: 'center'},
        ]}>
        <View style={styles.PContainer}>
          <Text style={styles.investingPortfolioText}>
            {item.portfolioDetail[0].name}
          </Text>
          <Text style={styles.riskLevelText}>Risk Level</Text>
          <Text style={styles.aggressiveText}>
            {item.portfolioDetail[0].riskLevel}
          </Text>
          <Text style={styles.riskLevelText}>Description</Text>
          <Text style={styles.aggressiveText}>
            {item.portfolioDetail[0].description}
          </Text>
          <Image
            source={localImages.basket}
            style={[styles.basket_image, {alignSelf: 'flex-start'}]}
            resizeMode="contain"
          />
        </View>

        <FlatList
          data={item.modelDetail[0].models}
          renderItem={({item}) => (
            <View style={[styles.stockItemContainer]}>
              <View>
                <Image
                  source={localImages.rectangle_1}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.widthforItem}>
                <Text style={styles.riskLevelText}>{item.companyName}</Text>
              </View>
              <View style={styles.widthforItem1}>
                <Text style={styles.aggressiveText}>
                  {item.targetValue}.00%
                </Text>
              </View>
            </View>
          )}
        />

        <View style={{alignSelf: 'flex-end', marginRight: 5}}>
          <ButtonWithoutShadow
            marginBottom={hp('2%')}
            marginTop={16}
            width={139}
            height={43}
            borderRadius={20}
            labelColor={item.isSelected ? colors.white : colors.white}
            label="Select"
            backgroundColor={!item.isSelected ? colors.light_blue : colors.blue}
            onAction={() => onCreatePortfolio(item.portfolioId)}
            borderColor={!item.isSelected ? colors.info_color : null}
            borderWidth={!item.isSelected ? 1 : null}
          />
        </View>
      </View>
    );
  };
  const renderStockItem = ({item, index}) => {
    return (
      <View style={styles.stockItemContainer}>
        <View>
          <Image
            source={localImages.rectangle_1}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </View>
        <View style={styles.widthforItem}>
          <Text style={styles.riskLevelText}>{item.companyName}</Text>
        </View>
        <View style={styles.widthforItem1}>
          <Text style={styles.aggressiveText}>{item.targetValue}.00%</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.headingAgressive}>Your Suggested Portfolio</Text>
        <View style={styles.statementContainer}>
          <View style={[styles.PContainer]}>
            <Text style={styles.investingPortfolioText}>
              {portFolioData.name}
            </Text>
            <Text style={styles.riskLevelText}>Risk Level</Text>
            <Text style={styles.aggressiveText}>
              {portFolioData.riskLevel}{' '}
            </Text>
            <Text style={styles.riskLevelText}>Description</Text>
            <Text style={styles.aggressiveText}>
              {portFolioData.description}
            </Text>
            <Image
              source={localImages.basket}
              style={[styles.basket_image, {alignSelf: 'flex-start'}]}
              resizeMode="contain"
            />
          </View>

          <FlatList data={stockList} renderItem={renderStockItem} />
          <Spinner
            visible={loadingSpinner}
            cancelable={true}
            indicatorStyle={{color: colors.red}}
          />

          <View style={{alignSelf: 'flex-end', marginRight: 16}}>
            <ButtonWithoutShadow
              marginBottom={hp('2%')}
              marginTop={16}
              width={139}
              height={43}
              borderRadius={20}
              labelColor={isSelect ? colors.white : colors.white}
              label="Select"
              backgroundColor={isSelect ? colors.light_blue : colors.blue}
              //onAction={() => onSelectIndex(index)}
              borderColor={isSelect ? colors.info_color : null}
              borderWidth={isSelect ? 1 : null}
              onAction={() => onClickPortFolioItem()}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.headingAgressive, {marginTop: 20}]}>
          Prefer More Options?
        </Text>
        <TouchableOpacity
          style={styles.viewOptions}
          onPress={() => setState(true)}>
          <Text>View Options closest to your Risk Tolerance</Text>
          <Image
            source={localImages.down}
            style={{height: 10, width: 10, resizeMode: 'contain'}}
          />
          {/* <Dropdown value={'View Options closest to your Risk Tolerance'} /> */}
        </TouchableOpacity>
      </View>
      <SignUpModel isModalVisible={isModal} modalClose={() => setState(false)}>
        <View>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => setState(false)}>
            <Image
              source={localImages.close_gray}
              style={{height: 18, width: 18, right: 7}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headingAgressive}>
              Your Suggested Portfolio
            </Text>
            <FlatList data={allSugestedData} renderItem={renderPopupItem} />
          </View>

          <View>
            <View>
              <View
                style={{
                  marginTop: 0,
                  marginBottom: 50,
                  marginTop: 39,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.blue}
                  label="Skip"
                  backgroundColor={colors.light_blue}
                  onAction={() => setState(false)}
                />
                {/* <ButtonWithoutShadow
                  width={width - wp('64.33')}
                  height={43}
                  //   marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Next"
                  backgroundColor={colors.blue}
                  onAction={() => onSendToClientAgreement()}
                /> */}
              </View>
            </View>
          </View>
        </View>
      </SignUpModel>
    </View>
  );
};

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
    padding: 19,
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
    width: '100%',
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
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    //   paddingBottom : hp("0.7%")
  },
  widthforItem: {
    width: wp('43%'),
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
