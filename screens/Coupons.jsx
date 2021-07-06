import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import { ScrollView } from 'react-native';
import { theme } from '../constants';
import { fetchCoupons } from './../redux/actions/couponActions';
import Icon from '../components/Icon';

const coupons = [{
    code: "CINM213",
    description: "350 off on youe next order",
    discountPercertage: "12",
    discountPrice: "500",
    validity: new Date()
},{
    code: "CINM213",
    description: "350 off on youe next order",
    discountPercertage: "12",
    discountPrice: "500",
    validity: new Date()
}]

function Coupons (props) {

    useEffect(() => {

        props.fetchCoupons();
        
      }, []);

    const { coupons } = props
    if(coupons && coupons.length === 0 ){
        return (
            <Block center middle flex={1} color={theme.colors.white}> 
                <Icon
                    name="pricetag"
                    type="ionicon"
                    color={theme.colors.gray}
                    size={40}
                /> 
                <Text gray center size={20} style={{padding: theme.sizes.base}}>No Coupons</Text>
            </Block>
        )
    }

    return (
        <Block>
            <ScrollView>
                {
                    coupons.map(coupon => (
                        <Block key={coupon.code} color={theme.colors.white} padding={theme.sizes.base} margin={[theme.sizes.base * 0.5,theme.sizes.base,theme.sizes.base*0.5,theme.sizes.base]} style={{borderRadius: 12}}>
                            <Block row space="between">
                                <Text size={17} bold>{coupon.description}</Text>
                                <Text  center>{
                                    coupon.discount? (
                                        <Text size={16}center><Text gray>Discount:</Text> <Text bold>{coupon.discount}% </Text></Text>
                                    ): (
                                        <Text size={16} center><Text gray>Discount:</Text> <Text bold>{coupon.price} PKR</Text></Text>
                                     )
                                }</Text>
                            </Block>
                            <Block >
                                <Block>
                                    <Text bold gray size={13}>{coupon.code}</Text>
                                </Block>
                            </Block>
                            <Block row space="between" paddingTop={theme.sizes.base*0.75}>
                                <Text bold center>Rs.{coupon.validMinimum} <Text gray>minimum</Text></Text>
                                <Text gray center>Valid until: 
                                    {
                                        new Date(coupon.validity) > new Date() ?  (
                                            <Text bold black>{new Date(coupon.validity).toDateString()}</Text>
                                        ) : (
                                            <Text accent> Expired</Text>
                                        )
                                    }
                                </Text>
                            </Block>
                        </Block>
                    ))
                }
            </ScrollView>
        </Block>
    )
}

const mapStateToProps = (state) => ({
    coupons: state.couponReducer.coupons
})

const mapDispatchToProps = (dispatch) => ({
    fetchCoupons: () => fetchCoupons(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Coupons)
