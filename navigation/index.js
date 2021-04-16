import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './../screens/Home';
import Bookings from './../screens/Bookings';
import Cart from './../screens/Cart';
import Menu from './../screens/Menu';
import Intro from './../screens/Intro';
import Services from './../screens/Services';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Services" component={Services} />
    </HomeStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator  >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Bookings" component={Bookings} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}

export default MyTabs