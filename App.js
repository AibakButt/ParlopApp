import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './navigation/index';
import { Provider } from 'react-redux';
import store from './redux/index';

export default function App() {

  const [isFirstTime, setIsFirstTime] = React.useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('isFirstTime')
        if(value !== null) {
          console.log("sdsdfssd",value)
          setIsFirstTime(false);
      
        }
      } catch(e) {
        // error reading value
      }
    }
  
    getData();
   
  });

  return (
      <Provider store={store}>
        <NavigationContainer>
          {/* {
          !isFirstTime
          ? <Register/>
          : <MyTabs />
          }  */}
          <AppStackScreens/>
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
