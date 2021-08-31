import React, { useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './navigation/index';
import { Provider } from 'react-redux';
import store from './redux/index';

import FlashMessage from "react-native-flash-message";

import AppLoading from 'expo-app-loading';
import { Asset, useAssets } from "expo-asset";
// import all used images
const images = [
 
  require("./assets/images/empty-cart.png"),
  require("./assets/images/gift.png"),
  require("./assets/images/illustration1.png"),
  require("./assets/images/illustration2.png"),
  require("./assets/images/illustration3.png"),
  require("./assets/images/no-addon.jpg"),
  require("./assets/images/register-bg.jpg"),
];

function App(props) {

  const [assets, error] = useAssets(images);


  useEffect(() => {

  },[]);


 
  if (!assets) {
    return (
      <AppLoading />
        
    );
  }
 

  return (
      <Provider store={store}>
        <NavigationContainer>
            <AppStackScreens/>
            <FlashMessage position="top" duration={5000}/>
        </NavigationContainer>
      </Provider>
  );
}


export default App;