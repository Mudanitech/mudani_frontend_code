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
import {ButtonWithoutShadow, HeaderWithBackWhite} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import RadioButtonAccordian from './../../component/RadioButtonAccordian';

const {height, width} = Dimensions.get('window');

class ClientAgreement extends Component {
  constructor(props) {
    super();
    this.state = {
      accountType: [
        {AccountType: 'Individual', text: 'hsdfjkhksjdf'},
        {AccountType: 'Joint', text: 'hsdfjkhksjdf'},
        {AccountType: 'Retirement', text: 'hsdfjkhksjdf'},
      ],
    };
  }

  render() {
    return (
      <>
        <View style={CustomStyles.containerbording}>
          <SafeAreaView>
            <ScrollView style={{flexGrow: 1}}>
              <View style={{flexDirection: 'row'}}>
                <HeaderWithBackWhite
                  backgroundColor={1}
                  Header="Client Agreement"
                  labelStyle={styles.labelStyle}
                />
                {/* <Image
                    source={ localImages.basket}
                    style={{
                      borderRadius: 50,
                      height: 156,
                      width: 156,
                      alignSelf: 'center',
                    }}></Image> */}
              </View>

              <View style={{padding: 29}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontFamily: fonts.bold,
                    // marginTop: 29,
                    marginBottom: 22,
                    // marginHorizontal: 40,
                    fontWeight: '600',
                    // textAlign  : "left"
                  }}>
                  Kindly Review the agreement
                </Text>

                <View style={styles.textContainer}>
                  <Text style={styles.btnText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin nisl ipsum, iaculis eu ipsum vitae, feugiat maximus
                    ex. Curabitur porta sem vehicula nisl mollis, ac volutpat
                    risus fringilla. In dignissim interdum augue, eget tempus
                    purus ornare nec. In at varius nunc. Pellentesque vitae
                    purus lacinia, mattis sapien ac, malesuada arcu. Nunc nisi
                    neque, malesuada nec porttitor ac, cursus eget sapien. Sed
                    tincidunt, leo ut congue fringilla, nisi sem dapibus felis,
                    a rhoncus augue sapien non diam. Morbi molestie metus
                    lectus, vel sodales lectus accumsan sit amet.Nulla commodo
                    sem metus, eu tincidunt diam scelerisque ut. Integer iaculis
                    pulvinar tellus, id tristique dolor iaculis vel. Duis ut
                    convallis sapien. Etiam justo ligula, facilisis a blandit
                    sed, consectetur id massa. Sed tristique leo a ex tempus, a
                    congue velit sagittis. In hac habitasse platea dictumst.
                    Integer non mauris feugiat, venenatis lacus id, faucibus
                    lectus. Proin commodo orci nec erat suscipit, non rhoncus
                    ligula porttitor. Etiam laoreet, augue nec iaculis bibendum,
                    ante justo aliquam nisi, at faucibus lacus velit et metus.
                    Cras vehicula nisi eu est elementum, id pellentesque odio
                    elementum.
                  </Text>
                </View>

                <View
                  style={{
                   // marginHorizontal: 40,
                   // marginTop: 131,
                    marginBottom: 50,
                    alignSelf : "center",
                    flexDirection : "row",
                    justifyContent : "space-between"
                  }}>
                       <ButtonWithoutShadow
                    width={width - 250}
                    height={55}
                    marginTop={22}
                    borderRadius={20}
                    labelColor={colors.blue}
                    label="Disagree"
                    backgroundColor={colors.light_blue}
                  />
                  <ButtonWithoutShadow
                    width={width - 250}
                    height={55}
                    marginTop={22}
                    borderRadius={20}
                    labelColor={colors.white}
                    label="Agree"
                    backgroundColor={colors.blue}
                    marginLeft = {10}
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  accordianTextContainer: {
    marginTop: 166,
    //flex : 1,
    // height : "60%",
    alignSelf: 'center',
    marginBottom: 23,
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
    width: '100%',
    alignSelf: 'center',
  },
  createBasketBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  createBasketBtn1: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 29,
    width: '80%',
  },
  btnInsideView: {
    backgroundColor: '#e0eef8',
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  circleText: {
    fontSize: 15,
    color: '#2b8ecd',
    fontFamily: fonts.regular,
  },
  btnText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,

    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: colors.white,
    padding: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderRadius: 10,
    elevation: 7,
  },
  labelStyle: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.bold,
    // marginTop: 54,
    marginHorizontal: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ClientAgreement;
