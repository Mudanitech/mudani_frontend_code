import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ColorPropType,
  Image,
  TouchableOpacity
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel'; // 3.6.0
import {
  colors,
  fonts,
  translate,
  staticData,
  localImages,
} from '../../utils/constant';
import {ButtonWithoutShadow, HeaderWithBack} from '../../component/Button';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').width;

const Screen = (props) => (
  <View style={{flex: 1, alignItems: 'center',alignSelf :"center"}}>
    <Image
      source={props.image}
      style={{height: 118, width: 118, marginTop: SCREEN_HEIGHT / 4.4}}
      resizeMode = "stretch"
    />
    <Text style={styles.headingText}>{props.text}</Text>
    <Text numberOfLines={3} style={styles.descriptionText}>
      {props.descriptionText}
    </Text>
    <TouchableOpacity>
      <Text style={styles.buttonText}>{props.buttonText}</Text>
    </TouchableOpacity>
  </View>
);

export default class App extends Component {
  SCREENS = [
    <Screen
      text="Dual-Journey"
      image={localImages.dual_journey}
      descriptionText={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque sed diam.'
      }
      buttonText={'How it works'}
    />,
    <Screen  text="Fractional shares"
    image={localImages.fractional_shares}
    descriptionText={
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque sed diam.'
    }
    buttonText={'Learn more'}
    />,
    <Screen  text="Rewards"
    image={localImages.reward}
    descriptionText={
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque sed diam.'
    }
    buttonText={'Learn more'}
    />,
    <Screen  text="Roundup investing"
    image={localImages.round_up}
    descriptionText={
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque sed diam.'
    }
    buttonText={'Learn more'}
     />,
     <Screen  text="Security"
     image={localImages.security}
     descriptionText={
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum neque sed diam.'
     }
     buttonText={'Learn more'}
      />,
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(ref) => (this.carouselRef = ref)}
          data={this.SCREENS}
          renderItem={({item}) => item}
          onSnapToItem={(i) => this.setState({activeTab: i})}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          slideStyle={{width: SCREEN_WIDTH}}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
        <View style={styles.tabBar}>
          <Pagination
            containerStyle={{backgroundColor: colors.authBackGroud}}
            dotStyle={styles.ww}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            activeDotIndex={this.state.activeTab}
            dotsLength={this.SCREENS.length}
            inactiveDotStyle={styles.ww1}
          />
        </View>
        <View style={{marginBottom: 50, alignSelf: 'center'}}>
          <ButtonWithoutShadow
            width={SCREEN_WIDTH - 110}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Get Started"
            backgroundColor={colors.blue}
            onAction = {()=>this.props.navigation.navigate("StartYourSignUpJourney1")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ww: {
    // top : 50,
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.blue,
  },
  ww1: {
    // top : 50,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    // width : 300,
    height: SCREEN_HEIGHT / 0.7,
    // paddingTop: 40,
    backgroundColor: colors.authBackGroud,
  },
  tabBar: {
    // borderTopWidth : 1,
    // borderColor : '#ddd',
    backgroundColor: colors.authBackGroud,
    width: SCREEN_WIDTH / 10,
    alignSelf: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 50,
    paddingTop: 0,
    paddingBottom: 0,
  },
  headingText: {
    fontSize: 30,
    color: colors.black,
    fontFamily: fonts.semiBold,
    marginTop: SCREEN_HEIGHT / 10,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    width: SCREEN_WIDTH - 110,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 21,
  },
  buttonText: {
    fontSize: 15,
    color: colors.blue,
    fontFamily: fonts.semiBold,
    //width : SCREEN_WIDTH -110,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 21,
    textDecorationLine: 'underline',
  },
});
