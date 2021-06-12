import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './../screens/Intro';
import MainBottomTabScreens from './MainBottomTabs';
import AuthStackScreens from './AuthStack';

const MainStack = createStackNavigator();
const defaultOptions = {
  headerShown: false
}

function MainStackScreens() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen name="HomeTabs" component={MainBottomTabScreens} options={defaultOptions} />
        <MainStack.Screen name="Intro" component={Intro} options={defaultOptions} />
        <MainStack.Screen name="Auth" component={AuthStackScreens} options={defaultOptions} />
      </MainStack.Navigator>
    );
}

export default MainStackScreens;