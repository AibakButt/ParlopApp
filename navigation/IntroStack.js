import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './../screens/Intro';
import MainBottomTabScreens from './MainBottomTabs';
import AuthStackScreens from './AuthStack';

const IntroStack = createStackNavigator();
const defaultOptions = {
  headerShown: false
}

function IntroStackScreens() {
    return (
      <IntroStack.Navigator>
        <IntroStack.Screen name="Intro" component={Intro} options={defaultOptions} />
        <IntroStack.Screen name="Auth" component={AuthStackScreens} options={defaultOptions} />
        <IntroStack.Screen name="HomeTabs" component={MainBottomTabScreens} options={defaultOptions} />
      </IntroStack.Navigator>
    );
}

export default IntroStackScreens;