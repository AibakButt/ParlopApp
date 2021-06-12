import React, { useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './navigation/index';
import { Provider } from 'react-redux';
import store from './redux/index';

import FlashMessage from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function App() {

  const [firstTime, setFirstTime] = useState(true);
  const [isReady, setIsReady] = useState(true);
  const [assets, error] = useAssets(images);


  // useEffect(() => {
  //   const checkFirstVisit = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('firstTime')
  //       console.log("fetched valued", value)
  //       if(value == null) {
  //         console.log("first_time", value)
  //         AsyncStorage.setItem('firstTime',"true")
  //         setFirstTime(true);
      
  //       }
  //       else if(value == "true"){
  //         console.log("Not first time", value)
  //         setFirstTime(false)
  //       }
  //     } catch(e) {
  //       // error reading value
  //       console.log("Error fetching first time from local storage",error)
  //     }
  //   }
  
  //   checkFirstVisit();
   
  // },[]);


 
  if (!assets) {
    return (
      <AppLoading />
        
    );
  }
 

  return (
      <Provider store={store}>
        <NavigationContainer>
            <AppStackScreens/>
            <FlashMessage position="top" />
        </NavigationContainer>
      </Provider>
  );
}
