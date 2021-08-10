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
import {HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';

class EarnRewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rewardItem: [
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

  _renderItem = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.white,
          borderRadius: width / 30,
          padding: width / 20,
          marginLeft: width / 20,
          marginRight: width / 20,
          marginTop: width / 20,
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{fontFamily: fonts.bold, fontSize: 12, color: colors.black}}>
            Earned
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 13,
              color: colors.grayText,
              marginTop: width / 60,
            }}>
            One time deposit
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 19,
              color: colors.info_color,
            }}>
            $1.00
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {rewardItem} = this.state;
    return (
      <View
        style={[
          CustomStyles.dashboardBoarding,
          {backgroundColor: colors.blue},
        ]}>
        <SafeAreaView>
          <HeaderWithBack
            Header="Earned Rewards"
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            onActionLeft={() => this.props.navigation.goBack()}
          />

          <FlatList
            renderItem={this._renderItem}
            data={rewardItem}
            contentContainerStyle={{
              paddingBottom: width / 10,
            }}
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
                  <Text>No Earn Reward Available!</Text>
                </View>
              );
            }}
          />
        </SafeAreaView>
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
    marginTop: hp('5.39%'),
  },
  buttons: {
    height: hp('8.84%'),
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    flexDirection: 'row',
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
    marginBottom: hp('1.64%'),
  },
  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('4.53'),
  },
});

export default EarnRewards;
