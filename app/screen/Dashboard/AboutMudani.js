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

export default class AboutMudani extends Component {
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
  render() {
    return (
      <SafeAreaView style={[CustomStyles.dashboardBoarding]}>
        <HeaderWithBack
          Header="About Mudani"
          backgroundColor={1}
          labelStyle={styles.labelStyle}
          onActionLeft={() => null}
        />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.statementContainer}>
              <Text style = {styles.stockText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                nisl ipsum, iaculis eu ipsum vitae, feugiat maximus ex.
                Curabitur porta sem vehicula nisl mollis, ac volutpat risus
                fringilla. In dignissim interdum augue, eget tempus purus ornare
                nec. In at varius nunc. Pellentesque vitae purus lacinia, mattis
                sapien ac, malesuada arcu. Nunc nisi neque, malesuada nec
                porttitor ac, cursus eget sapien. Sed tincidunt, leo ut congue
                fringilla, nisi sem dapibus felis, a rhoncus augue sapien non
                diam. Morbi molestie metus lectus, vel sodales lectus accumsan
                sit amet.Nulla commodo sem metus, eu tincidunt diam scelerisque
                ut. Integer iaculis pulvinar tellus, id tristique dolor iaculis
                vel.</Text>
                <Text style = {[styles.stockText,{marginTop : hp("2%")}]}>
                    Duis ut convallis sapien. Etiam justo ligula, facilisis a
                blandit sed, consectetur id massa. Sed tristique leo a ex
                tempus, a congue velit sagittis. In hac habitasse platea
                dictumst. Integer non mauris feugiat, venenatis lacus id,
                faucibus lectus. Proin commodo orci nec erat suscipit, non
                rhoncus ligula porttitor. Etiam laoreet, augue nec iaculis
                bibendum, ante justo aliquam nisi, at faucibus lacus velit et
                metus. Cras vehicula nisi eu est elementum, id pellentesque odio
                elementum.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Proin nisl ipsum, iaculis eu ipsum vitae, feugiat maximus
                ex. Curabitur porta sem vehicula nisl mollis, ac volutpat risus
                fringilla. In dignissim interdum augue, eget tempus purus ornare
                nec. In at varius nunc. Pellentesque vitae purus lacinia, mattis
                sapien ac, malesuada arcu. Nunc nisi neque, malesuada nec
                porttitor ac, cursus eget sapien. Sed tincidunt, leo ut congue
                fringilla, nisi sem dapibus felis, a rhoncus augue sapien non
                diam. Morbi molestie metus lectus, vel sodales lectus accumsan
                sit amet.
              </Text>
              <Text style = {[styles.stockText,{marginTop : hp("2%")}]}>
                Nulla commodo sem metus, eu tincidunt diam scelerisque ut.
                Integer iaculis pulvinar tellus, id tristique dolor iaculis vel.
                Duis ut convallis sapien. Etiam justo ligula, facilisis a
                blandit sed, consectetur id massa. Sed tristique leo a ex
                tempus, a congue velit sagittis. In hac habitasse platea
                dictumst. Integer non mauris feugiat, venenatis lacus id,
                faucibus lectus. Proin commodo orci nec erat suscipit, non
                rhoncus ligula porttitor. Etiam laoreet, augue nec iaculis
                bibendum, ante justo aliquam nisi, at faucibus lacus velit et
                metus. Cras vehicula nisi eu est elementum, id pellentesque odio
                elementum.
              </Text>
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
    marginBottom: hp('5%'),
    padding: wp('4%'),
  },
  stockText: {
    fontSize: wp('3.73%'),
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
    textAlign: 'left',
  },
});
