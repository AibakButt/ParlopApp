import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './../screens/Home';
import Bookings from './../screens/Bookings';
import Cart from './../screens/Cart';
import Menu from './../screens/Menu';
import Intro from './../screens/Intro';
import Services from './../screens/Services';
import { theme } from '../constants';
import { Image, TouchableOpacity } from 'react-native';
import Icon from '../components/Icon';
import Svg, { Path } from 'react-native-svg';
import { Block } from '../components';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const headerOptions = {
  headerStyle: {
    height: theme.sizes.base * 4,
    backgroundColor: theme.colors.white, // or 'white
    borderBottomColor: "transparent",
    elevation: 0 // for android
  },


  headerLeftContainerStyle: {
    alignItems: "center",
    marginLeft: theme.sizes.base * 2,
    paddingRight: theme.sizes.base
  },
  headerRightContainerStyle: {
    alignItems: "center",
    paddingRight: theme.sizes.base
  }
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} options={{
        headerShown: false
      }} />
      <HomeStack.Screen name="Services" component={Services} options={headerOptions} />
    </HomeStack.Navigator>
  );
}


const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

  var isSelected = accessibilityState.selected

  if (isSelected) {
      return (
          <Block style={{ flex: 1, alignItems: "center" }}>
              <Block style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                  <Block style={{ flex: 1, backgroundColor: theme.colors.white }}></Block>
                  <Svg
                      width={75}
                      height={61}
                      viewBox="0 0 75 61"
                  >
                      <Path
                          d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                          fill={theme.colors.white}
                          
                      />
                  </Svg>
                  <Block style={{ flex: 1, backgroundColor: theme.colors.white }}></Block>
              </Block>

              <TouchableOpacity
                  style={{
                      top: -22.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                     
                      backgroundColor: theme.colors.white
                  }}
                  onPress={onPress}
              >
                  {children}
              </TouchableOpacity>
          </Block>
      )
  } else {
      return (
          <TouchableOpacity
              style={{
                  flex: 1,
                  height: 60,
                  backgroundColor: theme.colors.white
              }}
              activeOpacity={1}
              onPress={onPress}
          >
              {children}
          </TouchableOpacity>
      )
  }
}


function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      showLabel: true,
      labelStyle:{
        color: theme.colors.accent,
      },
      style: {
        borderTopWidth: 0,
        backgroundColor: 'transparent',
        elevation: 0
      }
    }}  >
      <Tab.Screen name="Home" component={HomeStackScreen} options={
        {
          tabBarIcon: ({focused}) => (
            <Icon
              name='view-dashboard'
              type='materialCommunity'
              size={22}
              color= {focused ? theme.colors.accent : theme.colors.gray}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }
      } />
      <Tab.Screen name="Bookings" component={Bookings} options={
        {
          tabBarIcon: ({focused}) => (
            <Icon
              name='book'
              type='ant'
              size={22}
              color= {focused ? theme.colors.accent : theme.colors.gray}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }
      }/>
      <Tab.Screen name="Cart" component={Cart} options={
        {
          tabBarIcon: ({focused}) => (
            <Icon
              name='cart'
              type='materialCommunity'
              size={22}
              color= {focused ? theme.colors.accent : theme.colors.gray}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }
      }/>
      <Tab.Screen name="Menu" component={Menu} options={
        {
          tabBarIcon: ({focused}) => (
            <Icon
              name='menu'
              type='materialCommunity'
              size={22}
              color= {focused ? theme.colors.accent : theme.colors.gray}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }
      }/>
    </Tab.Navigator>
  );
}

export default MyTabs