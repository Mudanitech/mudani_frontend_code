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
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';
import InputBox from '../../component/InputBox';
import {colors, fonts, localImages} from '../../utils/constant';
import {CustomStyles} from '../style/CustomStyles';
import RadioButtonAccordian from './../../component/RadioButtonAccordian';
import {hp, wp} from '../../utils/responsive';
import HelpMeDecideAccordian from './../../component/HelpMeDecideAccordian';
import {color} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

class HelpMeDecide extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [
        {
          faq:
            'Lorem ipsum dolor sit amet ?',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.',
          isOpen : false,
        },
        {
            faq:
              'Lorem ipsum dolor sit amet ?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.',
            isOpen : false,
          },
          {
            faq:
              'Lorem ipsum dolor sit amet ?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.',
            isOpen : false,
          },
          {
            faq:
              'Lorem ipsum dolor sit amet ?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.',
            isOpen : false,
          },
          {
            faq:
              'Lorem ipsum dolor sit amet ?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.',
            isOpen : false,
          },
          {
            faq:
              'Lorem ipsum dolor sit amet ?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.',
            isOpen : false,
          },
          {
            faq:
              'Lorem ipsum dolor sit amet ?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ex facilisis, egestas ligula at, placerat odio. Vestibulum vitae gravida justo. Sed placerat eu odio eu semper. Suspendisse ac tempor eros, eu lobortis massa. Integer sodales tempus erat. Duis in augue justo. Vestibulum suscipit et nulla ut rutrum.',
            isOpen : false,
          },
      ],
    };
  }

  
selectedIndex = (ind)=>{
this.setState({data : this.state.data.map((item,index)=>index == ind ? {...item,isOpen: item.isOpen == false ? true : false}:{...item,isOpen: false})
})
}
  accordianRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity key={index} style={styles.renderItemContainer} onPress = {()=>this.selectedIndex(index)}>
        <View style={styles.renderItemSubContainer}>
          <View style = {styles.faqContainer}>
            <Text style={styles.questionText}>
            {item.faq}
            </Text>
            <Image source = {item.isOpen?localImages.up :localImages.down} style = {styles.updownIcon} />
          </View>
        </View>
        { item.isOpen?<View>
          <Text style={styles.answerText}>{item.details}</Text>
        </View> : null}
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <>
          <SafeAreaView  style={CustomStyles.containerbording}>
            <HeaderWithBack
              backgroundColor={1}
              Header={"FAQ's"}
              labelStyle={styles.labelStyle}
              onActionLeft = {()=>this.props.navigation.goBack()}
            />
            <ScrollView>
              <View style ={{marginTop : 5}}>
                <FlatList
                style = {{margin : wp("2"),marginTop : 30}}
                  data={this.state.data}
                  renderItem={this.accordianRenderItem}
                />
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
    flex: 1,
  },
  viewSeparator: {
    borderColor: '#707070',
    borderWidth: 0.3,
    width: '80%',
    alignSelf: 'center',
  },
  renderItemContainer: {
    alignSelf: 'center',
    width: wp('84.53%'),
    paddingLeft: wp('3%'),
    paddingRight: wp('4%'),
    paddingTop: hp('3.64%'),
    paddingBottom: hp('3.64%'),
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
    borderRadius: wp('1.9%'),
    marginBottom: hp('1.7%'),
  },
  renderItemSubContainer: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: hp('1.79%'),
  },
  labelStyle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  questionText : {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  answerText : {
    fontSize: 14,
    color: colors.grayColor,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginTop : 11,
  },
  updownIcon : {
      height : 15,
      width : 15,
      resizeMode : "contain"
  },
  faqContainer : {
      flex : 1,
      flexDirection : "row",
    //   alignItems : "flex-start",
      justifyContent : "space-between"
  }
});

export default HelpMeDecide;
