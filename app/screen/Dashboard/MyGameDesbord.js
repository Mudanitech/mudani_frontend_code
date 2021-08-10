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
  ImageBackground,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HomeHeader, ButtonWithoutShadow} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {SearchTextInput} from './../../component/InputBox';
import Spinner from './../../utils/Loader';
import {getAPI, postAPI} from './../../utils/Api';
import ShowToast from '../../component/Toast';
import DataManager from './../../utils/DataManager';

class MyGameDesbord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentPosition: 2,
      userId: '',
      ItemSearch: '',
      list: null,
      loadingSpinner: true,
      themeticBasketList: null,
      arrayholder: [],
      arrayholder1: [],
      news: null,
      stocksData: [
        {
          name: 'A',
        },
        {
          name: 'A',
        },
        {
          name: 'A',
        },
        {
          name: 'A',
        },
        {
          name: 'A',
        },
        {
          name: 'A',
        },
        {
          name: 'A',
        },
        {
          name: 'A',
        },
        {
          name: 'A',
        },
        {
          name: 'A',
        },
      ],
    };
  }

  setPositions = currentPosition => {
    if (currentPosition == 0) {
      this.getTopStock();
    } else if (currentPosition == 1) {
      // this.getThematicBasket();
    } else {
      // this.getNewsList();
    }

    this.setState({currentPosition: currentPosition, ItemSearch: ''});
  };
  componentDidMount = async () => {
    const {list} = this.state;
    var userDetails = await DataManager.getUserDetail();
    userDetails = JSON.parse(userDetails);
    console.log('userDeatils', userDetails._id);
    this.setState({userId: userDetails._id});
  };

  render() {
    const {
      list,
      loadingSpinner,
      themeticBasketList,
      news,
      stocksData,
    } = this.state;
    return (
      <SafeAreaView
        style={[
          CustomStyles.dashboardBoarding,
          {backgroundColor: colors.blue},
        ]}>
        <Spinner
          visible={false}
          cancelable={true}
          indicatorStyle={{color: colors.red}}
        />
        <HomeHeader
          Header="My Games"
          backgroundColor={colors.white}
          labelStyle={styles.labelStyle}
          onActionLeft={() => null}
          rightIcon1={'add_green_icon'}
          rightIcon2={'well_green_icon'}
          firstOnPress={() =>
            this.props.navigation.navigate('WatchListRoundIcon')
          }
          secondOnPress={() => this.props.navigation.navigate('Notifications')}
        />

        <View style={styles.topContainer}>
          <TouchableOpacity
            style={
              this.state.currentPosition == 0
                ? styles.buttons2
                : styles.buttons1
            }
            onPress={() => this.setPositions(0)}>
            <Text
              style={
                this.state.currentPosition == 0
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Games
            </Text>
          </TouchableOpacity>
          <View style={styles.borderSeperator} />
          <TouchableOpacity
            style={
              this.state.currentPosition == 1
                ? styles.buttons4
                : styles.buttons1
            }
            onPress={() => this.setPositions(1)}>
            <Text
              style={
                this.state.currentPosition == 1
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Free Stocks
            </Text>
          </TouchableOpacity>
          <View style={styles.borderSeperator} />
          <TouchableOpacity
            style={
              this.state.currentPosition == 2
                ? styles.buttons3
                : styles.buttons1
            }
            onPress={() => this.setPositions(2)}>
            <Text
              style={
                this.state.currentPosition == 2
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Rewards
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
            <View style={styles.mainContainer}>
              <View>
                {this.state.currentPosition == 0 ? (
                  <View>
                    <FlatList
                      data={list}
                      renderItem={this.renderStock}
                      // ItemSeparatorComponent={() => (
                      //   <View style={styles.rowBorder} />
                      // )}
                      ListEmptyComponent={() => {
                        return (
                          <View
                            style={{
                              marginBottom: 10,
                              marginTop: width / 2,
                              alignItems: 'center',
                            }}>
                            <Text>No Stock Available!</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                ) : this.state.currentPosition == 1 ? (
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 24,
                        color: colors.white,
                        marginTop: width / 15,
                        fontFamily: fonts.regular,
                      }}>
                      Refer a Friend, Both Get a
                    </Text>

                    <Text
                      style={{
                        fontFamily: fonts.bold,
                        fontSize: 30,
                        marginTop: width / 20,
                        color: colors.white,
                      }}>
                      Free Stock
                    </Text>

                    <View style={{}}>
                      <Image
                        source={localImages.game_img}
                        style={{width: width / 1.1, height: width / 1.5}}
                        resizeMode="contain"
                      />
                    </View>

                    <View
                      style={{
                        backgroundColor: '#082b3c',
                        padding: width / 12,
                        borderTopLeftRadius: width / 20,
                        borderTopRightRadius: width / 20,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: fonts.semiBold,
                          color: colors.white,
                        }}>
                        The more friends you refer, the more stocks you will
                        receive
                      </Text>

                      <Text
                        style={{
                          fontFamily: fonts.regular,
                          fontSize: 14,
                          color: colors.white,
                          marginTop: width / 20,
                        }}>
                        Each stock is valued upto $100
                      </Text>

                      <ButtonWithoutShadow
                        width={width - 147}
                        height={43}
                        marginTop={width / 20}
                        borderRadius={20}
                        labelColor={colors.white}
                        label="Continue"
                        backgroundColor={colors.blue}
                        onAction={() => null}
                      />

                      <Text
                        style={{
                          color: '#57ded5',
                          fontSize: 12,
                          fontFamily: fonts.bold,
                          marginTop: width / 20,
                        }}>
                        Terms & Conditions
                      </Text>
                    </View>

                    <View style={{width: '100%', marginTop: width / 20}}>
                      <Text
                        style={{
                          color: '#fafafa',
                          fontFamily: fonts.regular,
                          fontSize: 16,
                        }}>
                        My Invites:
                      </Text>

                      <FlatList
                        renderItem={this.renderStocks}
                        data={stocksData}
                        ListEmptyComponent={() => {
                          return (
                            <View
                              style={[
                                {
                                  marginBottom: 10,
                                  marginTop: width / 2,
                                  alignItems: 'center',
                                },
                              ]}>
                              <Text>No Stocks Available!</Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        width: width / 2,
                        color: colors.white,
                        fontFamily: fonts.bold,
                        fontSize: 35,
                        marginTop: width / 20,
                        textAlign: 'center',
                      }}>
                      Do more. Earn more.
                    </Text>

                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: fonts.regular,
                        color: colors.white,
                        marginTop: width / 20,
                        textAlign: 'center',
                      }}>
                      Earn rewards for everything you do on the app. Complete
                      tasks and reach millstones to redeem real money.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  renderStock = ({item}) => {
    return (
      <View style={[styles.statementContainer, {paddingRight: wp('4%')}]}>
        <View style={styles.stocksContainer}>
          <TouchableOpacity
            onPress={() => alert('On progress')}
            style={{alignItems: 'flex-end', flex: 1}}>
            <Image
              source={localImages.add_square_icon}
              style={styles.arrowRight}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.secondContainer}
          onPress={() =>
            this.props.navigation.navigate('TrackerScreen', {
              symbol: item,
              from: 'search',
            })
          }>
          <View style={styles.imageWidth}>
            <Image
              source={
                item.tickerImage != ''
                  ? {uri: item.tickerImage}
                  : localImages.company_icon
              }
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.textContainerWidth]}>
            <Text
              numberOfLines={1}
              style={[
                styles.itemText1,
                {fontSize: 14, textTransform: 'capitalize'},
              ]}>
              {item.quote != undefined
                ? item.quote.companyName
                : item.companyName}
            </Text>
            <Text numberOfLines={1} style={styles.itemText2}>
              {item.quote != undefined ? item.quote.symbol : item.symbol}
            </Text>
          </View>
          <View>
            <View>
              <View></View>
            </View>
          </View>
          <View style={styles.textContainer3}>
            <Text
              style={[
                styles.itemText1,
                {color: colors.info_color, fontSize: 14},
              ]}>
              $ {item.quote != undefined ? item.quote.ask : item.ask}
            </Text>
            {/* <Text
                  style={[
                    styles.itemText2,
                    {fontSize: wp('3.2%'), color: colors.info_color},
                  ]}>
                  -0.73 (+0.52%)
                </Text> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderStocks = ({item}) => {
    return (
      <TouchableOpacity onPress={() => null}>
        <View
          style={{
            borderRadius: width / 40,
            marginTop: 10,
            backgroundColor: colors.white,
            padding: width / 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.semiBold,
                  color: '#082b3c',
                }}>
                Alison Max
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.regular,
                  color: '#082b3c',
                  marginTop: width / 40,
                }}>
                Abc@gmail.com
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.bold,
                  color: colors.blue,
                }}>
                Completed
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  marginTop: width / 40,
                  fontFamily: fonts.regular,
                  color: '#082b3c',
                }}>
                Referral on 5 September 2020
              </Text>

              <View
                style={{
                  marginTop: width / 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={localImages.checked_light_blue}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
                <Text
                  style={{color: colors.info_color, marginLeft: width / 50}}>
                  Reward Earned
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.white,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    marginLeft: wp('4.7%'),
    marginRight: wp('4.7%'),
    marginTop: hp('1.39%'),
    marginBottom: hp('5%'),
  },

  statementContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp('5%'),

    elevation: 3,
    marginTop: hp('2%'),
    padding: 10,
    width: wp('90%'),
    alignSelf: 'center',
  },
  statementContainer1: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
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
    marginBottom: hp('3.39%'),
    marginTop: hp('5.09%'),
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('4.7%'),
    marginRight: wp('4.7%'),
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
  buttons4: {
    flex: 1,
    //   width: wp('42%'),
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopRightRadius: wp('2%'),
    // borderBottomRightRadius: wp('2%'),
  },
  buttonText1: {
    fontSize: wp('3%'),
    color: colors.grayColor,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
  },
  buttonText2: {
    fontSize: wp('3%'),
    color: colors.white,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    // marginLeft: wp('2.53'),
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
    marginTop: hp('0.7'),
  },
  borderSeperator: {
    height: hp('3'),
    borderWidth: Platform.OS == 'android' ? 0.3 : 0.5,
    borderColor: colors.grayColor,
  },
  rowBorder: {
    width: wp('80%'),
    borderWidth: Platform.OS == 'android' ? 0.25 : 0.5,
    borderColor: colors.grayColor,
    marginTop: 13,
  },
  arrowRight: {
    height: 16,
    width: 16,
  },
  arrowRight1: {
    height: 20,
    width: 20,
    marginLeft: wp('3.46'),
  },
  basket_image: {
    height: hp('12.84'),
    width: hp('12.84'),
    alignSelf: 'center',
    marginTop: hp('2.6%'),
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
    color: colors.blue,
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
    //paddingLeft: wp('4%'),

    //paddingTop: wp('4%'),
  },
  secondContainer: {
    //  flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  textContainerWidth: {width: wp('45%')},
  textContainerWidth1: {width: wp('20.9%')},
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
  textContainer3: {width: wp('23%'), alignItems: 'flex-end'},
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
  PContainer: {
    flex: 1,
    padding: wp('4%'),
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
    width: wp('50%'),
    paddingLeft: wp('3%'),
  },
  widthforItem1: {
    width: wp('30%'),
    alignItems: 'flex-end',
  },
  monthText: {
    fontSize: wp('5.33%'),
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
    paddingTop: hp('0.8'),
    paddingBottom: hp('2.24'),
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
});
export default MyGameDesbord;
