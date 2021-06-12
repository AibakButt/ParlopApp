import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Bookings from './../screens/Bookings';
import OrderCompleted from './../screens/OrderCompleted';


const BookingsStack = createStackNavigator();

function BookingsStackScreens() {
    return (
      <BookingsStack.Navigator>
        <BookingsStack.Screen name="Bookings" component={Bookings} />
        <BookingsStack.Screen name="OrderCompleted" component={OrderCompleted} />
      </BookingsStack.Navigator>
    );
}

export default BookingsStackScreens;