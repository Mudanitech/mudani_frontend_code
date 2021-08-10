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
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import {HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {Item, Left} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';

export default class WatchList extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
      currentPosition: 0,
      list: [
        {
          type : 'STOCK',
          companyName: 'Amazon',
          value1: '$ 535.76',
          value2: '38 %',
          department: 'Select Power Forward',
          companyImage: localImages.amazon,
        },
        {
          type : 'ETF',
          companyName: 'Amazon',
          value1: '$ 535.76',
          value2: '38 %',
          department: 'Select Small Forward',
          companyImage: localImages.amazon,
        },
        {
          type : 'CRYPTO',
          companyName: 'Amazon',
          value1: '$ 535.76',
          value2: '38 %',
          department: 'Select Power Forward',
          companyImage: localImages.amazon,
        },
        {
          type : 'CRYPTO',
          companyName: 'Amazon',
          value1: '$ 535.76',
          value2: '38 %',
          department: 'Select Small Forward',
          companyImage: localImages.amazon,
        },
        {
          type : 'ETF',
          companyName: 'Amazon',
          value1: '$ 535.76',
          value2: '38 %',
          department: 'Select Power Forward',
          companyImage: localImages.amazon,
        },
        {
          type : 'CRYPTO',
          companyName: 'Amazon',
          value1: '$ 535.76',
          value2: '38 %',
          department: 'Select Small Forward',
          companyImage: localImages.amazon,
        },
      ],
    };
  }

  setPositions = (currentPosition) => {
    this.setState({currentPosition: currentPosition});
  };
  renderWatchListItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.watchListContainer}>
          <Text style={styles.stockText}>{item.type}</Text>
          <Image
            source={localImages.minus_round_icon}
            style={styles.imageSize}
          />
        </View>
        <View style={styles.watchListContainer}>
          <View>
            <Image source={item.companyImage} style={styles.imageIcon} />
          </View>
          <View style={styles.textContainer}>
            <View>
              <Text numberOfLines={2} style={styles.blueText}>
                {item.companyName}
              </Text>
            </View>
            <View>
              <Text style={styles.grayText}>AMZ</Text>
            </View>
          </View>
          <View style={styles.textContainer1}>
            <View>
              <Text style={styles.nubmerText}>{item.value1}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  index % 2 == 0
                    ? localImages.download_red_icon
                    : localImages.upload_green_icon
                }
                style={styles.uploadIcon}
              />
              <Text
                style={
                  index % 2 == 0
                    ? [styles.percentText, {color: colors.red}]
                    : styles.percentText
                }>
                {item.value2}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="Watchlist"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.statementContainer}>
              <FlatList
                data={this.state.list}
                renderItem={this.renderWatchListItem}
              />
              {/* <View style={styles.itemContainer}>
                <Text style={styles.stockText}>Stocks:</Text>
                <View style={styles.watchListContainer}>
                <View>
                    <Image
                      source={localImages.amazon}
                      style={styles.imageIcon}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <View>
                      <Text numberOfLines={2} style={styles.blueText}>
                        Amazon
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.grayText}>AMZ</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer1}>
                    <View>
                      <Text style={styles.nubmerText}>$ 535.76</Text>
                    </View>
                    <View>
                      <Image
                        source={localImages.minus_round_icon}
                        style={styles.imageSize}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.stockText}>Stocks:</Text>
                <View style={styles.watchListContainer}>
                <View>
                    <Image
                      source={localImages.amazon}
                      style={styles.imageIcon}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <View>
                      <Text numberOfLines={2} style={styles.blueText}>
                        Amazon
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.grayText}>AMZ</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer1}>
                    <View>
                      <Text style={styles.nubmerText}>$ 535.76</Text>
                    </View>
                    <View>
                      <Image
                        source={localImages.minus_round_icon}
                        style={styles.imageSize}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.stockText}>Stocks:</Text>
                <View style={styles.watchListContainer}>
                <View>
                    <Image
                      source={localImages.amazon}
                      style={styles.imageIcon}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <View>
                      <Text numberOfLines={2} style={styles.blueText}>
                        Amazon
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.grayText}>AMZ</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer1}>
                    <View>
                      <Text style={styles.nubmerText}>$ 535.76</Text>
                    </View>
                    <View>
                      <Image
                        source={localImages.minus_round_icon}
                        style={styles.imageSize}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.itemContainer2}>
                <Text style={styles.stockText}>Stocks:</Text>
                <View style={styles.watchListContainer}>
                <View>
                    <Image
                      source={localImages.amazon}
                      style={styles.imageIcon}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <View>
                      <Text numberOfLines={2} style={styles.blueText}>
                        Amazon
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.grayText}>AMZ</Text>
                    </View>
                  </View>
                  <View style={styles.textContainer1}>
                    <View>
                      <Text style={styles.nubmerText}>$ 535.76</Text>
                    </View>
                    <View>
                      <TouchableOpacity>
                        <Image
                          source={localImages.minus_round_icon}
                          style={styles.imageSize}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>*/}
            </View>
          </View>
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
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
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
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginBottom: hp('1.4%'),
    padding: wp('4%'),
  },
  stockText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    // marginLeft: wp('5.33%'),
  },
  textContainer: {
    width: wp('30%'),
    alignItems: 'flex-start',
  },
  textContainer1: {
    width: wp('30%'),
    alignItems: 'flex-end',
  },
  watchListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blueText: {
    fontSize: wp('3.73%'),
    color: colors.blue,
    fontFamily: fonts.semiBold,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  grayText: {
    fontSize: wp('3.2%'),
    color: colors.grayColor,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  nubmerText: {
    fontSize: wp('4%'),
    color: colors.info_color,
    fontFamily: fonts.semiBold,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  percentText: {
    fontSize: wp('3.2%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 24,
  },
  imageSize: {
    height: 16.5,
    width: 16.5,
    resizeMode: 'contain',
    marginRight: 4,
    left: 4,
  },
  itemContainer: {
    paddingTop: hp('1.9%'),
    paddingBottom: hp('1.29%'),
    borderBottomWidth: 1,
    borderColor: colors.watchlistBorderColor,
  },
  itemContainer2: {
    paddingTop: hp('1.9%'),
    paddingBottom: hp('3.29%'),
    // borderBottomWidth: 1,
    // borderColor: colors.watchlistBorderColor,
  },
  imageIcon: {height: 70, width: 70, resizeMode: 'contain'},
  uploadIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    marginRight: 4,
  },
});
