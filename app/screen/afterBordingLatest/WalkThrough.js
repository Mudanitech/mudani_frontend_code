import React, {Component} from 'react';
import {SafeAreaView, View, Text, Dimensions, StyleSheet, ScrollView,
  TouchableHighlight,
  TouchableOpacity,} from 'react-native';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts} from '../../utils/constant';
import { hp } from '../../utils/responsive';
import {CustomStyles} from '../style/CustomStyles';
import Accordian from './../../component/Accordian';

const {height, width} = Dimensions.get('window');

class WalkThrough extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <SafeAreaView style={CustomStyles.containerbording}>
          <HeaderWithBack backgroundColor={1} onActionLeft = {()=>this.props.navigation.navigate("LinkYourAccount")}/>
          <ScrollView>
            <View>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: 22,
                  fontFamily: fonts.bold,
                  marginTop: 20,
                  marginHorizontal: 40,
                  fontWeight: '600',
                }}>
                What are you interested in?
              </Text>
              <View style={styles.accordianTextContainer}>
                <View style={styles.accordianPadding}>
                  <Accordian
                    title={'Self Directed Account'}
                    data={
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus id felis non mollis. Mauris quis mattis velit. Donec at mi sapien. Sed hendrerit tincidunt ligula, at tempor purus vehicula in. Cras facilisis, diam dignissim porta consequat, lectus leo ullamcorper urna, tempor consectetur nunc odio in arcu. Morbi vitae tortor dolor.'
                    }></Accordian>
                </View>
                <View style={styles.viewSeparator} />
                <View style={styles.accordianPadding}>
                  <Accordian
                    title={'Managed Account'}
                    data={
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus id felis non mollis. Mauris quis mattis velit. Donec at mi sapien. Sed hendrerit tincidunt ligula, at tempor purus vehicula in. Cras facilisis, diam dignissim porta consequat, lectus leo ullamcorper urna, tempor consectetur nunc odio in arcu. Morbi vitae tortor dolor.'
                    }></Accordian>
                </View>
                <View style={styles.viewSeparator} />
                <View style={styles.accordianPadding}>
                  <Accordian
                    title={'Dual Journey Account'}
                    data={
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus id felis non mollis. Mauris quis mattis velit. Donec at mi sapien. Sed hendrerit tincidunt ligula, at tempor purus vehicula in. Cras facilisis, diam dignissim porta consequat, lectus leo ullamcorper urna, tempor consectetur nunc odio in arcu. Morbi vitae tortor dolor.'
                    }></Accordian>
                </View>
              </View>
            </View>
            <View style={{marginHorizontal: 40, marginTop: hp("30%")}}>
              <ButtonWithoutShadow
                width={width - 80}
                height={43}
                marginTop={22}
                borderRadius={20}
                labelColor={colors.white}
                label="Next"
                backgroundColor={colors.blue}
                onAction = {()=>this.props.navigation.navigate("SelectAccountType")}
              />
            </View>
            <View style={styles.accordianTextContainer}>
              <TouchableOpacity onPress = {()=>this.props.navigation.navigate("HelpMeDecide2")}>
                <Text style={styles.footerText}>Help Me Decide</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 50,
    // flex : 1,
  },
  footerText: {
    //width: width - 40,
    height: 27,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    // marginTop:50,
    //marginStart:40,
    //marginEnd:40,
    color: '#72e2db',
    textAlign: 'center',
  },
  accordianPadding: {
    paddingTop: 8,
    // paddingBottom : 4,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '80%',
    alignSelf: 'center',
  },
});

export default WalkThrough;
