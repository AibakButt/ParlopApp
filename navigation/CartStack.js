import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './../screens/Cart';
import ScheduleOrder from './../screens/ScheduleOrder';
import OrderSummary from './../screens/OrderSummary';
import OrderPlaced from './../screens/OrderPlaced';

const CartStack = createStackNavigator();

function CartStackScreens() {
    return (
      <CartStack.Navigator>
        <CartStack.Screen name="Cart" component={Cart} options={{
            headerShown: false
        }}/>
        <CartStack.Screen name="ScheduleOrder" component={ScheduleOrder} />
        <CartStack.Screen name="OrderSummary" component={OrderSummary} />
        <CartStack.Screen name="OrderPlaced" component={OrderPlaced} />
      </CartStack.Navigator>
    );
}

export default CartStackScreens;