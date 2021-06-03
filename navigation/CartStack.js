import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './../screens/Cart';
import ScheduleOrder from './../screens/ScheduleOrder';
import OrderSummary from './../screens/OrderSummary';

const CartStack = createStackNavigator();

function CartStackScreens() {
    return (
      <CartStack.Navigator>
        <CartStack.Screen name="Cart" component={Cart} />
        <CartStack.Screen name="ScheduleOrder" component={ScheduleOrder} />
        <CartStack.Screen name="OrderSummary" component={OrderSummary} />
      </CartStack.Navigator>
    );
}

export default CartStackScreens;