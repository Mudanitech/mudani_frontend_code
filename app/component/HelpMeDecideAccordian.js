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
const {height, width} = Dimensions.get('window');
import {hp, wp} from './../utils/responsive';

export default class HelpMeDecideAccordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      data1: props.data1,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View style={{marginBottom: 10, borderRadius: 8, alignSelf: 'center'}}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.props.toggleExpand()}>
          <Text numberOfLines={3} style={styles.title}>
            {this.props.title}
          </Text>
          <Image
            source={
              this.props.item.isTrueNo ? localImages.up : localImages.down
            }
            style={{
              borderRadius: 50,
              height: 14,
              width: 14,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}></Image>
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.props.item.isTrueNo && (
          <View style={styles.AccordianTextContainer}>
            <TouchableOpacity onPress={this.props.onClickItemYes}>
              <Text
                style={[
                  styles.accordianText,
                  this.props.item.isTrueYes == null
                    ? {color: 'black'}
                    : this.props.item.isTrueYes
                    ? {color: 'black'}
                    : {color: 'black'},
                ]}>
                {this.state.data}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: wp('74%'),
                borderColor: colors.greenColor,
                borderWidth: 0.3,
                alignSelf: 'center',
              }}
            />
            <TouchableOpacity onPress={this.props.onClickItemYes}>
              <Text
                style={[
                  styles.accordianText,
                  this.props.item.isTrueYes == null
                    ? {color: 'black'}
                    : this.props.item.isTrueYes
                    ? {color: 'black'}
                    : {color: 'black'},
                ]}>
                {this.state.data1}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  onClick = index => {
    const temp = this.state.data.slice();
    temp[index].value = !temp[index].value;
    this.setState({data: temp});
  };

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
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
    fontSize: 11.5,
    fontFamily: fonts.regular,
    color: colors.black,
    marginRight: 5,
    width: '90%',
    lineHeight: 14,
  },
  title1: {
    fontSize: 16,
    fontFamily: fonts.regularRoman,
    color: colors.black,
    fontWeight: 'bold',
    marginRight: 5,
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
    borderColor: colors.GREEN,
  },
  btnInActive: {
    borderColor: colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 50,
    width: wp('80.53'),
    paddingLeft: 15,
    marginLeft: 5,
    // marginBottom: 10,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: colors.light_blue,
    padding: 5,
    opacity: 0.4,
  },
  parentHr: {
    color: colors.white,
    width: '100%',
  },
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
    // // flex : 1,
    width: width - 70,
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
  },
});
