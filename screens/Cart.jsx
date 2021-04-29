import React, { useState } from "react";
import { Card, Badge, Button, Block, Text } from "../components";
import { connect } from 'react-redux';
import { theme } from "../constants";
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';

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
}]

const Cart = (props) => {
    
    return (
        
            <Block flex={1}>
                <Block flex={1} color={theme.colors.white} margin={[5,10,0,10]} center middle>
                    <Block padding={10} >
                        <Text gray2>Total Bill: <Text primary h2>Rs. 4300</Text></Text>
                    </Block>
                </Block>
                <Block flex={8} color={theme.colors.white} margin={[5,10,0,10]} > 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                        style={{margintop:30}}
                    >
                        {
                            cartService.map( (service ,index)=> (
                                <Block key={index}>
                                    <Block row >
                                        <Block flex={8} >
                                            <Block padding={theme.sizes.base} space="around">
                                                <Text gray>{service.category.name}</Text>
                                                <Text>{service.name}</Text>
                                                <Text secondary h2>Rs. {service.price}</Text>
                                            </Block>
                                        </Block>
                                        <Block flex={2} row  space="around" center middle>
                                            <TouchableOpacity><Text h3>-</Text></TouchableOpacity>
                                            <Text h2>1</Text>
                                            <TouchableOpacity><Text h3>+</Text></TouchableOpacity>
                                        </Block>
                                    </Block>
                                    {
                                        service.addons.length > 1 && (
                                            service.addons.map(addon => (
                                                <Block row padding={[theme.sizes.base * 0.5, theme.sizes.base*3]}>
                                                    <Block flex={8} >
                                                        <Block  space="around">
                                                            <Text>{addon.name}</Text>
                                                            <Text secondary h4>Rs. {addon.price}</Text>
                                                        </Block>
                                                    </Block>
                                                    <Block flex={2} row  space="around" center middle>
                                                        <TouchableOpacity><Text h4>-</Text></TouchableOpacity>
                                                        <Text h3>1</Text>
                                                        <TouchableOpacity><Text h5>+</Text></TouchableOpacity>
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
                <Block flex={1}>
                    <Button color={theme.colors.primary}><Text center>Schedule your order</Text></Button>
                </Block>
            </Block>
     
    )
}

const styles = StyleSheet.create({
    
  });

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
