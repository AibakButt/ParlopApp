import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './../screens/Cart';
import ScheduleOrder from './../screens/ScheduleOrder';
import OrderSummary from './../screens/OrderSummary';
import OrderPlaced from './../screens/OrderPlaced';

const CartStack = createStackNavigator();
const options = {
  headerShown: false
}
function CartStackScreens() {
    return (
      <CartStack.Navigator>
        <CartStack.Screen name="Cart" component={Cart} options={options}/>
        <CartStack.Screen name="Schedule Order" component={ScheduleOrder}/>
        <CartStack.Screen name="Order Summary" component={OrderSummary} />
        <CartStack.Screen name="Order Placed" component={OrderPlaced} options={options} />
      </CartStack.Navigator>
    );
}

export default CartStackScreens;