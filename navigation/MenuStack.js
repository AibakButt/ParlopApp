import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './../screens/Intro';
import Coupons from './../screens/Coupons';
import FAQS from './../screens/FAQS';
import Settings from './../screens/Settings';
import ContactUs from './../screens/ContactUs';
import Menu from './../screens/Menu';
import Register from './../screens/Register';
import Login from './../screens/Login';
import { theme } from '../constants';

const MenuStack = createStackNavigator();

const defaultOptions = {
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: theme.colors.accent
    }
}

function MenuStackScreens() {
    return (
      <MenuStack.Navigator>
        <MenuStack.Screen name="Menu" component={Menu} options={{...defaultOptions, headerShown: false}}/>
        <MenuStack.Screen name="Intro" component={Intro} options={{...defaultOptions, headerShown: false}} />
        <MenuStack.Screen name="Coupons" component={Coupons} options={defaultOptions}/>
        <MenuStack.Screen name="FAQS" component={FAQS} />
        <MenuStack.Screen name="Settings" component={Settings} options={defaultOptions}/>
        <MenuStack.Screen name="ContactUs" component={ContactUs} options={defaultOptions}/>
        <MenuStack.Screen name="Register" component={Register} options={defaultOptions}/>
        <MenuStack.Screen name="Login" component={Login} options={defaultOptions}/>
       </MenuStack.Navigator>
    );
}


export default MenuStackScreens;