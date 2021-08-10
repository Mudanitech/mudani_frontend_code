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
} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../../component/Button';
import {colors, fonts, localImages} from '../../../utils/constant';
import {CustomStyles} from '../../style/CustomStyles';
import {wp, hp} from './../../../utils/responsive';

const {height, width} = Dimensions.get('window');

const Active = () => {
  return (
    <View style={{marginTop: 30}}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Recurring Deposit Amount</Text>
        <Text style={styles.itemText}>$5000</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Date</Text>
        <Text style={styles.itemText}>01/12/2020</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Recurring Times</Text>
        <Text style={styles.itemText}>Twice in Month</Text>
      </View>
      <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 50,
                }}>
                <ButtonWithoutShadow
                  width={width - 146}
                  height={43}
                  marginTop={10}
                  borderRadius={20}
                  labelColor={colors.white}
                  label="Cancel"
                  backgroundColor={colors.black}
                  //   onAction={() => this.props.navigation.navigate('WalkThrough')}
                  onAction={() => null}
                />
              </View>
    </View>
  );
};

const Inactive = () => {
  return (
    <View style={{marginTop: 30}}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Recurring Deposit Amount</Text>
        <Text style={styles.itemText}>$5000</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Date</Text>
        <Text style={styles.itemText}>01/12/2020</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Recurring Times</Text>
        <Text style={styles.itemText}>Twice in Month</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Status</Text>
        <Text style={[styles.itemText,{color : colors.red}]}>Cancelled</Text>
      </View>
    </View>
  );
};
class Recurring1 extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      currentPosition: 0,
    };
  }

  setPositions = (currentPosition) => {
    this.setState({currentPosition: currentPosition});
  };

  showTabs = () => {
    if (this.state.currentPosition == 0) {
      return <Active />;
    } else if (this.state.currentPosition == 1) {
      return <Inactive />;
    }
  };

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack
            backgroundColor={1}
            labelStyle={styles.labelStyle}
            Header={'Recurring Deposit'}
            onActionLeft={() =>
              this.props.navigation.goBack()
            }
          />
          <ScrollView style = {{flex : 1}}>
            <View style={{alignSelf: 'center', marginTop: 75}}>
              <TouchableOpacity
                style={styles.accountButton}
                onPress={() =>
                  this.setState({isOpen: this.state.isOpen ? false : true})
                }>
                <Text
                  style={
                    this.state.isOpen ? styles.activeText : styles.buttonText
                  }>
                  Select An Account
                </Text>
                <Image
                  source={this.state.isOpen ? localImages.up : localImages.down}
                  style={{height: 10, width: 14,resizeMode : "contain",right : 5}}
                />
              </TouchableOpacity>
              {this.state.isOpen ? (
                <View style={styles.hideContainer}>
                  <Text style={styles.itemText}>DU3403460</Text>
                  <Text style={styles.itemText}>A/c Type : Individual</Text>
                  <Text style={styles.itemText}>Balance: $6746.67</Text>
                </View>
              ) : null}
             
              
            </View>
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
                    Active
                  </Text>
                </TouchableOpacity>
                {/* <View style={styles.borderSeperator} /> */}
                <TouchableOpacity
                  style={
                    this.state.currentPosition == 1
                      ? styles.buttons3
                      : styles.buttons1
                  }
                  onPress={() => this.setPositions(1)}>
                  <Text
                    style={
                      this.state.currentPosition == 1
                        ? styles.buttonText2
                        : styles.buttonText1
                    }>
                    Inactive
                  </Text>
                </TouchableOpacity>
              </View>
              <View style = {{flex : 1}}>{this.showTabs()}</View>

          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: wp('4.8%'),
    color: colors.black,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('70%'),
    paddingTop: 10,
    paddingBottom: 10,
    height: 47,
  },
  buttonText: {
    fontSize: wp('4.26%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  activeText: {
    fontSize: wp('4.26%'),
    color: colors.blue,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  itemText: {
    fontSize: wp('3.72%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  hideContainer: {
    // flex: 1,
    padding: 13,
    backgroundColor: colors.white,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: wp('7.7%'),
    // marginRight: wp('7.7%'),
    marginTop: hp('2.39%'),
    borderRadius: wp('2%'),
    borderColor: colors.grayColor,
    borderWidth: 0.4,
    backgroundColor: colors.white,
    width : wp("80%"),
    alignSelf : "center"
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
  itemContainer: {
    flex: 1,
    width: wp('70%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default Recurring1;
