import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './navigation/index';
import MyStack from './navigation/index';
import { Provider } from 'react-redux';
import store from './redux/index';
import Register from './screens/Register';

export default function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
          <MyTabs />
          {/* <Register/> */}
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
