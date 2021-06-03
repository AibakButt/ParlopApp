import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import IntroStackScreens from './IntroStack';
import MainBottomTabScreens from './MainBottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


const defaultOptions = {
  headerShown: false
}

const AppStack = createStackNavigator();

// const checkFirstVisit = () => {
  
//   const [value, setValue] = useState(false)

//   try {
//     let value = AsyncStorage.getItem('firstVisit')
//     console.log('value',value)
//     if(value === null){
//        AsyncStorage.setItem('firstVisit', "true")
//       value = true
//       console.log("Setting First time to true ")
//     }else{
//        AsyncStorage.setItem('firstVisit', "false")
//       console.log("Setting First time to false ")
//       value = false
//     }
//     console.log('return value', value)
    
//   } catch (error) {
//    console.log('Error in fetching first visit (App.js): ', error)
//   }

  
// }



async function AppStackScreens() {
  
  return (
    <AppStack.Navigator >
      {
      
         checkFirstVisit() ? (
          <AppStack.Screen name="IntroStack" component={IntroStackScreens} options={defaultOptions}/>
        ): (
          <AppStack.Screen name="MainTab" component={MainBottomTabScreens} options={defaultOptions}/>
        )
      }
    </AppStack.Navigator>
  );
}

export default AppStackScreens;

