import React, { useRef, useEffect, useState} from 'react'
import { Picker, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, TextInput, Platform } from 'react-native';
import { theme } from '../constants';
import Icon from '../components/Icon';
import { showMessage, hideMessage } from "react-native-flash-message";
import { handleTextChange } from './../redux/actions/orderActions';
import { getCurrentCustomer } from '../redux/actions/authentication';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';



function ScheduleOrder(props) {
    // const [date, setDate] = useState(new Date());
    // const [time, setTime] = useState(new Date(new Date().setHours(0,0,0,0)));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let phoneInput = useRef();

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


    const validateDate = (selectedDate) => {
        let now  = new Date()
        
        if(moment(selectedDate).isBefore(now,'date')){
            showMessage({
                message: "Date can only be selected onwards from today",
                type: "danger",
                floating: true
              });
              return false;
           
        }

        return true
        // else if (moment(selectedDate).isSame(now,'date')){
        //     var timeAndDate = moment().set({'hour': 17, 'minute': 0,'second':0});
        //     if (moment(selectedDate).isAfter(timeAndDate)){
        //         showMessage({
        //             message: "Sorry! we are closed for today, please select some coming day",
        //             type: "danger",
        //             floating: true
        //           });
        //           return false;
        //     }
        // }

    }

    const onChangeDate = (selectedDate) => {
        setShowDatePicker(false);
        //when cancel button press
        if(!selectedDate) return 

        props.handleTextChange("date",selectedDate) 

    }
    function sameDayCheck(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();
      }

    const validateTime = (selectedTime) => {
        let nineam = moment().set({'hour': 9, 'minute': 31,'second':0}).format();
        let ninepm = moment().set({'hour': 21, 'minute': 1,'second':0}).format();
        let seven = moment().set({'hour': 19, 'minute': 1,'second':0}).format();

        let now  = new Date()
        let sameDay = sameDayCheck(now,props.order.date)
        let nextDay = moment(props.order.date).isAfter(moment().format(),'date')

        // first case time bofore time current 
        if( sameDay && moment(selectedTime).isBefore(now,'time')){
            showMessage({
                message: "Invalid time slot. Please select valid time slot.",
                type: "danger",
                floating: true
              });
              return false;
           
        }

        if ( sameDay &&  moment(selectedTime).isAfter(seven) ){
            showMessage({
                message: "Ohh! Sorry we are closed for today. Kindly book your order for tomorrow between 9:30am to 9:00pm",
                type: "danger",
                floating: true
              });
              return false;
        }

        if ( sameDay && (moment(selectedTime).isBefore(nineam))){
            showMessage({
                message: "Ops! Our service providing time starts at 9:30am",
                type: "danger",
                floating: true
              });
              return false;
        }

        if( sameDay && (moment(moment(selectedTime).subtract(2,'hours').format()).isBefore(now)
        || 
         moment(moment(selectedTime).subtract(2,'hours').format()).isSame(now) )){
            showMessage({
                message: "Please note appointements are made atleast 2 hours before so we can provide you with best of our services",
                type: "danger",
                floating: true
              });
              return false;
        }


        if ( nextDay && (moment(selectedTime).isBefore(nineam))){
            showMessage({
                message: "Ops! Our service providing time starts at 9:30am",
                type: "danger",
                floating: true
              });
              return false;
        }

        if( nextDay && (moment(selectedTime).isAfter(ninepm))){
            showMessage({
                message: "Please select time range between 9:30am-9:00pm for coming day",
                type: "danger",
                floating: true
              });
              return false;
        }

            return true
        // if(sameDay){

            
        //     //selected time on a same day should greater than now...
        //     if (
        //         moment(selectedTime).isAfter(startTime) 
        //         &&
        //         moment(selectedTime).isBefore(endTime)
        //     ) {

        //         if (
        //             moment(moment(selectedTime).subtract(4,'hours').format()).isBefore(now) 
        //             || 
        //             moment(moment(selectedTime).subtract(4,'hours').format()).isSame(now)
        //         ) {
        //             showMessage({
        //                         message: "Selected time should be 4 hours greater than now",
        //                         type: "danger",
        //                         floating: true
        //                       });
        //         } else {
        //             props.handleTextChange("time",selectedTime)
        //         }


                
        //     } else {
        //         showMessage({
        //             message: "Ohh! Sorry we are closed for today. Kindly book your order for tomorrow between 9:30am to 9:00pm",
        //             type: "danger",
        //             floating: true
        //         });
        //     }
          

        // } else {
        //     if (
        //         moment(selectedTime).isAfter(startTime) 
        //         &&
        //         moment(selectedTime).isBefore(endTime)
        //     ) {
        //         props.handleTextChange("time",selectedTime)
        //     } else {
        //         showMessage({
        //             message: "Time can only be selected from 9:00 AM to 9:00 PM",
        //             type: "danger",
        //             floating: true
        //         });
        //     }
           
        // }
    }

    const onChangeTime = (selectedTime) => {

        
        setShowTimePicker(false);

        //when cancel button press
        if(!selectedTime) return 

        props.handleTextChange("time",selectedTime)
        
        
    }

    const getAMPM = (hours) => {
      
        let ampm = hours >= 12 ? 'PM' : 'AM';
        return ampm;
      }
   
    const validate = () => {
        const { order } = props;
        if(order.date == ""){
            showMessage({
                message: "Please select the date",
                type: "danger",
                floating: true
            });
            return
        } else {
            console.log('very funny',!validateDate(order.date))
            if(!validateDate(order.date)) return;

        } 
        if(order.time.getTime() == new Date(new Date().setHours(0,0,0,0)).getTime()){
            showMessage({
                message: "Please select the time",
                type: "danger",
                floating: true
            });
            return
        } else {
            console.log('very happy',!validateTime(order.time))
            if (!validateTime(order.time)) return;
           
        }
        
        if(order.address == ""){
            showMessage({ 
                message: "Please enter the address",
                type: "danger",
                floating: true
            });
            return
        }
        if(order.area == null || order.area == ""){
            showMessage({
                message: "Please select the area",
                type: "danger",
                floating: true
            });
            return
        }
        
        props.navigation.push("Order Summary")
    } 

    const {order} = props;
    
    return (

       <Block color={theme.colors.gray2} style={{marginBottom: theme.sizes.base * 1.65}}>
            <Block flex={0.9}>
                <ScrollView>
                    {/* {console.log("------------------Order--------------------",order)} */}
                    <Block flex={false}>
                        <Text style={styles.text}>Select Date</Text>
                        <TouchableOpacity  onPress={()=>setShowDatePicker(true)} >
                            <Block row color={theme.colors.white} space="between" style={{marginHorizontal: theme.sizes.base, borderRadius :12}}>
                                <Text style={[styles.select , {textAlign: 'center', paddingTop: 12}]}>{ order.date.toDateString().split(' ')[1] + ". " + order.date.getDate() + ",  " + days[order.date.getDay()]}</Text>
                                <Icon
                                    name={'plus'}
                                    type={ 'entypo'}
                                    size={26}
                                    color={theme.colors.black}
                                    style={[styles.select, {paddingTop: 12}]}
                                />
                            </Block>
                        </TouchableOpacity>
                        {
                            showDatePicker && (
                                <DateTimePicker
                                    testID="datePicker"
                                    value={order.date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={ (e,date)=> onChangeDate(date)}
                                />
                            )
                        }
                    </Block>
                    <Block flex={false}>
                        <Text style={styles.text}>Select Time</Text>
                        <TouchableOpacity  onPress={()=>setShowTimePicker(true)} >
                            <Block row color={theme.colors.white} space="between" style={{marginHorizontal: theme.sizes.base, borderRadius :12}}>
                               
                                    <Text style={[styles.select , {textAlign: 'center', paddingTop: 12}]}>
                                        { (((order.time.getHours() % 12) + "" ).length === 1 ? ("0"+(order.time.getHours() % 12)) : (order.time.getHours() % 12)) + 
                                        " : " + (((order.time.getMinutes()) + "" ).length === 1 ? ("0"+(order.time.getMinutes() )) : (order.time.getMinutes() ))  + 
                                        "  " + getAMPM(order.time.getHours())}
                                    </Text>
                                    <Icon
                                        name={'plus'}
                                        type={ 'entypo'}
                                        size={26}
                                        color={theme.colors.black}
                                        style={[styles.select, {paddingTop: 12}]}
                                    />
                               
                            </Block>
                        </TouchableOpacity>
                        {
                            showTimePicker && (
                                <DateTimePicker
                                    value={order.time}
                                    mode={'time'}
                                    is24Hour={false}
                                    display="default"
                                    onChange={ (e,time)=> onChangeTime(time)}
                                />
                            )
                        }
                    </Block>
                    <Block>
                        <Text style={styles.text}>Contact Number</Text>
                        <Block row style={{marginHorizontal: theme.sizes.base}}>
                            <TextInput
                                keyboardType="numeric"
                                maxLength={10}
                                style={[styles.phoneInput, {width: '20%', color: 'black', borderTopLeftRadius: 12,borderBottomLeftRadius: 12,}]}
                                value="+92"
                                editable={false}
                            />
                            <TextInput
                                editable={!customer}
                                style={[styles.phoneInput, {width: '80%', color: 'black', letterSpacing: 4, borderTopRightRadius: 12,borderBottomRightRadius: 12,}]}
                                onChangeText={(value) => props.handleTextChange("phone",value)}
                                placeholder="Phone Number"
                                value={customer && customer.phone? customer.phone.substr(3,customer.phone.length-1): order.phone}
                                keyboardType="numeric"
                                maxLength={10}
                            />
                        </Block>
                    </Block>
                    <Block>
                        <Text style={styles.text}>Address</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => props.handleTextChange("address",value)}
                            placeholder="Block XYZ Street 123, Johar Town, Lahore"
                            multiline
                            numberOfLines={3}
                            value={order.address}
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Area</Text>
                        
                        <Block style={styles.picker} middle >
                            
                            <RNPickerSelect
                                style={{inputAndroid: styles.select, inputIOS: styles.select, }}
                                useNativeAndroidPickerStyle={false}
                                value={order.area}
                                onValueChange={(value) => props.handleTextChange("area",value)}
                                items={[
                                    {label: "Johar Town", value: "Johar Town" },
                                    {label: 'Gulberg', value: 'Gulberg' },
                                    {label: 'Iqbal Town', value: 'Iqbal Town' },
                                    {label: 'DHA', value: 'DHA' },
                                    {label: 'Upper Mall', value: 'Upper Mall' },
                                    {label: 'Other', value: 'Other' },
                                ]}
                                
                            />
                        </Block>
                        
                        <Text gray style={{padding: theme.sizes.base}}>Note: Travel Charges may apply on areas other than listed above</Text>
                    </Block>
                    <Block>
                        <Text style={styles.text}>Special Instructions</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => props.handleTextChange("specialInstructions",value)}
                            placeholder="Special instruction to your beautician"
                            multiline
                            numberOfLines={3}
                            value={order.specialInstructions}
                        />
                    </Block>
                </ScrollView>
            </Block>
            <Block flex={0.1} >
                <TouchableOpacity style={styles.orderButton} onPress={() => validate()}>
                        <Text white size={16} bold center> 
                            Place your order
                        </Text>
                </TouchableOpacity>
            </Block>
       </Block>
    )
}

const mapStateToProps = (state) => ({
    order: state.orderReducer.order
})

const mapDispatchToProps = (dispatch) => ({
    handleTextChange: (field, value) => handleTextChange(dispatch, field, value)
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleOrder)

const styles = StyleSheet.create({
    text:{
        color: theme.colors.black,
        height: 30,
        marginHorizontal: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    select:{
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.whtie,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.base,
        fontSize: 18,
        fontWeight: "600"
    },
    phoneInput:{ 
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.base,
        fontSize: 15,

    },
    textInput:{ 
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.base,
        fontSize: 15,
        height: theme.sizes.base * 4,
       
    },
    orderButton: {
        marginHorizontal: theme.sizes.base,
        padding: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.accent,
 
    },
    select:{
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.base,
        height: theme.sizes.base * 3,
        color:  theme.colors.black
       
    },
})