import React from 'react'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import { ScrollView } from 'react-native';
import { theme } from '../constants';

const coupons = [{
    code: "CINM213",
    discountPercertage: "12",
    discountPrice: "500",
    validity: new Date()
}]

function Coupons (props) {
    return (
        <Block>
            <ScrollView>
                {
                    coupons.map(coupon => (
                        <Block color={theme.colors.white} margin={theme.sizes.base} style={{borderRadius: 12}}>
                            <Block row space="around">
                                <Text>Coupon Code:</Text>
                                <Text size={16} bold center>{coupon.code}</Text>
                            </Block>
                            <Block center  marginVertical={theme.sizes.base}>
                                <Block color={theme.colors.accent} padding={theme.sizes.base} style={{borderRadius:12}}>
                                {
                                    coupon.discountPercertage ? (
                                        <Text center white size={20}>Get {coupon.discountPercertage}% off </Text>
                                    ): (
                                        <Text center white size={20}>Flat Rs.{coupon.discountPercertage} off </Text>
                                     )
                                }
                                </Block>
                            </Block>
                            <Block>
                                <Text center>Valid for next {new Date(coupon.validity).getDay()} days</Text>
                            </Block>
                        </Block>
                    ))
                }
            </ScrollView>
        </Block>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Coupons)
