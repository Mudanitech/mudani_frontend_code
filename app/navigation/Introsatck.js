import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import IntroScreen from '../screen/onBoarding/IntroScreen'
import SignUp from './../screen/onBoarding/IntroScreen';
//import SignUp from '../screen/onBoarding/SignUp'


const Stack = createStackNavigator();
const Introstack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animationEnabled: false
    }}>
      {/* <Stack.Screen name="IntroScreen" component={IntroScreen} /> */}
      <Stack.Screen name="SignUp" component={SignUp}/>

    </Stack.Navigator>
  );

}

export default Introstack