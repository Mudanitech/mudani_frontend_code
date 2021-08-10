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
import {HeaderWithBack} from '../../component/Button';
import {hp, wp} from '../../utils/responsive';

const Statement = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Statements</Text>
      </View>
      <View style={styles.statementContainer}>
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Account Statement 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Account Statement 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Account Statement 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Account Statement 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Account Statement 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Account Statement 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Account Statement 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Account Statement 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};
const TaxPackages = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Statements</Text>
      </View>
      <View style={styles.statementContainer}>
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Tax package 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Tax package 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$5</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Tax package 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$4</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Tax package 1</Text>
          </View>
          <Text style={styles.accountNumberText}>$8</Text>

          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Legal = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Documents</Text>
      </View>
      <View style={styles.statementContainer}>
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer2}>
            <Text style={styles.buttonText}>Term & Condition</Text>
          </View>
          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer2}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </View>
          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer2}>
            <Text style={styles.buttonText}>ADV2</Text>
          </View>
          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.rowBorder} />
        <TouchableOpacity style={styles.statementSubContainer}>
          <View style={styles.textContainer2}>
            <Text style={styles.buttonText}>ADV2</Text>
          </View>
          <Image
            source={localImages.arrowright}
            style={styles.arrowRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default class LinkedAccount extends Component {
  constructor() {
    super();
    this.state = {
      isEnable: false,
      currentPosition: 0,
    };
  }

  setPositions = (currentPosition) => {
    this.setState({currentPosition: currentPosition});
  };
  showTabs = () => {
    if (this.state.currentPosition == 0) {
      return <Statement />;
    } else if (this.state.currentPosition == 1) {
      return <TaxPackages />;
    } else if (this.state.currentPosition == 2) {
      return <Legal />;
    }
  };
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="Documents & Statements"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => this.props.navigation.goBack()}
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
              Statement
            </Text>
          </TouchableOpacity>
          <View style={styles.borderSeperator} />
          <TouchableOpacity
            style={
              this.state.currentPosition == 1
                ? styles.buttons2
                : styles.buttons1
            }
            onPress={() => this.setPositions(1)}>
            <Text
              style={
                this.state.currentPosition == 1
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Tax Package
            </Text>
          </TouchableOpacity>
          <View style={styles.borderSeperator} />
          <TouchableOpacity
            style={
              this.state.currentPosition == 2
                ? styles.buttons2
                : styles.buttons1
            }
            onPress={() => this.setPositions(2)}>
            <Text
              style={
                this.state.currentPosition == 2
                  ? styles.buttonText2
                  : styles.buttonText1
              }>
              Legal
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: hp('4.94%'),
  },
  statementSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: hp('3.59%'),
    paddingTop: hp('2.99%'),
  },
  buttonText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
    // marginLeft: wp('4.53'),
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
    marginLeft: wp('5.06%'),
    marginRight: wp('5.06%'),
    marginTop: hp('2.39%'),
    borderRadius: wp('1%'),
    borderColor: colors.grayColor,
    borderWidth: 0.4,
    backgroundColor: colors.white,
  },
  buttons1: {
    width: wp('30%'),
    height: hp('5.84%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons2: {
    width: wp('30%'),
    height: hp('5.84%'),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',

    // marginBottom: hp('1.64%'),
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
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginLeft: wp('0'),
    marginTop: hp('2.2'),
    marginBottom: hp('2.24'),
  },
  borderSeperator: {
    height: 30,
    borderWidth: 0.3,
    borderColor: colors.grayColor,
  },
  rowBorder: {
    width: wp('82%'),
    borderWidth: Platform.OS == 'ios' ? 0.5 : 0.25,
    borderColor: colors.grayColor,
  },
  arrowRight: {
    height: 10,
    width: 10,
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
  textContainer: {
    width: wp('72%'),
  },
  textContainer2: {
    width: wp('79%'),
  },
});
