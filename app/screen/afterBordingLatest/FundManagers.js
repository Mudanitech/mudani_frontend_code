import React, {Component, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts, localImages} from '../../utils/constant';
import {hp, wp} from './../../utils/responsive';
const {height, width} = Dimensions.get('window');
import {CustomStyles} from '../style/CustomStyles';
import Dropdown from '../../component/Picker2';
import {HeaderWithBack, ButtonWithoutShadow} from '../../component/Button';

export default class CustomizedPortfolio extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={CustomStyles.containerbording}>
        <HeaderWithBack
          Header="Fund Managers"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View style={{flex: 1, width: '100%'}}>
            <View style={styles.ageContainer}>
              <View style={styles.ageSubContainer}>
                <View style={styles.conditionContainer}>
                  <Text style={styles.yearText}>PIMCO</Text>
                  <Text style={[styles.yearText, {color: colors.blue}]}>
                    38%
                  </Text>
                </View>
                <Text style={styles.paratext}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
                  erat sit amet elementum. Donec efficitur justo vitae molestie
                  feugiat. Pellentesque vestibulum .
                </Text>
              </View>
              <View style={styles.ageSubContainer}>
                <View style={styles.conditionContainer}>
                  <Text style={styles.yearText}>PIMCO</Text>
                  <Text style={[styles.yearText, {color: colors.blue}]}>
                    38%
                  </Text>
                </View>
                <Text style={styles.paratext}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
                  erat sit amet elementum. Donec efficitur justo vitae molestie
                  feugiat. Pellentesque vestibulum .
                </Text>
              </View>
              <View style={styles.ageSubContainer}>
                <View style={styles.conditionContainer}>
                  <Text style={styles.yearText}>PIMCO</Text>
                  <Text style={[styles.yearText, {color: colors.blue}]}>
                    38%
                  </Text>
                </View>
                <Text style={styles.paratext}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  interdum neque sed diam imperdiet mollis. Sed ornare imperdiet
                  erat sit amet elementum. Donec efficitur justo vitae molestie
                  feugiat. Pellentesque vestibulum .
                </Text>
              </View>
            </View>
          </View>

          <View style={{alignSelf: 'center'}}>
            <ButtonWithoutShadow
              marginBottom={hp('5.84%')}
              width={228}
              height={43}
              borderRadius={20}
              labelColor={colors.white}
              label="Next"
              backgroundColor={colors.blue}
              onAction={() =>
                this.props.navigation.navigate('StartYourSignUpJourney1')
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 24,
  },
  ageContainer: {
    flex: 1,
    marginLeft: 29,
    marginRight: 29,
    marginTop: 20,
     marginBottom: 135,
  },
  oldText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.semiBold,
    lineHeight: 21,
  },
  ageSubContainer: {
    flex: 1,
    padding: 19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 22,
   
  },
  conditionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  yearText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  mainContainer: {
    flex: 1,
    marginLeft: wp('7.7%'),
    marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
  },

  paratext: {
    fontSize: 13,
    fontFamily: fonts.regular,
    lineHeight: 20,
    color: colors.black,
  },
});
