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
  Platform,
  Alert,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {TwoButtonModal} from './../../component/confirmModal';
import Spinner from './../../utils/Loader';
import {getAPI, postAPI} from './../../utils/Api';
import ShowToast from '../../component/Toast';
import DataManager from './../../utils/DataManager';
import {FlatList} from 'react-native-gesture-handler';
import Pie from 'react-native-pie';

const Statement = props => {
  const [isModal2, setState2] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [orbisComponent, setOrbisComponent] = useState([]);
  const modalOpen2 = (title, companyName) => {
    setState2(true);
    setHeading(title);
    setDescription(companyName);
  };
  const modalClose2 = () => {
    setState2(false);
  };

  useEffect(() => {
    if (props.userId) getMyPortfolio();
  }, []);
  console.log('colors', orbisComponent);
  const getMyPortfolio = () => {
    setLoadingSpinner(true); //608e7a7385a1c62e1458cac9
    getAPI(`getMyPortfolio/` + `${props.userId}`, null)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          setPortfolio(response.data);
          setOrbisComponent(
            response.data.orbisModel[0].components.map(item =>
              item ? {...item, color: getRandomColor()} : [],
            ),
          );
          console.log('my portfolio', response.data);
        } else {
          setLoadingSpinner(false);
          //ShowToast(response.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        // ShowToast('Something went Wrong!');
      });
  };

  const viewModal = () => {
    const IsOpen = isModal2;
    return (
      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={styles.popUpText}> {heading}</Text>
          <Text style={[styles.popUpText, {fontWeight: '100', marginTop: 10}]}>
            {' '}
            {
              'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum'
            }
          </Text>
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
  const renderHoldings = ({item}) => {
    return (
      <View>
        <View style={styles.stocksContainer}>
          <View style={styles.textContainer2}>
            <View style={{width: wp('15%')}}>
              <Text style={styles.cashText}>{item.holdingType}</Text>
            </View>
            <TouchableOpacity
              onPress={() => modalOpen2(item.holdingType, 'skdjfkl')}>
              <Image
                source={localImages.info_blue_circle}
                style={styles.arrowRight1}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.secondContainer}
          onPress={
            () => null
            // props.navigation.navigate('TrackerScreen', {symbol: item})
          }>
          <View style={styles.imageWidth}>
            <Image
              source={{
                uri: item.tickerImage
                  ? item.tickerImage
                  : localImages.company_icon,
              }}
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainerWidth}>
            <Text
              numberOfLines={1}
              style={(styles.itemText1, [{textTransform: 'capitalize'}])}>
              {item.companyName}
            </Text>
            <Text numberOfLines={1} style={styles.itemText2}>
              {item.symbol}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[styles.itemText1, {color: colors.info_color}]}>
              {item.targetValue}%
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const getRandomColor = () => {
    return (
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')'
    );
  };

  if (portfolio == null) {
    if (loadingSpinner) {
      return (
        <View style={{height: height - 100}}>
          <Spinner
            visible={loadingSpinner}
            cancelable={true}
            indicatorStyle={{color: colors.red}}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.statementContainer}>
            <Text
              style={[styles.aggressiveText, {fontSize: 16, marginTop: 10}]}>
              No Portfolio found!
            </Text>
          </View>
        </View>
      );
    }
  } else {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.heading}>Holdings</Text>
        </View>
        <View style={[styles.statementContainer]}>
          <FlatList
            data={portfolio.getModels ? portfolio.getModels.models : []}
            renderItem={renderHoldings}
            ItemSeparatorComponent={() => <View style={styles.rowBorder} />}
          />
        </View>
        {viewModal()}
      </View>
    );
  }
};

class MyPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
  }
  showTabs = () => {
    if (this.state.userId)
      return <Statement {...this.props} userId={this.state.userId} />;
  };
  componentDidMount = async () => {
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="My Portfolio"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View>{this.showTabs()}</View>
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
    borderRadius: wp('1.9%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: hp('3%'),
    marginTop: hp('2.9%'),
    paddingBottom: hp('1.5%'),
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
  amountText: {
    fontSize: wp('6,4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 31,
    //marginLeft: wp('0'),
    marginTop: hp('0.7'),
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
    height: 15,
    width: 15,
    marginLeft: wp('3.46'),
    resizeMode: 'contain',
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
  showMoreText: {
    fontSize: wp('4%'),
    color: colors.info_color,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('4.53'),
    marginTop: hp('2.77%'),
    marginBottom: hp('3.44%'),
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
    width: wp('87%'),
  },
  investingPortfolioText: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
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
    width: wp('16.13%'),
    backgroundColor: colors.grayDot,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
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
});
export default MyPortfolio;
