import React, { useState } from "react";
import { Card, Badge, Button, Block, Text } from "../components";
import { connect } from 'react-redux';
import { theme } from "../constants";
import { SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform, NativeModules } from 'react-native';
import Icon from "../components/Icon";
const { StatusBarManager } = NativeModules;

const cartService = [{
    _id: "60805765a9b0a300042f7607",
    name: "Whitening facial",
    category: {
        _id: "6080570ca9b0a300042f7602",
        name: "Facial",
        picture: "https://www.beautysecrets.com.pk/assets/images/our-services/large/facial.jpg",
        icon: "https://www.beautysecrets.com.pk/assets/images/our-services/large/facial.jpg",
        created_at: "2021-04-21T16:47:08.090Z",
        updatedAt: "2021-04-21T16:47:08.090Z",
    },
    description: "We have a team of experienced & professional beauty expert that use most advance & a custom technique to offer soft, smooth & fresh face for every everyone.",
    price: 300,
    availability: true,
    addons: [
        {name: "Extra 1", price: 500},
        {name: "Extra 2", price: 200},
        {name: "Extra 3", price: 300},
    ],
},
{
    _id: "60805765a9b0a300042f7607",
    name: "Whitening facial",
    category: {
        _id: "6080570ca9b0a300042f7602",
        name: "Facial and Massage",
        picture: "https://www.beautysecrets.com.pk/assets/images/our-services/large/facial.jpg",
        icon: "https://www.beautysecrets.com.pk/assets/images/our-services/large/facial.jpg",
        created_at: "2021-04-21T16:47:08.090Z",
        updatedAt: "2021-04-21T16:47:08.090Z",
    },
    description: "We have a team of experienced & professional beauty expert that use most advance & a custom technique to offer soft, smooth & fresh face for every everyone.",
    price: 300,
    availability: true,
    addons: [
        {name: "Extra 1", price: 500},
        {name: "Extra 2", price: 200},
        {name: "Extra 3", price: 300},
    ],
}]

const Cart = (props) => {
    
    if(cartService.length === 0 || true){
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
                        <Text bold h3>Total Bill: <Text accent h2>Rs. 4300</Text></Text>
                    </Block>
                </Block>
                <Block flex={8}  style={{borderRadius:12}} margin={[5,10,0,10]} > 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                        style={{margintop:theme.sizes.base*2, borderRadius:12}}
                    >
                        {
                            cartService.map( (service, index) => (
                                <Block key={index} color={theme.colors.white} style={{ marginBottom: theme.sizes.base*0.5, borderRadius: 12}}>
                                    <Block row >
                                        <Block flex={6} >
                                            <Block padding={theme.sizes.base} space="around">
                                                <Block color="accent" center middle style={{ alignSelf: 'flex-start',borderRadius: 12, paddingHorizontal:10, paddingVertical: 1}}><Text center white>{service.category.name}</Text></Block>
                                                <Block padding={5}><Text>{service.name}</Text></Block>
                                                <Block paddingHorizontal={5}><Text accent h2>Rs. {service.price}</Text></Block>
                                            </Block>
                                        </Block>
                                        <Block flex={4} row center middle>
                                        <TouchableOpacity style={[styles.actionButton, {borderTopLeftRadius: 12, borderBottomLeftRadius: 12}]} onPress={() => {}}>
                                            <Icon
                                                name={'minus'}
                                                type="materialCommunity"
                                                size={20}
                                                color={theme.colors.accent}
                                            />
                                            
                                        </TouchableOpacity>
                                            <Text h2 center style={styles.actionText}>1</Text>
                                            <TouchableOpacity style={[styles.actionButton, {borderTopRightRadius: 12, borderBottomRightRadius: 12}]} onPress={() => {}}>
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
                                        service.addons.length > 1 && (
                                            service.addons.map((addon, index) => (
                                                <Block key={index} row padding={[theme.sizes.base * 0.5, theme.sizes.base*3]} >
                                                    <Block flex={7} >
                                                        <Block  space="around">
                                                            <Text>{addon.name}</Text>
                                                            <Text accent h4>Rs. {addon.price}</Text>
                                                        </Block>
                                                    </Block>
                                                    <Block flex={3} row  space="" center middle>
                                                   
                                                        <TouchableOpacity style={[styles.actionButton2, {borderTopLeftRadius: 12, borderBottomLeftRadius: 12}]} onPress={() => {}}>
                                                            <Icon
                                                                name={'minus'}
                                                                type="materialCommunity"
                                                                size={16}
                                                                color={theme.colors.accent}
                                                            />
                                                            
                                                        </TouchableOpacity>
                                                    
                                                    <Text h3 center middle style={styles.actionText2}>1</Text>
                                                   
                                                        <TouchableOpacity style={[styles.actionButton2, {borderTopRightRadius: 12, borderBottomRightRadius: 12}]} onPress={() => {}}>
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
                <Block flex={1} style={{marginBottom: theme.sizes.base* 1.4, marginHorizontal: 10}} >
                    <Button color={theme.colors.accent} style={{borderRadius: 12}}><Text center white bold>Schedule your order</Text></Button>
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
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
