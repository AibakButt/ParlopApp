import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './../screens/Cart';
import ScheduleOrder from './../screens/ScheduleOrder';

const CartStack = createStackNavigator();

function CartStackScreens() {
    return (
      <CartStack.Navigator>
        <CartStack.Screen name="Cart" component={Cart} />
        <CartStack.Screen name="Services" component={ScheduleOrder} />
      </CartStack.Navigator>
    );
}

export default CartStackScreens;