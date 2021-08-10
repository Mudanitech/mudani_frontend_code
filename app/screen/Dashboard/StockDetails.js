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
import {FlatList} from 'react-native-gesture-handler';
import Autolink from 'react-native-autolink';
import {symbol} from 'd3-shape';

// const Statement = () => {
//   const [isModal2, setState2] = useState(false);
//   const [heading, setHeading] = useState('');
//   const [description, setDescription] = useState('');
//   const modalOpen2 = (title, companyName) => {
//     setState2(true);
//     setHeading(title);
//     setDescription(companyName);
//   };
//   const modalClose2 = () => {
//     setState2(false);
//   };

//   const viewModal = () => {
//     const IsOpen = isModal2;
//     return (
//       <TwoButtonModal isModalVisible={IsOpen} modalClose={() => modalClose2()}>
//         <View style={styles.popupMainContainer}>
//           {/* <Image source={props.image} style={styles.circleDollar} /> */}
//           <Text style={[styles.popUpText, {marginBottom: 10}]}> {heading}</Text>
//           <Text
//             style={[styles.popUpText, {fontWeight: '100', marginBottom: 10}]}>
//             {' '}
//             {
//               'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum'
//             }
//           </Text>
//         </View>
//         <View style={styles.popupButtonContainer}>
//           <ButtonWithoutShadow
//             width={width - wp('65%')}
//             height={43}
//             marginTop={22}
//             borderRadius={20}
//             labelColor={colors.white}
//             label="Dismiss"
//             backgroundColor={colors.blue}
//             onAction={() => modalClose2()}
//           />
//         </View>
//       </TwoButtonModal>
//     );
//   };
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.aboveContainer}>
//         <View>
//           <Text style={styles.stockText}>Amazon.com, Inc.</Text>
//           <Text style={styles.stockText1}>Nasdaq: AMZN</Text>
//         </View>

//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <View>
//             <TouchableOpacity>
//               <Image
//                 source={localImages.tag_icon}
//                 style={styles.icon_up}
//                 resizeMode="contain"
//               />
//             </TouchableOpacity>
//           </View>

//           <Image
//             source={localImages.amazon}
//             // style={styles.icon_up}
//             style={{width: 100, height: 100, resizeMode: 'contain'}}
//             // resizeMode="contain"
//           />
//         </View>
//       </View>
//       <View style={styles.smallContainer}>
//         <View>
//           <Image
//             source={localImages.icon_up}
//             style={styles.icon_up}
//             resizeMode="contain"
//           />
//         </View>
//         <View>
//           <Text style={styles.amountText}>$5,656.57</Text>
//         </View>
//         <View>
//           <Text
//             style={[
//               styles.smallText,
//               {color: colors.info_color, marginTop: 10},
//             ]}>
//             +0.73 (+0.52%)
//           </Text>
//         </View>
//       </View>
//       {/* <View style={styles.smallContainer}>
//         <View>
//           <Text style={[styles.smallText, {marginLeft: 25}]}>
//             Closed: 25 Nov, 8:17 am GMT-5 · Disclaimer Pre-market 3,125.06{' '}
//             <Text style={[styles.smallText, {color: colors.info_color}]}>
//               +7.00 (0.22%)
//             </Text>
//           </Text>
//         </View>
//       </View> */}
//       <View>
//         <LineChart
//           data={{
//             labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
//             datasets: [
//               {
//                 data: [
//                   Math.random() * 100,
//                   Math.random() * 100,
//                   Math.random() * 100,
//                   Math.random() * 100,
//                   Math.random() * 100,
//                   Math.random() * 100,
//                 ],
//               },
//             ],
//           }}
//           width={Dimensions.get('window').width - wp('15%')} // from react-native
//           height={220}
//           yAxisLabel="$"
//           yAxisSuffix="k"
//           yAxisInterval={1} // optional, defaults to 1
//           chartConfig={{
//             backgroundColor: colors.authBackGroud,
//             backgroundGradientFrom: colors.authBackGroud,
//             backgroundGradientTo: colors.authBackGroud,
//             decimalPlaces: 2, // optional, defaults to 2dp
//             // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             color: (opacity = 1) => `rgb(0, 93, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgb(0, 93, 255, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: '6',
//               strokeWidth: '2',
//               stroke: 'red',
//             },
//           }}
//           bezier
//           style={{
//             marginVertical: 8,
//             borderRadius: 5,
//             marginTop: hp('5%'),
//           }}
//         />
//       </View>
//       <View style={styles.statsContainer}>
//         <Text style={styles.status}>Stats</Text>
//         <TouchableOpacity onPress={() => modalOpen2('Stats', 'Stats')}>
//           <Image
//             source={localImages.info_blue_circle}
//             style={{
//               height: 15,
//               width: 15,
//               resizeMode: 'contain',
//               marginLeft: 10,
//             }}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.belowContainer}>
//         <View style={styles.firstContainer}>
//           <Text style={styles.listText}>Open</Text>
//           <Text style={styles.listText}>High</Text>
//           <Text style={styles.listText}>Low</Text>
//           <Text style={styles.listText}>52 Wk High</Text>
//           <Text style={styles.listText}>52 Wk Low</Text>
//         </View>
//         <View style={styles.secondContainer}>
//           <Text style={styles.listText}>123.65</Text>
//           <Text style={styles.listText}>124.65</Text>
//           <Text style={styles.listText}>125.65</Text>
//           <Text style={styles.listText}>155.65</Text>
//           <Text style={styles.listText}>15.65</Text>
//         </View>
//         <View style={styles.thirdContainer}>
//           <Text style={styles.listText}>Volume</Text>
//           <Text style={styles.listText}>Avg Vol</Text>
//           <Text style={styles.listText}>Mkt Cap</Text>
//           <Text style={styles.listText}>P/E Ration</Text>
//           <Text style={styles.listText}>Div/Yeild</Text>
//         </View>
//         <View style={styles.fourthContainer}>
//           <Text style={styles.listText}>75.65M</Text>
//           <Text style={styles.listText}>119M.65</Text>
//           <Text style={styles.listText}>2.05T</Text>
//           <Text style={styles.listText}>31.65</Text>
//           <Text style={styles.listText}>0.68</Text>
//         </View>
//       </View>
//       {/* <View style={styles.statsContainer}>
//         <Text style={styles.recentReview}>Recent News</Text>
//       </View> */}
//       {viewModal()}
//     </View>
//   );
// };

const Statement = props => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [isModal2, setState2] = useState(false);
  const [isModal3, setState3] = useState(false);

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [records, setRecords] = useState(null);
  const [news, setNews] = useState(null);
  const [itemTicker, setItemTiecker] = useState('');
  const [tickerImage, setTickerImage] = useState('');
  const [isColorTab, setColorTab] = useState('#082B3C');
  const [isColor, setColor] = useState(`rgb(8, 43, 60, 1)`);

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

  const [newsObject, setNewsObject] = useState(null);
  const modalOpen2 = (title, companyName) => {
    setState2(true);
    setHeading(title);
    setDescription(companyName);
  };

  const modalClose2 = () => {
    setState2(false);
  };

  const modalOpen3 = news => {
    setState3(true);
    setNewsObject(news);
  };

  const modalClose3 = () => {
    setState3(false);
  };

  const viewModal = () => {
    const IsOpen = isModal2;
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
            onAction={() => modalClose2()}
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
        setItemTiecker(props.route.params.symbol);
        console.log(
          'ITicke2',
          JSON.stringify(props.route.params.symbol.symbol),
        );
        setTickerImage(props.route.params.symbol.ticker_image);
        getRecords(props.route.params.symbol);
      }
    }
    if (loadingSpinner == true) {
      props.getLoading(true);
    } else {
      props.getLoading(false);
    }
  }, []);
  const getRecords = item => {
    console.log('Simple hai' + JSON.stringify(item));
    setLoadingSpinner(true);

    const dataToSend = {
      ticker: item.quote != undefined ? item.quote.symbol : item.symbol,
    };

    postAPI('tickerDetail', dataToSend)
      .then(response => {
        if (response.status == 200) {
          setRecords(response.data);

          setTimeout(() => {
            getNewsList(symbol);
          }, 1000);
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
        // ShowToast('Something went Wrong!');
        console.log('err', err);
      });
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

  if (records == null && loadingSpinner == true) {
    return (
      <Spinner
        visible={loadingSpinner}
        cancelable={true}
        indicatorStyle={{color: colors.red}}
      />
    );
  } else {
    //const{}= ticker: item.quote != undefined ? item.quote.symbol : item.quote,
    return (
      <View style={styles.mainContainer}>
        <View style={styles.aboveContainer}>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.stockText, {width: 200}]}>
              {itemTicker.companyName}
            </Text>
            <Text style={styles.stockText1}>{itemTicker.symbol}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image
                //source={localImages.mudani_logo}
                // style={styles.icon_up}
                style={{height: 50, width: 100}}
                source={
                  tickerImage != ''
                    ? {uri: tickerImage}
                    : localImages.mudani_logo
                }
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity onPress={() => modalOpen2('Stats', 'Stats')}>
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
              <Text style={styles.listText}>{records[0].averageVolume30}</Text>
              <Text style={styles.listText}>{records[0].marketCap}</Text>
              <Text style={styles.listText}>
                {records[0].priceEarningRatio}
              </Text>
              <Text style={styles.listText}>{records[0].dividendYield}</Text>
            </View>
          </View>
        ) : null}

        <View style={{alignSelf: 'center', marginBottom: 50, marginTop: 10}}>
          <ButtonWithoutShadow
            width={width - wp('40%')}
            height={43}
            // marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Trade"
            backgroundColor={colors.blue}
            onAction={() =>
              props.navigation.navigate('TrackerScreen', {
                symbol: itemTicker,
              })
            }
          />
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.recentReview}>Recent News</Text>
        </View>
        <View style={styles.belowContainer}>
          <FlatList
            data={news}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => modalOpen3(item)}>
                  <Text style={[styles.listText, {color: colors.blue}]}>
                    {item.headline}
                  </Text>
                </TouchableOpacity>
              );
            }}
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
        {viewModal()}
        {viewModalNews()}
      </View>
    );
  }
};
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 0,
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
    const {symbol} = this.props.route.params;

    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header=" "
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
    marginTop: hp('-2.4%'),
  },
  smallText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    // lineHeight: 30,
    marginLeft: wp('2.08%'),
  },

  aboveContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 10,
  },
  status: {
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: fonts.bold,
    lineHeight: 20,
    paddingLeft: 3,
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
    marginTop: 10,
  },
});
export default Dashboard;
