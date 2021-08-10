import React, {Component} from 'react';
import {
  Image,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {colors, localImages, fonts, translate} from '../utils/constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {wp} from '../utils/responsive';
const {height, width} = Dimensions.get('window');
export default class RadioButtonAccordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  // componentDidMount = () =>{
  //     this.state.data.map((item)=> ({...item}))
  // }
  render() {
    return (
      <View style={{marginBottom: 10, borderRadius: 8, alignSelf: 'center'}}>
        <View style={{width: '100%'}}>
          <FlatList
            data={this.state.data}
            numColumns={1}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              //console.log("item",item)
              <View
                style={{
                  borderBottomWidth: Platform.OS == 'android' ? 0.4 : 0.25,
                  borderBottomColor: colors.grayColor,
                }}>
                <TouchableOpacity
                  style={[
                    styles.childRow,
                    item.value ? styles.btnActive : styles.btnInActive,
                  ]}
                  onPress={() => this.onClick(index)}>
                  {item.value ? (
                    <Image
                      source={localImages.active_radio_button}
                      style={{
                        // borderRadius: 50,
                        height: 20,
                        width: 20,
                        // alignSelf: 'center',
                      }}></Image>
                  ) : (
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 50,
                        borderColor: 'gray',
                        borderWidth: 0.4,
                      }}></View>
                  )}
                  <View style={{width: wp('45%')}}>
                    <Text style={item.value ? styles.title1 : styles.title}>
                      {item.AccountType}
                    </Text>
                  </View>
                  <View style={{width: wp('20%'), alignItems: 'flex-end'}}>
                    <Image
                      source={item.value ? localImages.up : localImages.down}
                      style={{
                        height: 14,
                        width: 14,
                        resizeMode: 'contain',
                      }}></Image>
                  </View>
                </TouchableOpacity>
                {item.value ? (
                  <View style={styles.AccordianTextContainer}>
                    <Text style={styles.accordianText}>{item.text}</Text>
                  </View>
                ) : null}
              </View>
            )}
          />
        </View>

        <View style={styles.parentHr} />
        {}
      </View>
    );
  }

  // onClick = (index) => {
  //   this.setState((prev) => ({
  //     data: prev.data.map((val, i) =>
  //       i === index
  //         ? {...val, value: val.value ? false : true}
  //         : {...val, value: false},
  //     ),
  //   }));
  // };

  onClick = async (index) => {
    this.setState((prev) => ({
      data: prev.data.map((val, i) =>
        i === index
          ? {...val, value: val.value ? false : true,id : i}
          : {...val, value: false},
      ),
    }));
  //  setTimeout(() => {
  //   this.props.getIndex(this.state.data)
  //  }, 2000);
  };

  componentDidUpdate = () =>{
    this.props.getIndex(this.state.data)
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.extraBold,
    color: colors.text,
    marginRight: 5,
    marginLeft: wp('10%'),
  },
  title1: {
    fontSize: 16,
    fontFamily: fonts.extraBold,
    color: colors.blue,
    marginRight: 5,
    marginLeft: wp('8%'),
  },
  itemActive: {
    fontSize: 16,
    color: colors.faqAn,
    fontFamily: fonts.regularRoman,
    marginLeft: 20,
  },
  itemInActive: {
    fontSize: 16,
    color: colors.faqAn,
    fontFamily: fonts.regularRoman,
    marginLeft: 20,
  },
  btnActive: {
    backgroundColor: colors.white,
  },
  btnInActive: {
    backgroundColor: colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 50,
    width: width - 40,
    paddingLeft: 15,
    marginLeft: 5,
    // marginBottom: 10,
    // paddingRight: 18,
    alignItems: 'center',
    backgroundColor: colors.authBackGroud,
    //padding: 5,
  },
  childRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    minHeight: 50,
    width: width - 80,
    paddingLeft: 15,
    // marginLeft: 5,
    // marginBottom: 10,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: colors.authBackGroud,
    padding: 5,
  },
  //   parentHr: {
  //     color: colors.white,
  //     width: '100%',
  //   },
  childHr: {
    height: 1,
    backgroundColor: colors.LIGHTGRAY,
    width: '100%',
  },
  colorActive: {
    borderColor: colors.GREEN,
  },
  colorInActive: {
    borderColor: colors.DARKGRAY,
  },
  AccordianTextContainer: {
    backgroundColor: colors.white,
    // flex : 1,
    width: width - 80,
    alignSelf: 'center',
    padding: 5,
  },
  accordianText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.regularRoman,
    padding: 13,
    lineHeight: 20,
    //marginLeft: 20
    marginLeft: 48,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '100%',
    alignSelf: 'center',
  },
});
