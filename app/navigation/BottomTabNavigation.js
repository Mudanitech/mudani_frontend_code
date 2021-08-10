import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, fonts, localImages} from '../utils/constant';
import {hp, wp} from '../utils/responsive';
import Dashboard from './../screen/Dashboard/Dashboard';
import TransferScreen from './../screen/Dashboard/TransferScreen';
import AboutMudani from './../screen/Dashboard/AboutMudani';
import Search from './../screen/Dashboard/Search';
import MyRewards from './../screen/Dashboard/MyRewards';
import MyAccount from './../screen/Dashboard/MyAccount';

function CustomTabBar(props) {
  const navigateToFirstScreen = () => {
    props.navigation.navigate('Dashboard');
  };

  const navigateToSecondScreen = () => {
    props.navigation.navigate('Search');
  };

  const navigateToThirdScreen = () => {
    props.navigation.navigate('TransferScreen');
  };
  const navigateToFourthScreen = () => {
    props.navigation.navigate('MyRewards');
  };
  const navigateToFifthScreen = () => {
    props.navigation.navigate('MyAccount');
  };
  console.log('Props : ', props);
  return (
    <View style={styles.TabBarMainContainer}>
      <TouchableOpacity
        onPress={navigateToFirstScreen}
        activeOpacity={0.6}
        style={styles.button}>
        <Image
          source={
            props.state.index == 0
              ? localImages.home_icon_active
              : localImages.home_gray_icon
          }
          style={
            props.state.index == 0 ? styles.imageHieght1 : styles.imageHieght
          }
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={{height: 50, backgroundColor: '#fff', width: 2}} />

      <TouchableOpacity
        onPress={navigateToSecondScreen}
        activeOpacity={0.6}
        style={styles.button}>
        <Image
          source={
            props.state.index == 1
              ? localImages.search_active
              : localImages.search_bottom_menu
          }
          style={
            props.state.index == 1 ? styles.imageHieght1 : styles.imageHieght
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToThirdScreen}
        activeOpacity={0.6}
        style={styles.button}>
        <Image
          source={
            props.state.index == 2
              ? localImages.money_active
              : localImages.icon_metro_money
          }
          style={
            props.state.index == 2 ? styles.imageHieght1 : styles.imageHieght
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToFourthScreen}
        activeOpacity={0.6}
        style={styles.button}>
        <Image
          source={
            props.state.index == 3
              ? localImages.trophy_active
              : localImages.trophy
          }
          style={
            props.state.index == 3 ? styles.imageHieght1 : styles.imageHieght
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToFifthScreen}
        activeOpacity={0.6}
        style={styles.button}>
        <Image
          source={
            props.state.index == 4
              ? localImages.profile_active
              : localImages.profile
          }
          style={
            props.state.index == 4 ? styles.imageHieght1 : styles.imageHieght
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function AllTabs() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Dashboard" component={Dashboard} />

      <Tab.Screen name="Search" component={Search} />

      <Tab.Screen name="TransferScreen" component={TransferScreen} />

      <Tab.Screen name="MyRewards" component={MyRewards} />

      <Tab.Screen name="MyAccount" component={MyAccount} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    // <NavigationContainer>
    <AllTabs />
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  TabBarMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: wp('1%'),
    borderColor: colors.grayColor,
    borderWidth: 0.4,

    backgroundColor: colors.white,
    height: Platform.OS == 'ios' ? 50 : 55,
    // top : -15,
    // padding : 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Platform.OS == 'ios' ? 30 : 30,
    paddingBottom: Platform.OS == 'ios' ? 40 : 30,
  },

  button: {
    height: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },

  button1: {
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.info_color,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  imageHieght: {
    height: 25,
    width: 25,
  },
  imageHieght1: {
    height: 45,
    width: 45,
    marginTop: 17,
  },
});
