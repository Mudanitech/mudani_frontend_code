import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
const {height, width} = Dimensions.get('window');
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';
import {TwoButtonModal} from './../../component/confirmModal';

import {hp, wp} from '../../utils/responsive';

class ChooseGameMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromActivity: '',
      IsOpen: false,
      periodTime: '',
    };
  }
  componentDidMount = () => {
    const {from} = this.props.route.params;
    this.setState({fromActivity: from});
    if (from != 'green_red') {
      var data = [
        {
          piriod: 'Daily',
          time: '$1.00 Entry Fee',
          borderColor: colors.info_color,
          isSelected: false,
        },
        {
          piriod: 'Weekly',
          time: '$5.00 Entry Fee',
          borderColor: colors.blue,
          isSelected: false,
        },
        {
          piriod: 'Monthly',
          time: '$10.00 Entry Fee',
          borderColor: colors.black,
          isSelected: false,
        },
      ];
      this.setState({periodTime: data});
    } else {
      var data = [
        {
          piriod: 'Weekly',
          time: '$5.00 Entry Fee',
          borderColor: colors.blue,
          isSelected: false,
        },
      ];
      this.setState({periodTime: data});
    }
  };
  playNewFree = () => {
    const {fromActivity} = this.state;
    if (fromActivity == 'green_red') {
      this.props.navigation.navigate('MyGame2');
    } else {
      this.props.navigation.navigate('MyGameSFL');
    }
  };

  playNow = () => {
    this.setState({IsOpen: true});
  };

  modalClose = () => {
    this.setState({IsOpen: false});
  };

  modalClose2 = () => {
    const {fromActivity} = this.state;
    const {navigate} = this.props.navigation;
    this.setState({IsOpen: false});

    navigate('DepositScreen', {from: fromActivity});
  };

  onItemClick = (item, index) => {
    const {periodTime} = this.state;
    var localData = Object.assign([], periodTime);

    for (var i = 0; i < localData.length; i++) {
      localData[i].isSelected = false;
    }
    localData[index].isSelected = true;

    this.setState({
      periodTime: localData,
    });
  };
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.onItemClick(item, index)}
        style={{
          width: width / 1.3,
          marginTop: width / 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: item.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            padding: width / 50,
          }}>
          <Image
            source={
              !item.isSelected
                ? localImages.unselect
                : localImages.active_radio_button
            }
            style={{
              height: width / 16,
              width: width / 16,
              marginRight: width / 20,
              marginLeft: width / 5,
            }}
            resizeMode="contain"
          />

          <View
            style={{
              width: '100%',
              height: width / 7,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.semiBold,
                color: colors.black,
              }}>
              {item.piriod}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.regular,
                color: colors.blue,
                marginTop: width / 40,
              }}>
              {item.time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {fromActivity, IsOpen, periodTime} = this.state;
    console.log(fromActivity);
    return (
      <View
        style={[
          CustomStyles.dashboardBoarding,
          fromActivity == 'green_red'
            ? {backgroundColor: colors.blue}
            : {backgroundColor: '#082b3c'},
        ]}>
        <SafeAreaView>
          <HeaderWithBack
            Header="Choose a Game Mode"
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            onActionLeft={() => this.props.navigation.goBack()}
          />
          <ScrollView
            contentContainerStyle={{paddingBottom: 60}}
            style={{flexGrow: 1}}>
            <View style={styles.mainContainer}>
              <View style={styles.viewStyle}>
                <Image
                  source={localImages.public_icon}
                  style={{height: width / 8, width: width / 8}}
                  resizeMode="contain"
                />
                <Text style={[styles.buttonText, {marginTop: width / 15}]}>
                  Just for Fun
                </Text>

                <View style={styles.freeView}>
                  <Text style={styles.buttonText}>Free</Text>
                </View>

                <View style={styles.iteliciew}>
                  <Image
                    source={localImages.ticks}
                    style={{
                      height: width / 18,
                      width: width / 18,
                      marginRight: width / 50,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.lineView}>Up to 5 players</Text>
                </View>
                <View style={styles.iteliciew}>
                  <Image
                    source={localImages.ticks}
                    style={{
                      height: width / 18,
                      width: width / 18,
                      marginRight: width / 50,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.lineView}>Up to 15 players</Text>
                </View>
                <ButtonWithoutShadow
                  width={width / 2}
                  height={43}
                  marginTop={width / 15}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Play Now"
                  backgroundColor={colors.info_color}
                  onAction={() => this.playNewFree()}
                />
              </View>
              <View style={styles.viewStyle}>
                <Image
                  source={localImages.crancy}
                  style={{height: width / 8, width: width / 8}}
                  resizeMode="contain"
                />
                <Text style={[styles.buttonText, {marginTop: width / 15}]}>
                  Just for Fun
                </Text>

                <View style={styles.freeView}>
                  <Text style={styles.buttonText}>
                    {fromActivity == 'green_red'
                      ? 'Entry Fee Starting at $2.50'
                      : 'Entry Fee Starting at $1.00'}
                  </Text>
                </View>

                <View style={styles.iteliciew}>
                  <Image
                    source={localImages.ticks}
                    style={{
                      height: width / 18,
                      width: width / 18,
                      marginRight: width / 50,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.lineView}>Up to 1000 players</Text>
                </View>
                <View style={styles.iteliciew}>
                  <Image
                    source={localImages.ticks}
                    style={{
                      height: width / 18,
                      width: width / 18,
                      marginRight: width / 50,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.lineView}>Up to 1 years</Text>
                </View>
                <View style={styles.iteliciew}>
                  <Image
                    source={localImages.ticks}
                    style={{
                      height: width / 18,
                      width: width / 18,
                      marginRight: width / 50,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.lineView}>Custom Game Title</Text>
                </View>
                <View style={styles.iteliciew}>
                  <Image
                    source={localImages.ticks}
                    style={{
                      height: width / 18,
                      width: width / 18,
                      marginRight: width / 50,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.lineView}>Custom Admin Control</Text>
                </View>
                <ButtonWithoutShadow
                  width={width / 2}
                  height={43}
                  marginTop={width / 15}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Play Now"
                  backgroundColor={colors.blue}
                  onAction={() => this.playNow()}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <TwoButtonModal
          isModalVisible={IsOpen}
          modalClose={() => this.modalClose()}>
          <View style={styles.popupMainContainer}>
            <Text style={styles.popUpText}>Select Entries:</Text>
            <View
              style={{
                alignItems: 'center',
                width: wp('80%'),
                marginTop: 10,
              }}>
              <FlatList renderItem={this._renderItem} data={periodTime} />
            </View>
          </View>
          <View style={styles.popupButtonContainer}>
            <ButtonWithoutShadow
              width={width - wp('65%')}
              height={43}
              marginTop={22}
              borderRadius={20}
              labelColor={colors.white}
              label="Next"
              backgroundColor={colors.blue}
              onAction={() => this.modalClose2()}
            />
          </View>
        </TwoButtonModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.white,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  mainContainer: {
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
    //  marginTop: hp('5.39%'),
  },
  viewStyle: {
    backgroundColor: colors.white,
    width: width / 1.1,
    //height: width,
    marginBottom: width / 30,
    paddingTop: width / 10,
    paddingBottom: width / 10,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  freeView: {
    backgroundColor: colors.light_green,
    width: '100%',
    marginTop: width / 12,

    height: width / 6,
    justifyContent: 'center',

    alignItems: 'center',
  },
  lineView: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  iteliciew: {
    marginTop: width / 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2.1,
  },
  popupButtonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  popupMainContainer: {
    alignItems: 'center',
  },
  popUpText: {
    fontSize: 16,
    color: colors.grayText,
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
});

// // export default StartYourSignUpJourney1

export default ChooseGameMode;
