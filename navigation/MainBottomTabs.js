import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
import Icon from '../components/Icon';
import Svg, { Path } from 'react-native-svg';
import HomeStackScreens from './HomeStack';
import Bookings from './../screens/Bookings';
import CartStackScreens from './CartStack';
import MenuStackScreens from './MenuStack';
import { Block } from '../components';
import { theme } from '../constants';
import Cart from './../screens/Cart';
import Menu from './../screens/Menu';
import BookingsStackScreens from './BookingsStack';

const MainBottomTabs = createBottomTabNavigator();

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
  


  function MainBottomTabScreens() {
    return (
      <MainBottomTabs.Navigator tabBarOptions={{
        showLabel: false,
        labelStyle:{
          color: theme.colors.accent,
        },
        style: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0
        }
      }}  >
        <MainBottomTabs.Screen name="Home" component={HomeStackScreens} options={
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
        <MainBottomTabs.Screen name="Bookings" component={BookingsStackScreens} options={
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
        <MainBottomTabs.Screen name="Cart" component={CartStackScreens} options={
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
        <MainBottomTabs.Screen name="Menu" component={MenuStackScreens} options={
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
      </MainBottomTabs.Navigator>
    );
  }

  export default MainBottomTabScreens;