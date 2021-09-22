import React, {useRef} from 'react'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import { ScrollView, Image, StyleSheet,TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../constants';
import { useEffect } from 'react';
import { addServicesFromCart, submitOrder } from './../redux/actions/orderActions';
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput } from 'react-native';
import { applyCoupon, handleTextChange } from '../redux/actions/couponActions';
import { useState } from 'react';



function OrderSummary (props) {

    useEffect(() => {

        props.addServicesFromCart();

      }, []);

      const [isLoading, setIsLoading] = useState(false)
      
    const getAMPM = (hours) => {
        
        return hours >= 12 ? 'PM' : 'AM';
    }

    const submitOrder = async () => {

        try {
            await props.submitOrder()
            props.navigation.navigate("Order Placed")
        } catch (error) {
            console.log(error)
        }
    }

    const refRBSheet = useRef();
    const {order} = props

    const renderApplyCoupon = () => {
        return(
            <Block>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.buttonOutline}>
                <Text gray center>Apply Coupon</Text>
             </TouchableOpacity>
            <RBSheet
                height={360}
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
                }}
            >
                <Block>
                    <Block center>
                        <Text size={22} bold>Apply Coupon Code</Text>
                        <Image source={require('../assets/images/gift.png')} style={{height: 120, width: 120}}/>
                        
                    </Block>
                    <Block>
                        <Text style={styles.text}>Enter Coupon Code</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => props.handleTextChange("code",value)}
                            placeholder="Code"
                            value={props.coupon.code}
                        />
                        <TouchableOpacity style={[styles.button, {marginVertical: 10}]} onPress={() => props.applyCoupon()}>
                            <Text center bold white>Apply Coupon Code</Text>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </RBSheet>
        </Block>
        )
    }

    return (
        <Block>
            <ScrollView>
               <Block row>
                    <Block flex={7} color={theme.colors.white} margin={theme.sizes.base} marginRight={0} style={{borderRadius: 12}}>
                        <Text size={18} bold style={{padding: theme.sizes.body, paddingBottom: 0}}>
                            Address
                        </Text>
                        <Text gray style={{padding: theme.sizes.body, paddingTop: 0}}>
                            {
                                order.address
                            }
                        </Text>
                    </Block>
                    <Block flex={3} color={theme.colors.black} margin={theme.sizes.base} style={{borderRadius: 12}}>
                        <Text white size={22} style={{padding: theme.sizes.base, paddingBottom: 0}}>
                            {console.log(order.date)}
                            { new Date(order.date).toDateString()}
                        </Text>
                        <Text white size={15} style={{padding: theme.sizes.base}}>
                            { 
                                (((order.time.getHours() % 12) + "" ).length === 1 ? ("0"+(order.time.getHours() % 12)) : (order.time.getHours() % 12)) + 
                                    " : " + (((order.time.getMinutes()) + "" ).length === 1 ? ("0"+(order.time.getMinutes() )) : (order.time.getMinutes() ))  + 
                                    "  " + getAMPM(order.time.getHours())
                            }
                        </Text>
                    </Block>
               </Block>
               <Block color={theme.colors.white} margin={theme.sizes.base} style={{borderRadius: 12}}>
                    {
                        order.service.map(service => (
                            <Block key={service._id}>
                                <Block row >
                                    <Block flex={0.5}  padding={[theme.sizes.body, 0,theme.sizes.body,theme.sizes.body]}>
                                        <Text size={16} gray>x{service.quantity}</Text>
                                    </Block>
                                    <Block flex={3} padding={theme.sizes.body} paddingLeft={0}>
                                        <Text size={18}>{service.name}</Text>
                                    </Block>
                                    <Block flex={1} right row padding={theme.sizes.body}>
                                        <Text accent  size={18}>Rs. {service.price}</Text>
                                    </Block>
                                </Block>
                            {
                                service.addons.length > 0 && (
                                    service.addons.map((addon,index) => (
                                        <Block row space="around" paddingLeft={theme.sizes.base * 2.5}>
                                            <Block flex={0.4} padding={[theme.sizes.body*0.5,theme.sizes.body,theme.sizes.body*0.5,theme.sizes.body]}>
                                                <Text size={16} gray>x{addon.quantity}</Text>
                                            </Block>
                                            <Block flex={3} padding={[theme.sizes.body*0.5,theme.sizes.body,theme.sizes.body*0.5,theme.sizes.body]}>
                                                <Text size={16}>{addon.name}</Text>
                                            </Block>
                                            <Block flex={2} right row padding={[theme.sizes.body*0.5,theme.sizes.body,theme.sizes.body*0.5,theme.sizes.body]}>
                                                <Text accent size={16}>Rs. {addon.quantity * addon.price}</Text>
                                            </Block>
                                        </Block>
                                    ))
                                ) 
                            
                            }
                            </Block>
                        ))
                    }
               </Block>
               <Block>
                   {
                       order.coupon ? (
                           <Block style={{backgroundColor: 'white' ,borderRadius: 12}} padding={theme.sizes.body} margin={theme.sizes.base} >
                                <Block row space="around">
                                    <Text >Coupon Used:</Text>
                                    <Text bold>{order.coupon}</Text>
                                </Block>
                                {
                                    renderApplyCoupon()
                                }
                           </Block>
                       ) : (
                        <>
                            <Text bold size={16} style={{padding: theme.sizes.base, paddingTop:0, paddingBottom:0}}>Apply Coupon Code</Text>
                            <Block style={{backgroundColor: 'white' ,borderRadius: 12}} margin={theme.sizes.base} center>
                                <Image source={require('../assets/images/gift.png') } style={{width: 100, height: 100, marginTop: theme.sizes.body}}/>
                                {
                                    renderApplyCoupon()
                                }
                            </Block> 
                        </> 
                       )
                   }  
               </Block>

               <Block color={theme.colors.white} margin={theme.sizes.base} styles={{borderRadius: 12}}>
                   <Block row space="between" padding={theme.sizes.body}>
                       <Text gray size={16}>Total:</Text>
                       <Text accent size={16}>{order.price}</Text>
                   </Block>
                   <Block row space="between" padding={theme.sizes.body}>
                       <Text gray size={16}>Travel Charges:</Text>
                       <Text accent size={16}>Rs. {order.travelCharges}</Text>
                   </Block>
                   <Block row space="between" padding={theme.sizes.body}>
                       <Text gray size={16}>Discount:</Text>
                       <Text accent size={16}>Rs. {order.discount}</Text>
                   </Block>
                   <Block row space="between" padding={theme.sizes.body} style={{borderTopWidth : 2, borderColor: theme.colors.gray2}}>
                       <Text gray size={16}>Net Total:</Text>
                       <Text accent size={16}>Rs. {order.price + order.travelCharges - order.discount}</Text>
                   </Block>
               </Block>

               <Block>
                   <TouchableOpacity disabled={isLoading} style={styles.button} onPress={async () => {setIsLoading(true); await submitOrder(); setIsLoading(false);}}>
                       <Text white bold center>
                           {
                               isLoading ? ( <ActivityIndicator size={15} color={theme.colors.white} />) : "Submit Order"
                           }
                       </Text>
                   </TouchableOpacity>
               </Block>
            </ScrollView>
        </Block>
    )
}

const mapStateToProps = (state) => ({
    order: state.orderReducer.order,
    coupon: state.couponReducer.coupon

})

const mapDispatchToProps = (dispatch) => ({
    addServicesFromCart: () => addServicesFromCart(dispatch),
    submitOrder: () => submitOrder(dispatch),
    handleTextChange: (field, value) => handleTextChange(dispatch, field, value),
    applyCoupon: () => applyCoupon(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)

const styles = StyleSheet.create({
    text:{
        color: theme.colors.black,
        height: 30,
        marginHorizontal: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    
    
    textInput:{ 
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.gray2,
        paddingHorizontal: theme.sizes.base,
        fontSize: 15,
        height: theme.sizes.base * 3,
       
    },
    button: {
        marginHorizontal: theme.sizes.base,
        padding: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.accent,
 
    },
    buttonOutline: {
        margin: theme.sizes.body,
        paddingVertical:7 ,
        paddingHorizontal:14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.gray
    }
})