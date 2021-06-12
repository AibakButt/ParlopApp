import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import IntroStackScreens from './IntroStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStackScreens from './MainStack';


const defaultOptions = {
  headerShown: false
}

const AppStack = createStackNavigator();




function AppStackScreens() {

  const [firstTime, setFirstTime] = useState(true);
  
  useEffect(() => {
    const checkFirstVisit = async () => {
      try {
        const value = await AsyncStorage.getItem('firstTime')
        console.log("firstTime fetched value (if true means, app opening first time): ", value)
        if(value == null) {
          console.log("first_time", value)
          AsyncStorage.setItem('firstTime',"true")
          setFirstTime(true);
      
        }
        else if(value == "true"){
          console.log("Not first time", value)
          setFirstTime(false)
        }
      } catch(e) {
        // error reading value
        console.log("Error fetching first time from local storage",error)
      }
    }
  
    checkFirstVisit();
   
  },[]);

  return (
    <AppStack.Navigator >
        { firstTime && <AppStack.Screen name="IntroStack" component={IntroStackScreens} options={defaultOptions}/> }
        { !firstTime && <AppStack.Screen name="MainTab" component={MainStackScreens} options={defaultOptions}/> }
    </AppStack.Navigator>
  );
}

export default AppStackScreens;

