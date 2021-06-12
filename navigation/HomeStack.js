import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../constants';
import Home from './../screens/Home';
import Services from './../screens/Services';
import Cart from './../screens/Cart';
import ScheduleOrder from './../screens/ScheduleOrder';
import OrderSummary from './../screens/OrderSummary';
import OrderPlaced from './../screens/OrderPlaced';
import Bookings from './../screens/Bookings';
import OrderCompleted from './../screens/OrderCompleted';
import Coupons from './../screens/Coupons';
import FAQS from './../screens/FAQS';
import Settings from './../screens/Settings';
import ContactUs from './../screens/ContactUs';
import Menu from './../screens/Menu';


const HomeStack = createStackNavigator();
const headerOptions = {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0 // for android
    },
}
const defaultOptions = {
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: theme.colors.accent
  }
}

function HomeStackScreens() {
    return (
      <HomeStack.Navigator>

        <HomeStack.Screen name="Home" component={Home} options={{
            headerShown: false
        }} />
        <HomeStack.Screen name="Services" component={Services} options={headerOptions} />
      </HomeStack.Navigator>
    );
}

export default HomeStackScreens;