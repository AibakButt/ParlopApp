import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './../screens/Intro';
import Register from './../screens/Register';
import MainBottomTabScreens from './MainBottomTabs';

const IntroStack = createStackNavigator();

function IntroStackScreens() {
    return (
      <IntroStack.Navigator>
        <IntroStack.Screen name="Intro" component={Intro} />
        <IntroStack.Screen name="Register" component={Register} />
        <IntroStack.Screen name="MainTab" component={MainBottomTabScreens} />
      </IntroStack.Navigator>
    );
}

export default IntroStackScreens;