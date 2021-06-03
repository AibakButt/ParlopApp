import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './../screens/Intro';
import Register from './../screens/Register';
import MainBottomTabScreens from './MainBottomTabs';
import Login from '../screens/Login';

const IntroStack = createStackNavigator();
const defaultOptions = {
  headerShown: false
}

function IntroStackScreens() {
    return (
      <IntroStack.Navigator>
        <IntroStack.Screen name="Intro" component={Intro} options={defaultOptions} />
        <IntroStack.Screen name="Register" component={Register} options={defaultOptions}/>
        <IntroStack.Screen name="Login" component={Login} options={defaultOptions}/>
        <IntroStack.Screen name="MainTab" component={MainBottomTabScreens} options={defaultOptions}/>
      </IntroStack.Navigator>
    );
}

export default IntroStackScreens;