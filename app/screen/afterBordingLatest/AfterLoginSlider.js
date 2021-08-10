import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ColorPropType,
  Image,
  SafeAreaView,
  ScrollView, TouchableOpacity
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
import {hp, wp} from '../../utils/responsive';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').width;

const Screen = (props) => (
  <View style={{flex: 1, alignItems: 'center',alignSelf :"center"}}>
    <Image
      source={props.image}
      style={{height: 118, width: 118, marginTop: SCREEN_HEIGHT / 4.4,alignSelf : "center"}}
      resizeMode = "stretch"
    />
    <Text style={styles.headingText}>{props.text}</Text>
    <Text numberOfLines={3} style={styles.descriptionText}>
      {props.descriptionText}
    </Text>
  </View>
);

export default class App extends Component {
  SCREENS = [
    <Screen
      text="Welcome to Mudani"
      image={localImages.home_screen_logo}
      descriptionText={
        'Lorem ipsum dolor sit amet.'
      }
    />,
    <Screen  text="Welcome to Mudani"
    image={localImages.home_screen_logo}
    descriptionText={
      'Lorem ipsum dolor sit amet.'
    }
    />,
    <Screen  text="Welcome to Mudani"
    image={localImages.home_screen_logo}
    descriptionText={
      'Lorem ipsum dolor sit amet.'
    }
    />,
    <Screen  text="Welcome to Mudani"
    image={localImages.home_screen_logo}
    descriptionText={
      'Lorem ipsum dolor sit amet.'
    }
     />,
     <Screen  text="Welcome to Mudani"
     image={localImages.home_screen_logo}
     descriptionText={
       'Lorem ipsum dolor sit amet.'
     }
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
      <SafeAreaView style = {{flex : 1,backgroundColor : colors.authBackGroud}}>
          <ScrollView>
          <View style={styles.container}>
        <Carousel
        autoplay
        enableMomentum = {false}
        lockScrollWhileSnapping = {true}
          ref={(ref) => (this.carouselRef = ref)}
          data={this.SCREENS}
          renderItem={({item}) => item}
          onSnapToItem={(i) => this.setState({activeTab: i})}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          slideStyle={{width: SCREEN_WIDTH,height : hp("65%")}}
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
        <View style={{marginBottom: hp("3.3"), alignSelf: 'center'}}>
          <ButtonWithoutShadow
            width={SCREEN_WIDTH - 130}
            height={43}
            marginTop={22}
            borderRadius={20}
            labelColor={colors.white}
            label="Get Started"
            backgroundColor={colors.blue}
            onAction = {()=>this.props.navigation.navigate("AfterLoginCarousel")}
          />
        </View>
        <TouchableOpacity onPress = {()=>this.props.navigation.navigate("LoginScreen")}> 
      <Text style={styles.buttonText}>Log in</Text>
    </TouchableOpacity>
      </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ww: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.blue,
  },
  ww1: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: colors.authBackGroud,
  },
  tabBar: {
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
    lineHeight: 20,
    textAlign: 'center',
  },
});
