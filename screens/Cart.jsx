import React, { useState, useEffect } from "react";
import { Card, Badge, Button, Block, Text } from "../components";
import { connect } from 'react-redux';
import { theme } from "../constants";
import { SafeAreaView, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform, NativeModules } from 'react-native';
import Icon from "../components/Icon";
import {  increaseAddOns , decreaseAddOns, increaseService,decreaseService} from './../redux/actions/cartActions';
import { getCurrentCustomer } from "../redux/actions/authentication";

const { StatusBarManager } = NativeModules;


const Cart = (props) => {

    const [customer, setCustomer] = useState(null)

    useEffect( () => {
        const getCustomer = async () => {
            try {
                setCustomer(await getCurrentCustomer())
            } catch (error) {
                console.log(error)
            }
        }
        getCustomer()
        
    }, []);

    const {cartServices} = props;

    const checkLogin = () => {
        console.log("Customer in cart" , customer)
        if(!customer){
            Alert.alert(
                "Login",
                "You need to login to complete order",
                [
                  {
                    text: "Login",
                    onPress: () => props.navigation.dangerouslyGetParent().dangerouslyGetParent().navigate("Auth", { from: "Cart"})
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                ]
              );
        }
        if(customer){
            props.navigation.navigate("ScheduleOrder")
        }
    }
    
    if(cartServices && cartServices.length === 0 ){
        return(
            <Block center middle flex={1} color={theme.colors.white}> 
                <Image source={require('../assets/images/empty-cart.png')} style={{width: 100, height: 100}} />
                <Text gray center size={20} style={{padding: theme.sizes.base}}>No items in the cart</Text>
            </Block>
        )
    }
    
    return (
        
            <Block flex={1} style={styles.header}>
                <Block flex={1} color={theme.colors.white} style={{borderRadius:12}} margin={[0,10,0,10]} center middle>
                    <Block padding={10} middle center >
                        <Text bold h3>Total Bill: <Text accent h2>Rs. {props.totalBill}</Text></Text>
                    </Block>
                </Block>
                <Block flex={8}  style={{borderRadius:12}} margin={[5,10,0,10]} > 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                        style={{margintop:theme.sizes.base*2, borderRadius:12}}
                    >
                        {
                            cartServices.map( (service, sindex) => (
                                console.log("service",service),
                                <Block key={sindex} color={theme.colors.white} style={{ marginBottom: theme.sizes.base*0.5, borderRadius: 12}}>
                                    <Block row >
                                        <Block flex={6} >
                                            <Block padding={theme.sizes.base} space="around">
                                                <Block color="accent" center middle style={{ alignSelf: 'flex-start',borderRadius: 12, paddingHorizontal:10, paddingVertical: 1}}><Text center white>{service.category &&service.category.name}</Text></Block>
                                                <Block padding={5}><Text>{service && service.name?service.name:''}</Text></Block>
                                                <Block paddingHorizontal={5}><Text accent h2>Rs. {service.price}</Text></Block>
                                            </Block>
                                        </Block>
                                        
                                        <Block flex={4} row center middle>
                                        <TouchableOpacity style={[styles.actionButton, {borderTopLeftRadius: 12, borderBottomLeftRadius: 12}]} onPress={() => {props.decreaseService(sindex)}}>
                                            <Icon
                                                name={'minus'}
                                                type="materialCommunity"
                                                size={20}
                                                color={theme.colors.accent}
                                            />
                                            
                                        </TouchableOpacity>
                                            <Text h2 center style={styles.actionText}>{service.quantity}</Text>
                                            <TouchableOpacity style={[styles.actionButton, {borderTopRightRadius: 12, borderBottomRightRadius: 12}]} onPress={() => {props.increaseService(sindex)}}>
                                                <Icon
                                                    name={'plus'}
                                                    type="materialCommunity"
                                                    size={20}
                                                    color={theme.colors.accent}
                                                />
                                                
                                            </TouchableOpacity>
                                        </Block>
                                    </Block>
                                    {
                                        service.addons.length >= 1 && (
                                            service.addons.map((addon, index) => (
                                                <Block key={index} row padding={[theme.sizes.base * 0.5, theme.sizes.base*3]} >
                                                    <Block flex={7} >
                                                        <Block  space="around">
                                                            <Text>{addon.name}</Text>
                                                            <Text accent h4>Rs. {addon.price}</Text>
                                                        </Block>
                                                    </Block>
                                                    <Block flex={3} row  space="" center middle>
                                                   
                                                        <TouchableOpacity style={[styles.actionButton2, {borderTopLeftRadius: 12, borderBottomLeftRadius: 12}]} onPress={() => {props.decreaseAddOns(index,sindex)}}>
                                                            <Icon
                                                                name={'minus'}
                                                                type="materialCommunity"
                                                                size={16}
                                                                color={theme.colors.accent}
                                                            />
                                                            
                                                        </TouchableOpacity>
                                                    
                                                    <Text h3 center middle style={styles.actionText2}>{addon.quantity}</Text>
                                                   
                                                        <TouchableOpacity style={[styles.actionButton2, {borderTopRightRadius: 12, borderBottomRightRadius: 12}]} onPress={() => {props.increaseAddOns(index,sindex)}}>
                                                                <Icon
                                                                    name={'plus'}
                                                                    type="materialCommunity"
                                                                    size={16}
                                                                    color={theme.colors.accent}
                                                                />
                                                                
                                                        </TouchableOpacity>
                                                   
                                                    </Block>
                                                </Block>
                                            ))
                                        )
                                    }
                                </Block>
                            ))
                        }
                    </ScrollView>
               
                </Block>
                <Block flex={1} style={{marginBottom: theme.sizes.base* 1.5, marginHorizontal: 10}} >
                    <Button onPress={() => checkLogin() } color={theme.colors.accent} style={{borderRadius: 12}}><Text center white bold>Schedule your order</Text></Button>
                </Block>
            </Block>
     
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 25 : StatusBarManager.HEIGHT * 1.5,
        borderRadius: 12,
    },
    actionButton: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.gray2,
        paddingHorizontal: 10,
        
      },
      actionText: {
        height: 45,
        width: 45,
        backgroundColor: theme.colors.gray2,
        paddingTop: theme.sizes.base*0.5,
        
        
      },
    actionButton2: {
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.gray2,
        paddingHorizontal: 10,
        
      },
      actionText2: {
        height: 35,
        width: 35,
        backgroundColor: theme.colors.gray2,
        paddingTop: theme.sizes.base*0.4,
        fontSize: 16
        
      },
  });

const mapStateToProps = (state) => ({
    cartServices: state.cartReducer.cartServices,
    totalBill: state.cartReducer.totalBill
})

const mapDispatchToProps = (dispatch) => ({
    increaseAddOns: (addonIndex, serviceIndex) => increaseAddOns(dispatch,addonIndex,serviceIndex),
    decreaseAddOns: (addonIndex, serviceIndex) => decreaseAddOns(dispatch,addonIndex,serviceIndex),
    increaseService: (serviceIndex) => increaseService(dispatch,serviceIndex),
    decreaseService: (serviceIndex) => decreaseService(dispatch,serviceIndex),
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
