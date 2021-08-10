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
  FlatList,
  Linking,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';
import {TwoButtonModal} from './../../component/confirmModal';
import {postAPI, getAPI} from '../../utils/Api';
import Spinner from './../../utils/Loader';

import ShowToast from '../../component/Toast';
import DataManager from './../../utils/DataManager';
import Autolink from 'react-native-autolink';

const Statement = props => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [isModal2, setState2] = useState(false);
  const [isModal3, setState3] = useState(false);
  const [heading, setHeading] = useState('');
  const [isInfo, setInfo] = useState(false);
  const [description, setDescription] = useState('');

  const [records, setRecords] = useState(null);
  const [itemTicker, setItemTicker] = useState(null);
  const [isModal, setModalOpen] = useState(false);

  const [news, setNews] = useState(null);
  const [newsObject, setNewsObject] = useState(null);
  const [isColorTab, setColorTab] = useState('#082B3C');
  const [isColor, setColor] = useState(`rgb(8, 43, 60, 1)`);
  const [isShow, setShow] = useState(null);

  const [chartData, setChartData] = useState([
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    40,
    50,
    60,
    10,
    20,
    20,
    30,
    40,
    50,
    60,
    50,
    60,
    10,
    20,
  ]);
  const [labelChart, setLabelChart] = useState([
    {
      lable: '1D',
      isSelected: true,
      color: '#082B3C',
    },
    {
      lable: '5D',
      isSelected: false,
      color: '#0091da',
    },
    {
      lable: '1M',
      isSelected: false,
      color: '#1CCBBF',
    },
    {
      lable: '3M',
      isSelected: false,
      color: '#082B3C',
    },
    {
      lable: '1Y',
      isSelected: false,
      color: '#0091da',
    },
    {
      lable: 'All',
      isSelected: false,

      color: '#1CCBBF',
    },
  ]);

  const modalOpen2 = (title, companyName) => {
    setState2(true);
    setHeading(title);
    setDescription(companyName);
  };

  // const modalOpen2 = () => {
  //   this.setState({isModal2: true});
  // };

  const modalOpen3 = news => {
    setState3(true);
    setNewsObject(news);
  };

  const modalClose3 = () => {
    setState3(false);
  };

  const modalIsInfo = () => {
    setInfo(true);
  };

  modalInfoClose = () => {
    setInfo(false);
  };

  const viewModal = () => {
    const IsOpen = isInfo;
    return (
      <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
        <View style={styles.popupMainContainer}>
          {/* <Image source={props.image} style={styles.circleDollar} /> */}
          <Text style={[styles.popUpText, {marginBottom: 10}]}> {heading}</Text>
          <Text
            style={[styles.popUpText, {fontWeight: '100', marginBottom: 10}]}>
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
            onAction={() => modalInfoClose()}
          />
        </View>
      </TwoButtonModal>
    );
  };
  const viewModalNews = () => {
    const IsOpen = isModal3;
    if (newsObject) {
      return (
        <TwoButtonModal
          isModalVisible={IsOpen}
          modalClose={() => modalClose3()}>
          <ScrollView>
            <View style={styles.popupMainContainer}>
              {/* <Image source={props.image} style={styles.circleDollar} /> */}
              <Text
                style={[
                  styles.popUpText,
                  {marginBottom: 20, textAlign: 'justify', fontSize: 16},
                ]}>
                {newsObject.headline}
              </Text>
              <Text
                style={[
                  styles.popUpText,
                  {
                    fontWeight: '100',
                    marginBottom: 10,
                    textAlign: 'justify',
                    fontSize: 14,
                  },
                ]}>
                <Autolink text={newsObject.body} />
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
                onAction={() => modalClose3()}
              />
            </View>
          </ScrollView>
        </TwoButtonModal>
      );
    }
  };
  useEffect(() => {
    if (records == null) {
      if (props.route.params !== undefined) {
        getRecords(props.route.params.symbol.symbol);
      }
    }
    if (loadingSpinner == true) {
      props.getLoading(true);
    } else {
      props.getLoading(false);
    }
  }, [loadingSpinner]);
  const getRecords = symbol => {
    setLoadingSpinner(true);
    const dataToSend = {
      ticker: symbol,
    };

    postAPI('tickerDetail', dataToSend)
      .then(response => {
        if (response.status == 200) {
          setRecords(response.data);
          getNewsList(symbol);
        } else {
          setLoadingSpinner(false);
          ShowToast(response.message);
        }
        console.log(response, response.message);
      })
      .catch(err => {
        //ShowToast('Something went Wrong!');
        setLoadingSpinner(false);
        console.log(err);
      });
  };

  const getNewsList = symbol => {
    // setLoadingSpinner(true);
    getAPI(`getNewsListBySymbol/` + `${symbol}`, null)
      .then(response => {
        if (response.status == 200) {
          setLoadingSpinner(false);
          setNews(response.data);
          console.log('setPlans', response.data);
        } else {
          setLoadingSpinner(false);
          ShowToast(response.message);
        }
      })
      .catch(err => {
        setLoadingSpinner(false);
        //ShowToast('Something went Wrong!');
        console.log('err', err);
      });
  };

  const modalOpen = () => {
    setModalOpen(true);
  };
  const modalClose = () => {
    setModalOpen(false);
  };

  const buyInDollars = () => {
    const {symbol} = props.route.params;

    modalClose();
    props.navigation.navigate('ReviewScreen', {symbol: symbol});
  };

  const buyInShares = () => {
    const {symbol} = props.route.params;

    modalClose();
    props.navigation.navigate('BuyDetails', {symbol: symbol});
  };

  const modalClose2 = () => {
    setState2(false);
  };

  const SellInShares = () => {
    const {symbol} = props.route.params;

    modalClose2();
    props.navigation.navigate('SaleShareDetails', {symbol: symbol});
  };

  const SellInDollars = () => {
    const {symbol} = props.route.params;

    modalClose2();
    props.navigation.navigate('SaleReviewScreen', {symbol: symbol});
  };

  onClickDate = index => {
    var localData = [];
    localData = labelChart;
    for (var i = 0; i < labelChart.length; i++) {
      localData[i].isSelected = false;
    }
    localData[index].isSelected = true;
    setLabelChart(localData);
    setChartData(
      index == 0
        ? [
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 1
        ? [
            30,
            30,
            20,
            20,
            60,
            80,
            40,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 2
        ? [
            40,
            30,
            20,
            50,
            70,
            90,
            30,
            10,
            30,
            20,
            40,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 3
        ? [
            10,
            30,
            20,
            50,
            60,
            40,
            60,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : index == 4
        ? [
            90,
            40,
            20,
            90,
            50,
            70,
            50,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ]
        : [
            40,
            80,
            24,
            15,
            76,
            16,
            29,
            10,
            35,
            20,
            43,
            93,
            22,
            10,
            16,
            35,
            25,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            49,
            50,
            29,
            12,
            10,
            32,
            23,
            40,
            92,
            22,
            1,
            13,
            32,
            22,
            42,
            9,
            2,
            17,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
            10,
            30,
            20,
            40,
            90,
            20,
            10,
          ],
    );

    if (index == 0 || index == 3) {
      setColor(`rgb(8 ,43, 60, 1)`);
      setColorTab('#082B3C');
    } else if (index == 2 || index == 5) {
      setColor(`rgb(28,203, 218, 191)`);
      setColorTab('#1CCBBF');
    } else if (index == 1 || index == 4) {
      setColor(`rgb(90,159, 218, 1)`);
      setColorTab('#0091da');
    }
  };

  const renderlabel = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onClickDate(index)}>
        <View
          style={[
            {
              justifyContent: 'center',
              borderRadius: 8,
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 6,
              paddingBottom: 6,
            },
            item.isSelected ? {backgroundColor: item.color} : null,
          ]}>
          <Text
            style={[
              {fontSize: 14, fontWeight: '600'},
              item.isSelected ? {color: 'white'} : {color: isColorTab},
            ]}>
            {item.lable}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  openNews = newsId => {
    console.log('Item data', JSON.stringify(newsId));
    if (newsId.firstLink == undefined) {
      //alert('Url not found');
      return;
    }

    Linking.canOpenURL(newsId.firstLink).then(supported => {
      if (supported) {
        Linking.openURL(newsId.firstLink);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };

  const renderNews = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.openNews(item)}>
        <View style={{borderRadius: wp('10%'), marginTop: 10}}>
          <View
          // source={localImages.news}
          //imageStyle={{borderRadius: 10}}
          // style={styles.newsContainer}>
          >
            <Text numberOfLines={6} style={styles.newsText}>
              {item.provider}
            </Text>
            <Text numberOfLines={6} style={styles.newsText}>
              {item.headline}
            </Text>
            <View style={styles.timeContainer}>
              <Image
                source={localImages.clock_black}
                style={styles.clockIcon}
              />
              <Text style={styles.timeText}>
                {new Date(item.createdOn).getHours()} hours ago{' '}
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={[styles.newsTextContainer, {marginBottom: 20}]}>
          <Text style={styles.newsText1}>
            <Autolink text={item.body} />
          </Text>
        </View> */}
      </TouchableOpacity>
    );
  };

  const onClickTrade = async () => {
    const {from} = props.route.params;

    console.log(from);

    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails);
    // if (userDetails.interestedAccount != 47) {
    //   Alert.alert('Please add Mudani Invest to start investing yourself');
    //   return;
    // }

    if (from == 'Deshbord') {
      setShow('Deshbord');
    } else {
      setShow('search');
    }
  };

  const onBack = () => {
    if (isShow != null) {
      setShow(null);
    } else {
      props.navigation.goBack();
    }
  };

  const capitalize = str => {
    if (typeof str === 'string') {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return '';
    }
  };

  if (records == null && loadingSpinner == true) {
    return (
      <View style={{height: height}}>
        <Spinner
          visible={loadingSpinner}
          cancelable={true}
          indicatorStyle={{color: colors.red}}
        />
      </View>
    );
  } else {
    const {symbol, from} = props.route.params;
    console.log('From thre', JSON.stringify(props.route.params));
    return (
      <SafeAreaView>
        <HeaderWithBack
          Header=" "
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => onBack()}
        />

        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.aboveContainer}>
              <View style={{width: 200}}>
                <Text
                  numberOfLines={1}
                  style={[styles.stockText, {extTransform: 'capitalize'}]}>
                  {capitalize(symbol.companyName)}
                </Text>
                <Text style={styles.stockText1}>{symbol.symbol}</Text>
              </View>

              <Image
                source={localImages.amazon}
                source={
                  symbol.tickerImage != ''
                    ? {uri: symbol.tickerImage}
                    : localImages.mudani_logo
                }
                // style={styles.icon_up}
                style={{height: 70, width: 100}}
                resizeMode="contain"
              />
            </View>
            <View style={styles.smallContainer}>
              <View>
                <Image
                  source={localImages.icon_up}
                  style={styles.icon_up}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={styles.amountText}>$0</Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.smallText,
                    {color: colors.info_color, marginTop: 10},
                  ]}>
                  +0 (+0%)
                </Text>
              </View>
            </View>
            <View>
              <LineChart
                onDataPointClick={({value}) => {
                  console.log('masoud' + value);
                }}
                data={{
                  labels: [],
                  datasets: [
                    {
                      data: chartData,
                    },
                  ],
                }}
                width={width / 1.3} // from react-native
                height={190}
                yAxisLabel="$"
                yAxisSuffix="k"
                withHorizontalLabels={false}
                withVerticalLabels={false}
                withDots={false}
                withInnerLines={false}
                shadowOffset={false}
                withShadow={false}
                withOuterLines={false}
                chartConfig={{
                  withShadow: false,
                  withOuterLines: false,
                  backgroundColor: colors.authBackGroud,
                  backgroundGradientFrom: colors.authBackGroud,
                  backgroundGradientTo: colors.authBackGroud,
                  decimalPlaces: 1, // optional, defaults to 2dp
                  // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  color: (opacity = 0) => isColor,
                  labelColor: (opacity = 0) => `rgb(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 1,
                  },

                  propsForDots: {
                    r: '0',
                    strokeWidth: '1',
                    stroke: 'red',
                  },
                }}
                bezier
                style={{
                  //marginVertical: 8,
                  borderRadius: 5,
                  paddingRight: 0,

                  //marginTop: hp('5%'),
                }}
              />
              <View style={{width: width / 1.3}}>
                <FlatList
                  numColumns={6}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                  }}
                  data={labelChart}
                  renderItem={renderlabel}
                />
              </View>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.status}>Stats</Text>
              <TouchableOpacity onPress={() => modalIsInfo()}>
                <Image
                  source={localImages.info_blue_circle}
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    marginLeft: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            {records ? (
              <View style={styles.belowContainer}>
                <View style={styles.firstContainer}>
                  <Text style={styles.listText}>Open</Text>
                  <Text style={styles.listText}>High</Text>
                  <Text style={styles.listText}>Low</Text>
                  <Text style={styles.listText}>52 Wk High</Text>
                  <Text style={styles.listText}>52 Wk Low</Text>
                </View>
                <View style={styles.secondContainer}>
                  <Text style={styles.listText}>{records[0].openingPrice}</Text>
                  <Text style={styles.listText}>{records[0].dayHigh}</Text>
                  <Text style={styles.listText}>{records[0].dayLow}</Text>
                  <Text style={styles.listText}>{records[0].high52week}</Text>
                  <Text style={styles.listText}>{records[0].low52week}</Text>
                </View>
                <View style={styles.thirdContainer}>
                  <Text style={styles.listText}>Volume</Text>
                  <Text style={styles.listText}>Avg Vol</Text>
                  <Text style={styles.listText}>Mkt Cap</Text>
                  <Text style={styles.listText}>P/E Ratio</Text>
                  <Text style={styles.listText}>Div/Yeild</Text>
                </View>
                <View style={styles.fourthContainer}>
                  <Text style={styles.listText}>{records[0].volume}</Text>
                  <Text style={styles.listText}>
                    {records[0].averageVolume30}
                  </Text>
                  <Text style={styles.listText}>{records[0].marketCap}</Text>
                  <Text style={styles.listText}>
                    {records[0].priceEarningRatio}
                  </Text>
                  <Text style={styles.listText}>
                    {records[0].dividendYield}
                  </Text>
                </View>
              </View>
            ) : null}

            <View style={{alignItems: 'center'}}>
              {isShow == null ? (
                <ButtonWithoutShadow
                  width={width - wp('40%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Trade"
                  backgroundColor={colors.blue}
                  onAction={() => onClickTrade()}
                />
              ) : isShow == 'Deshbord' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <ButtonWithoutShadow
                    width={width - wp('60%')}
                    height={43}
                    // marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Buy"
                    backgroundColor={colors.info_color}
                    onAction={() => modalOpen()}
                  />
                  <ButtonWithoutShadow
                    width={width - wp('60%')}
                    height={43}
                    // marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Sell"
                    backgroundColor={colors.black}
                    onAction={() => modalOpen2()}
                  />
                </View>
              ) : isShow == 'search' ? (
                <ButtonWithoutShadow
                  width={width - wp('60%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Buy"
                  backgroundColor={colors.info_color}
                  onAction={() => modalOpen()}
                />
              ) : null}
            </View>

            {news != null ? (
              <View>
                <View style={styles.statsContainer}>
                  <Text style={styles.recentReview}>Recent News</Text>
                </View>
                <View style={styles.belowContainer}>
                  <FlatList
                    data={news}
                    ItemSeparatorComponent={() => (
                      <View style={styles.rowBorder} />
                    )}
                    renderItem={renderNews}
                    ListEmptyComponent={() => {
                      if (!loadingSpinner) {
                        return (
                          <View>
                            <Text>No news available!</Text>
                          </View>
                        );
                      } else {
                        return null;
                      }
                    }}
                  />
                </View>
              </View>
            ) : null}

            {viewModal()}
            {viewModalNews()}

            <TwoButtonModal
              isModalVisible={isModal}
              modalClose={() => modalClose()}>
              <View style={styles.popupMainContainer}>
                <Image
                  source={localImages.circle_dollar}
                  style={styles.circleDollar}
                />
                <Text style={styles.popUpText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  interdum neque sed diam imperdiet
                </Text>
              </View>
              <View style={styles.popupButtonContainer}>
                <ButtonWithoutShadow
                  width={width - wp('65%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Buy in Dollars"
                  backgroundColor={colors.blue}
                  onAction={() => buyInDollars()}
                />
                <ButtonWithoutShadow
                  width={width - wp('65%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.blue}
                  label="Buy in Shares"
                  backgroundColor={colors.light_blue}
                  onAction={() => buyInShares()}
                />
              </View>
            </TwoButtonModal>

            <TwoButtonModal
              isModalVisible={isModal2}
              modalClose={() => modalClose2()}>
              <View style={styles.popupMainContainer}>
                <Image
                  source={localImages.circle_dollar}
                  style={styles.circleDollar}
                />
                <Text style={styles.popUpText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  interdum neque sed diam imperdiet
                </Text>
              </View>
              <View style={styles.popupButtonContainer}>
                <ButtonWithoutShadow
                  width={width - wp('65%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Sell in Dollars"
                  backgroundColor={colors.black}
                  onAction={() => SellInDollars()}
                />
                <ButtonWithoutShadow
                  width={width - wp('65%')}
                  height={43}
                  // marginTop={22}
                  borderRadius={20}
                  labelColor={colors.black}
                  label="Sell in Shares"
                  backgroundColor={colors.grayDot}
                  onAction={() => SellInShares()}
                />
              </View>
            </TwoButtonModal>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

class TrackerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
      isModal: false,
      isModal2: false,
      loading: false,
    };
  }

  setPositions = currentPosition => {
    this.setState({currentPosition: currentPosition});
  };
  showTabs = () => {
    return (
      <Statement
        {...this.props}
        getLoading={loading => this.getLoading(loading)}
      />
    );
  };
  getLoading = loading => {
    this.setState({loading});
  };

  render() {
    return <View>{this.showTabs()}</View>;
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
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    marginBottom: 100,
  },
  cashText: {
    fontSize: wp('4.5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    textAlign: 'left',
    // paddingLeft: wp('3'),
  },
  amountText: {
    fontSize: wp('6.4%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 36,
    //marginLeft: wp('0'),
    marginTop: hp('0.7'),
    // marginBottom: hp('2.24'),
  },
  stockText: {
    fontSize: wp('4.8%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
  stockText1: {
    fontSize: wp('2.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  icon_up: {
    height: 30,
    width: 15,
    marginRight: 8,
  },

  smallContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.4%'),
  },
  smallText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    // lineHeight: 30,
    marginLeft: wp('2.08%'),
  },

  aboveContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    justifyContent: 'space-between',
  },
  firstContainer: {
    flex: 1,
    alignItems: 'center',
    // width : wp("20%")
    // marginLeft: -10,
  },
  newsContainer: {
    height: hp('32.08'),
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  clockIcon: {height: 16, width: 16},
  newsIcon: {width: 100, height: 88},
  newsText: {
    fontSize: wp('2.8%'),
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 28,
    width: wp('80%'),
  },
  timeText: {
    fontSize: wp('2.46%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 19,
    marginLeft: 9,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsTextContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.65,

    elevation: 3,
    marginTop: 16,
  },
  newsTextContainer1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.65,

    elevation: 3,
    marginTop: 16,
  },
  newsText1: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  marketContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  marketText: {
    fontSize: wp('2.66%'),
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 16,
  },
  belowContainer: {
    flex: 1,
    flexDirection: 'row',
    //   alignItems : "center",
    justifyContent: 'flex-start',
    // marginTop: hp('5.54%'),
    marginBottom: hp('2.49%'),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
    padding: 10,
  },
  firstContainer: {
    width: wp('23%'),
    paddingLeft: 10,
  },
  thirdContainer: {
    width: wp('20%'),
    alignItems: 'flex-start',
  },
  fourthContainer: {
    width: wp('25%'),
    alignItems: 'flex-start',
  },
  secondContainer: {
    width: wp('15%'),
    alignItems: 'flex-start',
  },
  listText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginBottom: 10,
  },
  circleDollar: {
    height: 40,
    width: 40,
    marginBottom: 21,
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 27,
  },
  status: {
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    paddingLeft: 3,
  },
  recentReview: {
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    paddingLeft: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  rowBorder: {
    width: wp('80%'),
    borderWidth: Platform.OS == 'android' ? 0.25 : 0.5,
    borderColor: colors.grayColor,
    marginTop: 13,
  },
});
export default TrackerScreen;
