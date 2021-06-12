import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Register from './../screens/Register';
import Login from '../screens/Login';

const AuthStack = createStackNavigator();
const defaultOptions = {
  headerShown: false
}

function AuthStackScreens() {
    return (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login} options={defaultOptions}/>
        <AuthStack.Screen name="Register" component={Register} options={defaultOptions}/>
    </AuthStack.Navigator>
    );
}

export default AuthStackScreens;