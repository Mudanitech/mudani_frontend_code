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
const {height, width} = Dimensions.get('window');
import {HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';
import {Switch} from 'native-base';

export default class MyProfiles extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
    };
  }

  render() {
    return (
      <View style={[CustomStyles.dashboardBoarding]}>
        <SafeAreaView>
          <ScrollView style={{flexGrow: 1}}>
            <HeaderWithBack
              Header="My Profiles"
              backgroundColor={1}
              labelStyle={styles.labelStyle}
              onActionLeft={() => this.props.navigation.goBack()}
            />

            <View style={styles.mainContainer}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.props.navigation.navigate('MyPlans')}>
                <View style={{width: wp('80.2%')}}>
                  <Text style={styles.buttonText}>My Plans</Text>
                </View>
                <Image
                  source={localImages.arrowright}
                  style={{height: 11.8, width: 11.8}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.props.navigation.navigate('MyPortfolio')}>
                <View style={{width: wp('80.2%')}}>
                  <Text style={styles.buttonText}>My Portfolio</Text>
                </View>
                <Image
                  source={localImages.arrowright}
                  style={{height: 11.8, width: 11.8}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.props.navigation.navigate('AccountInfo')}>
                <View style={{width: wp('80.2%')}}>
                  <Text style={styles.buttonText}>My Account Info</Text>
                </View>
                <Image
                  source={localImages.arrowright}
                  style={{height: 11.8, width: 11.8}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
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

// // export default StartYourSignUpJourney1
