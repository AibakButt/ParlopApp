import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import IntroStackScreens from './IntroStack';
import MainBottomTabScreens from './MainBottomTabs';

const defaultOptions = {
  headerShown: false
}

const AppStack = createStackNavigator();

function AppStackScreens() {
  return (
    <AppStack.Navigator >
      <AppStack.Screen name="MainTab" component={MainBottomTabScreens} options={defaultOptions}/>
      <AppStack.Screen name="IntroStack" component={IntroStackScreens} options={defaultOptions}/>
    </AppStack.Navigator>
  );
}

export default AppStackScreens;

